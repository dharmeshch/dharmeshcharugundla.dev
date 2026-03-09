import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-cyan-400 text-sm mb-2">01. About</h2>
        <h3 className="text-3xl font-bold text-white mb-8">About Me</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 flex flex-col gap-4 text-zinc-400 leading-relaxed">
            <p>
              I&apos;m drawn to problems where scale changes everything — where the naive solution
              breaks and you have to think differently. I find experimentation particularly
              fascinating: the challenge of measuring product impact across billions of users,
              where even small metric movements carry real weight.
            </p>
            <p>
              I believe in high code quality and reliability — whether that&apos;s through rigorous
              testing or leveraging AI-assisted development to ship faster without sacrificing
              correctness.
            </p>
            <p>
              Outside of engineering, I&apos;m an avid runner, enjoy group fitness classes, love travelling, and spending quality time with my family.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-zinc-800">
              <Image
                src="/profile.jpg"
                alt="Dharmesh Charugundla"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <p className="font-mono text-cyan-400 text-xs mb-1">Education</p>
              <p className="text-white text-sm font-medium">M.S. Computer Science</p>
              <p className="text-zinc-400 text-sm">Arizona State University</p>
              <p className="text-zinc-500 text-xs font-mono mt-1">GPA: 3.93 / 4.0 · 2019</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <p className="font-mono text-cyan-400 text-xs mb-1">Currently</p>
              <p className="text-white text-sm font-medium">Meta</p>
              <p className="text-zinc-400 text-sm">Experimentation Platform Infra</p>
              <p className="text-zinc-500 text-xs font-mono mt-1">New York, NY</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
