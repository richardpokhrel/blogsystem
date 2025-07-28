import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  getAllComments,
  deleteComment,
  updateComment,
} from "@/utils/CommentStorage";
import { getBlogs } from "@/utils/blogStorage";

const CommentsManagement = () => {
  const [comments, setComments] = useState([]);
  const [blogMap, setBlogMap] = useState({});

  useEffect(() => {
    const loadedComments = getAllComments();
    const ratings = JSON.parse(localStorage.getItem("ratings") || "[]");
    const blogs = getBlogs();

    const blogTitleMap = blogs.reduce((acc, blog) => {
      acc[blog.id] = blog.title;
      return acc;
    }, {});

    // Attach ratings to comments if they match
    const enrichedComments = loadedComments.map((comment) => {
      const matchingRating = ratings.find(
        (r) => r.blogId === comment.blogId && r.userId === comment.author
      );
      return {
        ...comment,
        rating: matchingRating?.rating || comment.rating || 0,
      };
    });

    setBlogMap(blogTitleMap);
    setComments(enrichedComments);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("comments") || "[]");
    setComments(stored);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this comment?")) {
      deleteComment(id);
      setComments(getAllComments());
    }
  };

  const handleToggleStatus = (comment) => {
    const updated = {
      ...comment,
      status: comment.status === "approved" ? "pending" : "approved",
    };
    updateComment(updated);
    setComments(getAllComments());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Comments Management
      </h2>
      <input
        type="text"
        placeholder="Search by author or comment..."
        onChange={(e) => {
          const query = e.target.value.toLowerCase();
          const all = getAllComments();
          const filtered = all.filter(
            (c) =>
              c.author.toLowerCase().includes(query) ||
              c.text.toLowerCase().includes(query)
          );
          setComments(filtered);
        }}
        className="mb-4 w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Author",
                  "Comment",
                  "Blog Post",
                  "Date",
                  "Rating",
                  "Status",
                  "Actions",
                ].map((header) => (
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
              {comments.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-sm text-gray-500"
                  >
                    No comments available.
                  </td>
                </tr>
              ) : (
                comments.map((comment) => (
                  <tr key={comment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {comment.author}
                    </td>
                    <td className="px-6 py-4 text-sm max-w-xs truncate">
                      {comment.text}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {blogMap[comment.blogId] ?? "Unknown Blog"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i <= comment.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(comment)}
                        className={`px-2 py-1 text-xs rounded-full font-semibold ${
                          comment.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommentsManagement;
