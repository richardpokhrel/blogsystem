"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = wordsArray[currentWordIndex % wordsArray.length];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentWord.text.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % wordsArray.length);
        }
      } else {
        setCurrentText(currentWord.text.substring(0, currentText.length + 1));
        if (currentText.length === currentWord.text.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, wordsArray]);

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div className="inline-block">
        {wordsArray.map((word, idx) => (
          <span
            key={word.text + idx}
            className={cn(
              `dark:text-white text-black`,
              currentWordIndex === idx ? word.className : "opacity-40"
            )}
          >
            {currentWordIndex === idx ? currentText : word.text}
          </span>
        ))}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
        className={cn(
          "block rounded-sm w-[4px] h-6 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};