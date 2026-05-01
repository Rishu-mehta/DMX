import { defineType, defineField } from "sanity";

export const courseSchema = defineType({
  name: "course",
  title: "Training Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g., '3 months', '8 weeks'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "curriculum",
      title: "Curriculum",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed course curriculum with rich text formatting",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "e.g., 'Contact for pricing', '$2,999', 'Free'",
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "string",
      description: "Lead instructor name",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this course on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Display order (lower numbers appear first)",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      duration: "duration",
      level: "level",
      order: "order",
    },
    prepare({ title, duration, level, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${duration} • ${level}`,
      };
    },
  },
});
