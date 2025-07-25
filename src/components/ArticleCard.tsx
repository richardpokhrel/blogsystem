import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export const NewsCard = ({ article }) => (
  <article className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
    <div className="aspect-video w-full bg-gradient-to-r from-primary/10 to-primary/5" />
    <div className="flex-1 p-6">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-primary">{article.category}</span>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm text-muted-foreground">
          {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
      <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight">
        <Link href={`/news/${article.id}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-muted-foreground">{article.excerpt}</p>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{article.readTime} read</span>
        </div>
        <Button variant="ghost" size="sm" className="group-hover:text-primary" asChild>
          <Link href={`/news/${article.id}`}>
            Read more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  </article>
)
