import { useEffect, useRef } from 'react';
import { animate, stagger, createTimeline, utils } from 'animejs';
import { Icon } from '@iconify/react';

export default function HeroSection() {
  const titleRef = useRef(null);
  const emoticonRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Animate the main title letters
    animate('.title-letter', {
      opacity: [0, 1],
      delay: stagger(100),
    });

    // Subtle animation for the ;-; emoticon
    const emoticonAnimation = createTimeline({
      loop: true,
    });

    emoticonAnimation
      .add(emoticonRef.current, {
        opacity: [1, 0.7, 1],
        duration: 2000,
        easing: 'easeInOutSine',
      });

    // Terminal cursor blink effect on emoticon
    animate(emoticonRef.current, {
      textShadow: [
        '0 0 5px rgba(34, 197, 94, 0.5)',
        '0 0 15px rgba(34, 197, 94, 0.8)',
        '0 0 5px rgba(34, 197, 94, 0.5)',
      ],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine',
    });

    // Subtitle animation - typewriter style
    animate('.subtitle-char', {
      opacity: [0, 1],
      duration: 50,
      delay: stagger(30, { start: 800 }),
      easing: 'linear',
    });
  }, []);

  const subtitle = '> make_hackathon_great_again';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Terminal prompt decoration */}
      <div className="absolute top-8 left-8 text-text-muted text-xs hidden md:block">
        <span className="text-accent">guest@mhga</span>
        <span className="text-text-secondary">:</span>
        <span className="text-accent-dim">~</span>
        <span className="text-text-secondary">$</span>
        <span className="cursor-blink ml-1">_</span>
      </div>

      {/* Main Title */}
      <div ref={titleRef} className="relative z-10 flex items-center justify-center mb-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          <span className="title-letter inline-block text-text-primary opacity-0">M</span>
          <span
            ref={emoticonRef}
            className="title-letter inline-block text-accent mx-1 cursor-pointer opacity-0 -translate-y-2 md:-translate-y-4"
          >
            ;-;
          </span>
          <span className="title-letter inline-block text-text-primary opacity-0">G</span>
          <span className="title-letter inline-block text-text-primary opacity-0">A</span>
        </h1>
      </div>

      {/* Subtitle - terminal style */}
      <div ref={subtitleRef} className="relative z-10 mb-8">
        <p className="text-sm md:text-base text-text-secondary">
          {subtitle.split('').map((char, index) => (
            <span key={index} className="subtitle-char opacity-0">
              {char}
            </span>
          ))}
          <span className="cursor-blink text-accent">|</span>
        </p>
      </div>

      {/* Status badges */}
      <div className="relative z-10 flex flex-wrap justify-center gap-6 px-4 mb-12">
        <div className="tech-badge flex items-center gap-1 p-2">
          <Icon icon="carbon:circle-filled" className="text-[6px]" />
          <span className="text-lg">ONLINE</span>
        </div>
        <div className="tech-badge flex items-center gap-1 p-2" style={{ borderColor: 'var(--color-text-muted)', color: 'var(--color-text-secondary)', background: 'transparent' }}>
          <span className="text-lg">v0.0.1</span>
        </div>
      </div>

      {/* Scroll indicator - terminal style */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-text-muted">scroll</span>
        <div className="flex flex-col items-center gap-1">
          <Icon icon="carbon:chevron-down" className="text-accent text-lg animate-bounce" />
        </div>
      </div>
    </section>
  );
}
