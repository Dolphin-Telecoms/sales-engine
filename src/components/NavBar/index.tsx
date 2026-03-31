"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Container from "@/src/components/Container";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <Container className="flex flex-row items-center justify-between mx-auto mt-3">
          {/* Logo */}
          <Link href="/" className="navbar__logo" aria-label="Dolphin Pay Home">
            <div className="navbar__logo-icon">
              <Image src="/logo.svg" alt="logo" height={145} width={145} />
            </div>
          </Link>

          {/* Launching badge & CTA (desktop) */}
          <div className="navbar__cta">
            <div className="navbar__badge-wrapper">
              <div className="launching-badge">
                <span className="launching-badge__dot" aria-hidden="true" />
                Launching soon.
              </div>
            </div>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </Container>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        className={`navbar__mobile-menu ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div
          className="launching-badge"
          style={{ alignSelf: "flex-start", marginTop: "0.25rem" }}
        >
          <span className="launching-badge__dot" aria-hidden="true" />
          Launching soon.
        </div>
      </div>
    </>
  );
}
