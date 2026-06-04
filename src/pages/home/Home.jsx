import HeroSection from "../../components/sections/heroSection/HeroSection";
import AboutPreview from "../../components/sections/aboutPreview/AboutPreview";
import FeaturedProjects from "../../components/sections/FeaturedProjects";
import FeaturedAutomation from "../../components/sections/FeaturedAutomation";
import FeaturedInfrastructure from "../../components/sections/FeaturedInfrastructure";
import ContactPreview from "../../components/sections/ContactPreview";
import { usePortfolioData } from "../../hooks/usePortfolioData";

function Home() {
  const { projects, nodes, servers, metrics, loading, error } =
    usePortfolioData();

  if (loading) {
    return (
      <div className="state-wrapper centered">
        <div className="sys-loader"></div>
        <h2>Sincronizando sistemas...</h2>
        <p>Cargando proyectos, nodos, servidores y métricas.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-wrapper error centered">
        <h2>Error de conexión</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <AboutPreview />
      <FeaturedProjects projects={projects?.slice(0, 3)} />
      <FeaturedInfrastructure
        servers={servers?.slice(0, 2)}
        metrics={metrics?.slice(0, 4)}
      />
      <FeaturedAutomation nodes={nodes?.slice(0, 2)} />
      <ContactPreview />
    </>
  );
}

export default Home;
