import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { ui } from '../content/content';

type AppLayoutProps = {
  children: ReactNode;
  onAdvance: () => void;
};

function AppLayout({ children, onAdvance }: AppLayoutProps) {
  const shellRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    shellRef.current?.focus();
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onAdvance();
    }
  };

  const handlePointerUp = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest('[data-ignore-advance="true"]')) {
      return;
    }

    onAdvance();
  };

  return (
    <main
      ref={shellRef}
      className="app-layout"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handlePointerUp}
    >
      <div className="grain" aria-hidden="true" />
      <div className="terminal-shell">
        <div className="terminal-topbar" aria-hidden="true">
          <span className="terminal-dots">
            <span />
            <span />
            <span />
          </span>
          <span className="terminal-title">{ui.shellTitle}</span>
          <span className="terminal-edge">{ui.shellVersion}</span>
        </div>
        <div className="terminal-body">{children}</div>
      </div>
    </main>
  );
}

export default AppLayout;
