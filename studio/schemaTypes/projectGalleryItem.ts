import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const projectGalleryItem = defineType({
  name: "projectGalleryItem",
  title: "Gallery image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "altText",
      title: "Alternative text",
      description: "Briefly describe the image for screen readers.",
      type: "string",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({ name: "caption", title: "Caption (optional)", type: "string", validation: (rule) => rule.max(180) }),
  ],
  preview: {
    select: { title: "caption", subtitle: "altText", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Gallery image", subtitle, media };
    },
  },
});
