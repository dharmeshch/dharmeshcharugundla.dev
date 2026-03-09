"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const links = ["About", "Experience", "Technologies", "Contact"];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-mono text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
          dharmeshcharugundla.dev
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6">
          {links.map((link) => (
            <li key={link}>
              <a
                href={!isHomePage ? `/#${link.toLowerCase()}` : `#${link.toLowerCase()}`}
                className="text-zinc-400 hover:text-white text-sm transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/weeks"
              className={`text-sm transition-colors ${pathname === "/weeks" ? "text-cyan-400" : "text-zinc-400 hover:text-white"}`}
            >
              Life in Weeks
            </a>
          </li>
          <li>
            <a
              href="/blog"
              className={`text-sm transition-colors ${pathname.startsWith("/blog") ? "text-cyan-400" : "text-zinc-400 hover:text-white"}`}
            >
              Blog
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-zinc-800 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={!isHomePage ? `/#${link.toLowerCase()}` : `#${link.toLowerCase()}`}
              className="text-zinc-400 hover:text-white text-sm transition-colors font-mono"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="/weeks"
            className={`text-sm transition-colors font-mono ${pathname === "/weeks" ? "text-cyan-400" : "text-zinc-400 hover:text-white"}`}
            onClick={() => setMenuOpen(false)}
          >
            Life in Weeks
          </a>
          <a
            href="/blog"
            className={`text-sm transition-colors font-mono ${pathname.startsWith("/blog") ? "text-cyan-400" : "text-zinc-400 hover:text-white"}`}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </a>
        </div>
      )}
    </nav>
  );
}
