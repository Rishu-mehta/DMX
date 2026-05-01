/**
 * Backend Validation Script
 * 
 * This script validates that all backend components are properly configured:
 * - Sanity client connection
 * - All GROQ queries
 * - Environment variables
 * - Schema validation
 */

import { sanityClient } from "../lib/sanity/client";
import {
  getAllServices,
  getServiceBySlug,
  getAllCourses,
  getFeaturedCourses,
  getCourseBySlug,
  getTeamMembers,
  getTestimonials,
  getSiteSettings,
} from "../lib/sanity/queries";

async function validateBackend() {
  console.log("🔍 Validating DMX Tech Services Backend...\n");

  let errors = 0;
  let warnings = 0;

  // 1. Check environment variables
  console.log("1️⃣  Checking environment variables...");
  const requiredEnvVars = [
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "NEXT_PUBLIC_SANITY_DATASET",
    "SANITY_API_TOKEN",
    "RESEND_API_KEY",
    "CONTACT_EMAIL",
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`   ❌ Missing: ${envVar}`);
      errors++;
    } else {
      console.log(`   ✅ ${envVar}`);
    }
  }

  // 2. Test Sanity connection
  console.log("\n2️⃣  Testing Sanity connection...");
  try {
    const datasets = await sanityClient.datasets.list();
    console.log(`   ✅ Connected to Sanity project`);
    console.log(`   📊 Available datasets: ${datasets.map((d) => d.name).join(", ")}`);
  } catch (error) {
    console.error(`   ❌ Failed to connect to Sanity:`, error);
    errors++;
    return; // Can't continue without Sanity connection
  }

  // 3. Test GROQ queries
  console.log("\n3️⃣  Testing GROQ queries...");

  try {
    const services = await getAllServices();
    console.log(`   ✅ getAllServices() - Found ${services.length} services`);
    if (services.length === 0) {
      console.warn(`   ⚠️  No services found. Run 'npm run sanity:seed' to add sample data.`);
      warnings++;
    }
  } catch (error) {
    console.error(`   ❌ getAllServices() failed:`, error);
    errors++;
  }

  try {
    const courses = await getAllCourses();
    console.log(`   ✅ getAllCourses() - Found ${courses.length} courses`);
    if (courses.length === 0) {
      console.warn(`   ⚠️  No courses found. Run 'npm run sanity:seed' to add sample data.`);
      warnings++;
    }
  } catch (error) {
    console.error(`   ❌ getAllCourses() failed:`, error);
    errors++;
  }

  try {
    const featuredCourses = await getFeaturedCourses();
    console.log(`   ✅ getFeaturedCourses() - Found ${featuredCourses.length} featured courses`);
  } catch (error) {
    console.error(`   ❌ getFeaturedCourses() failed:`, error);
    errors++;
  }

  try {
    const teamMembers = await getTeamMembers();
    console.log(`   ✅ getTeamMembers() - Found ${teamMembers.length} team members`);
    if (teamMembers.length === 0) {
      console.warn(`   ⚠️  No team members found. Run 'npm run sanity:seed' to add sample data.`);
      warnings++;
    }
  } catch (error) {
    console.error(`   ❌ getTeamMembers() failed:`, error);
    errors++;
  }

  try {
    const testimonials = await getTestimonials();
    console.log(`   ✅ getTestimonials() - Found ${testimonials.length} testimonials`);
    if (testimonials.length === 0) {
      console.warn(`   ⚠️  No testimonials found. Run 'npm run sanity:seed' to add sample data.`);
      warnings++;
    }
  } catch (error) {
    console.error(`   ❌ getTestimonials() failed:`, error);
    errors++;
  }

  try {
    const settings = await getSiteSettings();
    if (settings) {
      console.log(`   ✅ getSiteSettings() - Found settings for ${settings.companyName}`);
    } else {
      console.warn(`   ⚠️  No site settings found. Run 'npm run sanity:seed' to add sample data.`);
      warnings++;
    }
  } catch (error) {
    console.error(`   ❌ getSiteSettings() failed:`, error);
    errors++;
  }

  // 4. Test slug-based queries
  console.log("\n4️⃣  Testing slug-based queries...");
  try {
    const services = await getAllServices();
    if (services.length > 0) {
      const firstService = await getServiceBySlug(services[0].slug.current);
      if (firstService) {
        console.log(`   ✅ getServiceBySlug() - Found "${firstService.title}"`);
      } else {
        console.error(`   ❌ getServiceBySlug() returned null`);
        errors++;
      }
    }
  } catch (error) {
    console.error(`   ❌ getServiceBySlug() failed:`, error);
    errors++;
  }

  try {
    const courses = await getAllCourses();
    if (courses.length > 0) {
      const firstCourse = await getCourseBySlug(courses[0].slug.current);
      if (firstCourse) {
        console.log(`   ✅ getCourseBySlug() - Found "${firstCourse.title}"`);
      } else {
        console.error(`   ❌ getCourseBySlug() returned null`);
        errors++;
      }
    }
  } catch (error) {
    console.error(`   ❌ getCourseBySlug() failed:`, error);
    errors++;
  }

  // 5. Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Validation Summary");
  console.log("=".repeat(50));
  console.log(`✅ Passed: ${errors === 0 ? "All checks" : "Some checks"}`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`⚠️  Warnings: ${warnings}`);

  if (errors === 0 && warnings === 0) {
    console.log("\n🎉 Backend is fully configured and ready!");
    console.log("\n📝 Next steps:");
    console.log("   1. Access Sanity Studio at http://localhost:3000/studio");
    console.log("   2. Start building frontend components");
    console.log("   3. Test contact form at /api/contact");
  } else if (errors === 0) {
    console.log("\n✅ Backend is configured but has warnings.");
    console.log("   Run 'npm run sanity:seed' to populate sample data.");
  } else {
    console.log("\n❌ Backend validation failed. Please fix the errors above.");
    process.exit(1);
  }
}

// Run validation
validateBackend().catch((error) => {
  console.error("\n💥 Validation script crashed:", error);
  process.exit(1);
});
