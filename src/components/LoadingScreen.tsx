import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ui } from '../content/content';
import Cursor from './Cursor';

function getRandomExpression() {
  const index = Math.floor(Math.random() * ui.loadingExpressions.length);
  return ui.loadingExpressions[index];
}

function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [expression, setExpression] = useState(getRandomExpression);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStepIndex((index) => (index + 1) % ui.loadingSteps.length);
      setExpression(getRandomExpression());
    }, 900);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="loading-screen" aria-label={ui.loadingAriaLabel}>
      <AnimatePresence mode="wait">
        <motion.p
          key={ui.loadingSteps[stepIndex]}
          className="loading-text"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {ui.loadingSteps[stepIndex]}
          <Cursor size="small" />
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.pre
          key={expression}
          className="loading-expression"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {expression}
        </motion.pre>
      </AnimatePresence>
    </section>
  );
}

export default LoadingScreen;
