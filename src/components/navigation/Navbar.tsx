"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navigationItems = [
  { href: "#benefits", label: "Benefits" },
  { href: "#program", label: "Program" },
  { href: "#reviews", label: "Reviews" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    navigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="navbar section-shell">
        <div className="navbar-brands" aria-label="MarsVidya brand">
          <a
            className="navbar-marsvidya-logo"
            href="#top"
            aria-label="MarsVidya home"
          >
            <Image
              src="/brand/marsvidya-certificate-logo.png"
              alt="MarsVidya Learn Practice Grow"
              width={2146}
              height={733}
              sizes="(max-width: 720px) 134px, 168px"
              priority
            />
          </a>
        </div>

        <button
          ref={triggerRef}
          className="menu-trigger"
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          ref={navigationRef}
          id="primary-navigation"
          className="primary-navigation"
          data-open={isOpen ? "true" : "false"}
          aria-label="Primary navigation"
        >
          {navigationItems.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="nav-cta" href="#register" onClick={closeMenu}>Enroll for ₹199</a>
        </nav>
      </div>
    </header>
  );
}
