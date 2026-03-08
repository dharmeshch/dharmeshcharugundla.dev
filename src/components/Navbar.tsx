"use client";

export default function Navbar() {
  const links = ["About", "Experience", "Technologies", "Contact"];


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-cyan-400 text-sm">dharmeshcharugundla.dev</span>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-zinc-400 hover:text-white text-sm transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
