"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <p className="font-mono text-cyan-400 text-sm mb-4">Hi, my name is</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
          Dharmesh Charugundla
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-400 mb-6">
          Software Engineer
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl mb-10 leading-relaxed">
          Software Engineer with 8+ years of experience specializing in distributed systems, data pipelines, and large-scale experimentation.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#experience"
            className="bg-cyan-400 text-black font-semibold px-6 py-3 rounded hover:bg-cyan-300 transition-colors font-mono text-sm"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="border border-cyan-400 text-cyan-400 font-semibold px-6 py-3 rounded hover:bg-cyan-400/10 transition-colors font-mono text-sm"
          >
            Contact me
          </a>
        </div>
        <div className="flex gap-5 mt-12">
          <a
            href="https://github.com/dharmeshch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/dharmesh-charugundla/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:dharmesh2308@gmail.com"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
