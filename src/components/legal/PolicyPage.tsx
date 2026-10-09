import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface PolicyPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function PolicyPage({ title, description, children }: PolicyPageProps) {
  return (
    <div className="policy-page">
      <header className="policy-header">
        <div className="policy-shell policy-header-inner">
          <Link className="navbar-marsvidya-logo" href="/" aria-label="MarsVidya home">
            <Image
              src="/brand/marsvidya-certificate-logo.png"
              alt="MarsVidya Learn Practice Grow"
              width={2146}
              height={733}
              sizes="(max-width: 720px) 134px, 168px"
              priority
            />
          </Link>
          <Link className="policy-home-link" href="/">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="policy-shell policy-main">
        <div className="policy-hero">
          <span className="policy-eyebrow">MarsVidya policies</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <time dateTime="2026-10-09">Effective 9 October 2026</time>
        </div>
        <article className="policy-content">{children}</article>
      </main>

      <footer className="policy-footer">
        <div className="policy-shell policy-footer-inner">
          <p>© 2026 MarsVidya. All rights reserved.</p>
          <nav aria-label="Legal policies">
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
