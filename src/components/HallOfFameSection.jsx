import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Icon } from '@iconify/react';

// Achievements data grouped by year
const achievements = [
  {
	year: 2025, 
	items: [
		{
			id: 1,
			date: '17 Dec 2025',
			name: 'CodeDay KL 2025',
			rank: '#1',
			rankType: 'gold',
			participants: ['melvinchia3636', 'lukashow', 'jiahuiiiii', 'ctlm08', 'chenw517'],
			link: 'https://codeday.org',
		},
	]
  },
];

const rankColors = {
  gold: 'text-yellow-400 border-yellow-400/50',
  silver: 'text-gray-300 border-gray-300/50',
  bronze: 'text-amber-600 border-amber-600/50',
  special: 'text-accent border-accent/50',
};

function AchievementItem({ item, index }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(itemRef.current, {
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 400,
              delay: index * 80,
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const Wrapper = item.link ? 'a' : 'div';
  const wrapperProps = item.link
    ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      ref={itemRef}
      className={`pro-card p-4 opacity-0 block ${item.link ? 'cursor-pointer' : ''}`}
      {...wrapperProps}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        {/* Date */}
        <div className="text-xs text-text-muted w-20 shrink-0">
          {item.date}
        </div>

        {/* Rank badge */}
        <div className={`shrink-0 px-2 py-1 border text-xs font-semibold ${rankColors[item.rankType]}`}>
          {item.rank}
        </div>

        {/* Name */}
        <div className="flex-1">
          <span className="text-sm text-text-primary font-medium">
            {item.name}
          </span>
          {item.link && (
            <Icon icon="carbon:launch" className="inline ml-2 text-text-muted text-xs" />
          )}
        </div>

        {/* Participants */}
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <Icon icon="carbon:user-multiple" className="text-sm" />
          <span>{item.participants.join(', ')}</span>
        </div>
      </div>
    </Wrapper>
  );
}

function YearGroup({ yearData, yearIndex }) {
  const yearRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(yearRef.current, {
              opacity: [0, 1],
              translateY: [-10, 0],
              duration: 400,
              delay: yearIndex * 100,
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (yearRef.current) {
      observer.observe(yearRef.current);
    }

    return () => observer.disconnect();
  }, [yearIndex]);

  return (
    <div ref={yearRef} className="opacity-0">
      {/* Year header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-lg font-bold text-accent">
          {yearData.year}
        </div>
        <div className="flex-1 h-px bg-terminal-border" />
        <div className="text-xs text-text-muted">
          {yearData.items.length} {yearData.items.length === 1 ? 'achievement' : 'achievements'}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2 ml-0 md:ml-4 relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-terminal-border hidden md:block" style={{ marginLeft: '-12px' }} />
        
        {yearData.items.map((item, idx) => (
          <div key={item.id} className="relative">
            {/* Timeline dot */}
            <div className="absolute w-2 h-2 bg-accent rounded-full hidden md:block" style={{ left: '-16px', top: '50%', transform: 'translateY(-50%)' }} />
            <AchievementItem item={item} index={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HallOfFameSection() {
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
    <section ref={sectionRef} className="relative py-8 md:py-12 px-4 md:px-8 lg:px-16 !pb-16">
      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-12 opacity-0">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-text-muted text-sm">//</span>
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary">
            hallOfFame<span className="text-accent">()</span>
          </h2>
        </div>
        <div className="section-divider w-24 mx-auto" />
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto space-y-10">
        {achievements.map((yearData, idx) => (
          <YearGroup key={yearData.year} yearData={yearData} yearIndex={idx} />
        ))}
      </div>
    </section>
  );
}
