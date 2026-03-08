import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
<Contact />
      <footer className="text-center py-6 text-zinc-600 font-mono text-xs border-t border-zinc-800">
        Designed & Built by Dharmesh Charugundla
      </footer>
    </main>
  );
}
