import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../i18n.js";

export const sectionDomId = (slug) => `section-${slug}`;

export default function NavBar({
  t,
  lang,
  onLangChange,
  tabs,
  visibleSlugs,
  query,
  onQueryChange,
}) {
  const [activeSlug, setActiveSlug] = useState(visibleSlugs[0]);
  const tabsRef = useRef(null);
  // After a tab click, keep the clicked tab highlighted until the visitor scrolls,
  // even when the page is too short to bring that section up to the navbar.
  const jumpingRef = useRef(false);
  const settleTimerRef = useRef(null);
  const settleAfterRef = useRef(() => {});

  // Scroll-spy: the active tab is the last section whose top has passed under the navbar.
  useEffect(() => {
    const updateActive = () => {
      const navHeight = document.querySelector(".navbar")?.offsetHeight ?? 0;
      let current = visibleSlugs[0];
      for (const slug of visibleSlugs) {
        const el = document.getElementById(sectionDomId(slug));
        if (el && el.getBoundingClientRect().top <= navHeight + 40)
          current = slug;
      }
      // At the very bottom the last section may never reach the navbar.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = visibleSlugs[visibleSlugs.length - 1];
      setActiveSlug(current);
    };
    // At most one check per frame, however many scroll events fire.
    let frame = 0;
    const onScroll = () => {
      if (jumpingRef.current) {
        settleAfter(150); // still scrolling; wait for it to stop
        return;
      }
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          updateActive();
        });
    };
    const settleAfter = (ms) => {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = setTimeout(() => {
        jumpingRef.current = false;
      }, ms);
    };
    settleAfterRef.current = settleAfter;
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(settleTimerRef.current);
    };
  }, [visibleSlugs]);

  // Show ‹ › on the tab row only on the side(s) where more tabs are hidden.
  const [overflow, setOverflow] = useState({ left: false, right: false });
  useEffect(() => {
    const row = tabsRef.current;
    const update = () =>
      setOverflow({
        left: row.scrollLeft > 1,
        right: row.scrollLeft + row.clientWidth < row.scrollWidth - 1,
      });
    update();
    row.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(row);
    return () => {
      row.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [tabs]);

  const scrollTabs = (direction) => {
    const row = tabsRef.current;
    row.scrollBy({ left: direction * row.clientWidth * 0.7, behavior: "smooth" });
  };

  // On narrow screens the tab row scrolls sideways; keep the active tab in view.
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.querySelector(".tab.active");
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    const left =
      tab.getBoundingClientRect().left -
      row.getBoundingClientRect().left +
      row.scrollLeft;
    const right = left + tab.offsetWidth;
    if (left < row.scrollLeft || right > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: left - 16, behavior: "smooth" });
    }
  }, [activeSlug]);

  const scrollWithTabLocked = (slug, scroll) => {
    setActiveSlug(slug);
    jumpingRef.current = true;
    settleAfterRef.current(400); // also covers clicks that need no scrolling
    scroll();
  };

  // Land the section's top edge exactly under the sticky navbar, whatever its current height.
  const jumpTo = (slug) =>
    scrollWithTabLocked(slug, () => {
      const section = document.getElementById(sectionDomId(slug));
      const navHeight = document.querySelector(".navbar")?.offsetHeight ?? 0;
      if (!section) return;
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - navHeight,
        behavior: "smooth",
      });
    });

  return (
    <header className="navbar">
      <div className="navbar-top">
        <button
          type="button"
          className="brand"
          onClick={() =>
            scrollWithTabLocked(visibleSlugs[0], () =>
              window.scrollTo({ top: 0, behavior: "smooth" }),
            )
          }
        >
          {t.siteTitle}
        </button>
        <input
          type="search"
          name="search"
          className="search"
          placeholder={t.search}
          aria-label={t.search}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <div className="lang-toggle" role="group" aria-label={t.language}>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              lang={l.locale}
              className={`lang${lang === l.code ? " active" : ""}`}
              aria-pressed={lang === l.code}
              title={l.name}
              onClick={() => onLangChange(l.code)}
            >
              {l.short}
            </button>
          ))}
        </div>
      </div>
      <div className="tabs-wrap">
        {overflow.left && (
          <button
            type="button"
            className="tabs-arrow left"
            aria-label={t.tabsLeft}
            onClick={() => scrollTabs(-1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
        )}
        <nav className="tabs" ref={tabsRef} aria-label={t.categories}>
          {tabs.map((c) => {
            const enabled = visibleSlugs.includes(c.slug);
            return (
              <button
                key={c.slug}
                type="button"
                className={`tab${activeSlug === c.slug ? " active" : ""}`}
                disabled={!enabled}
                onClick={() => jumpTo(c.slug)}
              >
                {c.name}
              </button>
            );
          })}
        </nav>
        {overflow.right && (
          <button
            type="button"
            className="tabs-arrow right"
            aria-label={t.tabsRight}
            onClick={() => scrollTabs(1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        )}
      </div>
    </header>
  );
}
