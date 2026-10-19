import { ArrowUpRight, Instagram, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { conceptImageNotice, contactEmail, contactPhone, gmailComposeUrl, socialLinks } from "@/data/portfolio";

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/films", label: "Films" },
  { href: "/about", label: "About" },
];

const logoMark = "/kionii-logo-mark.png";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Kionii Productions home" onClick={() => setMenuOpen(false)}>
        <img className="wordmark-mark" src={logoMark} alt="" aria-hidden="true" />
        <span className="wordmark-copy">
          <span className="wordmark-main">KIONII</span>
          <span className="wordmark-sub">PRODUCTIONS <i aria-hidden="true">/</i> KENYA</span>
        </span>
      </Link>
      <span className="header-note">Photography <span>+</span> film</span>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>
      <nav id="primary-navigation" className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} className={location.startsWith(item.href) ? "nav-link is-active" : "nav-link"} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-book" onClick={() => setMenuOpen(false)}>
          Book a shoot <ArrowUpRight size={14} strokeWidth={1.5} />
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter({ minimal = false }: { minimal?: boolean }) {
  return (
    <footer className={`site-footer${minimal ? " site-footer-minimal" : ""}`}>
      {!minimal && <div className="footer-cta">
        <p className="eyebrow">A good story starts somewhere</p>
        <h2>Have a project<br /><em>in mind?</em></h2>
        <Link href="/contact" className="text-link">Start the conversation <ArrowUpRight size={16} /></Link>
      </div>}
      <div className="footer-meta">
        <div>
          <Link href="/" className="footer-wordmark" aria-label="Kionii Productions home">
            <img className="footer-wordmark-mark" src={logoMark} alt="" aria-hidden="true" />
            <span className="footer-wordmark-copy"><span className="footer-wordmark-main">KIONII</span><span className="footer-wordmark-sub">PRODUCTIONS</span></span>
          </Link>
          <p className="footer-location">Photography + film · Kenya</p>
        </div>
        {!minimal && <div className="footer-contact">
          <a href={gmailComposeUrl()} target="_blank" rel="noopener noreferrer" aria-label={`Compose an email to ${contactEmail} in Gmail`}>{contactEmail}</a>
          <a href={`tel:${contactPhone.replaceAll(" ", "")}`}><Phone size={12} /> {contactPhone}</a>
          <small>Based in Kenya · available for commissions.</small>
        </div>}
        {!minimal && <div className="footer-socials">
          {socialLinks.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={`Instagram ${item.label}`}><Instagram size={14} strokeWidth={1.6} /> {item.label} <ArrowUpRight size={12} /></a>)}
        </div>}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kionii Productions</span>
          <span className="concept-note">{conceptImageNotice}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children, pageClass = "" }: { children: React.ReactNode; pageClass?: string }) {
  const isContactPage = pageClass.split(" ").includes("page-contact");
  return (
    <div className={`site-shell ${pageClass}`} id="top">
      <SiteHeader />
      {children}
      <SiteFooter minimal={isContactPage} />
    </div>
  );
}
