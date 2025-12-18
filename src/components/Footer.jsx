import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Icon } from '@iconify/react';

const socialLinks = [
  { icon: 'carbon:logo-github', url: 'https://github.com/mhga', label: 'GitHub' },
  { icon: 'carbon:logo-twitter', url: 'https://twitter.com/mhga', label: 'Twitter' },
  { icon: 'carbon:logo-discord', url: 'https://discord.gg/mhga', label: 'Discord' },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.footer-content', {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 500,
              easing: 'easeOutExpo',
            });

            animate('.footer-link', {
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: stagger(50, { start: 200 }),
              duration: 300,
              easing: 'easeOutExpo',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-8 px-4 border-t border-terminal-border">
      <div className="footer-content max-w-5xl mx-auto opacity-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-text-primary">
              M<span className="text-accent inline-block -translate-y-0.5">;-;</span>GA
            </span>
            <span className="text-text-muted text-xs">|</span>
            <span className="text-text-muted text-xs">v0.0.1 (codename: cipher)</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link w-8 h-8 border border-terminal-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all opacity-0"
                aria-label={link.label}
              >
                <Icon icon={link.icon} className="text-sm" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} Team MHGA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
