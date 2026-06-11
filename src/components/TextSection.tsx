import Cursor from './Cursor';
import TypewriterText from './TypewriterText';
import type { LetterSlide } from '../types/content';

type TextSectionProps = {
  slide: Exclude<LetterSlide, { type: 'pause' }>;
  skipToken: number;
  resumeToken: number;
  onTypingChange: (typing: boolean) => void;
};

function normalizeContent(content: string | string[]) {
  return Array.isArray(content) ? content : [content];
}

function TextSection({ slide, skipToken, resumeToken, onTypingChange }: TextSectionProps) {
  const lines = normalizeContent(slide.content);
  const isArt = slide.type === 'art';
  const isHeart = slide.type === 'art' && slide.variant === 'heart';
  const extraLines =
    'attribution' in slide && slide.attribution
      ? [slide.attribution]
      : 'caption' in slide && slide.caption
        ? [slide.caption]
        : [];
  const displayLines = [...lines, ...extraLines];
  const typeClassName = [
    'typewriter-copy',
    slide.type === 'emphasis' ? 'copy-emphasis' : '',
    slide.type === 'quote' ? 'copy-quote' : '',
    isHeart ? 'copy-heart' : '',
    extraLines.length ? 'has-meta' : '',
    isArt ? 'copy-art' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={[
        'copy-block',
        slide.type === 'emphasis' ? 'copy-emphasis' : '',
        slide.type === 'quote' ? 'copy-quote' : '',
        isArt ? 'copy-art' : '',
      ].join(' ')}
    >
      <TypewriterText
        lines={displayLines}
        speed={slide.speed}
        skipToken={skipToken}
        resumeToken={resumeToken}
        showCursor={!isHeart}
        onTypingChange={onTypingChange}
        className={typeClassName}
      />

      <div className="resting-cursor">
        <Cursor />
      </div>
    </div>
  );
}

export default TextSection;
