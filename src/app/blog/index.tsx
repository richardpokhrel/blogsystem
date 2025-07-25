import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { getBlogs } from '@/utils/blogStorage';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const data = getBlogs();
    setBlogs(data);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Blog Posts</h1>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.id} className="border p-4 rounded shadow">
            <Link href={`/blog/${blog.id}`}>
              <h2 className="text-xl font-semibold hover:underline">{blog.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
