"use client";

import Link from "next/link";
import Container from "../Container";

const links = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Contact Support", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 pt-20">
      <div className="bg-[#FFFFFF]">
        <Container className="py-6 bg-[#FFFFFF]">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left Text */}
            <p className="font-exo text-[14px] leading-[100%] text-[#6B7280]">
              © {new Date().getFullYear()} Dolphin Telecoms. All rights
              reserved.
            </p>

            {/* Right Links */}
            <div className="flex items-center gap-8">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="font-exo text-[14px] leading-[100%] text-[#6B7280] hover:text-[#374151] transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex flex-col items-center text-center gap-3 md:hidden">
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="font-exo text-[14px] leading-[100%] text-[#6B7280]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Bottom Text */}
            <p className="font-exo text-[14px] leading-[100%] text-[#6B7280]">
              © {new Date().getFullYear()} Dolphin Telecoms. All rights
              reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
