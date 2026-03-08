import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-cyan-400 text-sm mb-2">03. Experience</h2>
        <h3 className="text-3xl font-bold text-white mb-12">Where I&apos;ve worked</h3>
        <div className="flex flex-col gap-12">
          {experience.map((job, i) => (
            <div key={i} className="border-l-2 border-zinc-700 pl-6 hover:border-cyan-400 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <h4 className="text-white font-semibold text-lg">{job.title}</h4>
                <span className="font-mono text-zinc-500 text-sm">{job.dates}</span>
              </div>
              <p className="text-cyan-400 font-mono text-sm mb-3">
                {job.company} · {job.location}
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{job.summary}</p>
              {"experimentation" in job && (
                <div className="mb-3">
                  <p className="font-mono text-zinc-500 text-xs mb-2">Experimentation</p>
                  <div className="flex flex-wrap gap-2">
                    {(job.experimentation as string[]).map((e) => (
                      <span key={e} className="font-mono text-xs text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-1 rounded">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <span key={t} className="font-mono text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
