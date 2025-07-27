import { BlogPost } from "@/types/blog";
const BLOG_KEY = 'blogs';

export function getBlogs(): BlogPost[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('blogs');
    return data ? JSON.parse(data) : [];

}


export function saveBlogs(blogs: BlogPost[]) {
    try {
        localStorage.setItem('blogs', JSON.stringify(blogs));

    } catch (error: any) {
        if (error.name === 'QuotaExceededError') {
        alert('youve reached the localStorage limit. Delete some posts first.');
    } else {
        console.error('Failed to save blogs', error)
    }
}
}


export function addBlog(blog: BlogPost) {
    const blogs = getBlogs();
    saveBlogs([blog, ...blogs]);
}

export function updateBlog(updatedBlog: BlogPost) {
    const blogs = getBlogs().map(b => b.id === updatedBlog.id ? updatedBlog : b);
    saveBlogs(blogs);

}

export function deleteBlog(blogId: string ) {
    const blogs = getBlogs().filter(b => b.id !== blogId);
    saveBlogs(blogs);
}

export function getBlogById( id: string ): BlogPost | undefined {
    return getBlogs().find(b => b.id === id);
}
