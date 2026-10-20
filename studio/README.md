# Kionii Productions CMS

The portfolio reads **published** `project` documents and the published `homepageSettings` singleton from Sanity project `sw2k0b84`, dataset `production`. The standalone Studio in this folder is the source of truth for the content schemas. The website client is public/read-only; it contains no Sanity write token.

## Start the Studio locally (for development)

From the repository root, install dependencies if needed and launch the Studio:

```sh
pnpm install
pnpm studio:dev
```

Open the local Studio URL printed by the command (normally `http://localhost:3333`) and sign in with the Sanity account that has access to project `sw2k0b84`. The hosted Studio is at <https://kionii-productions.sanity.studio/>; ordinary content edits can be made there without running localhost.

## Update the homepage hero image or showreel

After the updated Studio schema has been deployed, open the hosted Studio and sign in. Select the single **Homepage Settings** entry in the left navigation. Click **Create** if the settings document has not been created yet.

For the opening photograph, upload the image under **Homepage hero image**, use the crop/hotspot controls, and enter the required alternative text.

For the showreel, upload the video under **Homepage showreel video**. Use a compressed **MP4 with H.264 encoding** (WebM is also accepted); do not upload an uncompressed camera master. A normal Sanity file asset is delivered as the original upload, not converted into adaptive-quality streams. Visitors will choose when to play it, so it will not autoplay. Optionally upload a **Showreel poster image** and enter its required alternative text; that image appears before playback begins. If no poster is provided, the website uses the existing concept image as the player poster. This one published showreel appears in the feature section on both the homepage and the Films page.

Click **Publish** on Homepage Settings after making either change. Draft edits do not appear on the public website. Open or refresh the Kionii homepage or Films page; Sanity's CDN and the site's short query cache may take a brief moment to update. The published showreel replaces the placeholder on both pages. It is independent of the top hero image and project-specific video/gallery fields. If no showreel has been published, each page retains its labeled concept placeholder.

For future changes, replace the file or image in **Homepage Settings** and publish again. Normal content updates do not require a Studio redeploy or website code change.

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

The website refreshes published data on focus/reconnect and after its short query cache expires. Sanity's CDN can add a brief delay after publishing. The homepage hero uses the published **Homepage Settings** image when present; until then, it keeps the clearly labeled concept image. The homepage and Films page showreel areas use the same published **Homepage showreel video** and optional poster; before one is published, each existing concept placeholder remains. If no published projects exist, the design-only concept project examples remain as a clearly labeled fallback. If Sanity cannot be reached, the site identifies that state instead of presenting the demo projects as real work. A project's uploaded video appears on that project's detail page and as a film project in the Films list.

## Redeploy the Studio after a schema change

The Homepage Settings fields must be included in the hosted Studio before they can be edited there. From the repository root after obtaining the updated project files, run:

```sh
pnpm install
pnpm studio:check
pnpm studio:build
pnpm studio:deploy
```

Sign in to Sanity from the same local terminal if prompted, using the account that owns project `sw2k0b84`. The CLI configuration is already bound to project `sw2k0b84`, dataset `production`, and the existing Studio app. When the command completes, reload <https://kionii-productions.sanity.studio/> and confirm **Homepage Settings** contains the hero and showreel fields.

`schemaTypes/` and `structure.ts` are the source of truth for the Studio fields/navigation. Studio deployment publishes the editor UI and schema configuration; it does not publish the website. Publishing a Homepage Settings document is the separate action that changes the homepage media.

The Preview website CORS origin is already allowed without credentials, as are `http://localhost:3000` and the local Studio origin `http://localhost:3333`. Add the final production website origin to the project's Sanity CORS settings when that domain is known, with credentials disabled for the public read-only website.
