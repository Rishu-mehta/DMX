import { sanityClient } from "./client";
import type { Service, Course, TeamMember, Testimonial, SiteSettings } from "./types";

/**
 * Get all services ordered by display order
 */
export async function getAllServices(): Promise<Service[]> {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    _type,
    title,
    slug,
    description,
    icon,
    features,
    techStack,
    order
  }`;
  
  return sanityClient.fetch(query);
}

/**
 * Get a single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    description,
    icon,
    features,
    techStack,
    order
  }`;
  
  return sanityClient.fetch(query, { slug });
}

/**
 * Get all courses ordered by display order
 */
export async function getAllCourses(): Promise<Course[]> {
  const query = `*[_type == "course"] | order(order asc) {
    _id,
    _type,
    title,
    slug,
    duration,
    level,
    description,
    curriculum,
    price,
    instructor,
    featured,
    order
  }`;
  
  return sanityClient.fetch(query);
}

/**
 * Get featured courses only
 */
export async function getFeaturedCourses(): Promise<Course[]> {
  const query = `*[_type == "course" && featured == true] | order(order asc) {
    _id,
    _type,
    title,
    slug,
    duration,
    level,
    description,
    curriculum,
    price,
    instructor,
    featured,
    order
  }`;
  
  return sanityClient.fetch(query);
}

/**
 * Get a single course by slug
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const query = `*[_type == "course" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    duration,
    level,
    description,
    curriculum,
    price,
    instructor,
    featured,
    order
  }`;
  
  return sanityClient.fetch(query, { slug });
}

/**
 * Get all team members ordered by display order
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  const query = `*[_type == "teamMember"] | order(order asc) {
    _id,
    _type,
    name,
    role,
    photo {
      asset->{
        _id,
        url
      },
      alt
    },
    bio,
    linkedIn,
    order
  }`;
  
  return sanityClient.fetch(query);
}

/**
 * Get all testimonials ordered by display order
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial"] | order(order asc) {
    _id,
    _type,
    quote,
    name,
    company,
    role,
    avatar {
      asset->{
        _id,
        url
      },
      alt
    },
    rating,
    order
  }`;
  
  return sanityClient.fetch(query);
}

/**
 * Get site settings (singleton document)
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    _type,
    companyName,
    email,
    phone,
    address,
    socialLinks
  }`;
  
  return sanityClient.fetch(query);
}
