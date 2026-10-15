import { memo } from "react";
import { formatDate, thumbUrl } from "../lib/youtube.js";
import { localeFor, localize } from "../i18n.js";

export default memo(function VideoCard({
  video,
  lang,
  onOpen,
  priority,
  subtitle,
}) {
  return (
    <button type="button" className="card" onClick={() => onOpen(video.id)}>
      <div className="thumb">
        <img
          src={thumbUrl(video.youtubeId)}
          alt=""
          width="480"
          height="360"
          // Every thumbnail loads up front (about 1 MB in all) so fast scrolling never shows
          // empty boxes; the first row goes first. Lowercase fetchpriority: React 18 drops camelCase.
          loading="eager"
          fetchpriority={priority ? "high" : "low"}
          decoding="async"
        />
        <span className="play" aria-hidden="true">
          ▶
        </span>
      </div>
      <div className="card-title">{localize(video.title, lang)}</div>
      {(subtitle || video.date) && (
        <div className="card-meta">
          {subtitle ?? formatDate(video.date, localeFor(lang))}
        </div>
      )}
    </button>
  );
});
