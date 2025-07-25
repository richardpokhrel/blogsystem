import { Comment } from "@/types/blog";

const COMMENT_KEY = 'comments';

export function getAllComments(): Comment[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(COMMENT_KEY);
    return raw ? JSON.parse(raw) : [];
}

export function deleteComment(id: string) {
    const all = getAllComments();
    const filtered = all.filter(c => c.id !== id);
    localStorage.setItem(COMMENT_KEY, JSON.stringify(filtered));
}

export function updateComment(updated: Comment) {
    const all = getAllComments().map((c) => 
    c.id === updated.id ? updated : c
    );
    localStorage.setItem(COMMENT_KEY, JSON.stringify(all));
}