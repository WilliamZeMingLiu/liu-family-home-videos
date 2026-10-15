// The address bar carries ?v=<video id>. Shared links also carry ?lang=<language>,
// which the site reads on arrival and then removes to keep the address clean.

export const LANG_PARAM = "lang";

export const getParam = (name) =>
  new URLSearchParams(window.location.search).get(name);

// Current path with the given parameters set (or removed when null).
export function urlWith(changes) {
  const params = new URLSearchParams(window.location.search);
  for (const [name, value] of Object.entries(changes)) {
    if (value == null) params.delete(name);
    else params.set(name, value);
  }
  const query = params.toString();
  return window.location.pathname + (query ? `?${query}` : "");
}

// Link to one video that opens in the given language, for the Share button.
export function shareLink(videoId, lang) {
  const url = new URL(window.location.pathname, window.location.origin);
  url.searchParams.set("v", videoId);
  url.searchParams.set(LANG_PARAM, lang);
  return url.toString();
}
