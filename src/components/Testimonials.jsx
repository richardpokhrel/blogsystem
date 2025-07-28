import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const TestimonialSection = ({ testimonials, title, subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        {title && (
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative max-w-4xl mx-auto">
          <div className="p-8 bg-card rounded-xl shadow-sm border relative">
            <Quote className="absolute top-8 left-8 h-6 w-6 text-primary/20" />
            <p className="text-lg italic mb-6">
              &#34;{testimonials[currentIndex].quote}&#34;
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {testimonials[currentIndex].avatar ? (
                  <Image 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name}
                    className="rounded-full"
                    width={48}
                    height={48}
                  />
                ) : (
                  <span className="font-medium">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setCurrentIndex((prev) => 
                prev === 0 ? testimonials.length - 1 : prev - 1
              )}
              className="p-2 rounded-full border hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
              title="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => 
                (prev + 1) % testimonials.length
              )}
              className="p-2 rounded-full border hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
              title="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
