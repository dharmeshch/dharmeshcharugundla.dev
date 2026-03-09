import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog · Dharmesh Charugundla",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <p className="font-mono text-cyan-400 text-sm mb-2">Writing</p>
        <h1 className="text-3xl font-bold text-white mb-12">Blog</h1>
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="border-l-2 border-zinc-700 pl-6 hover:border-cyan-400 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-zinc-500 text-xs">{post.date}</span>
                  <span className="font-mono text-zinc-600 text-xs">·</span>
                  <span className="font-mono text-zinc-500 text-xs">{post.readTime}</span>
                </div>
                <h2 className="text-white font-semibold text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{post.summary}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
