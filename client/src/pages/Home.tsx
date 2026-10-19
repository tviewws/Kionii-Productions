import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { SiteShell } from "@/components/portfolio/SiteShell";
import MediaOverlay from "@/components/portfolio/MediaOverlay";
import { heroImage, projects as conceptProjects } from "@/data/portfolio";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function Home() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const { projects, isUsingConceptFallback, conceptImageNotice } = usePortfolioProjects();
  const featuredCandidates = projects.filter((project) => project.featured);
  const featured = isUsingConceptFallback
    ? projects.slice(0, 4)
    : (featuredCandidates.length ? featuredCandidates.slice(0, 4) : projects.slice(0, 4));
  return (
    <SiteShell pageClass="page-home">
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <img className="hero-image" src={heroImage} alt="Concept image: a fashion subject in warm dusk light" />
          <div className="hero-scrim" />
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">Photography + film <span>·</span> Kenya</p>
            <h1 id="hero-title">For the beauty<br /><em>between the frames.</em></h1>
            <p className="hero-description">Images with feeling. Films with a point of view.</p>
          </div>
          <div className="hero-bottom">
            <span className="hero-caption">A visual storyteller's portfolio, in progress</span>
            <a href="#selected-work" className="round-arrow" aria-label="Scroll to selected work"><ArrowDown size={17} /></a>
            <span className="hero-coordinate">01 — 04 <i> / </i> Nairobi · Kenya</span>
          </div>
          <span className="hero-side-note">Concept imagery — placeholder direction</span>
        </section>

        <section className="intro-section section-pad">
          <div className="intro-label"><span className="eyebrow">An image-maker's point of view</span><span className="section-number">01 / 04</span></div>
          <div className="intro-content">
            <h2>Bold colour.<br /><em>Real faces.</em><br />Moving pictures.</h2>
            <div className="intro-aside">
              <span className="gold-rule" />
              <p>Photography and film shaped around the people, places and small details that make a story feel like yours.</p>
              <Link href="/about" className="text-link">A little about the approach <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="selected-section section-pad" id="selected-work">
          <div className="section-heading">
            <div><p className="eyebrow">A few frames, a few stories</p><h2>Selected <em>work</em></h2></div>
            <Link href="/work" className="text-link">Explore the index <ArrowUpRight size={15} /></Link>
          </div>
          <div className="work-grid">
            {featured.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
          {isUsingConceptFallback && <p className="concept-disclaimer">{conceptImageNotice}</p>}
        </section>

        <section className="film-feature-section section-pad">
          <div className="film-feature-head"><p className="eyebrow">Moving pictures</p><span className="section-number">02 / 04</span></div>
          <button type="button" className="film-feature-image" onClick={() => setShowreelOpen(true)} aria-label="Open showreel presentation">
            <img src={heroImage} alt="Concept image for the Kionii Productions showreel" loading="lazy" />
            <span className="film-feature-overlay"><span className="play-disc"><Play size={17} fill="currentColor" /></span><span>Open the showreel <ArrowUpRight size={15} /></span></span>
            <span className="film-feature-caption">A first look <i>·</i> concept showreel placeholder</span>
          </button>
          <div className="film-feature-foot"><h2>Stories, in motion.<br /><em>Made to be felt.</em></h2><Link href="/films" className="text-link">Explore films <ArrowUpRight size={15} /></Link></div>
        </section>

        <section className="about-teaser section-pad">
          <div className="about-teaser-top"><p className="eyebrow">Behind the lens</p><span className="section-number">03 / 04</span></div>
          <div className="about-teaser-grid">
            <div className="about-image-frame">
              <img src={conceptProjects[2].image} alt="Concept portrait placeholder — not a portrait of Kionii" loading="lazy" />
              <span className="image-caption">Portrait placeholder · replace with Kionii's portrait</span>
            </div>
            <div className="about-teaser-copy"><span className="hand-note">The way I see it</span><h2>There is a story<br />in the <em>in-between.</em></h2><p>This space is ready for Kionii's own introduction: how she works, what she notices, and the people she loves to make images with.</p><Link href="/about" className="text-link">Meet the image-maker <ArrowUpRight size={15} /></Link></div>
          </div>
        </section>

        <section className="closing-note section-pad"><p className="eyebrow">04 / 04 <span>—</span> The next frame is yours</p><h2>Let's make<br /><em>something lasting.</em></h2><Link href="/contact" className="button-outline">Book a shoot <ArrowUpRight size={16} /></Link></section>
      </main>
      {showreelOpen && <MediaOverlay image={heroImage} title="The Kionii showreel" description="A showreel visual placeholder. Add the finished Vimeo or YouTube link when the film is ready." mode="film" onClose={() => setShowreelOpen(false)} />}
    </SiteShell>
  );
}
