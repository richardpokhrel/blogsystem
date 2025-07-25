interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureGridSection = ({
  title,
  subtitle,
  features,
  columns = 3,
}: {
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4 ;
}) => {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className={`max-w-3xl mx-auto text-center mb-16`}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid ${gridClasses[columns]} gap-12`}>
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};