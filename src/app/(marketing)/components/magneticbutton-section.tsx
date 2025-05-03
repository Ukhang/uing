"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import { Button } from "@/components/animations/magnetic-button";
import CodeBlock from "@/components/ui/code-block";

const MagneticButtonSection = () => {
  const [activeTab, setActiveTab] = useState("preview");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Magnetic Button
          </h3>
          <p className="text-custom-muted">
            A dynamic, interactive button component that subtly
            &quot;attracts&quot; the cursor or mouse pointer when hovered over.
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
            <div className="flex justify-center items-center min-h-full">
              <Button size={"sm"} magnetic className="cursor-pointer">
                Catch Me!
              </Button>
            </div>
          </Viewport>
        </div>
      )}

      {activeTab === "code" && (
        <div className="px-4 text-custom-primary">
          <h2 className="text-lg">Installation</h2>
          <p className="mt-4">Install the following dependencies:</p>
          <CodeBlock pageName="Terminal" code="pnpm i framer-motion" />
          <CodeBlock pageName="Terminal" code="pnpm add @radix-ui/react-slot" />

          <p className="mt-4">
            Copy and paste the following code into your project.
          </p>
          <CodeBlock
            pageName="animation-utils.tsx"
            code={`
import { Variants } from 'framer-motion';

export const quickSpringTransition = {
  type: 'spring',
  stiffness: 800,
  damping: 20,
  mass: 0.3,
};

export const calculateMagneticPosition = (
  e: React.MouseEvent,
  ref: React.RefObject<HTMLButtonElement | null>,
  strength: number = 25
) => {
  if (!ref.current) return { x: 0, y: 0 };
  
  const { clientX, clientY } = e;
  const { left, top, width, height } = ref.current.getBoundingClientRect();
  
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  
  const distanceX = clientX - centerX;
  const distanceY = clientY - centerY;
  
  return {
    x: (distanceX / width) * strength,
    y: (distanceY / height) * strength,
  };
};
            `}
          />
          <CodeBlock 
            pageName="magnetic-button.tsx"
            code={`
"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"
import { calculateMagneticPosition, quickSpringTransition } from "@/lib/animation-utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type BaseProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    magnetic?: boolean
    magneticStrength?: number
  }

type MotionButtonProps = HTMLMotionProps<"button"> & BaseProps

function Button({
  className,
  variant,
  size,
  asChild = false,
  magnetic = false,
  magneticStrength = 20,
  ...props
}: MotionButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)
  const [magneticPosition, setMagneticPosition] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic) return
    const position = calculateMagneticPosition(e, buttonRef, magneticStrength)
    setMagneticPosition(position)
  }

  const handleMouseLeave = () => {
    if (!magnetic) return
    setMagneticPosition({ x: 0, y: 0 })
  }

  const classes = cn(buttonVariants({ variant, size, className }))

  if (asChild) {
    return (
      <Slot className={classes} {...props} />
    )
  }

  if (magnetic) {
    return (
      <motion.button
        ref={buttonRef}
        className={classes}
        animate={magneticPosition}
        transition={quickSpringTransition}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    )
  }

  return (
    <button
      ref={buttonRef}
      className={classes}
      {...props}
    />
  )
}

export { Button, buttonVariants }
            `}
          />
        </div>
      )}
    </section>
  );
};

export default MagneticButtonSection;
