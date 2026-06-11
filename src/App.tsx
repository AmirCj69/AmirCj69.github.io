import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { content, ui } from './content/content';
import AppLayout from './components/AppLayout';
import SectionRenderer from './components/SectionRenderer';
import ProgressIndicator from './components/ProgressIndicator';
import Cursor from './components/Cursor';
import LoadingScreen from './components/LoadingScreen';
import type { LetterSlide, Memory, SectionKey } from './types/content';

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

const sectionOrder: SectionKey[] = [
  'intro',
  'apology',
  'truth',
  'memories',
  'littleThings',
  'whatYouMeanToMe',
  'iSeeYou',
  'future',
  'finalMessage',
];

function createStorySteps(): StoryStep[] {
  return sectionOrder.flatMap((section) => {
    if (section === 'memories') {
      return content.memories.map<StoryStep>((memory, index) => ({
        id: `memories-${index}`,
        section,
        kind: 'memory',
        memory,
        memoryIndex: index,
        memoryCount: content.memories.length,
      }));
    }

    return content[section].flatMap<StoryStep>((slide, index) => {
      if (slide.type === 'pause') {
        return [];
      }

      return [
        {
          id: `${section}-${index}`,
          section,
          kind: 'letter',
          slide,
        },
      ];
    });
  });
}

function App() {
  const storySteps = useMemo(() => createStorySteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [skipToken, setSkipToken] = useState(0);
  const [resumeToken, setResumeToken] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentStep = storySteps[stepIndex];
  const isFinalStep = stepIndex === storySteps.length - 1;

  const advance = useCallback(() => {
    setHasInteracted(true);

    if (isTyping) {
      setSkipToken((token) => token + 1);
      return;
    }

    if (!isFinalStep) {
      setStepIndex((index) => Math.min(index + 1, storySteps.length - 1));
    }
  }, [isFinalStep, isTyping, storySteps.length]);

  const goBack = useCallback(() => {
    setHasInteracted(true);
    setStepIndex((index) => Math.max(index - 1, 0));
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 4200);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!hasInteracted && stepIndex === 0) {
      return;
    }

    if (currentStep.kind !== 'letter') {
      return;
    }

    if (isTyping || !('pauseAfter' in currentStep.slide) || !currentStep.slide.pauseAfter) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStepIndex((index) => Math.min(index + 1, storySteps.length - 1));
      setResumeToken((value) => value + 1);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [currentStep, hasInteracted, isLoading, isTyping, stepIndex, storySteps.length]);

  if (isLoading) {
    return (
      <AppLayout onAdvance={() => undefined}>
        <LoadingScreen />
      </AppLayout>
    );
  }

  return (
    <AppLayout onAdvance={advance}>
      <div className="letter-shell" aria-live="polite">
        {!isFinalStep && (
          <ProgressIndicator
            current={stepIndex + 1}
            total={storySteps.length}
            section={currentStep.section}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            className={isFinalStep ? 'section-frame final-frame' : 'section-frame'}
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionRenderer
              step={currentStep}
              skipToken={skipToken}
              resumeToken={resumeToken}
              onTypingChange={setIsTyping}
              onAdvance={advance}
              onBack={goBack}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {!isFinalStep && (
        <motion.div
          className={hasInteracted ? 'interaction-hint is-subtle' : 'interaction-hint'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          aria-hidden="true"
        >
          <span>{ui.interactionHint}</span>
          <Cursor size="small" />
        </motion.div>
      )}
    </AppLayout>
  );
}

export default App;
