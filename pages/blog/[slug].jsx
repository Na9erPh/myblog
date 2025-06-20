import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';

export default function Post({ frontMatter, mdxSource }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link href="/" style={{ textDecoration: 'none', color: '#0070f3' }}>
        ← العودة للرئيسية
      </Link>
      <h1 style={{ marginTop: '20px' }}>{frontMatter.title}</h1>
      <div style={{ lineHeight: '1.6', marginTop: '20px' }}>
        <MDXRemote {...mdxSource} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  let filenames = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    return {
      paths: [],
      fallback: false
    };
  }

  const paths = filenames.map((name) => ({
    params: {
      slug: name.replace(/\.md$/, '')
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const postFilePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);
  
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter: data,
      mdxSource
    }
  };
} 