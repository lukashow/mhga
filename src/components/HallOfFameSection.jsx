import { useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";
import { Icon } from "@iconify/react";

// Achievements data grouped by year
const achievements = [
  {
    year: 2025,
    items: [
      {
        id: 1,
        date: "17 Dec 2025",
        name: "CodeDay KL 2025",
        rank: "#1",
        rankType: "gold",
        project: "LucyFit",
        participants: [
          "melvinchia3636",
          "lukashow",
          "jiahuiiiii",
          "ctlm08",
          "chenw517",
        ],
        link: "https://codeday.org",
        prize: "Grand Prize Winner",
      },
      {
        id: 1,
        date: "17 Dec 2025",
        name: "CodeDay KL 2025",
        rank: "#1",
        rankType: "gold",
        project: "LucyFit",
        participants: [
          "melvinchia3636",
          "lukashow",
          "jiahuiiiii",
          "ctlm08",
          "chenw517",
        ],
        link: "https://codeday.org",
        prize: "Grand Prize Winner",
      },
      {
        id: 1,
        date: "17 Dec 2025",
        name: "CodeDay KL 2025",
        rank: "#1",
        rankType: "gold",
        project: "LucyFit",
        participants: [
          "melvinchia3636",
          "lukashow",
          "jiahuiiiii",
          "ctlm08",
          "chenw517",
        ],
        link: "https://codeday.org",
        prize: "Grand Prize Winner",
      },
      {
        id: 1,
        date: "17 Dec 2025",
        name: "CodeDay KL 2025",
        rank: "#1",
        rankType: "gold",
        project: "LucyFit",
        participants: [
          "melvinchia3636",
          "lukashow",
          "jiahuiiiii",
          "ctlm08",
          "chenw517",
        ],
        link: "https://codeday.org",
        prize: "Grand Prize Winner",
      },
    ],
  },
];

const rankConfig = {
  gold: {
    gradient: "from-yellow-500 via-yellow-300 to-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/50",
    text: "text-yellow-400",
    glow: "shadow-yellow-500/20",
    icon: "carbon:trophy-filled",
  },
  silver: {
    gradient: "from-gray-400 via-gray-200 to-gray-400",
    bg: "bg-gray-400/10",
    border: "border-gray-400/50",
    text: "text-gray-300",
    glow: "shadow-gray-400/20",
    icon: "carbon:trophy",
  },
  bronze: {
    gradient: "from-amber-600 via-amber-400 to-amber-600",
    bg: "bg-amber-600/10",
    border: "border-amber-600/50",
    text: "text-amber-500",
    glow: "shadow-amber-500/20",
    icon: "carbon:trophy",
  },
  special: {
    gradient: "from-accent via-accent-dim to-accent",
    bg: "bg-accent/10",
    border: "border-accent/50",
    text: "text-accent",
    glow: "shadow-accent/20",
    icon: "carbon:star-filled",
  },
};

function AchievementCard({ item, index }) {
  const cardRef = useRef(null);
  const config = rankConfig[item.rankType];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(cardRef.current, {
              opacity: [0, 1],
              translateX: [-30, 0],
              scale: [0.98, 1],
              duration: 600,
              delay: index * 100,
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

  const Wrapper = item.link ? "a" : "div";
  const wrapperProps = item.link
    ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      ref={cardRef}
      className={`group relative opacity-0 block ${
        item.link ? "cursor-pointer" : ""
      }`}
      {...wrapperProps}
    >
      {/* Gradient border */}
      <div
        className={`relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-r ${config.gradient} group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-500`}
      >
        <div className="relative rounded-xl bg-terminal-surface p-5 group-hover:bg-terminal-bg transition-colors duration-300">
          {/* Glow effect on hover */}
          <div
            className={`absolute inset-0 rounded-xl ${config.glow} shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
            {/* Rank badge - Large and prominent */}
            <div className="flex items-center gap-4 shrink-0">
              <div
                className={`relative w-16 h-16 rounded-xl ${config.bg} ${config.border} border-2 flex flex-col items-center justify-center`}
              >
                <Icon
                  icon={config.icon}
                  className={`text-2xl ${config.text}`}
                />
                <span className={`text-xs font-black ${config.text}`}>
                  {item.rank}
                </span>
                {/* Animated shine effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>

              {/* Date */}
              <div className="hidden md:block">
                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                  Date
                </div>
                <div className="text-sm text-text-secondary font-medium">
                  {item.date}
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                    {item.name}
                    {item.link && (
                      <Icon
                        icon="carbon:arrow-up-right"
                        className="text-sm opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </h3>
                  <div className="md:hidden text-xs text-text-muted mt-0.5">
                    {item.date}
                  </div>
                </div>
                {item.prize && (
                  <div
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${config.border} border`}
                  >
                    {item.prize}
                  </div>
                )}
              </div>

              {/* Project name */}
              {item.project && (
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    icon="carbon:application"
                    className="text-accent text-sm"
                  />
                  <span className="text-sm text-accent font-medium">
                    {item.project}
                  </span>
                </div>
              )}

              {/* Participants */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex -space-x-2">
                  {item.participants.slice(0, 5).map((participant, i) => (
                    <div
                      key={participant}
                      className="w-7 h-7 rounded-full border-2 border-terminal-surface bg-terminal-bg overflow-hidden"
                      style={{ zIndex: 5 - i }}
                    >
                      <img
                        src={`https://avatars.githubusercontent.com/${participant}?size=28`}
                        alt={participant}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-text-muted">
                  {item.participants.length} teammates
                </span>
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-2 right-2 w-6 h-6">
            <div className="absolute top-0 right-0 w-[1px] h-4 bg-gradient-to-b from-accent/50 to-transparent" />
            <div className="absolute top-0 right-0 w-4 h-[1px] bg-gradient-to-l from-accent/50 to-transparent" />
          </div>
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
              translateY: [-20, 0],
              duration: 600,
              delay: yearIndex * 150,
              easing: "easeOutExpo",
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
    <div ref={yearRef} className="relative opacity-0">
      {/* Year header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="text-4xl font-black text-accent terminal-glow">
            {yearData.year}
          </div>
          <div className="absolute -inset-2 bg-accent/10 blur-xl -z-10" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
        <div className="flex items-center gap-2 px-3 py-1.5 bg-terminal-surface border border-terminal-border rounded-full">
          <Icon icon="carbon:trophy" className="text-accent text-sm" />
          <span className="text-xs text-text-secondary font-medium">
            {yearData.items.length}{" "}
            {yearData.items.length === 1 ? "Win" : "Wins"}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-4 md:pl-8">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

        {/* Items */}
        <div className="space-y-4">
          {yearData.items.map((item, idx) => (
            <div key={item.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-[-17px] md:left-[-37.5px] top-16 w-3 h-3 rounded-full bg-accent border-2 border-terminal-bg shadow-lg shadow-accent/50" />
              <AchievementCard item={item} index={idx} />
            </div>
          ))}
        </div>
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
            const tl = createTimeline({
              defaults: { easing: "easeOutExpo" },
            });

            tl.add(titleRef.current, {
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 800,
            }).add(
              ".hof-subtitle",
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Section Header */}
      <div ref={titleRef} className="text-center mb-16 opacity-0 relative z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-yellow-500" />
          <Icon
            icon="carbon:trophy-filled"
            className="text-yellow-400 text-xl"
          />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-yellow-500" />
        </div>

        <h2 className="text-4xl md:text-5xl font-black mb-4">
          <span className="text-text-primary">Hall of </span>
          <span
            className="text-yellow-400"
            style={{ textShadow: "0 0 30px rgba(250, 204, 21, 0.3)" }}
          >
            Fame
          </span>
        </h2>

        <p className="hof-subtitle text-text-secondary max-w-xl mx-auto opacity-0">
          A chronicle of our victories.{" "}
          <span className="text-yellow-400">Every trophy tells a story</span>.
        </p>

        <div className="w-32 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {achievements.map((yearData, idx) => (
          <YearGroup key={yearData.year} yearData={yearData} yearIndex={idx} />
        ))}
      </div>

      {/* Empty state for more achievements */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-surface border border-dashed border-terminal-border rounded-lg text-text-muted text-sm">
          <Icon icon="carbon:add" className="text-accent" />
          <span>More victories loading...</span>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
    </section>
  );
}
