import type { SectionKey } from '../types/content';
import { ui } from '../content/content';

type ProgressIndicatorProps = {
  current: number;
  total: number;
  section: SectionKey;
};

function ProgressIndicator({ current, total, section }: ProgressIndicatorProps) {
  return (
    <div className="progress-indicator" aria-label={ui.getSectionAriaLabel(section)}>
      <span className="prompt-label">{ui.prompt}</span>
      <span className="section-label">{ui.sectionLabels[section]}</span>
      <span>{ui.formatProgress(current, total)}</span>
    </div>
  );
}

export default ProgressIndicator;
