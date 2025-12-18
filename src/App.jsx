import HeroSection from "./components/HeroSection";
import TeamSection from "./components/TeamSection";
import ProjectsSection from "./components/ProjectsSection";
import HallOfFameSection from "./components/HallOfFameSection";
import Footer from "./components/Footer";

// Pre-generated particle data for consistent background
const particleData = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 25 + 15,
  delay: Math.random() * 10,
}));

function FloatingParticles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particleData.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-accent/20 particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-terminal-bg">
      {/* Global background effects */}
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none z-0" />
      <FloatingParticles />

      {/* Subtle scanlines overlay */}
      <div className="scanlines" />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <TeamSection />
        <ProjectsSection />
        <HallOfFameSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
