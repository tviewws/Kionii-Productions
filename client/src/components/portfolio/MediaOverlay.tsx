import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function MediaOverlay({ image, title, description, onClose, mode = "image" }: { image: string; title: string; description: string; onClose: () => void; mode?: "image" | "film" }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusCloseButton = () => dialogRef.current?.querySelector<HTMLElement>(".overlay-close")?.focus();
    focusCloseButton();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [onClose]);

  return (
    <div ref={dialogRef} className="media-overlay" role="dialog" aria-modal="true" aria-labelledby="media-dialog-title" aria-describedby="media-dialog-description" tabIndex={-1} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <button type="button" className="overlay-close" onClick={onClose} aria-label="Close media viewer"><X size={20} /></button>
      <div className={`overlay-content${mode === "film" ? " overlay-film" : ""}`}>
        <img src={image} alt="" />
        {mode === "film" && <div className="overlay-film-mark"><span className="film-play-icon" aria-hidden="true">▶</span><p>Film link to be added</p><small>Replace this visual placeholder with the final Vimeo or YouTube URL.</small></div>}
        <div className="overlay-caption"><div><p className="eyebrow">{mode === "film" ? "Featured film" : "Selected frame"}</p><h2 id="media-dialog-title">{title}</h2><p id="media-dialog-description">{description}</p></div><a href="/contact" className="overlay-enquire">Enquire <ArrowUpRight size={15} /></a></div>
      </div>
    </div>
  );
}
