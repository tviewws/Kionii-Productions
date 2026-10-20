import { createClient } from "@sanity/client";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { defineQuery } from "groq";

export const sanityProjectId = "sw2k0b84";
export const sanityDataset = "production";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2026-10-18",
  useCdn: true,
  perspective: "published",
});

const imageBuilder = imageUrlBuilder(sanityClient);

export function sanityImageUrl(source: SanityImageSource | null | undefined, width = 1800) {
  if (!source) return undefined;
  return imageBuilder.image(source).width(width).auto("format").fit("max").url();
}

export const homepageSettingsQuery = defineQuery(/* groq */ `
  *[_id == "homepageSettings" && _type == "siteSettings"][0] {
    heroImage { asset, hotspot, crop, alt },
    "showreelVideoUrl": showreelVideo.asset->url,
    showreelPoster { asset, hotspot, crop, alt }
  }
`);

export function normalizeVideoEmbedUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : undefined;
    }
    if (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/embed/")) return value;
      const id = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).at(-1);
      return id ? `https://www.youtube.com/embed/${id}` : undefined;
    }
    if (host === "player.vimeo.com" && url.pathname.startsWith("/video/")) return value;
    if (host === "vimeo.com" || host === "www.vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean).at(-1);
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : undefined;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export const portfolioProjectsQuery = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current)]
    | order(sortOrder asc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      category,
      medium,
      client,
      year,
      place,
      services,
      excerpt,
      story,
      featured,
      sortOrder,
      coverImage { asset, hotspot, crop, alt },
      gallery[] {
        _key,
        image { asset, hotspot, crop },
        altText,
        caption
      },
      videoEmbedUrl,
      "videoFileUrl": videoFile.asset->url,
      "videoPoster": videoPoster { asset, hotspot, crop }
    }
`);
