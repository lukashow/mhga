import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { Icon } from '@iconify/react';

export default function StarDialog({ isOpen, onClose, projectName, demoUrl, githubUrl, isGithubButton }) {
  const dialogRef = useRef(null);
  const [countdown, setCountdown] = useState(3);
  const [linkOpened, setLinkOpened] = useState(false);

  // Determine which URL to open based on button type
  const targetUrl = isGithubButton ? githubUrl : demoUrl;
  const buttonLabel = isGithubButton ? 'GitHub' : 'Demo';

  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
      setLinkOpened(false);

      // Dialog entrance animation
      animate(dialogRef.current, {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 200,
        easing: 'easeOutExpo',
      });

      // Countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Open correct link in new tab
            window.open(targetUrl, '_blank');
            setLinkOpened(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, targetUrl]);

  if (!isOpen) return null;

  const handleClose = () => {
    animate(dialogRef.current, {
      opacity: [1, 0],
      scale: [1, 0.95],
      duration: 150,
      easing: 'easeInExpo',
      onComplete: onClose,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dialog-overlay">
      <div
        ref={dialogRef}
        className="pro-card p-6 max-w-sm w-full mx-4 relative opacity-0"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors"
        >
          <Icon icon="carbon:close" className="text-lg" />
        </button>

        <div className="text-center">
          {/* Project name */}
          <h3 className="text-base font-semibold text-text-primary mb-4">
            {projectName}
          </h3>

          {!linkOpened ? (
            /* Countdown */
            <div className="py-4">
              <p className="text-xs text-text-secondary mb-4">
                Opening {buttonLabel} in new tab...
              </p>
              <div className="text-4xl font-bold text-accent terminal-glow mb-4">
                {countdown}
              </div>
              {isGithubButton && (
                <p className="text-xs text-text-muted">
                  If you find it interesting, star it.
                </p>
              )}
            </div>
          ) : (
            /* Link opened prompt */
            <div className="py-4">
              <Icon
                icon="carbon:checkmark-filled"
                className="text-4xl text-accent mx-auto mb-3"
              />
              <p className="text-sm text-text-secondary mb-4">
                {isGithubButton 
                  ? 'Tab opened. If you like it, give it a star!' 
                  : 'Demo opened in new tab.'}
              </p>
              <button
                onClick={handleClose}
                className="terminal-button"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
