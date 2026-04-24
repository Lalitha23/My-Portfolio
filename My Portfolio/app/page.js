import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import ProjectsSection from '@/components/ProjectsSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <StatsBar />
        <ProjectsSection />
      </main>
    </>
  );
}
