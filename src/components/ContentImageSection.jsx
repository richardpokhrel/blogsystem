import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ContentImageSection = ({
  title,
  subtitle,
  content,
  image,
  imagePosition = "right",
  actions,
  className,
}) => {
  return (
    <section className={cn("py-20 px-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto", className)}>
      <div
        className={cn(
          "grid md:grid-cols-2 gap-12 items-center",
          imagePosition === "left" && "md:flex-row-reverse"
        )}
      >
        <div className="rounded-lg overflow-hidden shadow-md">
          {image}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-muted-foreground mb-6">{subtitle}</p>}
          {content && <p className="text-base mb-6">{content}</p>}

          {actions && actions.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {actions.map((action) => (
                <a
                  key={action.text}
                  href={action.link}
                  className={cn(
                    "px-6 py-3 rounded-md border text-center whitespace-nowrap",
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

export default ContentImageSection;
