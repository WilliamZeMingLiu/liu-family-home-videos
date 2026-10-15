import { useEffect, useRef, useState } from "react";
import { embedUrl } from "../lib/youtube.js";

export default function VideoModal({
  video,
  t,
  title,
  shareUrl,
  onClose,
  onPrev,
  onNext,
  prevTitle,
  nextTitle,
}) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && onPrev) onPrev();
      else if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  // Lock page scroll while open; on close, return focus to whatever opened the popup.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const opener = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  // Clicks on the arrows or the player shouldn't reach the backdrop and close the popup.
  const stop = (e) => e.stopPropagation();

  // Copies a link to this video (with the current language); shows a check for 2s.
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  const copyLink = async (e) => {
    stop(e);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      // clipboard blocked; nothing more to do
    }
  };

  return (
    <div
      className="backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="close"
        onClick={(e) => {
          stop(e); // the backdrop also closes on click; don't close twice
          onClose();
        }}
        aria-label={t.close}
      >
        ✕
      </button>
      <div className="stage">
        <button
          type="button"
          className="nav-side"
          onClick={(e) => {
            stop(e);
            onPrev?.();
          }}
          disabled={!onPrev}
          aria-label={prevTitle ? t.previousTo(prevTitle) : t.previous}
        >
          <span className="nav-arrow" aria-hidden="true">
            ‹
          </span>
          {prevTitle && (
            <span className="nav-caption" aria-hidden="true">
              <span className="nav-direction">{t.previousShort}</span>
              <span className="nav-title">{prevTitle}</span>
            </span>
          )}
        </button>
        {/* Copy link sits just below the video, so the arrows stay centered on it. */}
        <div className="player-wrap">
          <button
            type="button"
            className="share"
            onClick={copyLink}
            aria-live="polite"
          >
            {copied ? (
              <span className="share-check" aria-hidden="true">
                ✓
              </span>
            ) : (
              <span aria-hidden="true">🔗</span>
            )}
            {copied ? t.copied : t.copyLink}
          </button>
          <div className="player" onClick={stop}>
            <iframe
              key={video.id}
              src={embedUrl(video.youtubeId)}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        <button
          type="button"
          className="nav-side"
          onClick={(e) => {
            stop(e);
            onNext?.();
          }}
          disabled={!onNext}
          aria-label={nextTitle ? t.nextTo(nextTitle) : t.next}
        >
          <span className="nav-arrow" aria-hidden="true">
            ›
          </span>
          {nextTitle && (
            <span className="nav-caption" aria-hidden="true">
              <span className="nav-direction">{t.nextShort}</span>
              <span className="nav-title">{nextTitle}</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
