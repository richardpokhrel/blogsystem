import { BlogPost } from "@/types/blog";

const BLOG_KEY = 'blogs';

export function getBlogs(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(BLOG_KEY);
  return data ? JSON.parse(data) as BlogPost[] : [];
}

export function saveBlogs(blogs: BlogPost[]): void {
  try {
    localStorage.setItem(BLOG_KEY, JSON.stringify(blogs));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert("You've reached the localStorage limit. Delete some posts first.");
    } else {
      console.error('Failed to save blogs:', error);
    }
  }
}

export function addBlog(blog: BlogPost): void {
  const blogs = getBlogs();
  saveBlogs([blog, ...blogs]);
}

export function updateBlog(updatedBlog: BlogPost): void {
  const blogs = getBlogs().map((b) =>
    b.id === updatedBlog.id ? updatedBlog : b
  );
  saveBlogs(blogs);
}

export function deleteBlog(blogId: string): void {
  const blogs = getBlogs().filter((b) => b.id !== blogId);
  saveBlogs(blogs);
}

export function getBlogById(id: string): BlogPost | undefined {
  return getBlogs().find((b) => b.id === id);
}
