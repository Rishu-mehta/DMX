// TypeScript types for Sanity documents

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  slug: {
    current: string;
  };
  description: string;
  icon: string;
  features?: string[];
  techStack?: string[];
  order: number;
}

export interface Course {
  _id: string;
  _type: "course";
  title: string;
  slug: {
    current: string;
  };
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  curriculum?: any[]; // Block content
  price?: string;
  instructor?: string;
  featured: boolean;
  order: number;
}

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  photo?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  bio?: string;
  linkedIn?: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  quote: string;
  name: string;
  company?: string;
  role?: string;
  avatar?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  rating: number;
  order: number;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  companyName: string;
  email: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
}
