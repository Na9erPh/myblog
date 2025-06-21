import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "../lib/mdx";

export async function getStaticProps() {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(slugs.map(getPostBySlug));
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">أحدث المقالات</h1>
      {posts.map(({ frontMatter }) => (
        <article key={frontMatter.title} className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
            <Link href={`/blog/${frontMatter.slug || frontMatter.title}`}>
              {frontMatter.title}
            </Link>
          </h2>
          <p className="text-gray-600 leading-relaxed">{frontMatter.excerpt}</p>
        </article>
      ))}
    </section>
  );
} 