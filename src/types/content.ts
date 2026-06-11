export type RevealStyle =
  | 'typewriter'
  | 'fade'
  | 'delayed'
  | 'emphasis'
  | 'quote';

export type TextSlide = {
  type: 'text';
  content: string | string[];
  reveal?: RevealStyle;
  pauseAfter?: boolean;
  speed?: number;
};

export type EmphasisSlide = {
  type: 'emphasis';
  content: string | string[];
  reveal?: RevealStyle;
  pauseAfter?: boolean;
  speed?: number;
};

export type QuoteSlide = {
  type: 'quote';
  content: string | string[];
  attribution?: string;
  reveal?: RevealStyle;
  pauseAfter?: boolean;
  speed?: number;
};

export type ArtSlide = {
  type: 'art';
  content: string | string[];
  caption?: string;
  variant?: 'heart';
  reveal?: 'fade' | 'delayed';
  pauseAfter?: boolean;
  speed?: number;
};

export type PauseSlide = {
  type: 'pause';
  duration?: number;
};

export type LetterSlide = TextSlide | EmphasisSlide | QuoteSlide | ArtSlide | PauseSlide;

export type Memory = {
  image: string;
  title: string;
  description: string;
  date?: string;
};

export type SectionKey =
  | 'intro'
  | 'apology'
  | 'truth'
  | 'memories'
  | 'littleThings'
  | 'whatYouMeanToMe'
  | 'iSeeYou'
  | 'future'
  | 'finalMessage';

export type Sections = {
  intro: LetterSlide[];
  apology: LetterSlide[];
  truth: LetterSlide[];
  memories: Memory[];
  littleThings: LetterSlide[];
  whatYouMeanToMe: LetterSlide[];
  iSeeYou: LetterSlide[];
  future: LetterSlide[];
  finalMessage: LetterSlide[];
};
