import { useQuery } from "@tanstack/react-query";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortfolioProjectsQueryResult } from "@/generated/sanity.types";
import { conceptImageNotice, projects as conceptProjects, type PortfolioGalleryImage, type PortfolioProject } from "@/data/portfolio";
import { normalizeVideoEmbedUrl, portfolioProjectsQuery, sanityClient, sanityImageUrl } from "@/lib/sanity";

type SanityProjectDocument = PortfolioProjectsQueryResult[number];

type SanityImageFields = {
  asset?: NonNullable<NonNullable<SanityProjectDocument["coverImage"]>["asset"]> | null;
  hotspot?: NonNullable<NonNullable<SanityProjectDocument["coverImage"]>["hotspot"]> | null;
  crop?: NonNullable<NonNullable<SanityProjectDocument["coverImage"]>["crop"]> | null;
} | null | undefined;

function asSanityImageSource(image: SanityImageFields): SanityImageSource | null {
  if (!image?.asset) return null;
  return {
    _type: "image",
    asset: image.asset,
    ...(image.hotspot ? { hotspot: image.hotspot } : {}),
    ...(image.crop ? { crop: image.crop } : {}),
  };
}

function mapProject(document: SanityProjectDocument): PortfolioProject {
  const coverUrl = sanityImageUrl(asSanityImageSource(document.coverImage), 2200);
  const gallery: PortfolioGalleryImage[] = (document.gallery ?? []).flatMap((item) => {
    const image = sanityImageUrl(asSanityImageSource(item.image), 1800);
    return image ? [{ key: item._key, image, alt: item.altText || `${document.title || "Project"} project photograph`, caption: item.caption || undefined }] : [];
  });

  return {
    slug: document.slug || document._id,
    title: document.title || "Untitled project",
    category: document.category || "Other",
    medium: document.medium || "Photo",
    client: document.client || "Independent",
    year: document.year || "—",
    place: document.place || "Kenya",
    services: document.services || [],
    image: coverUrl || conceptProjects[0].image,
    imageAlt: document.coverImage?.alt || `${document.title || "Project"} cover photograph`,
    excerpt: document.excerpt || "",
    story: document.story || "",
    featured: document.featured ?? false,
    gallery,
    videoEmbedUrl: normalizeVideoEmbedUrl(document.videoEmbedUrl || undefined),
    videoFileUrl: document.videoFileUrl || undefined,
    videoPoster: sanityImageUrl(asSanityImageSource(document.videoPoster), 1800),
    sortOrder: document.sortOrder ?? 100,
  };
}

export function usePortfolioProjects() {
  const query = useQuery({
    queryKey: ["sanity", "portfolio-projects", "published"],
    queryFn: async () => {
      const documents = await sanityClient.fetch<PortfolioProjectsQueryResult>(portfolioProjectsQuery);
      return documents.map(mapProject);
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  const hasPublishedProjects = Boolean(query.data?.length);
  const currentNotice = query.isError
    ? "Sanity could not be reached. Showing clearly labeled concept projects for now; refresh to try again."
    : conceptImageNotice;

  return {
    ...query,
    projects: hasPublishedProjects ? query.data! : conceptProjects,
    isUsingConceptFallback: !hasPublishedProjects,
    conceptImageNotice: currentNotice,
  };
}
