"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import { Button } from "@/components/animations/magnetic-button";
import { EmojiBurstButton } from "@/components/animations/emoji-burst-button";
import CodeBlock from "@/components/ui/code-block";

const EmojiBurstSection = () => {
  const [activeTab, setActiveTab] = useState("preview");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Emoji Burst Button
          </h3>
          <p className="text-custom-muted">
            An interactive button that releases a burst of emojis when hovered, adding a fun and dynamic effect with smooth animations.
          </p>
        </div>
        <div className="min-w-[60px] flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            magnetic
            className="cursor-pointer"
            onClick={toggleTab}
          >
            {activeTab === "preview" ? "Code" : "Preview"}
          </Button>
        </div>
      </div>

      {activeTab === "preview" && (
        <div className="grid grid-cols-1 sm:px-4">
          <Viewport>
            <div className="flex flex-col justify-center items-center min-h-full">
              <EmojiBurstButton/>
              <span className="text-xs text-custom-muted mt-1">Hover on the folder</span>
            </div>
          </Viewport>
        </div>
      )}

      {activeTab === "code" && (
        <div className="px-4">
          <h2 className="text-lg">Installation</h2>
          <p className="mt-4">Install the following dependencies:</p>
          <CodeBlock pageName="Terminal" code="pnpm i framer-motion" />

          <p className="mt-4">
            Copy and paste the following code into your project.
          </p>
          <CodeBlock
            pageName="emoji-burst-button.tsx"
            code={`
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
        className={cn("relative", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn("", buttonClassName)}
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
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
            `}
          />
        </div>
      )}
    </section>
  );
};

export default EmojiBurstSection;
