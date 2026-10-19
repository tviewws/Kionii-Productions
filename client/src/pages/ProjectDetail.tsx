import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import { useState } from "react";
import { Link, useRoute } from "wouter";
import { SiteShell } from "@/components/portfolio/SiteShell";
import MediaOverlay from "@/components/portfolio/MediaOverlay";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function ProjectDetail() {
  const [, params] = useRoute("/work/:slug");
  const { projects, isLoading, isError, refetch, isUsingConceptFallback, conceptImageNotice } = usePortfolioProjects();
  const project = projects.find((item) => item.slug === params?.slug);
  const [viewerImage, setViewerImage] = useState<{ image: string; alt: string; title: string; description: string } | null>(null);

  if (!project && isLoading) {
    return <SiteShell pageClass="page-project-detail"><main className="not-found-project section-pad"><p className="eyebrow">Opening the story</p><h1>Finding your<br /><em>frame.</em></h1></main></SiteShell>;
  }
  if (!project && isError) {
    return <SiteShell pageClass="page-project-detail"><main className="not-found-project section-pad"><p className="eyebrow">The archive is unavailable</p><h1>We couldn't reach<br /><em>the story just now.</em></h1><button type="button" className="text-link" onClick={() => void refetch()}>Try again <ArrowRight size={15} /></button></main></SiteShell>;
  }
  if (!project) {
    return <SiteShell pageClass="page-project-detail"><main className="not-found-project section-pad"><p className="eyebrow">Not in the index</p><h1>This story hasn't<br /><em>been framed yet.</em></h1><Link href="/work" className="text-link"><ArrowLeft size={15} /> Back to all work</Link></main></SiteShell>;
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <SiteShell pageClass="page-project-detail">
      <main className="project-detail-page">
        <div className="detail-back section-pad"><Link href="/work" className="text-link"><ArrowLeft size={15} /> All work</Link><span className="eyebrow">{project.medium} <i>·</i> {project.category}</span></div>
        <section className="detail-heading section-pad"><p className="eyebrow">{project.client} <span>·</span> {project.year} <span>·</span> {project.place}</p><h1>{project.title.split(" ").slice(0, -1).join(" ")} <em>{project.title.split(" ").slice(-1)}</em></h1><p className="detail-deck">{project.excerpt}</p></section>
        <button className="detail-hero-image" type="button" onClick={() => setViewerImage({ image: project.image, alt: project.imageAlt || `${project.title} cover photograph`, title: project.title, description: project.excerpt })} aria-label={`Expand image for ${project.title}`}><img src={project.image} alt={project.imageAlt || `${project.title} cover photograph`} /><span className="detail-expand"><Expand size={16} /> View image</span></button>
        <section className="detail-story section-pad">
          <div className="detail-facts"><div><span className="eyebrow">Client</span><p>{project.client}</p></div><div><span className="eyebrow">Services</span><p>{project.services.join(" · ")}</p></div><div><span className="eyebrow">Location / year</span><p>{project.place} · {project.year}</p></div></div>
          <div className="detail-story-copy"><p className="eyebrow">The story</p><h2>A feeling, held<br /><em>in a frame.</em></h2><p>{project.story}</p>{isUsingConceptFallback && <span className="concept-inline">{conceptImageNotice}</span>}</div>
        </section>
        {project.videoFileUrl || project.videoEmbedUrl ? (
          <section className="detail-video section-pad" aria-label={`${project.title} film`}>
            <div className="detail-video-heading"><p className="eyebrow">Moving picture</p><h2>In <em>motion.</em></h2></div>
            <div className="detail-video-frame">
              {project.videoFileUrl
                ? <video controls playsInline preload="metadata" poster={project.videoPoster || project.image} src={project.videoFileUrl} aria-label={`${project.title} film`} />
                : <iframe src={project.videoEmbedUrl} title={`${project.title} film`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}
            </div>
          </section>
        ) : null}
        {project.gallery?.length ? (
          <section className="detail-gallery section-pad" aria-label={`${project.title} photo gallery`}>
            <div className="detail-gallery-heading"><p className="eyebrow">More from the story</p><span className="section-number">{String(project.gallery.length).padStart(2, "0")} FRAMES</span></div>
            <div className="detail-gallery-grid">
              {project.gallery.map((image, index) => <button type="button" className="detail-gallery-item" key={image.key} onClick={() => setViewerImage({ image: image.image, alt: image.alt, title: image.caption || project.title, description: image.caption || `${project.title}, frame ${index + 1}` })} aria-label={`Expand gallery image ${index + 1}: ${image.alt}`}><img src={image.image} alt={image.alt} loading="lazy" />{image.caption && <span className="detail-gallery-caption">{image.caption}</span>}</button>)}
            </div>
          </section>
        ) : null}
        <section className="project-next section-pad"><div><p className="eyebrow">Next in the index</p><span className="next-title">{next.title}</span></div><Link href={`/work/${next.slug}`} className="next-project-link" aria-label={`View next project: ${next.title}`}><ArrowRight size={20} /></Link></section>
        <section className="detail-footnote section-pad"><p>Have a story that could use this kind of attention?</p><Link href="/contact" className="text-link">Let's talk <ArrowUpRight size={15} /></Link></section>
      </main>
      {viewerImage && <MediaOverlay image={viewerImage.image} title={viewerImage.title} description={viewerImage.description} onClose={() => setViewerImage(null)} />}
    </SiteShell>
  );
}
