# DMX Tech Services - Backend Setup Guide

## 🎯 Overview

This document covers the complete backend setup for DMX Tech Services, including:
- Sanity CMS v3 configuration
- API routes for contact form
- GROQ queries for content fetching
- Seed data for initial content

## 📁 Project Structure

```
dmx_web/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx           # Sanity Studio route
├── lib/
│   └── sanity/
│       ├── client.ts              # Sanity client configuration
│       ├── queries.ts             # GROQ queries
│       └── types.ts               # TypeScript types
├── sanity/
│   └── schemas/
│       ├── index.ts               # Schema exports
│       ├── service.ts             # Service schema
│       ├── course.ts              # Training course schema
│       ├── teamMember.ts          # Team member schema
│       ├── testimonial.ts         # Testimonial schema
│       └── siteSettings.ts        # Site settings schema
├── scripts/
│   └── seed.ts                    # Seed data script
├── sanity.config.ts               # Sanity configuration
├── sanity.cli.ts                  # Sanity CLI configuration
└── .env.local.example             # Environment variables template
```

## 🚀 Getting Started

### 1. Set Up Sanity Project

First, create a new Sanity project:

```bash
# Login to Sanity (if not already logged in)
npx sanity login

# Initialize Sanity project
npx sanity init --project-id <your-project-id> --dataset production
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your actual values:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token_here

# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=info@dmxtechservices.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://dmxtechservices.com
```

**How to get these values:**

- **NEXT_PUBLIC_SANITY_PROJECT_ID**: Found in your Sanity project dashboard at https://sanity.io/manage
- **SANITY_API_TOKEN**: Create a token with "Editor" permissions in your Sanity project settings
- **RESEND_API_KEY**: Sign up at https://resend.com and create an API key

### 3. Seed Initial Data

Populate your Sanity dataset with initial content:

```bash
npm run sanity:seed
```

This will create:
- ✅ 4 IT Services (Mobile App, Web App, AI Tools, Cybersecurity)
- ✅ 6 Training Courses (Full-Stack AI, AI/ML, DevOps, etc.)
- ✅ 3 Team Members
- ✅ 3 Testimonials
- ✅ 1 Site Settings document

### 4. Access Sanity Studio

Start the development server and access the Sanity Studio:

```bash
npm run dev
```

Navigate to: http://localhost:3000/studio

## 📊 Sanity Schemas

### Service Schema
```typescript
{
  title: string;
  slug: slug;
  description: text;
  icon: string;           // Lucide icon name
  features: string[];
  techStack: string[];
  order: number;
}
```

### Course Schema
```typescript
{
  title: string;
  slug: slug;
  duration: string;       // e.g., "3 months"
  level: "beginner" | "intermediate" | "advanced";
  description: text;
  curriculum: block[];    // Rich text
  price: string;
  instructor: string;
  featured: boolean;
  order: number;
}
```

### Team Member Schema
```typescript
{
  name: string;
  role: string;
  photo: image;
  bio: text;
  linkedIn: url;
  order: number;
}
```

### Testimonial Schema
```typescript
{
  quote: text;
  name: string;
  company: string;
  role: string;
  avatar: image;
  rating: number;         // 1-5
  order: number;
}
```

### Site Settings Schema (Singleton)
```typescript
{
  companyName: string;
  email: string;
  phone: string;
  address: text;
  socialLinks: {
    linkedin: url;
    twitter: url;
    github: url;
    instagram: url;
  };
}
```

## 🔍 GROQ Queries

All queries are available in `lib/sanity/queries.ts`:

```typescript
// Services
getAllServices()              // Get all services ordered by display order
getServiceBySlug(slug)        // Get single service by slug

// Courses
getAllCourses()               // Get all courses ordered by display order
getFeaturedCourses()          // Get only featured courses
getCourseBySlug(slug)         // Get single course by slug

// Team & Testimonials
getTeamMembers()              // Get all team members ordered by display order
getTestimonials()             // Get all testimonials ordered by display order

// Settings
getSiteSettings()             // Get site settings (singleton)
```

## 🌐 API Routes

### POST /api/contact

Contact form submission endpoint with validation and email delivery.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",           // Optional
  "enquiryType": "service",         // Optional: service | training | general | partnership
  "message": "I'm interested in your services..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you soon.",
  "emailId": "abc123"
}
```

**Error Response (400):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

**Rate Limiting:**
- 5 requests per 15 minutes per IP address
- Returns 429 status code when limit exceeded

## 🧪 Testing Queries

You can test GROQ queries directly in the Sanity Studio Vision tool:

1. Go to http://localhost:3000/studio
2. Click on "Vision" in the sidebar
3. Enter your GROQ query, e.g.:
   ```groq
   *[_type == "service"] | order(order asc)
   ```

## 🔒 Security Best Practices

1. **Never expose write tokens**: Keep `SANITY_API_TOKEN` server-side only
2. **Use environment variables**: Never commit `.env.local` to version control
3. **Rate limiting**: Contact form has basic rate limiting (5 req/15min)
4. **Input validation**: All API inputs validated with Zod schemas
5. **CORS**: API routes are protected by Next.js default CORS settings

## 📝 Adding New Content Types

To add a new content type:

1. Create schema in `sanity/schemas/yourType.ts`
2. Export it in `sanity/schemas/index.ts`
3. Add TypeScript type in `lib/sanity/types.ts`
4. Create GROQ queries in `lib/sanity/queries.ts`
5. Restart dev server to see changes in Studio

Example:
```typescript
// sanity/schemas/blogPost.ts
import { defineType, defineField } from "sanity";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // ... more fields
  ],
});
```

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Seed Sanity data
npm run sanity:seed

# Validate Sanity schemas
npx sanity schema validate

# Deploy Sanity Studio
npx sanity deploy

# Check Sanity project info
npx sanity projects list
```

## 🐛 Troubleshooting

### "Project ID not found"
- Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in `.env.local`
- Verify the project ID exists at https://sanity.io/manage

### "Unauthorized" errors
- Check that `SANITY_API_TOKEN` has correct permissions
- Token should have "Editor" or "Administrator" role

### Seed script fails
- Ensure all environment variables are set
- Check that the dataset exists (default: "production")
- Verify network connection to Sanity API

### Contact form not sending emails
- Verify `RESEND_API_KEY` is valid
- Check that sender domain is verified in Resend
- Review Resend dashboard for delivery logs

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Resend Documentation](https://resend.com/docs)
- [Zod Validation](https://zod.dev/)

## ✅ Checklist

Before moving to frontend development:

- [ ] Sanity project created and configured
- [ ] All environment variables set in `.env.local`
- [ ] Seed data successfully imported
- [ ] Sanity Studio accessible at `/studio`
- [ ] All GROQ queries tested and working
- [ ] Contact API route tested with valid/invalid data
- [ ] TypeScript compilation successful (`npm run build`)

---

**Backend Setup Complete! 🎉**

You can now proceed with frontend development. All content will be fetched from Sanity using the queries in `lib/sanity/queries.ts`.
