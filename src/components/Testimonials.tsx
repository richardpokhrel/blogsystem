import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export const TestimonialSection = ({
  testimonials,
  title,
  subtitle,
}: {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

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
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {testimonials[currentIndex].avatar ? (
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name}
                    className="rounded-full"
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
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => 
                (prev + 1) % testimonials.length
              )}
              className="p-2 rounded-full border hover:bg-primary/10 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};