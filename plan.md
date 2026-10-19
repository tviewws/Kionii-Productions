# Kionii Productions — implementation plan

## Scope

Build the public photographer/videographer portfolio based on the attached design directions, retaining its chic dark editorial style, supplied three-color logo, responsive navigation, continuous filter-free Work index, Films, About, Contact, and reusable project-detail routes. The Contact page is a focused “FIND ME HERE” experience with email, phone, and Instagram links only.

Add a local Sanity Studio in `studio/`, connected to the user's existing Sanity project `sw2k0b84` and `production` dataset. Each work item is one `project` document. When a project is published, it joins the Work index automatically and uses the existing card and detail-page components; changes to its fields and gallery flow through to the site, while unpublishing removes it from public results. Keep all content in the established editorial presentation; no visual design controls are exposed in the CMS.

## Implementation approach

Keep the initialized React, TypeScript, Vite, Wouter and Express site. The public site uses a read-only Sanity client with the public project ID and dataset; never include a write token in browser code. The Preview origin and localhost development origins are allowed in Sanity CORS with credentials disabled for the website. Add the live origin only once known. Use a dated API version and published perspective. Query only the fields needed by the pages, map Sanity documents to the existing `PortfolioProject` shape with Sanity TypeGen types, and preserve explicit placeholder content only as an empty-dataset fallback until the owner publishes her real work.

Define `project` fields for title, slug, category, medium, client, year, location, services, excerpt, story, cover image with hotspot/alt text, gallery images with caption/alt text and array order, featured status, display order, and optional video URL/file. The local Studio gives the owner Sanity's upload and edit interface. Use Sanity `image` fields for photos and a `file` field or external video URL for video, with helper text explaining that larger films should use a streaming host. The site's Work, project-detail and Films-list views consume published project documents while keeping the existing layouts and interactions. A project's optional video is displayed on its detail page; the global home/Films showreel cards remain separate presentation placeholders until explicitly modeled.

## Routes and data flow

Routes remain `/`, `/work`, `/films`, `/about`, `/contact`, and `/work/:slug`; keep `client/public/manus-routes.json` synchronized. `/work` queries all published projects sorted by the CMS display order and renders the complete continuous sequence without filters. Project cards link by Sanity slug to reusable detail pages. Featured projects feed the homepage selection; film projects feed the Films index. Gallery images use a Sanity image URL builder for sized, cropped delivery. Keep accessible overlays and current contact links.

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
- `client/src/pages/` — existing home, work, films, about, contact and project-detail pages, updated to consume published content where relevant.
- `client/src/components/portfolio/` — shared site shell, project cards and accessible media viewer.
- `client/src/data/portfolio.ts` — contact details and only the explicit empty-dataset presentation fallback.
- `client/src/lib/sanity.ts` — browser-safe read-only client, GROQ query, image URL and video embed helpers.
- `client/src/hooks/usePortfolioProjects.ts` — typed Sanity document mapping and shared project query hook.
- `client/src/generated/sanity.types.ts` — Sanity TypeGen output for schema and GROQ query.
- `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/schemaTypes/` — standalone local Studio configuration and project/gallery schemas.
- `studio/README.md` — local Studio launch, project entry, media and publishing instructions.
- `client/src/index.css` — existing dark editorial tokens, typography, responsive layout, focus and reduced-motion rules, plus project media presentation.
- `client/public/kionii-logo-mark.png`, `client/public/kionii-logo-full.png`, and `client/public/manus-routes.json` — existing brand assets and route manifest.
- Existing `server/` and `drizzle/` — no new application CRUD or write-token endpoint is needed for public read-only content.

## Material constraints

The existing public `production` dataset is selected and currently has no project documents. The exact Preview origin is CORS-allowed, and localhost website and Studio origins are allowed; the browser-only public read uses no credentials. A public live domain is not yet known. The design-only concept entries remain a clearly disclosed fallback until the first published Sanity project appears. Sanity fetch failures display a separate fallback notice; direct project pages show a retry state rather than a false not-found result. The Studio schema and local app build successfully, but CLI account authentication did not complete in this sandbox; consequently, no hosted Studio deployment or remote schema deployment was made. The user can sign into the local Studio with the account that owns the project. Content Lake file assets can hold video files, but this integration does not transcode them for adaptive streaming; use Vimeo, YouTube, Mux or another streaming host for long-form video. Do not publish the website unless asked.
