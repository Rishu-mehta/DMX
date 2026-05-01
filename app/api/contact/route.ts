import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/db";

// Initialize Resend client (gracefully handles missing key)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  enquiryType: z.enum(["service", "training", "general", "partnership"]).optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit (5 requests per 15 minutes)
    rateLimitMap.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Always save to database first
    await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        enquiryType: validatedData.enquiryType,
        message: validatedData.message,
      },
    });


    // Prepare email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${validatedData.name}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ""}
      ${validatedData.enquiryType ? `<p><strong>Enquiry Type:</strong> ${validatedData.enquiryType}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p><small>Sent from DMX Tech Services website contact form</small></p>
    `;

    const emailText = `
New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}
${validatedData.phone ? `Phone: ${validatedData.phone}` : ""}
${validatedData.enquiryType ? `Enquiry Type: ${validatedData.enquiryType}` : ""}

Message:
${validatedData.message}

---
Sent from DMX Tech Services website contact form
    `;

    // Send email via Resend (optional — skipped if API key not set)
    let emailData: { id?: string } | null = null;
    if (resend) {
      const { data, error } = await resend.emails.send({
        from: "DMX Tech Services <noreply@dmxtechservices.com>",
        to: [process.env.CONTACT_EMAIL || "info@dmxtechservices.com"],
        replyTo: validatedData.email,
        subject: `New Contact Form Submission from ${validatedData.name}`,
        html: emailHtml,
        text: emailText,
      });
      if (error) {
        console.error("Resend error:", error);
        // Don't fail — submission was already saved to DB
      }
      emailData = data;
    } else {
      console.log("[Contact] No RESEND_API_KEY set — email skipped. Submission saved to DB.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon.",
        emailId: emailData?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
