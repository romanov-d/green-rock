import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imgLogo from '../assets/logo.svg';
import styles from './Preloader.module.css';

export const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 25); // ~3 seconds to fill

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.preloaderContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        >
          <div className={styles.preloaderContent}>
            <motion.img
              src={imgLogo}
              alt="Green Rock"
              className={styles.preloaderLogo}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.div
              className={styles.preloaderProgressContainer}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.preloaderProgressBar}>
                <motion.div
                  className={styles.preloaderProgressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <motion.span 
                className={styles.preloaderPercentage}
                animate={{ left: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                {progress}%
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
