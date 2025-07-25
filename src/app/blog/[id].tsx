import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BlogPost, Comment } from '@/types/blog';
import { getBlogById } from '@/utils/blogStorage';
import { getComments, addComment } from '@/utils/CommentStorage';
import { v4 as uuid } from 'uuid';

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    if (typeof id === 'string') {
      const data = getBlogById(id);
      if (data) {
        setBlog(data);
        setComments(getComments(id));
      }
    }
  }, [id]);

  const handleComment = () => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: uuid(),
      blogId: id as string,
      text,
      rating,
      createdAt: new Date().toISOString(),
    };
    addComment(newComment);
    setComments([...comments, newComment]);
    setText('');
    setRating(5);
  };

  if (!blog) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-600 text-sm mb-4">Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
      <p className="mb-8">{blog.content}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Leave a Comment</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Your thoughts..."
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mb-2 p-2 border rounded"
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>{star} Star{star !== 1 ? 's' : ''}</option>
          ))}
        </select>
        <br />
        <button
          onClick={handleComment}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Comment
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {comments.length === 0 && <p>No comments yet.</p>}
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li key={comment.id} className="border p-3 rounded">
              <p>{comment.text}</p>
              <p className="text-sm text-gray-500">
                {comment.rating} Stars • {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
