"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isWeeksPage = pathname === "/weeks";
  const links = ["About", "Experience", "Technologies", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-mono text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
          dharmeshcharugundla.dev
        </a>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link}>
              <a
                href={isWeeksPage ? `/#${link.toLowerCase()}` : `#${link.toLowerCase()}`}
                className="text-zinc-400 hover:text-white text-sm transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/weeks"
              className={`text-sm transition-colors ${isWeeksPage ? "text-cyan-400" : "text-zinc-400 hover:text-white"}`}
            >
              Life in Weeks
            </a>
          </li>
          <li>
            <a href="/blog" className="text-zinc-400 hover:text-white text-sm transition-colors">
              Blog
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
