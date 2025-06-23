import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "../lib/mdx";
import Layout from "../components/Layout";

export async function getStaticProps() {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(slugs.map(getPostBySlug));
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <Layout posts={posts}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-1000 relative overflow-hidden">
        {/* Floating Shapes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 dark:from-emerald-800/20 dark:to-teal-800/20 rounded-full animate-float"></div>
          <div className="absolute top-1/3 -left-20 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 dark:from-cyan-800/15 dark:to-blue-800/15 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-200/25 to-emerald-200/25 dark:from-teal-800/15 dark:to-emerald-800/15 rounded-full animate-float-slow"></div>
        </div>

        {/* Main Content - Empty Center Area */}
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-lg md:text-xl text-slate-400 dark:text-slate-500 opacity-60">
              سيتم عرض المقال هنا
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 