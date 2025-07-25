import { Link } from "lucide-react";
import { Button } from "./ui/button";


export const CTASection = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  background = "gradient",
}: {
  title: string;
  subtitle?: string;
  primaryAction?: {
    text: string;
    link: string;
  };
  secondaryAction?: {
    text: string;
    link: string;
  };
  background?: "gradient" | "solid" | "none";
}) => {
  const backgroundClasses = {
    gradient: "bg-gradient-to-r from-primary/10 to-primary/5",
    solid: "bg-primary/5",
    none: "",
  };

  return (
    <section className="py-20">
      <div className={`container px-4 mx-auto rounded-2xl ${backgroundClasses[background]} py-16`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground mb-8">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {primaryAction && (
              <Button asChild size="lg">
                <Link href={primaryAction.link}>
                  {primaryAction.text}
                </Link>
              </Button>
            )}
            {secondaryAction && (
              <Button variant="outline" asChild size="lg">
                <Link href={secondaryAction.link}>
                  {secondaryAction.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};