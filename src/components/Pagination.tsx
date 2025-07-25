import { Button } from "@/components/ui/button"

export const Pagination = () => (
  <div className="flex items-center justify-between">
    <Button variant="outline" disabled>Previous</Button>
    <div className="flex items-center gap-2">
      <Button variant="ghost" className="h-10 w-10 p-0">1</Button>
      <Button variant="outline" className="h-10 w-10 p-0">2</Button>
      <Button variant="ghost" className="h-10 w-10 p-0">3</Button>
      <span className="px-2 text-muted-foreground">...</span>
      <Button variant="ghost" className="h-10 w-10 p-0">8</Button>
    </div>
    <Button variant="outline">Next</Button>
  </div>
)
