import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: "https://dharmeshcharugundla.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://dharmeshcharugundla.dev/weeks",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://dharmeshcharugundla.dev/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://dharmeshcharugundla.dev/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "never" as const,
      priority: 0.7,
    })),
  ];
}
