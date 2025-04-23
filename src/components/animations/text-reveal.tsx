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