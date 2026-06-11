import type { SectionKey, Sections } from '../types/content';

const sectionLabels: Record<SectionKey, string> = {
  intro: 'Intro',
  apology: 'Apology',
  truth: 'The Truth',
  memories: 'Memories',
  littleThings: 'The Little Things',
  whatYouMeanToMe: 'What You Mean To Me',
  iSeeYou: 'I See You',
  future: 'The Future',
  finalMessage: 'Final Message',
};

const photosPath = import.meta.env.BASE_URL + 'photos/';

export const content: Sections = {
  intro: [
    {
      type: 'text',
      content: ['Ghazal,', 'I want to start by speaking to how you must be feeling right now.'],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'I know you are hurt.',
        'I know you are disappointed.',
        'I know you are probably replaying things in your mind, trying to understand how something like this could happen between us.',
        'And I understand why this has affected you so deeply.',
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
  ],
  apology: [
    {
      type: 'text',
      content: [
        "If I were in your position, I would feel shaken too.",
        "I would feel confused.",
        "I would feel hurt in ways that don't go away quickly.",
        'And I want you to know something very clearly.',
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'I am truly sorry.',
        'Not in a surface way.',
        'Not in a way that tries to fix it quickly or move past it.',
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'But in a real way - where I understand that my words reached you in a way that caused pain, and I take full responsibility for that.',
        'I never wanted to hurt you.',
        'Not even in the smallest possibility.',
        'Not in anger.',
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'Not in frustration.',
        'Not in misunderstanding.',
        'Not in any version of reality I can think of.',
        'Because your feelings matter to me, and I would never want to be the reason you feel anything less than valued and safe.',
      ],
      reveal: 'typewriter',
    },
  ],
  truth: [
    {
      type: 'text',
      content: [
        'And beyond all of this, I need you to hear something from me.',
        'I see you.',
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'Not just in this moment.',
        'Not just in this situation.',
        "I see everything you've been carrying.",
        'The pressure that sits quietly in the background of your life.',
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'The responsibilities that do not always get spoken about.',
        'The stress that follows you even in moments that should feel calm.',
        'The times where you feel like you have to stay strong even when you are tired inside.',
        'I see it.',
      ],
      reveal: 'typewriter',
    },
    {
      type: 'text',
      content: [
        'And I do not ignore it.',
        'And I do not reduce it.',
        'And I do not take it lightly.',
      ],
      reveal: 'typewriter',
    },
  ],
  memories: [
    {
      image: `${photosPath}memory-1.jpg`,
      title: 'The quiet parts',
      description: 'Just being near you felt enough.',
      date: 'A soft night',
    },
    {
      image: `${photosPath}memory-2.jpg`,
      title: 'Your voice',
      description: 'Everything felt lighter when you spoke.',
    },
    {
      image: `${photosPath}memory-3.jpg`,
      title: 'The way you kept going',
      description: 'Even when life was heavy, you still moved forward.',
    },
    {
      image: `${photosPath}memory-4.jpg`,
      title: 'What stayed with me',
      description: 'Real moments. Not perfect ones. Ours.',
      date: 'Still here',
    },
  ],
  littleThings: [
    {
      type: 'text',
      content: [
        'Even when life feels heavy for you, I still see you as someone who is trying her best in the middle of it all.',
        'And I want you to know this clearly:',
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'I am here.',
        'Not just in good moments.',
        'Not just when things are easy.',
        'But here, even now, in the middle of everything.',
      ],
      reveal: 'typewriter',
    },
    {
      type: 'text',
      content: [
        "I am not stepping away from you emotionally.",
        "I am not closing my eyes to what you're going through.",
        'I am here, and I see you, and I care about you.',
      ],
      reveal: 'typewriter',
    },
  ],
  whatYouMeanToMe: [
    {
      type: 'text',
      content: [
        'And I want to end this in the most honest way I know how.',
        'I care about you.',
        'Deeply.',
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'In a way that is not loud or dramatic, but real for me.',
        'You matter to me in a way that goes beyond words or situations.',
        'And I am sorry that I hurt you.',
        "I wish I could take that moment back, but I can't.",
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'So all I can do is be honest with you, and be better from here.',
        "I don't want to overwhelm you with emotion.",
        "I don't want to pressure you into anything.",
        "That's not what this is.",
      ],
      reveal: 'typewriter',
    },
  ],
  iSeeYou: [
    {
      type: 'text',
      content: [
        'This is just me speaking from the heart to you.',
        'Softly.',
        'Honestly.',
        'Because you matter to me.',
      ],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: ['And I love you, Ghazal.', 'That is the truth I carry, even in moments like this.'],
      reveal: 'typewriter',
      pauseAfter: true,
    },
    {
      type: 'text',
      content: [
        'I see you.',
        'All of you.',
        'And I will keep showing up with care, honesty, and softness.',
      ],
      reveal: 'emphasis',
    },
  ],
  future: [
    {
      type: 'text',
      content: [
        'I do not want to rush this.',
        'I do not want to force anything.',
        'I just want the truth of how I feel to stay here, gently, without pressure.',
        'That is all.',
      ],
      reveal: 'typewriter',
    },
  ],
  finalMessage: [
    {
      type: 'art',
      variant: 'heart',
      content: [
        '                        .......   .......                        ',
        '                     ............. .............                     ',
        '                   .............................                   ',
        '                 .................................                 ',
        '                ...................................                ',
        '               .....................................               ',
        '              .......................................              ',
        '              .......................................              ',
        '               .....................................               ',
        '                ...................................                ',
        '                 .........................................                 ',
        '                   .............................                   ',
        '                     ...........................                     ',
        '                       .......................                       ',
        '                         .............                         ',
        '                           ...........                           ',
        '                             .......                             ',
        '                               ...                               ',
        '                                .                                ',
      ],
      caption: 'I love you, Ghazal.',
      reveal: 'fade',
      speed: 1.5,
    },
  ],
};

export const ui = {
  shellTitle: 'private letter / quiet terminal',
  shellVersion: 'v0.1',
  prompt: 'ghazal@midnight:~$',
  interactionHint: 'Press Enter or Tap Anywhere',
  memoryHint: 'tap or swipe',
  loadingAriaLabel: 'Loading personal letter',
  loadingSteps: ['loading...', 'connecting...', 'preparing something personal...', 'almost ready...'],
  loadingExpressions: [
    '(´▽`ʃ♡ƪ)',
    '(￣﹏￣；)',
    '(❁´◡`❁)',
    '(｡•́︿•̀｡)',
    '(≧◡≦)',
    '(◕‿◕✿)',
  ],
  sectionLabels,
  getSectionAriaLabel(section: SectionKey) {
    return `Section: ${sectionLabels[section]}`;
  },
  getMemoryAriaLabel(index: number, count: number) {
    return `Memory ${index + 1} of ${count}`;
  },
  formatProgress(current: number, total: number) {
    return `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  },
} as const;
