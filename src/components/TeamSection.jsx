import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Icon } from '@iconify/react';

const teamMembers = [
  {
    id: 1,
    name: 'Melvin Chia',
    username: 'melvinchia3636',
    handle: '@melvinchia3636',
    description: 'Full-stack architect & team lead',
    role: 'leader',
    avatar: 'https://avatars.githubusercontent.com/u/64565584?v=4',
  },
  {
    id: 2,
    name: 'Lukas How',
    username: 'lukashow',
    handle: '@lukashow',
    description: 'hi/haヾ(≧▽≦*)o',
    role: 'member',
    avatar: 'https://avatars.githubusercontent.com/u/66945259?v=4',
  },
  {
    id: 3,
    name: 'Jiahuiiiii',
    username: 'jiahuiiiii',
    handle: '@jiahuiiiii',
    description: 'god of procratination',
    role: 'member',
    avatar: 'https://avatars.githubusercontent.com/u/74039704?v=4',
  },
  {
    id: 4,
    name: 'CTLM08',
    username: 'ctlm08',
    handle: '@ctlm08',
    description: 'noob FULL STACK DEVELOPER',
    role: 'member',
    avatar: 'https://avatars.githubusercontent.com/u/102941611?v=4',
  },
  {
    id: 5,
    name: 'chenw517',
    username: 'chenw517',
    handle: '@chenw517',
    description: 'the GOD TIER CP guy',
    role: 'member',
    avatar: 'https://avatars.githubusercontent.com/u/151830618?v=4',
  },
];

function MemberCard({ member, index, isLeader }) {
  const cardRef = useRef(null);

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

  return (
    <a
      ref={cardRef}
      className={`pro-card p-5 opacity-0 block ${
        isLeader ? 'md:col-span-2 lg:col-span-4 !bg-green-900/50 ' : ''
      }`}
      href={`https://github.com/${member.username}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={`flex	flex-col items-center gap-3 ${isLeader ? 'md:flex-row md:justify-center' : ''}`}>
        {/* Avatar */}
        <div className="avatar">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden bg-terminal-surface border border-2 border-green-700">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className={`text-center ${isLeader ? 'md:text-left' : ''}`}>
          {isLeader && (
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <Icon icon="carbon:star-filled" className="text-warning text-sm" />
              <span className="text-xs uppercase tracking-wider text-warning">
                Team Lead
              </span>
            </div>
          )}
          
          <div className={`flex items-center justify-center gap-2 mb-1 ${isLeader ? 'md:justify-start' : ''}`}>
            <Icon icon="carbon:logo-github" className="text-text-secondary text-sm" />
            <span className="text-lg font-semibold text-text-primary">
              {member.username}
            </span>
          </div>
          
          <p className="text-xs text-text-muted mb-1">
            {member.handle}
          </p>
          
          <p className="text-xs text-accent">
            {member.description}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function TeamSection() {
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

  const leader = teamMembers.find((m) => m.role === 'leader');
  const members = teamMembers.filter((m) => m.role === 'member');

  return (
    <section ref={sectionRef} className="relative py-8 md:py-12 px-4 md:px-8 lg:px-16">
      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-12 opacity-0">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-text-muted text-sm">//</span>
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary">
            team<span className="text-accent">()</span>
          </h2>
        </div>
        <div className="section-divider w-24 mx-auto" />
      </div>

      {/* Team Grid */}
      <div className="max-w-4xl mx-auto">
        {/* Leader */}
        <div className="mb-4">
          <MemberCard member={leader} index={0} isLeader={true} />
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {members.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index + 1} isLeader={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
