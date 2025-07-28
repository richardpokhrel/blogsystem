"use client";

import React, { useState, useEffect } from "react";
import { NewsCard } from "@/components/ArticleCard";
import { FeaturedArticleCard } from "./ArticleFeaturedCard";
import { getBlogs } from "@/utils/blogStorage";
import { Skeleton } from "./ui/skeleton";

// Static data fallback
const newsArticles = [
  {
    id: 1,
    title: "Company Announces Breakthrough in Sustainable Technology",
    excerpt:
      "Our research team has developed a revolutionary approach to clean energy that could reduce carbon emissions by up to 40%.",
    category: "Innovation",
    date: "2023-11-15",
    readTime: "4 min",
    featured: true,
    image: "/placeholder-news1.jpg",
  },
  // ... add other articles here
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedBlogs = await getBlogs();
        setBlogs(fetchedBlogs.length > 0 ? fetchedBlogs : newsArticles);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blog posts");
        setBlogs(newsArticles);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const featuredArticle = blogs.find((article) => article.featured);
  const nonFeaturedArticles = blogs.filter((article) => !article.featured);

  if (isLoading) {
    return (
      <div className="flex flex-col">
        {/* Hero Section Skeleton */}
        <section className="relative h-[400px] sm:h-[500px] w-full bg-muted/50">
          <div className="container relative z-10 flex h-full items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Skeleton className="mb-4 h-12 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        </section>

        {/* Featured Article Skeleton */}
        <div className="container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>

        {/* Latest Updates Skeleton */}
        <div className="container mb-12 px-4">
          <Skeleton className="mb-8 h-8 w-1/4" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <p className="text-destructive">{error}</p>
        <p className="text-muted-foreground">Showing static content instead</p>
      </div>
    );
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

      {/* Featured Article Section */}
      <div className="container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {featuredArticle && <FeaturedArticleCard article={featuredArticle} />}
      </div>

      {/* Latest Updates Section */}
      <div className="container mb-12 px-4">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">Latest Updates</h2>
        {nonFeaturedArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {nonFeaturedArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground">No articles found</div>
        )}
      </div>
    </div>
  );
}
