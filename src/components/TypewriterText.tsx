import { useEffect, useMemo, useRef, useState } from 'react';
import Cursor from './Cursor';

type TypewriterTextProps = {
  lines: string[];
  className?: string;
  speed?: number;
  skipToken: number;
  resumeToken?: number;
  showCursor?: boolean;
  onTypingChange?: (typing: boolean) => void;
};

function TypewriterText({
  lines,
  className,
  speed = 28,
  skipToken,
  resumeToken,
  showCursor = true,
  onTypingChange,
}: TypewriterTextProps) {
  const fullText = useMemo(() => lines.join('\n'), [lines]);
  const [visibleLength, setVisibleLength] = useState(0);
  const lastSkipToken = useRef(skipToken);
  const lastVisibleLength = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (skipToken !== lastSkipToken.current) {
      lastSkipToken.current = skipToken;
      setVisibleLength(fullText.length);
    }
  }, [fullText.length, skipToken]);

  useEffect(() => {
    const isComplete = visibleLength >= fullText.length;
    onTypingChange?.(!isComplete);

    if (isComplete) {
      return;
    }

    const currentCharacter = fullText[visibleLength] ?? '';
    const extraPause = ['.', ',', ';', ':', '?', '!'].includes(currentCharacter)
      ? 90
      : 0;
    const timeout = window.setTimeout(() => {
      setVisibleLength((length) => Math.min(length + 1, fullText.length));
    }, speed + extraPause);

    return () => window.clearTimeout(timeout);
  }, [fullText, onTypingChange, speed, visibleLength]);

  useEffect(() => {
    const previousLength = lastVisibleLength.current;
    const currentLength = visibleLength;

    if (currentLength <= previousLength) {
      lastVisibleLength.current = currentLength;
      return;
    }

    const increment = currentLength - previousLength;
    lastVisibleLength.current = currentLength;

    if (increment !== 1) {
      return;
    }

    const currentCharacter = fullText[currentLength - 1] ?? '';
    if (currentCharacter === ' ' || currentCharacter === '\n') {
      return;
    }

    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) {
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new AudioCtor();
    }

    const context = audioRef.current;
    if (context.state === 'suspended') {
      void context.resume();
    }

    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    const code = currentCharacter.codePointAt(0) ?? 0;
    const pitch = 640 + (code % 11) * 26;

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(pitch, context.currentTime);
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(420, context.currentTime);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.012, context.currentTime + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.045);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.05);
  }, [fullText, visibleLength, resumeToken]);

  const visibleText = fullText.slice(0, visibleLength);
  const visibleLines = visibleText.split('\n');

  return (
    <div className={className}>
      {visibleLines.map((line, index) => (
        <p key={index} className="type-line">
          {line}
          {showCursor && index === visibleLines.length - 1 && <Cursor />}
        </p>
      ))}
    </div>
  );
}

export default TypewriterText;
