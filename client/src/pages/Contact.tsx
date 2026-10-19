import { ArrowUpRight, Instagram, Mail, Phone } from "lucide-react";
import { SiteShell } from "@/components/portfolio/SiteShell";
import { contactEmail, contactPhone, gmailComposeUrl, socialLinks } from "@/data/portfolio";

export default function Contact() {
  return (
    <SiteShell pageClass="page-contact">
      <main className="contact-page section-pad">
        <section className="contact-stage" aria-labelledby="contact-title">
          <div className="contact-stage-copy">
            <p className="eyebrow">Contact <span>·</span> Kenya</p>
            <h1 id="contact-title">Find me<br /><em>here.</em></h1>
          </div>
          <div className="contact-options" aria-label="Contact options">
            <a href={gmailComposeUrl()} target="_blank" rel="noopener noreferrer" className="contact-option" aria-label={`Compose an email to ${contactEmail} in Gmail`}>
              <span className="contact-option-index">01</span>
              <span className="contact-option-copy"><span className="contact-option-label">Email</span><strong className="contact-option-value">{contactEmail}</strong></span>
              <span className="contact-option-icon"><ArrowUpRight size={19} strokeWidth={1.4} /></span>
            </a>
            <a href={`tel:${contactPhone.replaceAll(" ", "")}`} className="contact-option" aria-label={`Call Kionii Productions at ${contactPhone}`}>
              <span className="contact-option-index">02</span>
              <span className="contact-option-copy"><span className="contact-option-label">Phone</span><strong className="contact-option-value">{contactPhone}</strong></span>
              <span className="contact-option-icon"><Phone size={17} strokeWidth={1.4} /></span>
            </a>
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="contact-option" aria-label={`Open Instagram profile ${item.label}`}>
                <span className="contact-option-index">03</span>
                <span className="contact-option-copy"><span className="contact-option-label">Instagram</span><strong className="contact-option-value">{item.label}</strong></span>
                <span className="contact-option-icon"><Instagram size={17} strokeWidth={1.4} /></span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
