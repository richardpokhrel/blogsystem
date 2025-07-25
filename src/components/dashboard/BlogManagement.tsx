import React, { useState, useEffect } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { getBlogs, addBlog, deleteBlog, updateBlog } from "@/utils/blogStorage";
import { v4 as uuid } from "uuid";
import NewPost from "./createPost"; // Import your NewPost component

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    setBlogs(getBlogs());
  }, []);

  const handleCreatePost = (newPost: BlogPost) => {
    addBlog(newPost);
    setBlogs(getBlogs());
    setShowCreateModal(false);
    setEditingPost(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this post?")) {
      deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const handleUpdatePost = (updatedPost: BlogPost) => {
    updateBlog(updatedPost);
    setBlogs(getBlogs());
    setShowCreateModal(false);
    setEditingPost(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <button
          onClick={() => {
            setShowCreateModal(true);
            setEditingPost(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                {["Title", "Date", "Actions"].map((header) => (
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
              {blogs.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-sm text-gray-500"
                  >
                    No blog posts available.
                  </td>
                </tr>
              )}
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => {
                          setEditingPost(blog);
                          setShowCreateModal(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal with NewPost component */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blur-sm bg-opacity-40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative top-7">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowCreateModal(false);
                setEditingPost(null);
              }}
            >
              ✕
            </button>

            <NewPost
              onBack={() => {
                setShowCreateModal(false);
                setEditingPost(null);
              }}
              onSave={(postData) => {
                const post: BlogPost = {
                  id: editingPost?.id ?? uuid(),
                  title: postData.title,
                  content: postData.content,
                  images: postData.images || [],
                  createdAt: editingPost?.createdAt ?? new Date().toISOString(),
                };

                if (editingPost) {
                  handleUpdatePost(post);
                } else {
                  handleCreatePost(post);
                }
              }}
              initialData={
                editingPost
                  ? {
                      title: editingPost.title,
                      content: editingPost.content,
                      images: editingPost.images || [],
                    }
                  : undefined
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
