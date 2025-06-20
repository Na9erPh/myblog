import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>مدونتي</h1>
      <div>
        {posts.map((post) => (
          <div key={post.slug} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
            <h2>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: '#0070f3' }}>
                {post.title}
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  let filenames = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    // مجلد posts غير موجود بعد
    return {
      props: {
        posts: []
      }
    };
  }

  const posts = filenames.map((name) => {
    const filePath = path.join(postsDirectory, name);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug: name.replace(/\.md$/, ''),
      title: data.title || 'بدون عنوان'
    };
  });

  return {
    props: {
      posts
    }
  };
} 