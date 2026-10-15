import { useLayoutEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard.jsx";
import { sectionDomId } from "./NavBar.jsx";

// Its tab in the navbar scrolls here, like the category tabs.
export const SUGGESTION_SLUG = "memories";

// Random videos featured above the sections, for visitors who'd rather not browse.
// Uses the same grid as the sections: one column for this panel, the rest for videos.
export default function Suggestion({
  videos,
  sectionNameOf,
  t,
  lang,
  onOpen,
  onShuffle,
}) {
  const gridRef = useRef(null);
  const [columns, setColumns] = useState(4);

  // Read the live column count from the grid, so the row always fits exactly.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    const measure = () =>
      setColumns(getComputedStyle(grid).gridTemplateColumns.split(" ").length);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const shown = videos.slice(0, Math.max(1, columns - 1));

  return (
    <section
      id={sectionDomId(SUGGESTION_SLUG)}
      className="suggestion"
      aria-label={t.suggestion}
    >
      <div className="grid" ref={gridRef}>
        <div className="suggestion-panel">
          <h2 className="suggestion-title">{t.suggestion}</h2>
          <p className="suggestion-hint">{t.suggestionHint}</p>
          <button type="button" className="btn" onClick={onShuffle}>
            <span aria-hidden="true">🔀</span>
            {t.shuffle}
          </button>
        </div>
        {shown.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            lang={lang}
            onOpen={onOpen}
            priority
            subtitle={sectionNameOf(video)}
          />
        ))}
      </div>
    </section>
  );
}
