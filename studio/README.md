# Kionii Productions CMS

The portfolio reads **published** `project` documents from Sanity project `sw2k0b84`, dataset `production`. The standalone Studio in this folder uses the same local schema. The website client is public/read-only; it contains no Sanity write token.

## Start the Studio

From the repository root, install dependencies if needed and launch the Studio:

```sh
pnpm install
pnpm studio:dev
```

Open the local Studio URL printed by the command (normally `http://localhost:3333`) and sign in with the Sanity account that has access to project `sw2k0b84`. If the first browser authorization tab closes or no account is available, do not share passwords in chat; sign in directly in the browser and retry from your local terminal.

## Add a project

1. Choose **Project** in the Studio and create a document.
2. Enter the title and generate the URL slug. Choose a category and medium, then add the client/subject, year, location, services, short introduction and project story.
3. Upload a **Cover image** and write its required alternative text.
4. Add images to **Project photo gallery**. Each item needs alternative text; captions are optional. Drag gallery items into the order you want them displayed. Remove an item from the array to remove that photo from the published page.
5. For film work, either upload a short MP4/WebM under **Short video file** or paste a YouTube/Vimeo share or player URL under **Film embed URL**. Long films should use a streaming host. A poster image is optional.
6. Turn on **Feature on the homepage** when appropriate. Set **Website order** (lower numbers appear earlier; ties are broken by newest first).
7. **Publish** the document.

## What changes on the website

Every published project is added to the continuously scrollable **Work** index automatically and follows the existing project-card design. Opening its card displays its detail page with the cover, story, photo gallery and optional video. Film and Photo + Film projects also appear in **Films**; featured projects can appear in the homepage's selected-work section. Changes to a published document flow through the same query. Unpublishing a project removes it from the public query; use Sanity's unpublish action to retain an editable draft, or delete only when you intend permanent removal.

The website refreshes published data on focus/reconnect and after its short query cache expires. Sanity's CDN can add a brief delay after publishing. If the production dataset contains no published projects, the design-only concept examples remain as a clearly labeled fallback; the first published project replaces that fallback. If Sanity cannot be reached, the site identifies that state instead of presenting the demo projects as real work. The large homepage showreel and the Films-page showreel card are still separate design placeholders; a project's uploaded video appears on that project's detail page and as a film project in the Films list.

## Local schema and deployment

`schemaTypes/` is the source of truth for the Studio fields. The preview website CORS origin is already allowed without credentials, as are `http://localhost:3000` and the local Studio origin `http://localhost:3333`. Add the final production website origin to the project's Sanity CORS settings when that domain is known, with credentials disabled for the public read-only website.

To build or deploy the Studio later, run these commands from `studio/` after signing in locally:

```sh
pnpm build
pnpm exec sanity deploy
```

Schema deployment is only needed if you want Sanity's hosted schema/MCP tooling to use these local type definitions; the Studio itself reads the checked-in schema files directly.
