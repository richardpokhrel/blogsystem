"use client"

import React from "react"
import { motion } from "framer-motion"

interface WavyBackgroundProps {
  children?: React.ReactNode
  className?: string
  colors?: string[]
  waveWidth?: number
  blur?: number
  speed?: "slow" | "medium" | "fast"
  waveOpacity?: number
}

export const WavyBackground = ({
  children,
  className,
  colors = ["#6366f1", "#8b5cf6", "#ec4899"],
  waveWidth = 100,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) => {
  const waveDuration = {
    slow: 20,
    medium: 15,
    fast: 10,
  }[speed]

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} {...props}>
      {children}
      <div className="absolute inset-0 -z-10">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            animate={{
              x: ["-100%", "0%", "100%"],
              transition: {
                duration: waveDuration,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            style={{
              position: "absolute",
              top: `${index * 20}%`,
              width: `${waveWidth}%`,
              height: "20%",
              background: color,
              opacity: waveOpacity,
              filter: `blur(${blur}px)`,
              borderRadius: "40%",
            }}
          />
        ))}
      </div>
    </div>
  )
}