"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import { Button } from "@/components/animations/magnetic-button";
import { TextReveal } from "@/components/animations/text-reveal";
import CodeBlock from "@/components/ui/code-block";

const TextRevealSection = () => {
  const [activeTab, setActiveTab] = useState("preview");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Text Reveal
          </h3>
          <p className="text-custom-muted">
            A flexible and animated text element that reveals each character
            with a smooth spring motion as it enters the viewport.
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
          <Viewport reload>
            <div className="flex justify-center items-center min-h-full">
              <TextReveal
                text="Become who you are 🔥"
                className="font-medium text-lg"
              />
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
            pageName="text-reveal.tsx"
            code={`
"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  staggerChildren?: number;
  initialDelay?: number;
}

export function TextReveal({
  text,
  className,
  element = 'p',
  staggerChildren = 0.03,
  initialDelay = 0.2,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Container animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: initialDelay * i,
      },
    }),
  };

  // Letter animation
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(5px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const Tag = element;

  // Clean and split text into words
  const cleanedText = text.replace(/\s+/g, ' ').trim();
  const words = cleanedText.split(' ');

  return (
    <motion.div
      ref={ref}
      className={cn('flex flex-wrap justify-center min-w-full', className)}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {React.createElement(
        Tag,
        { className: 'flex flex-wrap justify-center whitespace-pre-wrap text-center' },
        words.map((word, wordIndex) => (
          <span key={word + wordIndex} className="flex mr-2">
            {Array.from(word).map((letter, letterIndex) => (
              <motion.span
                key={letter + letterIndex}
                className="inline-block"
                variants={child}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))
      )}
    </motion.div>
  );
}
            `}
          />
        </div>
      )}
    </section>
  );
};

export default TextRevealSection;
