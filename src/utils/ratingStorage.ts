// utils/ratingStorage.ts

import { Rating } from "@/types/blog";

const RATING_KEY = "ratings";

export function getAllRatings(): Rating[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(RATING_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getRatingsForArticle(articleId: string): Rating[] {
  return getAllRatings().filter((r) => r.articleId === articleId);
}

export function getUserRating(articleId: string, user: string): Rating | undefined {
  return getAllRatings().find(
    (r) => r.articleId === articleId && r.user === user
  );
}

export function addOrUpdateRating(newRating: Rating) {
  const all = getAllRatings();
  const existingIndex = all.findIndex(
    (r) => r.articleId === newRating.articleId && r.user === newRating.user
  );

  if (existingIndex !== -1) {
    all[existingIndex] = newRating;
  } else {
    all.push(newRating);
  }

  localStorage.setItem(RATING_KEY, JSON.stringify(all));
}

