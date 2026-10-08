"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand/BrandMark";

const navigationItems = [
  { href: "#benefits", label: "Benefits" },
  { href: "#program", label: "Program" },
  { href: "#reviews", label: "Reviews" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

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
        <BrandMark />

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
