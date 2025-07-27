'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


import { getBlogs } from '@/utils/blogStorage';

import { isUserAuthenticated, getCurrentUser, userExists } from "@/utils/auth";
import { RatingComponent } from '@/components/starRating';
import  { CommentForm } from '@/components/comment';




interface BlogPost {
  id: string;
  title: string;
  content: string;
  images?: {
    id: number;
    url: string;
    name: string;
  }[];
  CreatedAt: string;
}

interface Comment {
  id: string;
  articleId: string;
  user: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface Rating {
  id: string; // unique rating ID (e.g., UUID)
  articleId: string;
  user: string; // username or email
  rating: number; // 1 to 5
  createdAt: string;
}



export default function BlogDetailPage() {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [User, setUser] = useState(null);

     useEffect(() => {
    if (typeof window !== 'undefined') {
      setisLoggedIn(isUserAuthenticated());
      setUser(getCurrentUser());
    }
  }, []);
    
  
  const { id } = useParams();
  const [article, setArticle] = useState<BlogPost | null>(null);


  useEffect(() => {
    const data = localStorage.getItem('blogs');
    if (data) {
      const blogs: BlogPost[] = JSON.parse(data);
      const found = blogs.find((b) => b.id === id);
      setArticle(found ?? null);
    }
  }, [id]);

  useEffect(() => {
  console.log('isLoggedIn:', isLoggedIn);
  console.log('user:', User);
  console.log('article:', article);
}, [isLoggedIn, User, article]);


 if (!User || !userExists(User.username)) 
 {
    return (
      <div className="text-sm text-red-600">
        Please <a href="/login" className="underline text-blue-600">log in</a> to leave a comment or rate.
      </div>
    );
  }
  console.log("getCurrentUser():", getCurrentUser());
console.log("localStorage.loggedInUser:", localStorage.getItem("loggedInUser"));


  if (!article) return <div className="text-center py-20 text-gray-500">Loading or blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">Published on {new Date(article.CreatedAt).toLocaleDateString()}</p>

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

       

      <CommentForm blogId={article.id} user={User} />







        {/* <div className="border-t pt-6">
        <h2 className="text-2xl font-semibold mb-2">Comments & Ratings</h2>
        <p className="text-sm text-gray-500 mb-4">Average Rating: ⭐ {averageRating}</p>

        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="mb-4 border p-4 rounded bg-gray-50">
              <div className="text-sm text-gray-600">{c.user} — ⭐ {c.rating}</div>
              <p className="mt-1">{c.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(c.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div> */}

      {/* Add comment */}
      {/* <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold mb-2">Leave a Comment</h3>
        <textarea
          className="w-full border p-2 rounded mb-2"
          rows={3}
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-1 rounded"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} ⭐
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Comment
        </button>
      </div> */}
      </div>
    </div>
  );
}
