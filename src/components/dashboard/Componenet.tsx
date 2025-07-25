import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Comment } from '@/types/blog';
import { getAllComments, deleteComment, updateComment } from '@/utils/CommentStorage'
import { getBlogs } from '@/utils/blogStorage';

const CommentsManagement = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [blogMap, setBlogMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadedComments = getAllComments();
    const blogs = getBlogs();
    const blogTitleMap = blogs.reduce((acc, blog) => {
      acc[blog.id] = blog.title;
      return acc;
    }, {} as Record<string, string>);

    setBlogMap(blogTitleMap);
    setComments(loadedComments);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this comment?')) {
      deleteComment(id);
      setComments(getAllComments());
    }
  };

  const handleToggleStatus = (comment: Comment) => {
    const updated = {
      ...comment,
      status: comment.status === 'approved' ? 'pending' : 'approved',
    };
    updateComment(updated);
    setComments(getAllComments());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments Management</h2>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                {['Author', 'Comment', 'Blog Post', 'Date', 'Status', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{comment.author}</td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{comment.text}</td>
                  <td className="px-6 py-4 text-sm">{blogMap[comment.blogId] ?? 'Unknown Blog'}</td>
                  <td className="px-6 py-4 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(comment)}
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        comment.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {comment.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-600 hover:text-red-900"
                      aria-label={`Delete comment by ${comment.author}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {comments.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-sm text-gray-500">
                    No comments available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommentsManagement;
