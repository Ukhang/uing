import { Variants } from 'framer-motion';

// Spring presets mimicking Apple's animation feel
export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
};

export const softSpringTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1,
};

export const quickSpringTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

// Easing functions
export const appleEasing = [0.25, 0.1, 0.25, 1]; // Apple's cubic-bezier easing
export const softEasing = [0.4, 0, 0.2, 1]; // Material-like easing

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: appleEasing } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: appleEasing } 
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: appleEasing } 
  },
};

// Slide animations
export const slideInLeft: Variants = {
  hidden: { x: -60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: springTransition
  },
};

export const slideInRight: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: springTransition
  },
};

// Scale animations
export const scaleUp: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: springTransition
  },
};

// Card hover effect
export const cardHover: Variants = {
  rest: { scale: 1, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)' },
  hover: { 
    scale: 1.02, 
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    transition: softSpringTransition
  },
};

// Button hover effect
export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05, 
    transition: quickSpringTransition
  },
  tap: { 
    scale: 0.98, 
    transition: { duration: 0.1 } 
  },
};

// Staggered children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Parallax scroll effect
export const parallaxScroll = (yOffset: number) => ({
  y: yOffset,
  transition: { type: 'tween', ease: 'linear' },
});

// Magnetic effect utils
export const calculateMagneticPosition = (
  e: React.MouseEvent,
  ref: React.RefObject<HTMLElement>,
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

// Scroll progress calculation
export const calculateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  return scrollTop / docHeight;
};