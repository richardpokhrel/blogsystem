import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Search } from "lucide-react"

export const NewsFilterBar = () => (
  <div className="mb-12">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search news articles..." className="w-full pl-10" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select>
          <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="innovation">Innovation</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="culture">Culture</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
            <SelectItem value="products">Products</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger><SelectValue placeholder="Date" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
)
