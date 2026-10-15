# Liu Family Home Videos

A lightweight, YouTube-style page for family home videos. It is a static React app (Vite) with no backend. Videos are hosted on YouTube as **Unlisted** and listed in one file.

- **Sections:** videos are grouped into sections, with tabs in the top bar.
- **Memories for you:** a row of random videos at the top, with a Shuffle button. A video opened from this row starts a random run: → plays the rest of the row, then a new random video each time, never one already seen; ← goes back through what was watched.
- **Popup player:** each video plays in a popup and has its own shareable link. Previous/next arrows and the ← → keys move between videos.
- **Languages:** English, 简体中文 and 繁體中文.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static site in dist/
npm run preview   # serve the built dist/ locally
```

Requires Node 20.19+ or 22.12+.

## Add a video

1. Upload it to YouTube and set visibility to **Unlisted**. Don't use **Private**, because private videos won't play in an embed for anyone but you.
2. Run `npm run new-id` to get a fresh 6-character id, for example `k3x9qa`.
3. Add an entry to `src/videos.js`:

   ```js
   { id: "k3x9qa", youtube: "https://youtu.be/XXXXXXXXXXX", title: "Beach Day", category: "family-trips" },
   ```

   `youtube` accepts a bare video ID or any YouTube link. To add or rename a section, edit `categories` in the same file.

   While `npm run dev` is running, mistakes in `videos.js` appear as errors in the browser console. That covers duplicate ids, unknown sections and unreadable YouTube links.

   To translate a title or a section name, give it a version per language instead of a single string. Any language you leave out falls back to English:

   ```js
   title: { en: "Beach Day", hans: "海滩日", hant: "海灘日" },
   ```

Each video gets a shareable link of the form `https://your-site/?v=k3x9qa`. The popup's 🔗 Copy link button copies it with the sender's language added (see Languages). Opening it shows the page with that video already playing. Don't change an id once you've shared it, or the old link stops working.

## Keeping in sync with YouTube playlists

Each section in `src/videos.js` records the YouTube playlist it came from. After adding videos to a playlist on YouTube, run:

```bash
YT_API_KEY=<your YouTube Data API key> npm run sync
```

It prints a ready-to-paste entry, with a fresh id, for every playlist video that isn't in `videos.js` yet. It also flags any listed video that has been removed from its playlist. The key is only used on your machine and never ends up in the website.

The site itself never calls the YouTube API. Every video is listed in `videos.js`, so the page loads instantly, can't hit API quotas, and each video keeps a permanent `?v=` link.

## Languages

The toggle in the top bar switches between English (EN), Simplified Chinese (简) and Traditional Chinese (繁). The language is chosen in this order:

1. **The link's `?lang=`, if it has one.** The popup's 🔗 Copy link button adds it (`…/?v=k3x9qa&lang=hans`), so a shared video opens in the sender's language. The site saves it as the visitor's language and then removes it from the address bar. A link copied from the address bar has no `lang`, so the recipient sees their own language.
2. **This browser's saved language:** the last one picked on the toggle or opened from a link.
3. **English,** when neither is present.

All the interface text lives in `src/i18n.js`. Search matches a title in any language.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Push this folder to a GitHub repo.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`, or run the workflow from the **Actions** tab. The site appears at `https://<user>.github.io/<repo>/`.

The workflow uses only GitHub's official actions, pinned to exact commits. It stops the deploy if a dependency has a known high-severity vulnerability. Links use a `?v=` query parameter and `vite.config.js` uses `base: "./"`, so the site works under the `/<repo>/` subpath with no extra setup.

## Performance

- **Minified and tree-shaken:** `npm run build` does both, removing unused code. The JavaScript is about 55 KB gzipped, mostly React, and the CSS is about 2 KB.
- **No web fonts, no images to host:** the site uses system fonts, and thumbnails come straight from YouTube's image servers.
- **Thumbnails load up front:** all of them (about 1 MB) download when the page opens, first row first, so fast scrolling never shows empty boxes.
- **Fewer re-renders:** opening or switching videos doesn't re-render the grid.
- **Measured** on a simulated phone (4x slower CPU, 4G): content appears in about 0.6 s with no layout shift. Lighthouse scores 100 for Accessibility and Best Practices.

## Security

- **No secrets in the site.** The website never calls the YouTube API and contains no API keys. The only key is the one you pass to `npm run sync` on your own machine. `.env` files are git-ignored in case you keep it in one.
- **Locked down in the browser.** The built site carries a Content Security Policy that only lets it load its own files, YouTube thumbnails (`i.ytimg.com`) and the privacy-enhanced YouTube player (`youtube-nocookie.com`). If you ever embed something else, add its domain in `vite.config.js`.
- **Before publishing to GitHub**, check that no `.env` file or key was committed: `git grep -n AIza`.

## Privacy note

The YouTube IDs ship in the site's JavaScript, so anyone who can open the site can find every video link. That is the same tradeoff as a hardcoded-links site. `index.html` sets `noindex` so search engines skip the page.
