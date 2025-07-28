'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import Link from "next/link";

export const BlogHeroSection = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 12 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center bg-gradient-to-b from-background via-primary/5 to-background px-4 py-20 text-center sm:px-6 lg:px-8">
      {/* Background gradients & sparkle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]" />
        {sparkles.map(({ top, left, size, duration, delay }, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              top,
              left,
              width: `${size}px`,
              height: `${size}px`,
              animation: `float ${duration}s infinite ease-in-out alternate`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      {/* Featured badge */}
      <div className="group mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all hover:bg-primary/10 max-w-max">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>Explore our latest articles</span>
        <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </div>

      {/* Heading */}
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight leading-tight sm:text-5xl lg:text-6xl">
        Insights & <span className="text-primary">Inspiration</span> for Modern Creators
      </h1>

      {/* Subheading */}
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
        Dive into our curated collection of articles, tutorials, and case studies designed to elevate your creative journey.
      </p>

      {/* Search and CTA */}
      <div className="mt-10 flex w-full max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="relative w-full sm:w-auto flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search articles..." className="w-full pl-10" />
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/blog/categories">Browse Categories</Link>
        </Button>
      </div>

      {/* Tags */}
      <div className="mt-12 flex flex-wrap justify-center gap-3 px-4 sm:px-0">
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

      {/* Floating gradient blob */}
      <div className="pointer-events-none absolute -right-20 top-1/2 hidden h-96 w-96 -translate-y-1/2 rounded-full bg-primary/20 opacity-40 blur-3xl lg:block" />

      {/* Animations */}
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
