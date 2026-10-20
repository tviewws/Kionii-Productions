import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Homepage Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "heroImage",
      title: "Homepage hero image",
      description: "The large opening photograph on the homepage. Upload and publish this setting to replace the concept image.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the photograph for visitors using screen readers.",
          validation: (rule) => rule.required().max(180),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showreelVideo",
      title: "Homepage showreel video",
      description: "Upload a compressed MP4 (H.264) or WebM. Sanity serves this original file without adaptive video transcoding, so avoid uploading an uncompressed camera master.",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "showreelPoster",
      title: "Showreel poster image (optional)",
      description: "Optional thumbnail displayed before visitors press play.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the poster image.",
          validation: (rule) => rule.required().max(180),
        }),
      ],
    }),
  ],
  preview: {
    select: { media: "heroImage", showreel: "showreelVideo.asset" },
    prepare({ media, showreel }) {
      return {
        title: "Homepage Settings",
        subtitle: showreel ? "Hero and showreel ready" : media ? "Hero image ready" : "Add homepage media",
        media,
      };
    },
  },
});
