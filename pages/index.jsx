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
      {posts.map(({ frontMatter }) => (
        <article key={frontMatter.title}>
          <h2 className="text-2xl font-bold">
            <Link href={`/blog/${frontMatter.slug || frontMatter.title}`}>
              {frontMatter.title}
            </Link>
          </h2>
          <p className="text-gray-600">{frontMatter.excerpt}</p>
        </article>
      ))}
    </section>
  );
} 