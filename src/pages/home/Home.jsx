import HeroSection from "../../components/sections/heroSection/HeroSection";
import AboutPreview from "../../components/sections/aboutPreview/AboutPreview";
import FeaturedProjects from "../../components/sections/FeaturedProjects";
import FeaturedLaboratory from "../../components/sections/FeaturedLaboratory";
import ContactPreview from "../../components/sections/ContactPreview";

import { useHomeData } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

function Home() {
  usePageTitle("Alexander Galvez | Portfolio IT y Desarrollo Full Stack");

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

          <FeaturedLaboratory
            nodes={nodes}
            servers={servers}
            metrics={metrics}
            loading={loading}
          />
        </>
      )}

      <ContactPreview />
    </>
  );
}

export default Home;
