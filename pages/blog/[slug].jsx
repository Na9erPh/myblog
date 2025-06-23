import { MDXRemote } from "next-mdx-remote";
import { getAllSlugs, getPostBySlug } from "../../lib/mdx";
import Link from "next/link";
import Layout from "../../components/Layout";
import ShareButton from "../../components/ShareButton";
import { useState, useEffect } from "react";

const components = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mb-6 text-blue-500 dark:text-blue-400 text-center" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 mb-4 text-2xl font-semibold text-blue-500 dark:text-blue-400" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-3 text-xl font-medium text-gray-800 dark:text-gray-200" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300 text-justify" {...props} />
  ),
  img: (props) => (
    <img className="my-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto" alt={props.alt} {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-r-4 border-blue-500 bg-gray-50 dark:bg-gray-800 p-4 my-6 italic" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  code: (props) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props} />
  ),
  pre: (props) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6" {...props} />
  ),
};

export async function getStaticPaths() {
  const slugs = await getAllSlugs();
  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const { frontMatter, mdxSource } = await getPostBySlug(params.slug);
  const slugs = await getAllSlugs();
  const allPosts = await Promise.all(slugs.map(getPostBySlug));
  return { props: { frontMatter, mdxSource, posts: allPosts } };
}

export default function PostPage({ frontMatter, mdxSource, posts }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(JSON.parse(savedTheme));
    
    // مراقبة تغييرات الوضع الليلي
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <Layout posts={posts}>
      <article className="max-w-none mx-auto">
        <div className="flex justify-between items-start mb-8">
          <Link href="/" className="inline-block text-blue-500 dark:text-blue-400 hover:underline text-sm">
            ← العودة للرئيسية
          </Link>
          
          {/* زر المشاركة */}
          <ShareButton 
            title={frontMatter.title}
            slug={frontMatter.slug}
            darkMode={darkMode}
          />
        </div>
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-6 text-blue-500 dark:text-blue-400">{frontMatter.title}</h1>
          {frontMatter.excerpt && (
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">{frontMatter.excerpt}</p>
          )}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"></div>
        </header>

        <div className="prose prose-lg max-w-none dark:prose-invert mx-auto">
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </article>
    </Layout>
  );
} 