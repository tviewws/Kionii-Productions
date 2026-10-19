import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { PortfolioProject } from "@/data/portfolio";

export default function ProjectCard({ project, index = 0 }: { project: PortfolioProject; index?: number }) {
  return (
    <article className={`project-card project-card-${index % 4}`}>
      <Link href={`/work/${project.slug}`} className="project-image-link" aria-label={`View ${project.title}, ${project.category}`}>
        <div className="project-image-wrap">
          <img src={project.image} alt={project.imageAlt || `${project.title} — ${project.category.toLowerCase()} project`} loading="lazy" />
          <span className="project-image-index">0{index + 1}</span>
          <span className="project-open" aria-hidden="true"><ArrowUpRight size={18} /></span>
        </div>
        <div className="project-caption">
          <div>
            <h3>{project.title}</h3>
            <p>{project.category} <span>·</span> {project.medium}</p>
          </div>
          <span className="project-year">{project.year}</span>
        </div>
      </Link>
    </article>
  );
}
