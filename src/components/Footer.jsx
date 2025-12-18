import { useEffect, useRef } from "react";
import { stagger, createTimeline } from "animejs";
import { Icon } from "@iconify/react";

const socialLinks = [
  {
    icon: "carbon:logo-github",
    url: "https://github.com/mhga",
    label: "GitHub",
    color: "hover:text-white hover:bg-[#333]",
  },
  {
    icon: "carbon:logo-twitter",
    url: "https://twitter.com/mhga",
    label: "Twitter",
    color: "hover:text-white hover:bg-[#1DA1F2]",
  },
  {
    icon: "carbon:logo-discord",
    url: "https://discord.gg/mhga",
    label: "Discord",
    color: "hover:text-white hover:bg-[#5865F2]",
  },
];

const quickLinks = [
  { label: "Team", href: "#team" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = createTimeline({
              defaults: { easing: "easeOutExpo" },
            });

            tl.add(".footer-logo", {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
            })
              .add(
                ".footer-links",
                {
                  opacity: [0, 1],
                  translateY: [20, 0],
                  duration: 500,
                },
                "-=400"
              )
              .add(
                ".footer-social",
                {
                  opacity: [0, 1],
                  scale: [0.8, 1],
                  delay: stagger(50),
                  duration: 400,
                },
                "-=300"
              )
              .add(
                ".footer-copyright",
                {
                  opacity: [0, 1],
                  duration: 400,
                },
                "-=200"
              );

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
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Main footer content */}
      <div className="relative py-12 px-4 md:px-8 lg:px-16">
        {/* Background effects */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            {/* Logo & Description */}
            <div className="footer-logo text-center md:text-left opacity-0">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="relative">
                  <span className="text-2xl font-black text-text-primary">
                    M
                    <span className="text-accent inline-block -translate-y-1">
                      ;-;
                    </span>
                    GA
                  </span>
                  <div className="absolute -inset-2 bg-accent/10 blur-xl -z-10 rounded-full" />
                </div>
                <div className="h-6 w-px bg-terminal-border" />
                <span className="text-xs text-text-muted font-mono">
                  v0.0.1
                </span>
              </div>
              <p className="text-sm text-text-muted max-w-xs mx-auto md:mx-0">
                Elite hackathon squad crafting the future, one competition at a
                time.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-links text-center opacity-0">
              <div className="flex items-center justify-center gap-6">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group relative text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-end gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`footer-social group relative w-10 h-10 rounded-lg border border-terminal-border flex items-center justify-center text-text-muted transition-all duration-300 opacity-0 ${link.color} hover:border-transparent hover:scale-110`}
                  aria-label={link.label}
                >
                  <Icon
                    icon={link.icon}
                    className="text-lg transition-transform group-hover:scale-110"
                  />
                  {/* Tooltip */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-terminal-surface border border-terminal-border rounded text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom section */}
          <div className="footer-copyright mt-10 pt-6 border-t border-terminal-border/50 opacity-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span>©</span>
                <span>{new Date().getFullYear()}</span>
                <span className="text-accent">Team MHGA</span>
                <span>•</span>
                <span>All rights reserved</span>
              </div>

              {/* Build info */}
              <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>System Online</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Codename: Cipher</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </footer>
  );
}
