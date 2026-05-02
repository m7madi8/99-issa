import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { brandMotto, media } from '../data/pageContent';
import './AppLoader.css';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function AppLoader() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className="app-loader"
      role="status"
      aria-label="Loading"
      aria-busy="true"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.52, ease: EASE_OUT }}
    >
      <div className="app-loader__stack">
        <motion.img
          className="app-loader__logo"
          src={media.logoPrimary}
          alt=""
          width={360}
          height={360}
          decoding="async"
          fetchPriority="high"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.58, ease: EASE_OUT, delay: 0.06 }}
        />
        <motion.p
          className="app-loader__motto hero__motto"
          aria-hidden="true"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.22 }}
        >
          {brandMotto}
        </motion.p>
      </div>
    </motion.div>
  );
}
