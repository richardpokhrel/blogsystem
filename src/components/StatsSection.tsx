interface StatItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export const StatsSection = ({
  stats,
  layout = "simple",
}: {
  stats: StatItem[];
  layout?: "simple" | "cards";
}) => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container px-4 mx-auto">
        <div className={`${layout === 'cards' ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : 'flex flex-wrap justify-center gap-12'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${layout === 'cards' ? 'bg-card p-8 rounded-xl shadow-sm border' : 'text-center'}`}
            >
              <div className="flex items-center justify-center gap-3">
                {stat.icon && (
                  <div className="text-primary">{stat.icon}</div>
                )}
                <div>
                  <p className="text-4xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};interface StatItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export const StatsSection = ({
  stats,
  layout = "simple",
}: {
  stats: StatItem[];
  layout?: "simple" | "cards";
}) => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container px-4 mx-auto">
        <div className={`${layout === 'cards' ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : 'flex flex-wrap justify-center gap-12'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${layout === 'cards' ? 'bg-card p-8 rounded-xl shadow-sm border' : 'text-center'}`}
            >
              <div className="flex items-center justify-center gap-3">
                {stat.icon && (
                  <div className="text-primary">{stat.icon}</div>
                )}
                <div>
                  <p className="text-4xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};