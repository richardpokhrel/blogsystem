'use client';

import React, { useState, useEffect } from "react";
import { HeroSection } from "@/components/NewsHero";
import { FeaturedArticleCard } from "@/components/ArticleFeaturedCard";
import { NewsFilterBar } from "@/components/NewsFilter";
import { NewsCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { CTASection } from "@/components/CTA";
import { getBlogs } from "@/utils/blogStorage";

// import { getBlogs } from "@/utils/blogStorage";



const NewsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your real data fetching function
        const fetchedBlogs = await getBlogs();
        setBlogs(fetchedBlogs.length ? fetchedBlogs : newsArticles);
      } catch (err) {
        console.error("Failed to load blogs, using static fallback.");
        setBlogs(newsArticles);
      }
    };

    fetchData();
  }, []);

  // Use blogs state to get featured article dynamically
  const featuredArticle = blogs.find((article) => article.featured);

  return (
    <div className="bg-background">
      <HeroSection />
      <div className="container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {featuredArticle && <FeaturedArticleCard article={featuredArticle} />}
        <NewsFilterBar />
        <div className="container mb-12 px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">Latest Updates</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs
              .filter((article) => !article.featured)
              .map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
          </div>
        </div>
        <Pagination />
        <CTASection
          title="Ready to get started?"
          subtitle="Join thousands of satisfied customers building with our platform"
          primaryAction={{ text: "Start Free Trial", link: "/signup" }}
          secondaryAction={{ text: "Schedule Demo", link: "/demo" }}
          background="gradient"
        />
      </div>
    </div>
  );
};

export default NewsPage;
