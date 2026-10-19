import { ImageIcon } from "@sanity/icons/Image";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ImageIcon,
  orderings: [
    {
      title: "Website order",
      name: "websiteOrder",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Fashion", value: "Fashion" },
          { title: "Portraits", value: "Portraits" },
          { title: "Events", value: "Events" },
          { title: "Weddings", value: "Weddings" },
          { title: "Brands", value: "Brands" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "medium",
      title: "Project medium",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "Photo" },
          { title: "Film", value: "Film" },
          { title: "Photo + Film", value: "Photo + Film" },
        ],
        layout: "radio",
      },
      initialValue: "Photo",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "client", title: "Client / subject", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (rule) => rule.required().regex(/^\d{4}$/),
    }),
    defineField({ name: "place", title: "Location", type: "string" }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: "excerpt", title: "Short introduction", type: "text", rows: 3, validation: (rule) => rule.required().max(240) }),
    defineField({ name: "story", title: "Project story", type: "text", rows: 8, validation: (rule) => rule.required() }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Project photo gallery",
      description: "Upload, remove, and drag to reorder images. The order here is the website display order.",
      type: "array",
      of: [defineArrayMember({ type: "projectGalleryItem" })],
    }),
    defineField({
      name: "featured",
      title: "Feature on the homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Website order",
      description: "Lower numbers appear earlier. New projects default to 100 and break ties by newest first.",
      type: "number",
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "videoEmbedUrl",
      title: "Film embed URL (optional)",
      description: "Paste a YouTube or Vimeo share/player link. For long films, host the edit on a streaming service.",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }).custom((value) => {
        if (!value) return true;
        try {
          const host = new URL(value).hostname.toLowerCase();
          return host === "youtube.com" || host === "www.youtube.com" || host === "youtu.be" || host === "vimeo.com" || host === "www.vimeo.com" || host === "player.vimeo.com"
            ? true
            : "Use a YouTube or Vimeo share/player URL.";
        } catch {
          return "Enter a valid HTTPS video embed URL.";
        }
      }),
    }),
    defineField({
      name: "videoFile",
      title: "Short video file (optional)",
      description: "Upload a short MP4/WebM. For long-form work, use the embed URL above for reliable streaming.",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "videoPoster",
      title: "Video poster image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
