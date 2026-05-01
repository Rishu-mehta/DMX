# 🚀 DMX Tech Services - Quick Start Guide

## For the Team Lead / Orchestrator

### ✅ Backend Status: COMPLETE

All backend infrastructure is ready. Here's what to do next:

### 1. Set Up Sanity Project (5 minutes)

```bash
# Login to Sanity
npx sanity login

# Create a new project at https://sanity.io/manage
# Note down the Project ID
```

### 2. Configure Environment (2 minutes)

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add:
# - NEXT_PUBLIC_SANITY_PROJECT_ID (from Sanity dashboard)
# - SANITY_API_TOKEN (create in Sanity project settings with Editor role)
# - RESEND_API_KEY (sign up at https://resend.com)
```

### 3. Seed Sample Data (1 minute)

```bash
npm run sanity:seed
```

This creates:
- 4 IT Services
- 6 Training Courses
- 3 Team Members
- 3 Testimonials
- 1 Site Settings document

### 4. Validate Everything Works (1 minute)

```bash
npm run sanity:validate
```

### 5. Access Sanity Studio (immediate)

```bash
npm run dev
# Open http://localhost:3000/studio
```

---

## For Frontend Developers

### Quick Integration

**1. Import what you need:**
```typescript
import { getAllServices, getFeaturedCourses } from "@/lib/sanity/queries";
import type { Service, Course } from "@/lib/sanity/types";
```

**2. Fetch data in Server Components:**
```typescript
export default async function ServicesPage() {
  const services = await getAllServices();
  
  return (
    <div>
      {services.map(service => (
        <div key={service._id}>{service.title}</div>
      ))}
    </div>
  );
}
```

**3. Use the contact form API:**
```typescript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    message: "Hello!",
  }),
});
```

### Available Queries

```typescript
getAllServices()          // All services
getServiceBySlug(slug)    // Single service
getAllCourses()           // All courses
getFeaturedCourses()      // Featured courses only
getCourseBySlug(slug)     // Single course
getTeamMembers()          // All team members
getTestimonials()         // All testimonials
getSiteSettings()         // Site settings
```

### Full Examples

See `lib/sanity/USAGE_EXAMPLES.tsx` for complete examples including:
- Server Components
- Client Components
- Dynamic routes
- Metadata generation
- Error handling
- Loading states

---

## For Content Managers

### Accessing the CMS

1. Start the dev server: `npm run dev`
2. Navigate to: http://localhost:3000/studio
3. Login with your Sanity credentials

### Managing Content

**Services:**
- Add/edit IT services
- Set display order
- Add features and tech stack

**Courses:**
- Add/edit training courses
- Mark courses as featured
- Set duration and level

**Team Members:**
- Add team profiles
- Upload photos
- Add LinkedIn links

**Testimonials:**
- Add customer testimonials
- Set ratings (1-5 stars)
- Upload customer avatars

**Site Settings:**
- Update company info
- Change contact details
- Update social media links

---

## File Structure Reference

```
dmx_web/
├── app/
│   ├── api/
│   │   └── contact/route.ts       # Contact form API
│   └── studio/[[...tool]]/
│       └── page.tsx                # Sanity Studio
├── lib/
│   └── sanity/
│       ├── client.ts               # Sanity client
│       ├── queries.ts              # GROQ queries
│       ├── types.ts                # TypeScript types
│       └── USAGE_EXAMPLES.tsx      # Integration examples
├── sanity/
│   └── schemas/
│       ├── service.ts              # Service schema
│       ├── course.ts               # Course schema
│       ├── teamMember.ts           # Team member schema
│       ├── testimonial.ts          # Testimonial schema
│       ├── siteSettings.ts         # Site settings schema
│       └── index.ts                # Schema exports
├── scripts/
│   ├── seed.ts                     # Seed data
│   └── validate-backend.ts         # Validation
├── sanity.config.ts                # Sanity config
├── sanity.cli.ts                   # Sanity CLI config
├── .env.local.example              # Env template
├── BACKEND_README.md               # Full documentation
├── BACKEND_COMPLETE.md             # Deliverables summary
├── BACKEND_SUMMARY.md              # Technical summary
└── QUICKSTART.md                   # This file
```

---

## Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run start                  # Start production server

# Sanity
npm run sanity:seed            # Seed sample data
npm run sanity:validate        # Validate backend setup

# Testing
npm run test                   # Run unit tests
npm run test:e2e               # Run E2E tests
npx tsc --noEmit               # Check TypeScript
```

---

## Environment Variables Checklist

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` - From Sanity dashboard
- [ ] `NEXT_PUBLIC_SANITY_DATASET` - Usually "production"
- [ ] `SANITY_API_TOKEN` - Create in Sanity project settings (Editor role)
- [ ] `RESEND_API_KEY` - From https://resend.com
- [ ] `CONTACT_EMAIL` - Your contact email (default: info@dmxtechservices.com)
- [ ] `NEXT_PUBLIC_SITE_URL` - Your site URL (default: https://dmxtechservices.com)

---

## Troubleshooting

### "Cannot find module '@/lib/sanity/queries'"
- Make sure you're importing from the correct path
- Check that the file exists at `lib/sanity/queries.ts`

### "Project ID not found"
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in `.env.local`
- Restart the dev server after changing env variables

### "Unauthorized" when seeding
- Check that `SANITY_API_TOKEN` has Editor or Administrator role
- Verify the token is correct in `.env.local`

### Contact form not sending emails
- Verify `RESEND_API_KEY` is valid
- Check that your sender domain is verified in Resend dashboard
- Review Resend logs for delivery status

---

## Next Steps

1. **Orchestrator:** Set up Sanity project and configure environment variables
2. **Frontend Team:** Start building pages using the queries from `lib/sanity/queries.ts`
3. **Content Team:** Access Sanity Studio and start adding real content
4. **SEO Specialist:** Use the data from queries to generate metadata
5. **Tester:** Run validation script and test contact form

---

## Documentation

- **BACKEND_README.md** - Complete setup guide with detailed instructions
- **BACKEND_COMPLETE.md** - Full list of deliverables and features
- **BACKEND_SUMMARY.md** - Technical specifications and testing status
- **lib/sanity/USAGE_EXAMPLES.tsx** - Code examples for frontend integration

---

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review `BACKEND_README.md` for detailed documentation
3. Run `npm run sanity:validate` to diagnose issues
4. Check Sanity documentation: https://www.sanity.io/docs

---

**🎉 Backend is ready! Let's build something amazing!**
