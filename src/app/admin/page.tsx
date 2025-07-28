'use client';
import { useAuthGuard } from '@/hooks/AuthGuard';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';
import { getBlogs, deleteBlog } from '@/utils/blogStorage';
import BlogEditor from '@/components/BlogEditor';
import { Plus, Edit3, Trash2, Calendar, Eye, MoreVertical, Sparkles, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { checking } = useAuthGuard();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!checking) {
      const data = getBlogs();
      setBlogs(data);
    }
  }, [checking]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const refresh = () => {
    setBlogs(getBlogs());
    setEditingBlog(null);
    setShowEditor(false);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowEditor(true);
    setActiveDropdown(null);
  };

  const handleNewPost = () => {
    setEditingBlog(null);
    setShowEditor(true);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-neutral-100">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-neutral-200 rounded-full animate-spin border-t-violet-500"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-violet-300"></div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Authenticating</h3>
              <p className="text-neutral-500">Securing your session...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header - 60% Neutral Base */}
      <div className="bg-white/95 backdrop-blur-2xl border-b border-neutral-200/50 sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-neutral-800 to-neutral-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">
                  Content Studio
                </h1>
                <p className="text-neutral-600 font-medium mt-1">Professional blog management suite</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Stats Card - 30% Neutral Secondary */}
              <div className="bg-neutral-100 rounded-2xl px-6 py-4 border border-neutral-200/60">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-neutral-700">Live</span>
                  </div>
                  <div className="w-px h-6 bg-neutral-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral-900">{blogs.length}</div>
                    <div className="text-xs text-neutral-500 font-medium">Posts</div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button - 10% Accent Color */}
              <button
                onClick={handleNewPost}
                className="group relative bg-violet-500 hover:bg-violet-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create Post</span>
                </div>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-8 py-12">
        {/* Editor Section */}
        {showEditor && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200/60 overflow-hidden">
              {/* Editor Header - 30% Neutral Secondary */}
              <div className="bg-neutral-100 px-10 py-8 border-b border-neutral-200/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center">
                      <Edit3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900">
                        {editingBlog ? 'Edit Post' : 'Create New Post'}
                      </h2>
                      <p className="text-neutral-600 mt-1">
                        {editingBlog ? 'Update your existing content' : 'Share your thoughts with the world'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowEditor(false)}
                    className="w-10 h-10 bg-neutral-200 hover:bg-neutral-300 rounded-xl flex items-center justify-center transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5 text-neutral-600 rotate-45" />
                  </button>
                </div>
              </div>
              
              <div className="p-10">
                <BlogEditor onSaved={refresh} editing={editingBlog} />
              </div>
            </div>
          </div>
        )}

        {/* Posts Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-neutral-900">Published Content</h2>
                <p className="text-neutral-600 mt-1">Manage your live blog posts</p>
              </div>
            </div>
            
            {!showEditor && (
              <button
                onClick={handleNewPost}
                className="flex items-center space-x-2 text-neutral-700 hover:text-violet-600 font-semibold bg-neutral-100 hover:bg-violet-50 px-6 py-3 rounded-xl transition-all duration-200 border border-neutral-200 hover:border-violet-200"
              >
                <Plus className="w-5 h-5" />
                <span>New Post</span>
              </button>
            )}
          </div>

          {blogs.length === 0 ? (
            
            <div className="bg-white rounded-3xl shadow-lg border border-neutral-200/60 p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-neutral-100 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-neutral-200">
                  <Edit3 className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">No content yet</h3>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  Start building your audience with compelling blog posts that engage and inspire your readers.
                </p>
                <button
                  onClick={handleNewPost}
                  className="bg-violet-500 hover:bg-violet-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Write Your First Post
                </button>
              </div>
            </div>
          ) : (
            /* Posts Grid - 60% Neutral Base */
            <div className="grid gap-8">
              {blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-neutral-200/60 hover:border-neutral-300/80 transition-all duration-500 overflow-hidden transform hover:scale-[1.01]"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="p-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1 pr-6">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-neutral-700 transition-colors duration-300 leading-tight">
                          {blog.title}
                        </h3>
                        <div className="flex items-center space-x-6 text-neutral-500">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span className="font-medium">
                              {new Date(blog.CreatedAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
                          <div className="text-sm bg-neutral-100 px-3 py-1 rounded-full font-medium">
                            Published
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions Dropdown - 30% Neutral Secondary */}
                      <div className="relative">
                        <button aria-level="this is the button"
                          onClick={() => setActiveDropdown(activeDropdown === blog.id ? null : blog.id)}
                          className="w-12 h-12 bg-neutral-100 hover:bg-neutral-200 rounded-2xl flex items-center justify-center transition-all duration-200 group/btn"
                        >
                          <MoreVertical className="w-5 h-5 text-neutral-600 group-hover/btn:text-neutral-800" />
                        </button>
                        
                        {activeDropdown === blog.id && (
                          <div className="absolute right-0 top-16 bg-white rounded-2xl shadow-2xl border border-neutral-200 py-3 z-20 min-w-[160px]">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="w-full text-left px-6 py-3 hover:bg-neutral-50 flex items-center space-x-3 text-neutral-700 hover:text-neutral-900 transition-colors duration-200 font-medium"
                            >
                              <Edit3 className="w-5 h-5" />
                              <span>Edit Post</span>
                            </button>
                            <div className="mx-3 my-2 h-px bg-neutral-200"></div>
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="w-full text-left px-6 py-3 hover:bg-red-50 flex items-center space-x-3 text-neutral-700 hover:text-red-600 transition-colors duration-200 font-medium"
                            >
                              <Trash2 className="w-5 h-5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                      <div className="flex space-x-4">
                        {/* Edit Button - 30% Neutral Secondary */}
                        <button
                          onClick={() => handleEdit(blog)}
                          className="flex items-center space-x-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                        >
                          <Edit3 className="w-5 h-5" />
                          <span>Edit</span>
                        </button>
                        
                        {/* Delete Button - 10% Accent Color */}
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="flex items-center space-x-3 bg-violet-50 hover:bg-violet-100 text-violet-700 hover:text-violet-800 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 border border-violet-200"
                        >
                          <Trash2 className="w-5 h-5" />
                          <span>Delete</span>
                        </button>
                      </div>
                      
                      <div className="text-xs text-neutral-400 bg-neutral-50 px-4 py-2 rounded-xl font-mono border border-neutral-200">
                        #{blog.id.slice(-8).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
      
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}