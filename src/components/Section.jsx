import { memo } from "react";
import VideoCard from "./VideoCard.jsx";
import { sectionDomId } from "./NavBar.jsx";

// Thumbnails in the first row are on screen at load, so fetch them right away.
const ABOVE_THE_FOLD = 4;

// Memoized so opening or changing a video doesn't re-render every card.
export default memo(function Section({ section, t, lang, onOpen, isFirst }) {
  return (
    <section
      id={sectionDomId(section.slug)}
      className="section"
    >
      <h2 className="section-title">
        {section.name}{" "}
        <span className="section-count">
          {t.videoCount(section.videos.length)}
        </span>
      </h2>
      <div className="grid">
        {section.videos.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            lang={lang}
            onOpen={onOpen}
            priority={isFirst && i < ABOVE_THE_FOLD}
          />
        ))}
      </div>
    </section>
  );
});
