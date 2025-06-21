import { MDXRemote } from "next-mdx-remote";
import { getAllSlugs, getPostBySlug } from "../../lib/mdx";
import Link from "next/link";

const components = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mb-6 text-primary" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 mb-4 text-2xl font-semibold text-primary" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-3 text-xl font-medium text-gray-800" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed text-gray-700" {...props} />
  ),
  img: (props) => (
    <img className="my-6 rounded-lg shadow-lg w-full" alt={props.alt} {...props} />
  ),
};

export async function getStaticPaths() {
  const slugs = await getAllSlugs();
  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const { frontMatter, mdxSource } = await getPostBySlug(params.slug);
  return { props: { frontMatter, mdxSource } };
}

export default function PostPage({ frontMatter, mdxSource }) {
  return (
    <article className="max-w-4xl mx-auto">
      <Link href="/" className="inline-block mb-6 text-primary hover:underline">
        ← العودة للرئيسية
      </Link>
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">{frontMatter.title}</h1>
        {frontMatter.excerpt && (
          <p className="text-lg text-gray-600 leading-relaxed">{frontMatter.excerpt}</p>
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </article>
  );
} 