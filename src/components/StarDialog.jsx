import { useState, useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";
import { Icon } from "@iconify/react";

// Matrix-style falling characters
const matrixChars =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

function MatrixRain() {
  const columns = 20;

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 text-accent text-xs font-mono whitespace-nowrap"
          style={{
            left: `${(i / columns) * 100}%`,
            animation: `matrix-fall ${3 + Math.random() * 2}s linear ${
              Math.random() * 2
            }s infinite`,
          }}
        >
          {Array.from({ length: 15 }).map((_, j) => (
            <div key={j} className="opacity-50">
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function StarDialog({
  isOpen,
  onClose,
  projectName,
  demoUrl,
  githubUrl,
  isGithubButton,
}) {
  const dialogRef = useRef(null);
  const [countdown, setCountdown] = useState(3);
  const [linkOpened, setLinkOpened] = useState(false);

  // Determine which URL to open based on button type
  const targetUrl = isGithubButton ? githubUrl : demoUrl;
  const buttonLabel = isGithubButton ? "GitHub" : "Demo";

  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
      setLinkOpened(false);

      // Dialog entrance animation
      const tl = createTimeline({
        defaults: { easing: "easeOutExpo" },
      });

      tl.add(dialogRef.current, {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 400,
      })
        .add(
          ".dialog-title",
          {
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 300,
          },
          "-=200"
        )
        .add(
          ".dialog-content",
          {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 300,
          },
          "-=150"
        );

      // Countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Open correct link in new tab
            window.open(targetUrl, "_blank");
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
      scale: [1, 0.8],
      duration: 200,
      easing: "easeInExpo",
      onComplete: onClose,
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-terminal-bg/90 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div ref={dialogRef} className="relative max-w-md w-full mx-4 opacity-0">
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent-dim to-accent rounded-xl blur-lg opacity-50 animate-pulse" />

        {/* Card with gradient border */}
        <div className="relative p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-accent via-terminal-border to-accent">
          <div className="relative rounded-xl bg-terminal-bg p-8 overflow-hidden">
            {/* Matrix rain background */}
            <MatrixRain />

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div
                className="h-full w-full"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                }}
              />
            </div>

            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-accent/50" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-accent/50" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-accent/50" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-accent/50" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-terminal-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 z-10"
            >
              <Icon icon="carbon:close" className="text-sm" />
            </button>

            <div className="relative z-10 text-center">
              {/* Terminal header */}
              <div className="dialog-title opacity-0 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-surface/80 border border-terminal-border rounded-full mb-4">
                  <span className="w-2 h-2 rounded-full bg-error" />
                  <span className="w-2 h-2 rounded-full bg-warning" />
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="ml-2 text-xs text-text-muted font-mono">
                    redirect.sh
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  <span className="text-accent">./</span>
                  {projectName}
                </h3>
              </div>

              {!linkOpened ? (
                /* Countdown */
                <div className="dialog-content opacity-0">
                  {/* Command line style */}
                  <div className="bg-terminal-surface/50 border border-terminal-border rounded-lg p-4 mb-6 text-left font-mono">
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className="text-accent">$</span>
                      <span className="text-text-secondary">
                        open --{buttonLabel.toLowerCase()} {projectName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-warning">&gt;</span>
                      <span className="text-text-muted">
                        Initiating connection...
                      </span>
                      <span className="cursor-blink text-accent">█</span>
                    </div>
                  </div>

                  {/* Countdown display */}
                  <div className="mb-6">
                    <div className="text-xs text-text-muted uppercase tracking-widest mb-3">
                      Redirecting in
                    </div>
                    <div className="relative inline-block">
                      {/* Glow ring */}
                      <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse" />
                      {/* Number */}
                      <div className="relative w-24 h-24 rounded-full border-4 border-accent flex items-center justify-center bg-terminal-bg/80">
                        <span className="text-5xl font-black text-accent terminal-glow">
                          {countdown}
                        </span>
                      </div>
                      {/* Orbiting dot */}
                      <div
                        className="absolute w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/50"
                        style={{
                          top: "50%",
                          left: "50%",
                          animation: "orbit 1s linear infinite",
                          transformOrigin: "0 0",
                        }}
                      />
                    </div>
                  </div>

                  {/* Nerdy message */}
                  <div className="text-xs text-text-muted font-mono">
                    {isGithubButton ? (
                      <span>
                        <span className="text-accent">TIP:</span> Stars fuel our
                        caffeine addiction ☕
                      </span>
                    ) : (
                      <span>
                        <span className="text-accent">STATUS:</span> Breaking
                        production one commit at a time 🚀
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                /* Link opened prompt */
                <div className="dialog-content opacity-0">
                  {/* Success animation */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-accent/20 animate-ping" />
                    </div>
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center mx-auto">
                      <Icon
                        icon="carbon:checkmark"
                        className="text-4xl text-terminal-bg"
                      />
                    </div>
                  </div>

                  {/* Success message */}
                  <div className="bg-terminal-surface/50 border border-accent/30 rounded-lg p-4 mb-6 text-left font-mono">
                    <div className="flex items-center gap-2 text-xs text-accent">
                      <Icon icon="carbon:checkmark-filled" />
                      <span>Connection established successfully</span>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary mb-6">
                    {isGithubButton ? (
                      <span>
                        If the code speaks to you,{" "}
                        <span className="text-accent font-semibold">
                          drop a star
                        </span>{" "}
                        ⭐
                      </span>
                    ) : (
                      <span>Demo launched in new dimension 🌌</span>
                    )}
                  </p>

                  <button
                    onClick={handleClose}
                    className="terminal-button-solid"
                  >
                    <span className="flex items-center gap-2">
                      <Icon icon="carbon:close" className="size-5" />
                      Terminate Session
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
