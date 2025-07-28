"use client";

import { NewsCard } from "@/components/ArticleCard";
import { FeaturedArticleCard } from "@/components/ArticleFeaturedCard";
import { getBlogs } from "@/utils/blogStorage";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CTASection from "@/components/CTA";





// Static data fallback
const newsArticles = [
  {
    id: 1,
    title: "Company Announces Breakthrough in Sustainable Technology",
    excerpt: "Our research team has developed a revolutionary approach to clean energy that could reduce carbon emissions by up to 40%.",
    category: "Innovation",
    date: "2023-11-15",
    readTime: "4 min",
    featured: true,
    image: "/placeholder-news1.jpg",
  },
  // Add more static articles as needed
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  const featuredArticle = blogs.find((article) => article.featured);
  const nonFeaturedArticles = blogs.filter((article) => !article.featured);

  if (isLoading) {
    return (
      <div className="flex flex-col">
        {/* Hero Section Skeleton */}
        <section className="relative h-[400px] sm:h-[500px] w-full bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container relative z-10 flex h-full items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-4">
              <Skeleton className="h-12 w-3/4 rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-5/6 rounded-lg" />
            </div>
          </div>
        </section>

        {/* Featured Article Skeleton */}
        <div className="container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col gap-6 md:flex-row">
              <Skeleton className="h-64 w-full rounded-xl md:w-1/2" />
              <div className="flex w-full flex-col justify-center md:w-1/2">
                <Skeleton className="mb-2 h-6 w-32 rounded-full" />
                <Skeleton className="mb-4 h-8 w-full rounded-lg" />
                <Skeleton className="mb-4 h-6 w-full rounded-lg" />
                <Skeleton className="mb-4 h-6 w-4/5 rounded-lg" />
                <div className="mt-4 flex items-center gap-4">
                  <Skeleton className="h-5 w-24 rounded-lg" />
                  <Skeleton className="h-5 w-16 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Updates Skeleton */}
        <div className="container mb-12 px-4">
          <Skeleton className="mb-8 h-9 w-48 rounded-lg" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                <Skeleton className="h-48 w-full rounded-t-xl" />
                <div className="p-6">
                  <Skeleton className="mb-2 h-5 w-24 rounded-full" />
                  <Skeleton className="mb-3 h-6 w-full rounded-lg" />
                  <Skeleton className="mb-4 h-5 w-4/5 rounded-lg" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20 rounded-lg" />
                    <Skeleton className="h-4 w-16 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <p className="mb-2 text-lg font-medium text-destructive">{error}</p>
        <p className="text-muted-foreground">Showing static content instead</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
     
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
    {/* Background elements */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-0 -ml-24 -translate-x-1/2 blur-3xl lg:ml-24 xl:-ml-48">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary to-secondary opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
    
    <div className="container px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
          Latest Insights
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Discover Our <span className="text-primary">Blog</span>
        </h1>
        
        {/* Subheading */}
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Dive into our collection of articles, tutorials, and thought leadership pieces that showcase our expertise.
        </p>
        
        {/* Search/CTA (optional) */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              className="block w-full rounded-full border-0 bg-muted/50 py-3 pl-6 pr-12 text-muted-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex py-3 pr-3">
              <button
                type="button"
                className="rounded-full bg-primary p-2 text-white shadow-sm hover:bg-primary/90  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Wave divider */}
    <div className="absolute inset-x-0 bottom-0 h-24 bg-[url('/wave-pattern.svg')] bg-[length:1200px_100px] bg-repeat-x opacity-10"></div>
  </section>

      {/* Featured Article Section */}
     

      {/* Latest Updates Section */}
      <div className="container mb-12 px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest Updates</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent ml-4"></div>
        </div>
        
        {nonFeaturedArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {nonFeaturedArticles.map((article) => (
              <div 
                key={article.id} 
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <NewsCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">No articles found</h3>
            <p className="text-muted-foreground">Check back later for new updates</p>
          </div>
        )}
      </div>
      
      <CTASection
        title="Ready to get started?"
        subtitle="Join thousands of satisfied customers building with our platform"
        primaryAction={{ text: "Start Free Trial", link: "/signup" }}
        secondaryAction={{ text: "Schedule Demo", link: "/demo" }}
        background="gradient"
      />
    </div>
  );
}