'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { getBlogs } from '@/utils/blogStorage';
import { isUserAuthenticated, getCurrentUser, userExists } from "@/utils/auth";
import { RatingComponent } from '@/components/starRating';
import { CommentForm } from '@/components/comment';

export default function BlogDetailPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(isUserAuthenticated());
      setUser(getCurrentUser());
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem('blogs');
    if (data) {
      const blogs = JSON.parse(data);
      const found = blogs.find((b) => b.id === id);
      setArticle(found ?? null);
    }
  }, [id]);

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
    console.log('user:', user);
    console.log('article:', article);
  }, [isLoggedIn, user, article]);

  if (!user || !userExists(user.username)) {
    return (
      <div className="text-sm text-red-600">
        Please{" "}
        <Link href="/login" className="underline text-blue-600">
          log in
        </Link>{" "}
        to leave a comment or rate.
      </div>
    );
  }

  console.log("getCurrentUser():", getCurrentUser());
  console.log("localStorage.loggedInUser:", localStorage.getItem("loggedInUser"));

  if (!article) {
    return <div className="text-center py-20 text-gray-500">Loading or blog not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on {new Date(article.CreatedAt).toLocaleDateString()}
      </p>

      {article.images && article.images.length > 0 && (
        <div className="mb-8">
          <img
            src={article.images[0].url}
            alt={article.images[0].name}
            className="w-full h-auto rounded-xl shadow-md object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-800">
        <p>{article.content}</p>
      </div>

      <div className="mt-10">
        <CommentForm blogId={article.id} />
      </div>
    </div>
  );
}
