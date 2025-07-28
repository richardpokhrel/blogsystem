"use client";

import React, { useState, useEffect } from "react";
import { NewsCard } from "@/components/ArticleCard";
import { getBlogs } from "@/utils/blogStorage";
import { BlogHero } from "@/components/blog";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const fetchedBlogs = await getBlogs(); // Await async call
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]); // fallback or empty array
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div>Loading blogs...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 dark:from-primary/80 dark:to-secondary/60" />
        <div className="absolute inset-0 bg-[url('/blog-hero-pattern.svg')] bg-[size:60px_60px] opacity-10" />

        <div className="container relative z-10 flex h-full items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">Our Blog</h1>
            <p className="text-lg sm:text-xl">
              Discover the latest insights, tutorials, and news from our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Featured Article */}
        {blogs.some(blog => blog.featured) && (
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">Featured Article</h2>
            <div className="grid grid-cols-1 gap-8">
              {blogs
                .filter(blog => blog.featured)
                .map(blog => (
                  <NewsCard
                    key={blog.id}
                    article={blog}
                    variant="featured" // Optional prop for styling featured cards
                  />
                ))}
            </div>
          </div>
        )}

        {/* Latest Articles */}
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">Latest Articles</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs
              .filter(blog => !blog.featured)
              .map(blog => (
                <NewsCard key={blog.id} article={blog} />
              ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">Browse by Category</h2>
          <div className="flex flex-wrap gap-4">
            {Array.from(new Set(blogs.map(blog => blog.category))).map(category => (
              <a
                key={category}
                href={`/blog/category/${category.toLowerCase()}`}
                className="rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/20"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
