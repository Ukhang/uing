import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { calculateMagneticPosition, quickSpringTransition } from '@/lib/animation-utils';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  magneticStrength?: number;
  variant?: 'default' | 'primary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export function MagneticButton({
  children,
  className,
  magneticStrength = 20,
  variant = 'default',
  size = 'default',
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const position = calculateMagneticPosition(e, buttonRef, magneticStrength);
    setMagneticPosition(position);
  };

  const handleMouseLeave = () => {
    setMagneticPosition({ x: 0, y: 0 });
  };

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 text-white',
    primary: 'bg-gradient-to-t from-[#a5e8bb] to-[#c8f8d8] hover:from-[#a9f0c1] hover:to-[#c8f8d8] text-black border border-[#99e0b3] text-shadow',
    outline: 'border bg-transparent hover:bg-gray-50',
  };

  const sizeClasses = {
    default: 'py-2 px-5 text-sm',
    sm: 'py-1.5 px-4 text-xs',
    lg: 'py-4 px-7 text-base',
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background rounded-lg capitalize duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      animate={{ 
        x: magneticPosition.x,
        y: magneticPosition.y,
      }}
      transition={quickSpringTransition}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}