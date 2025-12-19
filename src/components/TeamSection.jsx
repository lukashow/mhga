import { useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";
import { Icon } from "@iconify/react";

const teamMembers = [
  {
    id: 1,
    name: "Melvin Chia",
    username: "melvinchia3636",
    handle: "@melvinchia3636",
    description: "Learn, Develop, Evolve",
    role: "leader",
    avatar: "https://avatars.githubusercontent.com/u/64565584?v=4",
    skills: ["React", "Node.js", "TypeScript", "System Design"],
  },
  {
    id: 2,
    name: "Lukas How",
    username: "lukashow",
    handle: "@lukashow",
    description: "hi/haヾ(≧▽≦*)o",
    role: "member",
    avatar: "https://avatars.githubusercontent.com/u/66945259?v=4",
    skills: ["Frontend", "UI/UX", "React"],
  },
  {
    id: 3,
    name: "Jiahuiiiii",
    username: "jiahuiiiii",
    handle: "@jiahuiiiii",
    description: "god of procratination",
    role: "member",
    avatar: "https://avatars.githubusercontent.com/u/74039704?v=4",
    skills: ["Backend", "Python", "Algorithms"],
  },
  {
    id: 4,
    name: "CTLM08",
    username: "ctlm08",
    handle: "@ctlm08",
    description: "noob FULL STACK DEVELOPER",
    role: "member",
    avatar: "https://avatars.githubusercontent.com/u/102941611?v=4",
    skills: ["Full Stack", "React", "Express"],
  },
  {
    id: 5,
    name: "chenw517",
    username: "chenw517",
    handle: "@chenw517",
    description: "the GOD TIER CP guy",
    role: "member",
    avatar: "https://avatars.githubusercontent.com/u/151830618?v=4",
    skills: ["Competitive Programming", "Algorithms", "C++"],
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
              translateY: [40, 0],
              scale: [0.95, 1],
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

  return (
    <a
      ref={cardRef}
      className={`group relative h-full overflow-hidden opacity-0 block transition-all duration-300 ${
        isLeader ? "md:col-span-2 lg:col-span-4" : ""
      }`}
      href={`https://github.com/${member.username}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Card background with gradient border effect */}
      <div
        className={`relative h-full p-[1px] rounded-lg overflow-hidden ${
          isLeader
            ? "bg-gradient-to-br from-yellow-500/50 via-accent/30 to-yellow-500/50"
            : "bg-gradient-to-br from-accent/30 via-terminal-border to-accent/30"
        }`}
      >
        <div
          className={`relative h-full rounded-lg p-6 ${
            isLeader
              ? "bg-gradient-to-br from-yellow-900/20 via-terminal-surface to-green-900/20"
              : "bg-terminal-surface"
          } group-hover:bg-terminal-bg transition-colors duration-300`}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
          </div>

          {/* Leader crown decoration */}
          {isLeader && (
            <div className="absolute -top-1 -right-1 w-20 h-20 overflow-hidden">
              <div className="absolute top-4 right-[-35px] w-[120px] bg-gradient-to-r from-yellow-600 to-yellow-400 text-terminal-bg text-[10px] font-bold py-1 text-center transform rotate-45 shadow-lg">
                LEADER
              </div>
            </div>
          )}

          <div
            className={`relative z-10 flex flex-col items-center gap-4 ${
              isLeader ? "md:flex-row md:justify-center md:gap-8" : ""
            }`}
          >
            {/* Avatar with animated ring */}
            <div className="relative">
              {/* Animated glow ring */}
              <div
                className={`absolute -inset-1 rounded-xl ${
                  isLeader
                    ? "bg-gradient-to-r from-yellow-500 via-accent to-yellow-500"
                    : "bg-gradient-to-r from-accent via-accent-dim to-accent"
                } opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300 animate-pulse`}
              />
              <div
                className={`relative ${
                  isLeader ? "w-24 h-24 md:w-28 md:h-28" : "w-20 h-20"
                } rounded-xl overflow-hidden border-2 ${
                  isLeader ? "border-yellow-500/50" : "border-accent/50"
                }`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-terminal-surface animate-pulse" />
            </div>

            {/* Info */}
            <div
              className={`text-center ${isLeader ? "md:text-left" : ""} flex-1`}
            >
              {/* Name with glow */}
              <h3
                className={`text-xl md:text-2xl font-bold mb-1 ${
                  isLeader
                    ? "text-yellow-300 group-hover:text-yellow-200"
                    : "text-text-primary group-hover:text-accent"
                } transition-colors duration-300`}
              >
                {member.name}
              </h3>

              {/* GitHub handle */}
              <div
                className={`flex items-center justify-center gap-2 mb-2 ${
                  isLeader ? "md:justify-start" : ""
                }`}
              >
                <Icon
                  icon="carbon:logo-github"
                  className="text-text-secondary text-sm"
                />
                <span className="text-sm text-text-secondary">
                  {member.handle}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm mb-3 italic">"{member.description}"</p>

              {/* Skills */}
              <div
                className={`flex flex-wrap justify-center gap-2 ${
                  isLeader ? "md:justify-start" : ""
                }`}
              >
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isLeader
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        : "bg-accent/10 text-accent border border-accent/30"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            const tl = createTimeline({
              defaults: { easing: "easeOutExpo" },
            });

            tl.add(titleRef.current, {
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 800,
            }).add(
              ".team-subtitle",
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

  const leader = teamMembers.find((m) => m.role === "leader");
  const members = teamMembers.filter((m) => m.role === "member");

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Section Header */}
      <div ref={titleRef} className="text-center mb-16 opacity-0 relative z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent" />
          <span className="text-text-muted text-sm font-mono">{"< />"}</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent" />
        </div>

        <h2 className="text-4xl md:text-5xl font-black mb-4">
          <span className="text-text-primary">Meet the </span>
          <span className="text-accent terminal-glow">Team</span>
        </h2>

        <p className="team-subtitle text-text-secondary max-w-xl mx-auto opacity-0">
          Elite developers united by one mission:{" "}
          <span className="text-accent">dominate every hackathon</span> we
          enter.
        </p>

        <div className="section-divider w-32 mx-auto mt-6" />
      </div>

      {/* Team Grid */}
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Leader */}
        <div className="mb-4">
          <MemberCard member={leader} index={0} isLeader={true} />
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              index={index + 1}
              isLeader={false}
            />
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
}
