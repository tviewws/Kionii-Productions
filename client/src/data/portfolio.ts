export type PortfolioMedium = "Photo" | "Film" | "Photo + Film";

export type PortfolioGalleryImage = {
  key: string;
  image: string;
  alt: string;
  caption?: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  medium: PortfolioMedium;
  client: string;
  year: string;
  place: string;
  services: string[];
  image: string;
  imageAlt?: string;
  excerpt: string;
  story: string;
  featured?: boolean;
  gallery?: PortfolioGalleryImage[];
  videoEmbedUrl?: string;
  videoFileUrl?: string;
  videoPoster?: string;
  sortOrder?: number;
};

export const projects: PortfolioProject[] = [
  {
    slug: "a-study-in-colour",
    title: "A study in colour",
    category: "Fashion",
    medium: "Photo",
    client: "Visual study",
    year: "2025",
    place: "Nairobi, Kenya",
    services: ["Photography", "Art direction"],
    image: "/manus-storage/async-images/LJKNAnNAb88i2M5zldPySK/image-2.webp",
    excerpt: "An exploration of colour, movement and modern East African style.",
    story: "A visual concept built around generous colour and a single, striking silhouette. This sample story is a placeholder for the photographer's own words about the brief, the people involved and the making of the final images.",
    featured: true,
  },
  {
    slug: "the-quiet-vow",
    title: "The quiet vow",
    category: "Weddings",
    medium: "Film",
    client: "Visual study",
    year: "2025",
    place: "Kenya",
    services: ["Wedding film", "Photography"],
    image: "/manus-storage/async-images/LJKNAnNAb88i2M5zldPySK/image-3.webp",
    excerpt: "A tender, unhurried portrait of two people and the place they chose.",
    story: "This fictional film concept leans into the pauses between the big moments: wind through the trees, a held hand, the light shifting at the end of the day. Replace this placeholder with the couple's approved story and real film link.",
    featured: true,
  },
  {
    slug: "soft-light-studies",
    title: "Soft light studies",
    category: "Portraits",
    medium: "Photo",
    client: "Personal study",
    year: "2024",
    place: "Nairobi, Kenya",
    services: ["Portraiture", "Creative direction"],
    image: "/manus-storage/async-images/LJKNAnNAb88i2M5zldPySK/image-4.webp",
    excerpt: "An intimate portrait session shaped by shadow and stillness.",
    story: "A quiet portrait concept focused on presence, not performance. The words here are sample copy only and are designed to show how a short editorial project note can sit alongside a full-frame image gallery.",
  },
  {
    slug: "made-of-earth-and-light",
    title: "Made of earth & light",
    category: "Brands",
    medium: "Film",
    client: "Visual study",
    year: "2024",
    place: "East Africa",
    services: ["Brand film", "Product photography"],
    image: "/manus-storage/async-images/LJKNAnNAb88i2M5zldPySK/image-5.webp",
    excerpt: "A tactile brand story told through material, colour and considered detail.",
    story: "A concept for an artisanal product story, using light and texture to suggest care and provenance. Replace the sample name, copy, credits, stills and film embed with a real commissioned project before launch.",
  },
];

export const categories = ["All", "Fashion", "Portraits", "Events", "Weddings", "Brands"] as const;
export const mediaTypes = ["All", "Photo", "Film"] as const;

export const conceptImageNotice = "Concept imagery and sample project copy — replace with Kionii's own selected work before launch.";
export const contactEmail = "lilykionilk@gmail.com";
export const contactPhone = "+254 703 911 571";
export function gmailComposeUrl(subject = "", body = "") {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: contactEmail });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
export const socialLinks = [
  { label: "@kionii.productions", href: "https://www.instagram.com/kionii.productions/" },
];

export const heroImage = "/manus-storage/async-images/LJKNAnNAb88i2M5zldPySK/image-1.webp";
