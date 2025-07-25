'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import Link from "next/link";

export const BlogHeroSection = () => {
  return (
    <section className=" max-w-7xl">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[100vh] w-[100vw] -translate-x-1/2 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Content */}
      <div className="container relative flex min-h-[80vh] flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        {/* Animated sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out alternate`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Featured badge */}
        <div className="group relative mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all hover:bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Explore our latest articles</span>
          <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </div>

        {/* Main heading */}
        <h1 className="mx-auto max-w-6xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Insights & <span className="text-primary">Inspiration</span> for Modern Creators
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Dive into our curated collection of articles, tutorials, and case studies designed to elevate your creative journey.
        </p>

        {/* Search and CTA */}
        <div className="mt-10 flex w-full max-w-xl flex-col items-center gap-4 sm:flex-row">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="w-full pl-10"
            />
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/blog/categories">Browse Categories</Link>
          </Button>
        </div>

        {/* Featured tags */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {["Design", "Development", "Productivity", "UX", "Case Studies", "Tutorials"].map((tag) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className="rounded-full"
              asChild
            >
              <Link href={`/blog/tags/${tag.toLowerCase()}`}>{tag}</Link>
            </Button>
          ))}
        </div>

        {/* Featured post preview (desktop only) */}
       
      </div>

      {/* Floating gradient blob */}
      <div className="absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/20 opacity-40 blur-3xl" />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </section>
  );
};