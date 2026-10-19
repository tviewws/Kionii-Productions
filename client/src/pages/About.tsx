import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { conceptImageNotice, projects } from "@/data/portfolio";

const services = [
  { number: "01", name: "Photography", detail: "Fashion, portraits, events" },
  { number: "02", name: "Videography", detail: "Brand films, weddings, recaps" },
  { number: "03", name: "Post-production", detail: "Editing, colour and finishing" },
];

export default function About() {
  return (
    <SiteShell pageClass="page-about">
      <main className="inner-page">
        <section className="page-intro section-pad"><p className="eyebrow">About <span>·</span> Kionii Productions</p><h1>Looking closer.<br /><em>Feeling more.</em></h1><p className="page-intro-copy">An image-maker based in Kenya, drawn to honest colour, good light and the way people show up for one another.</p></section>
        <section className="about-profile section-pad">
          <div className="about-profile-image"><img src={projects[2].image} alt="Generated concept portrait placeholder; this is not a photograph of Kionii" /><span className="image-caption">Replace with Kionii's own portrait</span></div>
          <div className="about-profile-copy"><p className="eyebrow">A note from behind the lens</p><h2>“The best images<br />feel like <em>being there.”</em></h2><p>This is a space for Kionii's own voice. Add a short introduction about her background, the places she works, and the artists, brands and couples she most loves to collaborate with.</p><p>Her approach is thoughtful and collaborative: make room for people to feel at ease, notice the detail that others miss, and shape the final frames with intention.</p><span className="concept-inline">{conceptImageNotice}</span></div>
        </section>
        <section className="services-section section-pad"><div className="section-heading"><div><p className="eyebrow">What I bring to the frame</p><h2>Ways of <em>working</em></h2></div><span className="section-number">03 SERVICES</span></div><div className="service-list">{services.map((service) => <div className="service-row" key={service.number}><span className="service-number">{service.number}</span><strong>{service.name}</strong><span>{service.detail}</span><ArrowUpRight size={15} /></div>)}</div></section>
        <section className="about-cta section-pad"><p className="eyebrow">Based in Kenya · available to travel</p><h2>Good things happen<br /><em>when we make time.</em></h2><Link href="/contact" className="text-link">Start a conversation <ArrowUpRight size={15} /></Link></section>
      </main>
    </SiteShell>
  );
}
