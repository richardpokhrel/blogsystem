"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + words[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words]);

  return (
    <div className={className}>
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {currentText}
      </motion.p>
    </div>
  );
};