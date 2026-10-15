import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categories, videos as rawVideos } from "./videos.js";
import { extractYoutubeId } from "./lib/youtube.js";
import { getParam, shareLink, urlWith } from "./lib/url.js";
import {
  LANGUAGES,
  STRINGS,
  allTranslations,
  localize,
  useLanguage,
} from "./i18n.js";
import NavBar from "./components/NavBar.jsx";
import Section from "./components/Section.jsx";
import VideoModal from "./components/VideoModal.jsx";
import Suggestion, { SUGGESTION_SLUG } from "./components/Suggestion.jsx";
import {
  currentId,
  previousId,
  startRandomRun,
  stepBack,
  stepForward,
} from "./lib/randomRun.js";

// Shown in the order listed in videos.js.
const videos = rawVideos.map((v) => ({
  ...v,
  youtubeId: extractYoutubeId(v.youtube),
}));

const videosById = new Map(videos.map((v) => [v.id, v]));
const allIds = videos.map((v) => v.id);
const categoriesBySlug = new Map(categories.map((c) => [c.slug, c]));

// Catch mistakes in videos.js while editing; this block is dropped from the production build.
if (import.meta.env.DEV) {
  const seen = new Set();
  for (const v of videos) {
    if (!/^[a-z0-9]{6}$/.test(v.id)) console.error(`videos.js: bad id "${v.id}"`);
    if (seen.has(v.id)) console.error(`videos.js: duplicate id "${v.id}"`);
    seen.add(v.id);
    if (!categoriesBySlug.has(v.category))
      console.error(`videos.js: "${v.id}" has unknown category "${v.category}"`);
    if (!/^[\w-]{11}$/.test(v.youtubeId))
      console.error(`videos.js: "${v.id}" has an unreadable YouTube link`);
    const missing = LANGUAGES.filter(
      (l) => typeof v.title !== "string" && !v.title[l.code],
    );
    if (missing.length)
      console.warn(`videos.js: "${v.id}" title falls back to English for ${missing.map((l) => l.code)}`);
  }
}

// Enough for the widest row (4 columns = the panel + 3 videos); narrower rows show fewer.
const SUGGESTION_COUNT = 3;
// Remembered so the next visit suggests different videos.
const LAST_SUGGESTED_KEY = "lastSuggested";

function pickRandomVideos(excludeIds) {
  const exclude = new Set(excludeIds);
  const pool = videos.filter((v) => !exclude.has(v.id));
  // Partial Fisher–Yates shuffle: only the first few positions are needed.
  for (let i = 0; i < SUGGESTION_COUNT && i < pool.length; i++) {
    const j = i + Math.floor(Math.random() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, SUGGESTION_COUNT).map((v) => v.id);
}

function initialSuggestions() {
  let last = [];
  try {
    last = JSON.parse(localStorage.getItem(LAST_SUGGESTED_KEY)) ?? [];
  } catch {
    // storage unavailable or unreadable; any pick is fine
  }
  return pickRandomVideos(Array.isArray(last) ? last : []);
}

const categoryName = (slug, lang) =>
  localize(categoriesBySlug.get(slug).name, lang);

const readVideoParam = () => getParam("v");
const pathWithoutVideo = () => urlWith({ v: null });

export default function App() {
  const [activeId, setActiveId] = useState(readVideoParam);
  const [query, setQuery] = useState("");
  const [lang, setLang] = useLanguage();
  const t = STRINGS[lang];
  const [suggestedIds, setSuggestedIds] = useState(initialSuggestions);
  // True when the modal was opened by a click on this page (so closing can use history.back()).
  const [openedHere, setOpenedHere] = useState(false);
  const closingRef = useRef(false);
  const closeFallbackRef = useRef(null);
  // Set while browsing from the Memories row; null means arrows follow page order.
  const [randomRun, setRandomRun] = useState(null);

  const activeVideo = activeId ? videosById.get(activeId) : undefined;

  // Unknown ?v= value: drop it from the URL and show the grid.
  useEffect(() => {
    if (activeId && !activeVideo) {
      window.history.replaceState({}, "", pathWithoutVideo());
      setActiveId(null);
    }
  }, [activeId, activeVideo]);

  useEffect(() => {
    try {
      localStorage.setItem(LAST_SUGGESTED_KEY, JSON.stringify(suggestedIds));
    } catch {
      // not persisted; only affects the next visit's picks
    }
  }, [suggestedIds]);

  const shuffleSuggestions = useCallback(
    () => setSuggestedIds((current) => pickRandomVideos(current)),
    [],
  );
  const suggestedVideos = useMemo(
    () => suggestedIds.map((id) => videosById.get(id)),
    [suggestedIds],
  );
  const sectionNameOf = useCallback(
    (video) => categoryName(video.category, lang),
    [lang],
  );

  useEffect(() => {
    const onPopState = () => {
      clearTimeout(closeFallbackRef.current);
      closingRef.current = false;
      setActiveId(readVideoParam());
      setOpenedHere(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = activeVideo
      ? `${localize(activeVideo.title, lang)} · ${t.siteTitle}`
      : t.siteTitle;
  }, [activeVideo, lang, t]);

  const openVideo = useCallback((id) => {
    // A newer open wins over a close still waiting on its fallback.
    clearTimeout(closeFallbackRef.current);
    closingRef.current = false;
    window.history.pushState({}, "", urlWith({ v: id }));
    setActiveId(id);
    setOpenedHere(true);
    setRandomRun(null);
  }, []);

  // Opening from the Memories row starts a random run instead of page-order browsing.
  const openSuggested = useCallback(
    (id) => {
      openVideo(id);
      setRandomRun(startRandomRun(id, suggestedIds, allIds));
    },
    [openVideo, suggestedIds],
  );

  const closeVideo = useCallback(() => {
    // A second history.back() before the first lands would take the visitor off the site.
    if (closingRef.current) return;
    if (openedHere) {
      closingRef.current = true;
      window.history.back(); // popstate clears activeId
      // Fallback in case the back step never reaches this page.
      closeFallbackRef.current = setTimeout(() => {
        closingRef.current = false;
        window.history.replaceState({}, "", pathWithoutVideo());
        setActiveId(null);
      }, 500);
    } else {
      window.history.pushState({}, "", pathWithoutVideo());
      setActiveId(null);
    }
  }, [openedHere]);

  // Search matches a title in any language, whichever one is showing.
  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (v) =>
      !q || allTranslations(v.title).some((s) => s.toLowerCase().includes(q));
    return categories.map((category) => ({
      slug: category.slug,
      name: localize(category.name, lang),
      videos: videos.filter((v) => v.category === category.slug && matches(v)),
    }));
  }, [query, lang]);

  const visibleSections = useMemo(
    () => sections.filter((s) => s.videos.length > 0),
    [sections],
  );
  const showSuggestion = !query.trim();
  // Navbar tabs: "Memories for you" first, then the categories.
  const navTabs = useMemo(
    () => [{ slug: SUGGESTION_SLUG, name: t.suggestion }, ...sections],
    [t, sections],
  );
  const visibleSlugs = useMemo(
    () => [
      ...(showSuggestion ? [SUGGESTION_SLUG] : []),
      ...visibleSections.map((s) => s.slug),
    ],
    [showSuggestion, visibleSections],
  );

  // Arrow navigation follows the page order: sections top to bottom, cards left to right.
  const playlist = useMemo(() => {
    const visible = visibleSections.flatMap((s) => s.videos);
    return visible.some((v) => v.id === activeId)
      ? visible
      : categories.flatMap((c) => videos.filter((v) => v.category === c.slug));
  }, [visibleSections, activeId]);
  const activeIndex = playlist.findIndex((v) => v.id === activeId);

  // A run only applies while its current video is the one open (it goes stale on close/back).
  const run =
    randomRun && currentId(randomRun) === activeId ? randomRun : null;

  const prevVideo = run
    ? videosById.get(previousId(run))
    : activeIndex > 0
      ? playlist[activeIndex - 1]
      : undefined;
  const nextVideo = run
    ? videosById.get(run.upcoming)
    : activeIndex >= 0
      ? playlist[activeIndex + 1]
      : undefined;

  // Swap the ?v= in place so Back still closes the popup instead of stepping through videos.
  const switchVideo = useCallback((id) => {
    window.history.replaceState({}, "", urlWith({ v: id }));
    setActiveId(id);
  }, []);
  const goPrev = useMemo(() => {
    if (!prevVideo) return undefined;
    return () => {
      if (run) setRandomRun(stepBack(run));
      switchVideo(prevVideo.id);
    };
  }, [prevVideo, run, switchVideo]);
  const goNext = useMemo(() => {
    if (!nextVideo) return undefined;
    return () => {
      if (run) setRandomRun(stepForward(run, allIds));
      switchVideo(nextVideo.id);
    };
  }, [nextVideo, run, switchVideo]);

  return (
    <>
      <NavBar
        t={t}
        lang={lang}
        onLangChange={setLang}
        tabs={navTabs}
        visibleSlugs={visibleSlugs}
        query={query}
        onQueryChange={setQuery}
      />
      <main className="content">
        {showSuggestion && (
          <Suggestion
            videos={suggestedVideos}
            sectionNameOf={sectionNameOf}
            t={t}
            lang={lang}
            onOpen={openSuggested}
            onShuffle={shuffleSuggestions}
          />
        )}
        {visibleSections.map((section, i) => (
          <Section
            key={section.slug}
            section={section}
            t={t}
            lang={lang}
            onOpen={openVideo}
            isFirst={i === 0}
          />
        ))}
        {visibleSections.length === 0 && (
          <p className="empty">{t.noMatch(query)}</p>
        )}
      </main>
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          t={t}
          title={localize(activeVideo.title, lang)}
          shareUrl={shareLink(activeVideo.id, lang)}
          onClose={closeVideo}
          onPrev={goPrev}
          onNext={goNext}
          prevTitle={prevVideo && localize(prevVideo.title, lang)}
          nextTitle={nextVideo && localize(nextVideo.title, lang)}
        />
      )}
    </>
  );
}
