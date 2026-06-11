import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Cursor from './Cursor';
import MemorySection from './MemorySection';
import TextSection from './TextSection';
import type { LetterSlide, Memory, SectionKey } from '../types/content';

type StoryStep =
  | {
      id: string;
      section: Exclude<SectionKey, 'memories'>;
      kind: 'letter';
      slide: LetterSlide;
    }
  | {
      id: string;
      section: 'memories';
      kind: 'memory';
      memory: Memory;
      memoryIndex: number;
      memoryCount: number;
    }
  | {
      id: string;
      section: SectionKey;
      kind: 'pause';
      duration?: number;
    };

type SectionRendererProps = {
  step: StoryStep;
  skipToken: number;
  resumeToken: number;
  onTypingChange: (typing: boolean) => void;
  onAdvance: () => void;
  onBack: () => void;
};

function SectionRenderer({
  step,
  skipToken,
  resumeToken,
  onTypingChange,
  onAdvance,
  onBack,
}: SectionRendererProps) {
  useEffect(() => {
    if (step.kind !== 'letter' || step.slide.type === 'pause') {
      onTypingChange(false);
    }
  }, [onTypingChange, step]);

  if (step.kind === 'pause') {
    return (
      <motion.div
        className="pause-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: (step.duration ?? 450) / 1000 }}
      >
        <Cursor size="large" />
      </motion.div>
    );
  }

  if (step.kind === 'memory') {
    return (
      <MemorySection
        memory={step.memory}
        index={step.memoryIndex}
        count={step.memoryCount}
        skipToken={skipToken}
        resumeToken={resumeToken}
        onTypingChange={onTypingChange}
        onAdvance={onAdvance}
        onBack={onBack}
      />
    );
  }

  if (step.slide.type === 'pause') {
    return (
      <motion.div
        className="pause-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: (step.slide.duration ?? 450) / 1000 }}
      >
        <Cursor size="large" />
      </motion.div>
    );
  }

  return (
    <TextSection
      slide={step.slide}
      skipToken={skipToken}
      resumeToken={resumeToken}
      onTypingChange={onTypingChange}
    />
  );
}

export default SectionRenderer;
