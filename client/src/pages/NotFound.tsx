import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { SiteShell } from "@/components/portfolio/SiteShell";

export default function NotFound() {
  return (
    <SiteShell pageClass="page-not-found">
      <main className="not-found-project section-pad">
        <p className="eyebrow">Out of frame</p>
        <h1>This page is<br /><em>not in the story.</em></h1>
        <Link href="/" className="text-link"><ArrowLeft size={15} /> Return home</Link>
      </main>
    </SiteShell>
  );
}
