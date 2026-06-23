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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://portfolioalexsys.netlify.app/#alexander-galvez",
    name: "Alexander Galvez",
    url: "https://portfolioalexsys.netlify.app/",
    image:
      "https://portfolioalexsys.netlify.app/imagen_portfolio_mia_retocada-960.avif",
    jobTitle: "IT Specialist · Full Stack Developer · Systems Engineer",
    description:
      "Profesional del sector tecnológico especializado en desarrollo de aplicaciones, administración de sistemas y diseño de infraestructuras IT.",
    knowsAbout: [
      "Desarrollo Full Stack",
      "Infraestructura IT",
      "Administración de sistemas",
      "Virtualización",
      "Redes y seguridad",
      "Automatización IoT",
      "Linux",
      "APIs",
      "Bases de datos",
    ],
    sameAs: ["https://github.com/alexgb23"],
  };

  const safeJsonLd = JSON.stringify(personSchema).replace(/<\//g, "<\\/");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

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
