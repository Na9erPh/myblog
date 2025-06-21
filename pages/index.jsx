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
      <div className="min-h-screen">
        {/* Clean Welcome Section */}
        <div className="text-center py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              مرحباً بك في مدونتي
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              اختر مقالاً من الشريط الجانبي للقراءة، أو استخدم أدوات التحكم لتخصيص تجربة القراءة.
            </p>
          </div>
          
          {/* Simple line */}
          <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 mx-auto mb-8"></div>
        </div>
        
        {/* Simple Articles List */}
        {posts.length > 0 && (
          <div className="py-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
              المقالات المتاحة
            </h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              {posts.slice(0, 5).map(({ frontMatter }) => (
                <article key={frontMatter.title} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <h4 className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400 hover:underline">
                    <Link href={`/blog/${frontMatter.slug || frontMatter.title}`}>
                      {frontMatter.title}
                    </Link>
                  </h4>
                  {frontMatter.excerpt && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {frontMatter.excerpt}
                    </p>
                  )}
                </article>
              ))}
            </div>
            
            {posts.length > 5 && (
              <p className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
                والمزيد في الشريط الجانبي...
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
} 