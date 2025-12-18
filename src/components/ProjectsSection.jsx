import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Icon } from '@iconify/react';
import StarDialog from './StarDialog';

const projects = [
  {
    id: 1,
    title: 'LucyFit',
    description: 'A fitness app that helps you track your progress with an AI-powered virtual partner.',
    image: 'https://raw.githubusercontent.com/melvinchia3636/codeday/main/cover.png',
    techStack: ['React', 'TailwindCSS', 'TypeScript', 'Node.js', 'PocketBase', 'OpenAI', 'Gemini'],
    demoUrl: 'https://lucyfit.vercel.app',
    githubUrl: 'https://github.com/melvinchia3636/codeday',
  },
  {
    id: 2,
    title: 'LifeForge',
    description: 'A very personal, modular, personal daily management app, with super pleasant UI and experience.',
    image: 'https://raw.githubusercontent.com/LifeForge-app/lifeforge-docs-media/main/assets/mockup-new.webp',
    techStack: ['React', 'Express', 'TypeScript', 'Node.js', 'PocketBase', 'OpenAI', 'Gemini'],
    demoUrl: 'https://demo.lifeforge.dev',
    githubUrl: 'https://github.com/lifeforge-app/lifeforge',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isGithubButton, setIsGithubButton] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(cardRef.current, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 500,
              delay: index * 100,
              easing: 'easeOutExpo',
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
      <div
        ref={cardRef}
        className="pro-card overflow-hidden opacity-0"
      >
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-top object-cover opacity-80 hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-terminal-surface to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-base font-semibold text-text-primary mb-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-text-secondary mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, i) => (
              <span key={i} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-terminal-border">
            <button
              onClick={handleDemoClick}
              className="terminal-button-solid text-xs flex items-center gap-1"
            >
              <Icon icon="carbon:launch" className="text-sm" />
              Demo
            </button>

            <button
              onClick={handleGithubClick}
              className="p-2 border border-terminal-border text-text-muted hover:text-accent hover:border-accent transition-all"
            >
              <Icon icon="carbon:logo-github" className="text-base" />
            </button>
          </div>
        </div>
      </div>

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
            animate(titleRef.current, {
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo',
            });
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
    <section ref={sectionRef} className="relative py-8 md:py-12 px-4 md:px-8 lg:px-16">
      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-12 opacity-0">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-text-muted text-sm">//</span>
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary">
            projects<span className="text-accent">()</span>
          </h2>
        </div>
        <div className="section-divider w-24 mx-auto" />
      </div>

      {/* Projects Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
