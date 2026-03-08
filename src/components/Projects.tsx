import { projects } from "@/data/projects";
import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-cyan-400 text-sm mb-2">04. Projects</h2>
        <h3 className="text-3xl font-bold text-white mb-12">Things I&apos;ve built</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col justify-between hover:border-cyan-400/50 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-cyan-400 text-xs">project_0{i + 1}</span>
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">{project.name}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-xs text-zinc-500">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
