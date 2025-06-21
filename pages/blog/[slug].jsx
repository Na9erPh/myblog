import { MDXRemote } from "next-mdx-remote";
import { getAllSlugs, getPostBySlug } from "../../lib/mdx";

const components = {
  h2: (props) => (
    <h2 className="mt-8 mb-4 text-xl font-semibold text-primary" {...props} />
  ),
  img: (props) => (
    <img className="my-6 rounded-lg shadow" alt={props.alt} {...props} />
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
    <article className="prose lg:prose-lg mx-auto">
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
} 