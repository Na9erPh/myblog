import { promises as fs } from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export async function getPostBySlug(slug) {
  const source = await fs.readFile(`posts/${slug}.md`, "utf8");
  const { data, content } = matter(source);
  const mdxSource = await serialize(content);
  return { frontMatter: { ...data, slug }, mdxSource };
}

export async function getAllSlugs() {
  const files = await fs.readdir("posts");
  return files.map((f) => f.replace(/\.md$/, ""));
} 