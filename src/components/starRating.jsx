'use client';
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/auth";

export function RatingComponent({ blogId, onRate }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (user) {
      const ratings = JSON.parse(localStorage.getItem("ratings") || "[]");
      const userRating = ratings.find((r) => r.blogId === blogId && r.userId === user.id);
      if (userRating) setRating(userRating.rating);
    }
  }, [blogId]);

  const handleRate = (value) => {
    const user = getCurrentUser();
    if (!user) {
      alert("Please log in to comment.");
      return;
    }

    const ratings = JSON.parse(localStorage.getItem("ratings") || "[]");
    const filtered = ratings.filter((r) => !(r.blogId === blogId && r.userId === user.id));

    filtered.push({
      blogId,
      rating: value,
      userId: user.id,
    });

    localStorage.setItem("ratings", JSON.stringify(filtered));
    setRating(value);

    if (onRate) {
      onRate(value);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`cursor-pointer text-2xl ${i <= rating ? "text-yellow-400" : "text-gray-400"}`}
          onClick={() => handleRate(i)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
