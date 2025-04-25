"use client";

import * as React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EmojiBurstButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  emojis?: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageSize?: number;
  buttonClassName?: string;
}

const EmojiBurstButton = React.forwardRef<HTMLButtonElement, EmojiBurstButtonProps>(
  (
    {
      emojis = ["🍎", "🍇", "🥝", "🍉", "🍊", "🍌"],
      imageSrc = "https://www.macworld.com/wp-content/uploads/2023/12/folder-icon-macos.png?w=1024",
      imageAlt = "Folder",
      imageSize = 80,
      className,
      buttonClassName,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const emojiVariants = {
      hidden: {
        opacity: 0,
        scale: 0,
        y: 0,
        x: 0,
      },
      visible: (i: number) => {
        const angle = Math.random() * 60 - 30;
        const distance = 70 + Math.random() * 20;
        const rad = (angle * Math.PI) / 180;

        const x = Math.sin(rad) * distance;
        const y = -Math.cos(rad) * distance;

        return {
          opacity: 1,
          scale: 1,
          x,
          y,
          rotate: Math.random() * 360,
          transition: {
            delay: i * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 12,
          },
        };
      },
      exit: (i: number) => ({
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
        transition: {
          delay: i * 0.05,
          duration: 0.2,
        },
      }),
    };

    return (
      <div
        className={cn("relative inline-flex", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn("outline-none", buttonClassName)}
          {...(props as Omit<HTMLMotionProps<"button">, "onDrag">)}
          >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageSize}
            height={imageSize}
          />
        </motion.button>

        <AnimatePresence>
          {isHovered && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
              {emojis.map((emoji, index) => (
                <motion.span
                  key={index}
                  className="absolute text-2xl"
                  custom={index}
                  variants={emojiVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ left: "50%", transform: "translateX(-50%) translateY(-50%)" }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

EmojiBurstButton.displayName = "EmojiBurstButton";

export { EmojiBurstButton }