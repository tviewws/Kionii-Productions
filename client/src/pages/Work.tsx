import { Link } from "wouter";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function Work() {
  const { projects, isUsingConceptFallback, conceptImageNotice } = usePortfolioProjects();
  return (
    <SiteShell pageClass="page-index">
      <main className="inner-page">
        <section className="page-intro section-pad">
          <p className="eyebrow">The index <span>·</span> Kenya and elsewhere</p>
          <h1>Work, in <em>good light.</em></h1>
          <p className="page-intro-copy">A collection of people, places and ideas—told in still frames and moving pictures.</p>
        </section>
        <section className="index-section section-pad" aria-label="Selected projects">
          <div className="work-grid index-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
          {isUsingConceptFallback && <p className="concept-disclaimer">{conceptImageNotice}</p>}
        </section>
        <section className="index-cta section-pad"><p className="eyebrow">Looking for something specific?</p><h2>Let's find the <em>right frame.</em></h2><Link href="/contact" className="text-link">Tell me about it ↗</Link></section>
      </main>
    </SiteShell>
  );
}
