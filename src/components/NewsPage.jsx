import { HeroSection } from "@/components/NewsHero";
import { FeaturedArticleCard } from "@/components/ArticleFeaturedCard";
import { NewsFilterBar } from "@/components/NewsFilter";
import { NewsCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { CTASection } from "@/components/CTA";

const NewsPage = () => {
  // const newsArticles = [
  //   {
  //     id: 1,
  //     title: "Company Announces Breakthrough in Sustainable Technology",
  //     excerpt: "Our research team has developed a revolutionary approach to clean energy that could reduce carbon emissions by up to 40%.",
  //     category: "Innovation",
  //     date: "2023-11-15",
  //     readTime: "4 min",
  //     featured: true,
  //     image: "/placeholder-news1.jpg"
  //   },
  //   {
  //     id: 2,
  //     title: "Annual Leadership Summit Brings Together Industry Experts",
  //     excerpt: "Over 200 executives gathered to discuss the future of digital transformation in the post-pandemic economy.",
  //     category: "Events",
  //     date: "2023-11-10",
  //     readTime: "6 min",
  //     featured: false,
  //     image: "/placeholder-news2.jpg"
  //   },
  //   {
  //     id: 3,
  //     title: "New Partnership Expands Global Market Reach",
  //     excerpt: "Strategic alliance with international firm opens doors to three new markets across Asia and Europe.",
  //     category: "Business",
  //     date: "2023-11-05",
  //     readTime: "3 min",
  //     featured: false,
  //     image: "/placeholder-news3.jpg"
  //   },
  //   {
  //     id: 4,
  //     title: "Employee Wellness Program Wins Industry Recognition",
  //     excerpt: "Our innovative workplace health initiative has been awarded the prestigious Workplace Excellence Award.",
  //     category: "Culture",
  //     date: "2023-10-28",
  //     readTime: "5 min",
  //     featured: false,
  //     image: "/placeholder-news4.jpg"
  //   },
  //   {
  //     id: 5,
  //     title: "Quarterly Financial Results Exceed Expectations",
  //     excerpt: "Strong performance across all business units leads to 22% year-over-year revenue growth.",
  //     category: "Financial",
  //     date: "2023-10-20",
  //     readTime: "7 min",
  //     featured: false,
  //     image: "/placeholder-news5.jpg"
  //   },
  //   {
  //     id: 6,
  //     title: "New Product Line Set to Launch in Q1 2024",
  //     excerpt: "Preview of our next-generation solutions that will redefine customer experiences in our industry.",
  //     category: "Products",
  //     date: "2023-10-15",
  //     readTime: "4 min",
  //     featured: false,
  //     image: "/placeholder-news6.jpg"
  //   },
  // ];

  const featuredArticle = newsArticles.find(article => article.featured);

  return (
    <div className="bg-background">
      <HeroSection />
      <div className="container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {featuredArticle && <FeaturedArticleCard article={featuredArticle} />}
        <NewsFilterBar />
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
