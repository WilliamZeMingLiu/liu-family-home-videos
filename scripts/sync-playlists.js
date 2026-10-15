// Compares each category's YouTube playlist with src/videos.js and prints
// ready-to-paste entries for videos that are missing from the file.
//
//   YT_API_KEY=<your key> npm run sync
//
// The key stays on your machine; it is never part of the website.
import { randomInt } from "node:crypto";
import { categories, videos } from "../src/videos.js";
import { extractYoutubeId } from "../src/lib/youtube.js";

const key = process.env.YT_API_KEY;
if (!key) {
  console.error("Set YT_API_KEY first, e.g.  YT_API_KEY=AIza... npm run sync");
  process.exit(1);
}

async function playlistItems(playlistId) {
  const items = [];
  let pageToken = "";
  do {
    const url =
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status&maxResults=50" +
      `&playlistId=${playlistId}&key=${key}&pageToken=${pageToken}`;
    const res = await fetch(url);
    const body = await res.json();
    if (!res.ok) throw new Error(`${playlistId}: ${body.error?.message ?? res.status}`);
    items.push(...body.items);
    pageToken = body.nextPageToken ?? "";
  } while (pageToken);
  return items;
}

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
const usedIds = new Set(videos.map((v) => v.id));
function newId() {
  let id;
  do {
    id = Array.from({ length: 6 }, () => ALPHABET[randomInt(36)]).join("");
  } while (usedIds.has(id));
  usedIds.add(id);
  return id;
}

const known = new Set(videos.map((v) => extractYoutubeId(v.youtube)));
let missingCount = 0;

for (const category of categories.filter((c) => c.playlist)) {
  const items = await playlistItems(category.playlist);
  const inPlaylist = new Set(items.map((i) => i.snippet.resourceId.videoId));

  const missing = items.filter(
    (i) =>
      !known.has(i.snippet.resourceId.videoId) &&
      i.status?.privacyStatus !== "private",
  );
  const removed = videos.filter(
    (v) =>
      v.category === category.slug &&
      !inPlaylist.has(extractYoutubeId(v.youtube)),
  );

  console.log(`\n// ${category.slug}: ${items.length} in playlist`);
  for (const i of missing) {
    const entry = {
      id: newId(),
      youtube: i.snippet.resourceId.videoId,
      title: i.snippet.title,
      category: category.slug,
    };
    console.log(
      `  { id: "${entry.id}", youtube: "${entry.youtube}", title: ${JSON.stringify(entry.title)}, category: "${entry.category}" },`,
    );
  }
  missingCount += missing.length;
  for (const v of removed) {
    console.log(`  // no longer in the playlist: ${v.id} (${v.youtube})`);
  }
}

console.log(
  missingCount
    ? `\n${missingCount} new video(s) above. Paste them into src/videos.js.`
    : "\nEverything is up to date.",
);
