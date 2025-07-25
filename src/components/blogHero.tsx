// app/blog/page.tsx
import { BlogHero } from "./HeroSection"

export default function BlogPage() {
  return (
    <main>
      <BlogHero 
        title="Our Blog" 
        description="Latest articles and news" 
      />
      {/* Rest of your content */}
    </main>
  )
}