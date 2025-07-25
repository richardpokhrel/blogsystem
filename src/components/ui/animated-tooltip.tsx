"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div className="flex flex-row items-center">
      {items.map((item, idx) => (
        <div
          className="relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            key={item.name}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <img
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 border-white"
            />
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
              >
                <div className="bg-white dark:bg-black text-xs whitespace-nowrap rounded-md shadow-lg px-4 py-2">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-500">{item.designation}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export { AnimatedTooltip };