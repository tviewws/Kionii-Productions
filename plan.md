# Kionii Productions — implementation plan

## Scope

Build the public photographer/videographer portfolio based on the attached design directions, retaining its chic dark editorial style, supplied three-color logo, responsive navigation, continuous filter-free Work index, Films, About, Contact, and reusable project-detail routes. The Contact page is a focused “FIND ME HERE” experience with email, phone, and Instagram links only.

The Sanity Studio in `studio/` connects to the user's existing project `sw2k0b84` and `production` dataset. Work items are `project` documents. A dedicated singleton `Homepage Settings` document holds the homepage hero photograph, the homepage showreel video file, and optional showreel poster. Published homepage settings supply those assets to the website; until a showreel file is published, keep the existing clearly labeled concept showreel fallback. The project gallery and project-specific videos remain independent.

## Implementation approach

Keep the initialized React, TypeScript, Vite, Wouter and Express site. The public site uses a read-only Sanity client with the public project ID and dataset; never include a write token in browser code. The Preview origin and localhost development origins are allowed in Sanity CORS with credentials disabled for the website. Add the live origin only once known. Use the existing dated API version and published perspective. Query only fields needed by the pages, map Sanity documents to the existing shapes with TypeGen types, and preserve explicit placeholder content only as a fallback.

Define `project` fields for title, slug, category, medium, client, year, location, services, excerpt, story, cover image with hotspot/alt text, gallery images with caption/alt text and array order, featured status, display order, and optional video URL/file. Define `siteSettings` for a required `heroImage` with hotspot and required alternative text, an optional `showreelVideo` accepting MP4/WebM, and optional `showreelPoster` with crop/hotspot and alternative text. Register the fixed singleton ID (`homepageSettings`) in Studio configuration and put it at the top of a custom Studio navigation, filtering it from generic document lists. Query the published singleton. Display the same showreel file in responsive native HTML video players on both Home and Films, with controls, inline playback and no autoplay; use the optional poster, or the current concept image if no poster was selected. Without a published showreel file, retain the labeled placeholder and presentation interaction on each page.

A regular Sanity file asset serves the uploaded original and does not provide adaptive bitrate transcoding. Recommend a compressed H.264 MP4 (or supported WebM) rather than a camera master; visitors start playback manually. For longer/high-resolution content needing adaptive quality or streaming analytics, use a dedicated streaming service. The local Studio gives the owner Sanity's upload and edit interface. A project's optional video is displayed on its detail page; it remains separate from the homepage showreel setting.

## Routes and data flow

Routes remain `/`, `/work`, `/films`, `/about`, `/contact`, and `/work/:slug`; keep `client/public/manus-routes.json` synchronized. On route changes between pages, reset scroll to the top so each new page opens at its beginning; preserve native same-page anchor navigation. `/work` queries all published projects sorted by CMS display order and renders the continuous sequence without filters. Project cards link by Sanity slug to detail pages. Featured projects feed homepage selected work; film projects feed the Films index. Home and Films query the same published `homepageSettings` singleton and display its showreel file independently of project-specific videos. Gallery and hero images use a Sanity image URL builder for sized, cropped delivery. Showreel video loads from the published Sanity asset only when a visitor starts playback. Keep accessible overlays and current contact links.

## Design direction

- **Design Movement:** Contemporary African editorial photography presented with the restraint of a luxury art-book portfolio.
- **Core Principles:** Image-first composition; warm, human storytelling; confident negative space; tactile but quiet interface details.
- **Color Philosophy:** Keep the near-black ground and cinematic depth from the reference, soften text to warm ivory, and use restrained aged brass/soft ochre as a signature accent. The user-supplied teal, amber and rust emblem provides the brand's concentrated color moment; let the photography carry the rest.
- **Layout Paradigm:** Editorial, asymmetrical compositions with full-bleed moments, staggered image proportions, oversized headlines and generous quiet intervals; avoid a uniform card grid.
- **Signature Elements:** The three horizontal brand colors, small tracked metadata labels, a fine brass hairline/rule, and an italic serif accent phrase.
- **Interaction Philosophy:** Keep global site navigation distinct from the Work page's uninterrupted scrolling experience; project cards and transitions should feel measured and tactile, with keyboard-accessible controls.
- **Animation:** Gentle opacity/vertical reveals and image hover drift only; short transitions, no parallax dependency; respect reduced-motion preferences.
- **Typography System:** High-contrast editorial serif for display and project titles, an elegant italic serif for selected accents, and a clean restrained sans-serif for navigation, metadata and body copy. Use local/system fallbacks if remote fonts cannot load.
- **Brand Essence:** A Kenya-based image-maker shaping vivid, intimate stories for brands, artists and couples; expressive, thoughtful, assured.
- **Brand Voice:** Direct and image-led, never generic. Example lines: “Bold colour. Real faces. Moving pictures.” and “For the moments that stay with you.”
- **Wordmark & Logo:** Use the supplied three-stripe emblem as a compact mark to the left of the KIONII wordmark, with PRODUCTIONS beneath it. Maintain a generous gap and transparent crop so it remains distinct against the dark site background.
- **Signature Brand Color:** Muted warm brass/ochre, used sparingly against charcoal and ivory, complemented by the teal/amber/rust logo stripes.

## Project structure

- `client/src/App.tsx` — existing route map and global providers.
- `client/src/pages/` — existing home, work, films, about, contact and project-detail pages.
- `client/src/components/portfolio/` — shared site shell, project cards and accessible media viewer.
- `client/src/data/portfolio.ts` — contact details and explicit concept fallbacks.
- `client/src/lib/sanity.ts` — browser-safe read-only client, GROQ queries, image URL and video embed helpers.
- `client/src/hooks/usePortfolioProjects.ts` — typed Sanity project mapping and shared project query hook.
- `client/src/hooks/useHomepageHero.ts` — typed published homepage settings query and hero/showreel asset mapping.
- `client/src/generated/sanity.types.ts` — Sanity TypeGen output for schemas and GROQ queries.
- `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/schemaTypes/` — standalone Studio setup and project/gallery/settings schemas.
- `studio/structure.ts` — Homepage Settings singleton and Studio navigation.
- `studio/README.md` — local Studio launch, project entry, hero image, showreel, media and publishing instructions.
- `client/src/index.css` — existing dark editorial tokens, typography, responsive layout, focus and reduced-motion rules, plus media presentation.
- `client/public/kionii-logo-mark.png`, `client/public/kionii-logo-full.png`, and `client/public/manus-routes.json` — existing brand assets and route manifest.
- Existing `server/` and `drizzle/` — no application CRUD or write-token endpoint is needed for public read-only content.

## Material constraints

The production Sanity dataset has a published project named **BTB FESTIVAL**; a read-only API check returned it to the portfolio query. The hosted Studio is deployed at `https://kionii-productions.sanity.studio/`. The new Homepage Settings fields and frontend connection must be committed and then the Studio deployed from the user's signed-in local project before they appear in the hosted editor. The exact Preview origin is CORS-allowed, and localhost website and Studio origins are allowed; the public browser read uses no credentials. Add the live website domain to Sanity CORS when known. The concept hero and showreel remain visible until the owner publishes replacements. Standard Sanity file assets do not transcode uploaded showreel video to adaptive streams; direct playback should use an optimized file and user-initiated controls. Do not publish the website unless asked.
