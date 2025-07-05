import Link from 'next/link';

const metadata = {
  title: 'Blog',
  description: 'Blog',
};

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <Link href="/blog/post">Post</Link>
    </div>
  );
}