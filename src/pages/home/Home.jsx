import HeroSection from "../../components/sections/heroSection/HeroSection";
import AboutPreview from "../../components/sections/aboutPreview/AboutPreview";
import FeaturedProjects from "../../components/sections/FeaturedProjects";
import FeaturedLaboratory from "../../components/sections/FeaturedLaboratory";
import ContactPreview from "../../components/sections/ContactPreview";

import {
  usePortfolioHome,
  useLaboratoryHome,
} from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

function Home() {
  usePageTitle("Alexander Galvez | Portfolio IT y Desarrollo Full Stack");

  const {
    profile,
    projects,
    loading: homeLoading,
    error: homeError,
  } = usePortfolioHome();

  const {
    summary,
    loading: laboratoryLoading,
    error: laboratoryError,
  } = useLaboratoryHome();

  const error = homeError || laboratoryError;

  const featuredProjects = (projects ?? [])
    .filter((project) => project.is_featured)
    .slice(0, 3);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://portfolioalexsys.netlify.app/#alexander-galvez",
    name: profile?.full_name || "Alexander Galvez",
    url: "https://portfolioalexsys.netlify.app/",
    image:
      "https://portfolioalexsys.netlify.app/imagen_portfolio_mia_retocada-960.avif",
    jobTitle: profile?.headline || "IT Specialist · Full Stack Developer",
    description:
      profile?.bio_short ||
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
    sameAs: [
      "https://github.com/alexgb23",
      "https://www.linkedin.com/in/alexander-galvez-benavides-450917281/",
      "https://instagram.com/_aaleex_88",
      "https://www.facebook.com/alexander.galvez.benavides",
    ],
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
          <FeaturedProjects projects={featuredProjects} loading={homeLoading} />

          <FeaturedLaboratory
            serversCount={summary?.servers_count ?? 0}
            metricsCount={summary?.metrics_count ?? 0}
            nodesCount={summary?.nodes_count ?? 0}
            loading={laboratoryLoading}
          />
        </>
      )}

      <ContactPreview />
    </>
  );
}

export default Home;
