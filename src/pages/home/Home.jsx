import HeroSection from "../../components/sections/heroSection/HeroSection";
import AboutPreview from "../../components/sections/aboutPreview/AboutPreview";
import FeaturedProjects from "../../components/sections/FeaturedProjects";
import FeaturedAutomation from "../../components/sections/FeaturedAutomation";
import FeaturedInfrastructure from "../../components/sections/FeaturedInfrastructure";
import ContactPreview from "../../components/sections/ContactPreview";
import { useHomeData } from "../../hooks/usePortfolioData";

function Home() {
  const { projects, nodes, servers, metrics, loading, error } = useHomeData();

  return (
    <>
      <HeroSection />
      <AboutPreview />

      {error ? (
        <div className="state-wrapper error centered">
          <h2>Error de conexión</h2>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <FeaturedProjects
            projects={projects?.slice(0, 3) ?? []}
            loading={loading}
          />
          <FeaturedInfrastructure
            servers={servers?.slice(0, 2) ?? []}
            metrics={metrics?.slice(0, 4) ?? []}
            loading={loading}
          />
          <FeaturedAutomation
            nodes={nodes?.slice(0, 2) ?? []}
            loading={loading}
          />
        </>
      )}

      <ContactPreview />
    </>
  );
}

export default Home;
