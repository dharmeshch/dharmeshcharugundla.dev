import Navbar from "@/components/Navbar";
import { getPost, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: `${post.title} · Dharmesh Charugundla` };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link href="/blog" className="font-mono text-zinc-500 text-xs hover:text-cyan-400 transition-colors mb-8 inline-block">
          ← Back to blog
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-zinc-500 text-xs">{post.date}</span>
          <span className="font-mono text-zinc-600 text-xs">·</span>
          <span className="font-mono text-zinc-500 text-xs">{post.readTime}</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-12 leading-tight">{post.title}</h1>
        <div className="prose prose-invert prose-cyan max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
          prose-code:text-cyan-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700 prose-pre:rounded-lg
          prose-strong:text-white
          prose-li:text-zinc-400
          prose-hr:border-zinc-700">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}
