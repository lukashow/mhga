import HeroSection from './components/HeroSection';
import TeamSection from './components/TeamSection';
import ProjectsSection from './components/ProjectsSection';
import HallOfFameSection from './components/HallOfFameSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-terminal-bg">
      {/* Subtle scanlines overlay */}
      <div className="scanlines" />
      
      {/* Main content */}
      <main>
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
