import { motion } from 'framer-motion';
import { ui } from '../content/content';
import Cursor from './Cursor';
import TypewriterText from './TypewriterText';
import type { Memory } from '../types/content';

type MemorySectionProps = {
  memory: Memory;
  index: number;
  count: number;
  skipToken: number;
  resumeToken: number;
  onTypingChange: (typing: boolean) => void;
  onAdvance: () => void;
  onBack: () => void;
};

function MemorySection({
  memory,
  index,
  count,
  skipToken,
  resumeToken,
  onTypingChange,
  onAdvance,
  onBack,
}: MemorySectionProps) {
  return (
    <section
      className="memory-section"
      data-ignore-advance="true"
      aria-label={ui.getMemoryAriaLabel(index, count)}
    >
      <motion.div
        className="memory-card"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={(_, info) => {
          if (info.offset.x < -55) {
            onAdvance();
          }

          if (info.offset.x > 55) {
            onBack();
          }
        }}
        onClick={onAdvance}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="photo-wrap">
          <motion.img
            src={memory.image}
            alt={memory.title}
            draggable={false}
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <motion.div
          className="memory-copy-frame"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.75 }}
        >
          <TypewriterText
            lines={memory.date ? [memory.date, memory.title, memory.description] : [memory.title, memory.description]}
            speed={22}
            skipToken={skipToken}
            resumeToken={resumeToken}
            onTypingChange={onTypingChange}
            className={memory.date ? 'memory-copy has-date' : 'memory-copy'}
          />
        </motion.div>

        <div className="memory-meta">
          <span>
            {index + 1} / {count}
          </span>
          <span>
            {ui.memoryHint} <Cursor size="small" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}

export default MemorySection;
