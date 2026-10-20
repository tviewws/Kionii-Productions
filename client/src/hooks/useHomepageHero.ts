import { useQuery } from "@tanstack/react-query";
import type { SanityImageSource } from "@sanity/image-url";
import { heroImage } from "@/data/portfolio";
import { homepageSettingsQuery, sanityClient, sanityImageUrl } from "@/lib/sanity";

const conceptHeroAlt = "Concept image: a fashion subject in warm dusk light";

export function useHomepageHero() {
  const query = useQuery({
    queryKey: ["sanity", "homepage-settings", "published"],
    queryFn: () => sanityClient.fetch(homepageSettingsQuery),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  const settingsImage = query.data?.heroImage;
  const imageUrl = sanityImageUrl(
    (settingsImage || null) as SanityImageSource | null,
    2400,
  );
  const hasPublishedHero = Boolean(imageUrl);
  const showreelPoster = sanityImageUrl(
    (query.data?.showreelPoster || null) as SanityImageSource | null,
    1800,
  );

  return {
    image: imageUrl ?? heroImage,
    alt: hasPublishedHero
      ? settingsImage?.alt?.trim() || "Homepage hero image for Kionii Productions"
      : conceptHeroAlt,
    isUsingConceptFallback: !hasPublishedHero,
    showreelVideoUrl: query.data?.showreelVideoUrl ?? undefined,
    showreelPoster,
    isError: query.isError,
  };
}
