export interface BlogPost {
    id: string;
    title: string;
    content : string;
    images?: {
        id: number;
        url: string;
        name: string;
    }[];
    CreatedAt : string; 

};

export interface Comment {
  id: string;
  blogId: string;
  text: string;
  author: string;
  userId?: string;
  rating: number; // rating out of 5
  createdAt: string;
  status?: string; // optional
}

// types/blog.ts

export interface Rating {
  id: string; // unique rating ID (e.g., UUID)
  articleId: string;
  user: string; // username or email
  rating: number; // 1 to 5
  createdAt: string;
}
