import { CalendarDays, Clock } from "lucide-react"







export const FeaturedArticleCard = ({ article }) => (
  <div className="mb-16">
    <div className="relative  rounded-2xl border bg-card shadow-sm">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="h-full min-h-[400px] bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12">
          <div className="flex h-full flex-col justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                Featured
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10" />
              <div>
                <p className="text-sm font-medium">Press Team</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden bg-gradient-to-br from-primary/5 to-primary/10 md:block" />
      </div>
    </div>
  </div>
)
