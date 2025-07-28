"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/utils/auth";
import { RatingComponent } from "./starRating";

export function CommentForm({ blogId }) {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    const user = getCurrentUser();
    if (!user) {
      alert("Please log in to comment.");
      return;
    }

    if (commentText.trim() === "") {
      alert("Please write a comment.");
      return;
    }

    if (rating === 0) {
      alert("Please give a rating out of 5.");
      return;
    }

    const allComments = JSON.parse(localStorage.getItem("comments") || "[]");

    const newComment = {
      id: crypto.randomUUID(),
      blogId,
      text: commentText.trim(),
      author: user.username,
      userId: user.id,
      createdAt: new Date().toISOString(),
      status: "pending",
      rating,
    };

    allComments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(allComments));
    setCommentText("");
    setRating(0);
    alert("Comment submitted successfully!");
  };

  return (
    <div className="space-y-3 mt-4">
      <Textarea
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows={4}
      />
      <RatingComponent blogId={blogId} onRate={(value) => setRating(value)} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
