import { cn } from "@/lib/utils";

type ContentImageSectionProps = {
  title: string;
  subtitle?: string;
  content?: string;
  image: React.ReactNode;
  imagePosition?: "left" | "right";
  actions?: {
    text: string;
    link: string;
    variant?: "default" | "outline";
  }[];
  className?: string;
};

export const ContentImageSection = ({
  title,
  subtitle,
  content,
  image,
  imagePosition = "right",
  actions,
  className,
}: ContentImageSectionProps) => {
  // ✅ Only log the title and className
 

  return (
    <section className={cn("py-16", className)}>
      <div className={cn("grid md:grid-cols-2 gap-8", imagePosition === "left" && "md:flex-row-reverse")}>
        <div>{image}</div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          {content && <p className="mt-2">{content}</p>}

          {actions?.length > 0 && (
            <div className="mt-4 flex gap-4">
              {actions.map((action) => (
                <a
                  key={action.text}
                  href={action.link}
                  className={cn(
                    "px-4 py-2 rounded-md border",
                    action.variant === "outline"
                      ? "border-primary text-primary"
                      : "bg-primary text-white"
                  )}
                >
                  {action.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
