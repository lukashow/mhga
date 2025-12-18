import { useEffect, useRef } from "react";
import { animate, stagger, createTimeline } from "animejs";
import { Icon } from "@iconify/react";

// Achievement stats data
const stats = [
  { value: "50+", label: "Hackathons", icon: "carbon:events" },
  { value: "100+", label: "Projects Built", icon: "carbon:code" },
  { value: "5", label: "Team Members", icon: "carbon:user-multiple" },
  { value: "∞", label: "Caffinated Hours", icon: "carbon:cafe" },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const glitchRef = useRef(null);

  useEffect(() => {
    // Main entrance timeline
    const tl = createTimeline({
      defaults: {
        easing: "easeOutExpo",
      },
    });

    // Logo entrance with dramatic effect
    tl.add(".hero-logo", {
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 1000,
    })
      // Glitch effect on logo
      .add(
        ".hero-logo-text",
        {
          translateX: [
            { value: -5, duration: 50 },
            { value: 5, duration: 50 },
            { value: -3, duration: 50 },
            { value: 3, duration: 50 },
            { value: 0, duration: 50 },
          ],
          easing: "easeInOutSine",
        },
        "-=500"
      )
      // Tagline fade in
      .add(
        ".hero-tagline",
        {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
        },
        "-=600"
      )
      // Description
      .add(
        ".hero-description",
        {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        },
        "-=400"
      )
      // CTAs
      .add(
        ".hero-cta",
        {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 500,
          delay: stagger(100),
        },
        "-=300"
      )
      // Stats
      .add(
        ".hero-stat",
        {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          delay: stagger(100),
        },
        "-=200"
      )
      // Terminal decoration
      .add(
        ".hero-terminal-decor",
        {
          opacity: [0, 1],
          duration: 500,
        },
        "-=400"
      );

    // Continuous glow pulse on logo
    animate(".hero-glow", {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.1, 1],
      duration: 3000,
      loop: true,
      easing: "easeInOutSine",
    });

    // Glitch effect interval
    const glitchInterval = setInterval(() => {
      animate(".hero-logo-text", {
        translateX: [
          { value: Math.random() * 4 - 2, duration: 50 },
          { value: Math.random() * 4 - 2, duration: 50 },
          { value: 0, duration: 100 },
        ],
        filter: [
          { value: "hue-rotate(90deg)", duration: 50 },
          { value: "hue-rotate(-90deg)", duration: 50 },
          { value: "hue-rotate(0deg)", duration: 100 },
        ],
        easing: "easeInOutSine",
      });
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Radial gradient overlay - hero specific */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />

      {/* Terminal prompt decoration - top left */}
      <div className="hero-terminal-decor absolute top-6 left-6 md:top-8 md:left-8 opacity-0">
        <div className="pro-card px-4 py-2 text-xs">
          <span className="text-accent">root@mhga</span>
          <span className="text-text-muted">:</span>
          <span className="text-accent-dim">~/hackathons</span>
          <span className="text-text-muted">$</span>
          <span className="cursor-blink ml-1 text-accent">█</span>
        </div>
      </div>

      {/* System status - top right */}
      <div className="hero-terminal-decor absolute top-6 right-6 sm:block hidden md:top-8 md:right-8 opacity-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-text-secondary">SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 mt-32 text-center px-4 max-w-5xl mx-auto">
        {/* Logo with glow effect */}
        <div className="hero-logo relative mb-8 opacity-0">
          {/* Glow background */}
          <div className="hero-glow absolute inset-0 blur-3xl bg-accent/20 rounded-full transform scale-150" />

          {/* Main logo */}
          <div className="relative">
            <h1
              ref={glitchRef}
              className="hero-logo-text text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none"
            >
              <span className="text-text-primary">M</span>
              <span className="text-accent inline-block -translate-y-2 sm:-translate-y-4 md:-translate-y-6 lg:-translate-y-8">
                ;-;
              </span>
              <span className="text-text-primary">GA</span>
            </h1>

            {/* Decorative brackets */}
            <div className="absolute md:-left-8 top-1/2 -translate-y-1/2 text-4xl md:text-6xl text-accent/30 font-light">
              {"<"}
            </div>
            <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 text-4xl md:text-6xl text-accent/30 font-light">
              {"/>"}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="hero-tagline mb-6 opacity-0">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-text-primary">Make Hackathon </span>
            <span className="text-accent terminal-glow">Great Again</span>
          </p>
        </div>

        {/* Description */}
        <div className="hero-description mb-10 opacity-0">
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Elite development squad crafting{" "}
            <span className="text-accent">award-winning solutions</span> at
            hackathons worldwide. We don't just participate —{" "}
            <span className="text-text-primary font-semibold">we dominate</span>
            .
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#team"
            className="hero-cta terminal-button-solid px-8 py-3 text-base uppercase flex items-center gap-2 opacity-0"
          >
            <Icon icon="carbon:user-multiple" className="text-lg" />
            Meet the Team
          </a>
          <a
            href="#projects"
            className="hero-cta terminal-button px-8 py-3 text-base uppercase flex items-center gap-2 opacity-0"
          >
            <Icon icon="carbon:code" className="text-lg" />
            View Projects
          </a>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="hero-stat pro-card p-4 md:p-6 text-center opacity-0 group"
            >
              <Icon
                icon={stat.icon}
                className="text-2xl md:text-3xl text-accent mb-2 mx-auto group-hover:scale-110 transition-transform"
              />
              <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-text-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-accent/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-accent/20" />
    </section>
  );
}
