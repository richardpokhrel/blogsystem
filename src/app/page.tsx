'use client';

import { features } from "process"
import { FeaturedArticleCard } from "@/components/ArticleFeaturedCard"


import { Code, Rocket, Zap, Shield, Globe, BarChart } from "lucide-react"

import { NewsCard } from "@/components/ArticleCard"
import { getBlogs } from "@/utils/blogStorage"
import { useState, useEffect } from "react"
import { BlogHeroSection } from "@/components/HeroSection";
import { ContentImageSection } from "@/components/ContentImageSection";
import { FeatureGridSection } from "@/components/FeatureSection";



  
     const newsArticles = [
    {
      id: 1,
      title: "Company Announces Breakthrough in Sustainable Technology",
      excerpt: "Our research team has developed a revolutionary approach to clean energy that could reduce carbon emissions by up to 40%.",
      category: "Innovation",
      date: "2023-11-15",
      readTime: "4 min",
      featured: true,
      image: "/placeholder-news1.jpg"
    },
    {
      id: 2,
      title: "Annual Leadership Summit Brings Together Industry Experts",
      excerpt: "Over 200 executives gathered to discuss the future of digital transformation in the post-pandemic economy.",
      category: "Events",
      date: "2023-11-10",
      readTime: "6 min",
      featured: false,
      image: "/placeholder-news2.jpg"
    },
    {
      id: 3,
      title: "New Partnership Expands Global Market Reach",
      excerpt: "Strategic alliance with international firm opens doors to three new markets across Asia and Europe.",
      category: "Business",
      date: "2023-11-05",
      readTime: "3 min",
      featured: false,
      image: "/placeholder-news3.jpg"
    },
    {
      id: 4,
      title: "Employee Wellness Program Wins Industry Recognition",
      excerpt: "Our innovative workplace health initiative has been awarded the prestigious Workplace Excellence Award.",
      category: "Culture",
      date: "2023-10-28",
      readTime: "5 min",
      featured: false,
      image: "/placeholder-news4.jpg"
    },
    {
      id: 5,
      title: "Quarterly Financial Results Exceed Expectations",
      excerpt: "Strong performance across all business units leads to 22% year-over-year revenue growth.",
      category: "Financial",
      date: "2023-10-20",
      readTime: "7 min",
      featured: false,
      image: "/placeholder-news5.jpg"
    },
    {
      id: 6,
      title: "New Product Line Set to Launch in Q1 2024",
      excerpt: "Preview of our next-generation solutions that will redefine customer experiences in our industry.",
      category: "Products",
      date: "2023-10-15",
      readTime: "4 min",
      featured: false,
      image: "/placeholder-news6.jpg"
    },
  ]
    




export default function HeroPage() {
    const [Blogs, setBlogs] = useState([]);
    useEffect(() =>{
        const fetchedBlogs = getBlogs();
        setBlogs(fetchedBlogs);
    },[]);



const featuredArticle = newsArticles.find(article => article.featured)
  
    return (
        
        <>
        <BlogHeroSection/>
        {/* <FeaturedArticleCard/> */}
        <div className="container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {featuredArticle && <FeaturedArticleCard article={featuredArticle} />}
      </div>
        <div className="mb-12">
                  <h2 className="mb-8 text-2xl font-bold tracking-tight">Latest Updates</h2>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {Blogs
                    .filter(article => !article.featured)
                    .map(article =>(
                        <NewsCard key={article.id} article={article} />
                    ))
                    }
                  </div>
                </div>
        
        
      <ContentImageSection
        title="Designed for performance"
        subtitle="Built from the ground up for speed"
        content="Our technology stack is optimized for speed and reliability, leveraging the latest advancements in web technology to deliver exceptional user experiences. With server-side rendering, edge caching, and intelligent prefetching, your applications will feel instantaneous."
        image={
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:40px_40px] opacity-10" />
          </div>
        }
        imagePosition="right"
        actions={[
          { 
            text: "View Case Studies", 
            link: "/case-studies",
            variant: "outline"
          },
          { 
            text: "Technical Overview", 
            link: "/technology",
            variant: "default"
          }
        ]}
      />


        </>

    )
}