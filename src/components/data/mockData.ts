// data/mockData.js

export const mockBlogs = [
  { id: 1, title: "Getting Started with Next.js", status: "published", views: 1250, comments: 15, date: "2024-01-15", rating: 4.5 },
  { id: 2, title: "React Hooks Deep Dive", status: "draft", views: 0, comments: 0, date: "2024-01-20", rating: 0 },
  { id: 3, title: "Building Modern UIs", status: "published", views: 890, comments: 8, date: "2024-01-18", rating: 4.2 },
];

export const mockComments = [
  { id: 1, blogTitle: "Getting Started with Next.js", author: "John Doe", content: "Great tutorial!", date: "2024-01-16", status: "approved" },
  { id: 2, blogTitle: "Building Modern UIs", author: "Jane Smith", content: "Very helpful content", date: "2024-01-19", status: "pending" },
];
