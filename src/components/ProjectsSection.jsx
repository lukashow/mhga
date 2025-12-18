import { useEffect, useRef, useState } from "react";
import { animate, createTimeline } from "animejs";
import { Icon } from "@iconify/react";
import StarDialog from "./StarDialog";

const projects = [
  {
    id: 1,
    title: "LucyFit",
    description:
      "A fitness app that helps you track your progress with an AI-powered virtual partner.",
    longDescription:
      "Revolutionary fitness tracking with AI-powered insights, personalized workout recommendations, and a virtual partner that adapts to your progress.",
    image:
      "https://raw.githubusercontent.com/melvinchia3636/codeday/main/cover.png",
    techStack: [
      { name: "React", icon: "logos:react" },
      { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "PocketBase", icon: "simple-icons:pocketbase" },
      { name: "OpenAI", icon: "simple-icons:openai" },
    ],
    stats: {
      stars: "50+",
      commits: "200+",
      contributors: "5",
    },
    demoUrl: "https://lucyfit.vercel.app",
    githubUrl: "https://github.com/melvinchia3636/codeday",
    featured: true,
  },
  {
    id: 2,
    title: "LifeForge",
    description:
      "A very personal, modular, personal daily management app, with super pleasant UI and experience.",
    longDescription:
      "The ultimate life management suite featuring modular design, beautiful animations, and seamless integration across all aspects of daily life.",
    image:
      "https://raw.githubusercontent.com/LifeForge-app/lifeforge-docs-media/main/assets/mockup-new.webp",
    techStack: [
      { name: "React", icon: "logos:react" },
      { name: "Express", icon: "simple-icons:express" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "PocketBase", icon: "simple-icons:pocketbase" },
      { name: "OpenAI", icon: "simple-icons:openai" },
      { name: "Gemini", icon: "simple-icons:googlegemini" },
    ],
    stats: {
      stars: "100+",
      commits: "500+",
      contributors: "3",
    },
    demoUrl: "https://demo.lifeforge.dev",
    githubUrl: "https://github.com/lifeforge-app/lifeforge",
    featured: true,
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isGithubButton, setIsGithubButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(cardRef.current, {
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.95, 1],
              duration: 700,
              delay: index * 150,
              easing: "easeOutExpo",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const handleDemoClick = () => {
    setIsGithubButton(false);
    setDialogOpen(true);
  };

  const handleGithubClick = () => {
    setIsGithubButton(true);
    setDialogOpen(true);
  };

  return (
    <>
      <article
        id="projects"
        ref={cardRef}
        className="group relative opacity-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient border wrapper */}
        <div className="relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-br from-accent/50 via-terminal-border to-accent/50 group-hover:from-accent group-hover:via-accent/50 group-hover:to-accent transition-all duration-500">
          <div className="relative rounded-xl overflow-hidden bg-terminal-surface">
            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full">
                <Icon
                  icon="carbon:star-filled"
                  className="text-xs text-terminal-bg"
                />
                <span className="text-[10px] font-bold text-terminal-bg uppercase tracking-wider">
                  Featured
                </span>
              </div>
            )}

            {/* Project Image with overlay */}
            <div className="relative h-56 md:h-64 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-t-lg h-full object-top object-cover transition-all duration-700 group-hover:scale-110"
              />
              {/* Multiple gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface via-terminal-surface/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-terminal-surface/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* <div
                className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500 ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                <div className="flex items-center gap-1.5 px-2 py-1 bg-terminal-bg/80 backdrop-blur-sm rounded text-xs">
                  <Icon icon="carbon:star" className="text-yellow-400" />
                  <span className="text-text-primary">
                    {project.stats.stars}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-terminal-bg/80 backdrop-blur-sm rounded text-xs">
                  <Icon icon="carbon:commit" className="text-accent" />
                  <span className="text-text-primary">
                    {project.stats.commits}
                  </span>
                </div>
              </div> */}
            </div>

            {/* Content */}
            <div className="relative p-6">
              {/* Title with animated underline */}
              <div className="mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors duration-300 inline-block">
                  {project.title}
                </h3>
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent to-accent-dim transition-all duration-500" />
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-5 leading-relaxed">
                {project.longDescription}
              </p>

              {/* Tech Stack with icons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="group/tech flex items-center gap-1.5 px-2.5 py-1.5 bg-terminal-bg border border-terminal-border rounded-lg hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                  >
                    <Icon
                      icon={tech.icon}
                      className="text-sm group-hover/tech:scale-110 transition-transform"
                    />
                    <span className="text-xs text-text-secondary group-hover/tech:text-text-primary transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-terminal-border">
                <button
                  onClick={handleDemoClick}
                  className="flex-1 py-3 bg-gradient-to-r from-accent to-accent-dim text-terminal-bg font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 group/btn"
                >
                  <Icon
                    icon="carbon:launch"
                    className="text-lg group-hover/btn:rotate-12 transition-transform"
                  />
                  <span>Live Demo</span>
                </button>

                <button
                  onClick={handleGithubClick}
                  className="w-12 h-12 border-2 border-terminal-border rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-primary hover:bg-text-primary/5 transition-all duration-300 group/gh"
                >
                  <Icon
                    icon="carbon:logo-github"
                    className="text-xl group-hover/gh:scale-110 transition-transform"
                  />
                </button>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 right-0 w-[1px] h-10 bg-gradient-to-b from-accent to-transparent" />
              <div className="absolute top-0 right-0 w-10 h-[1px] bg-gradient-to-l from-accent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 w-[1px] h-10 bg-gradient-to-t from-accent to-transparent" />
              <div className="absolute bottom-0 left-0 w-10 h-[1px] bg-gradient-to-r from-accent to-transparent" />
            </div>
          </div>
        </div>
      </article>

      <StarDialog
        isOpen={dialogOpen}
        isGithubButton={isGithubButton}
        onClose={() => setDialogOpen(false)}
        projectName={project.title}
        demoUrl={project.demoUrl}
        githubUrl={project.githubUrl}
      />
    </>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = createTimeline({
              defaults: { easing: "easeOutExpo" },
            });

            tl.add(titleRef.current, {
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 800,
            }).add(
              ".projects-subtitle",
              {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
              },
              "-=400"
            );

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-3xl" />

      {/* Section Header */}
      <div ref={titleRef} className="text-center mb-16 opacity-0 relative z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent" />
          <span className="text-text-muted text-sm font-mono">{"{ }"}</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent" />
        </div>

        <h2 className="text-4xl md:text-5xl font-black mb-4">
          <span className="text-text-primary">Our </span>
          <span className="text-accent terminal-glow">Projects</span>
        </h2>

        <p className="projects-subtitle text-text-secondary max-w-xl mx-auto opacity-0">
          Award-winning applications built during hackathons.{" "}
          <span className="text-accent">Quality over quantity</span>.
        </p>

        <div className="section-divider w-32 mx-auto mt-6" />
      </div>

      {/* Projects Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
}
