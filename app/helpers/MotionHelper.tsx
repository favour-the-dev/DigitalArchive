"use client";
import { motion, easeInOut, AnimatePresence } from "framer-motion";
import type {
  TargetAndTransition,
  VariantLabels,
  Transition,
} from "framer-motion";

interface MotionWrapperProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  initial?: TargetAndTransition | VariantLabels;
  whileInView?: TargetAndTransition | VariantLabels;
  transition?: Transition;
  exit?: TargetAndTransition | VariantLabels;
}
function MotionWrapper({
  children,
  className = "",
  style = {},
  initial = { opacity: 0, y: 30 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.5, ease: easeInOut } as Transition,
  exit = { opacity: 0, y: 30 },
}: MotionWrapperProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        whileInView={whileInView}
        transition={transition}
        viewport={{ once: true }}
        exit={exit}
        className={className}
        style={style}
      >
        {children ? children : null}
      </motion.div>
    </AnimatePresence>
  );
}

export default MotionWrapper;
