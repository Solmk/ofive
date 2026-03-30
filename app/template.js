'use client';

/**
 * app/template.js — Page Transition Wrapper
 *
 * Next.js re-mounts template.js on every route change (unlike layout.js
 * which persists). This makes it the correct place for Framer Motion
 * AnimatePresence page-entry animations.
 *
 * The curtain wipes from bottom to top on enter, fades out on exit.
 */

import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
};

export default function Template({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
