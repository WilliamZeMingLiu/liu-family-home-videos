// Accepts a bare 11-char ID or any common YouTube URL and returns the video ID.
export function extractYoutubeId(input) {
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return url.pathname.slice(1, 12);
    const v = url.searchParams.get("v");
    if (v) return v;
    const match = url.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/);
    if (match) return match[1];
  } catch {
    // not a URL; fall through
  }
  console.warn(`Could not read a YouTube ID from "${input}"`);
  return value;
}

export const thumbUrl = (youtubeId) =>
  `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

export const embedUrl = (youtubeId) =>
  `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;

export function formatDate(iso, locale) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
