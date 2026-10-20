import { ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { SiteShell } from "@/components/portfolio/SiteShell";
import MediaOverlay from "@/components/portfolio/MediaOverlay";
import { heroImage } from "@/data/portfolio";
import { useHomepageHero } from "@/hooks/useHomepageHero";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function Films() {
  const [filmOpen, setFilmOpen] = useState(false);
  const { projects, isUsingConceptFallback, conceptImageNotice } = usePortfolioProjects();
  const { showreelVideoUrl, showreelPoster } = useHomepageHero();
  const films = projects.filter((project) => project.medium !== "Photo");
  return (
    <SiteShell pageClass="page-films">
      <main className="inner-page">
        <section className="page-intro section-pad"><p className="eyebrow">Moving pictures <span>·</span> 24 frames at a time</p><h1>Films that <em>stay.</em></h1><p className="page-intro-copy">A considered collection of brand stories, celebrations and moments that move.</p></section>
        <section className="film-reel-wrap section-pad">
          {showreelVideoUrl ? (
            <figure className="film-feature-player film-index-player">
              <video
                controls
                playsInline
                preload="none"
                poster={showreelPoster ?? heroImage}
                src={showreelVideoUrl}
                aria-label="Kionii Productions showreel"
              />
              <figcaption className="film-feature-player-caption">Kionii Productions <i>·</i> Showreel</figcaption>
            </figure>
          ) : (
            <button type="button" className="film-feature-image film-index-reel" onClick={() => setFilmOpen(true)} aria-label="Open showreel presentation">
              <img src={heroImage} alt="Concept image placeholder for a cinematic showreel" />
              <span className="film-feature-overlay"><span className="play-disc"><Play size={17} fill="currentColor" /></span><span>Watch the showreel <ArrowUpRight size={15} /></span></span>
              <span className="film-feature-caption">Showreel <i>·</i> concept placeholder</span>
            </button>
          )}
        </section>
        <section className="film-list-section section-pad"><div className="section-heading"><div><p className="eyebrow">Selected moving image</p><h2>Stories in <em>motion</em></h2></div><span className="section-number">{String(films.length).padStart(2, "0")} FILMS</span></div><div className="film-list">{films.map((film, index) => <Link href={`/work/${film.slug}`} className="film-row" key={film.slug}><span className="film-row-index">{String(index + 1).padStart(2, "0")}</span><span className="film-row-image"><img src={film.image} alt="" loading="lazy" /><span className="film-row-play"><Play size={13} fill="currentColor" /></span></span><span className="film-row-copy"><span className="eyebrow">{film.category} film <i>·</i> {film.year}</span><strong>{film.title}</strong><span>{film.excerpt}</span></span><ArrowUpRight className="film-row-arrow" size={19} /></Link>)}</div>{isUsingConceptFallback && <p className="concept-disclaimer">{conceptImageNotice} Film links are placeholders and should be replaced with the finished edits.</p>}</section>
        <section className="film-cta section-pad"><p className="eyebrow">A picture can move in more than one way</p><h2>Let's tell yours<br /><em>in motion.</em></h2><Link href="/contact" className="text-link">Plan a film <ArrowUpRight size={15} /></Link></section>
      </main>
      {filmOpen && <MediaOverlay image={heroImage} title="Kionii Productions — showreel" description="Showreel placeholder. Upload and publish Homepage Settings in Sanity; the reel will appear here and on the homepage." mode="film" onClose={() => setFilmOpen(false)} />}
    </SiteShell>
  );
}
