export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-mono text-cyan-400 text-sm mb-2">04. Contact</h2>
        <h3 className="text-3xl font-bold text-white mb-4">Get In Touch</h3>
        <p className="text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed">
          Have a question or just want to connect? Feel free to reach out.
        </p>
        <a
          href="mailto:dharmesh2308@gmail.com"
          className="border border-cyan-400 text-cyan-400 font-semibold px-8 py-4 rounded hover:bg-cyan-400/10 transition-colors font-mono text-sm"
        >
          Say Hello
        </a>
      </div>
    </section>
  );
}
