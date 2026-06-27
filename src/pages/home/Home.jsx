import { useEffect, useState } from "react";
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

  const [showDeferredSections, setShowDeferredSections] = useState(false);

  const {
    profile,
    projects,
    expertise,
    socialLinks,
    loading: homeLoading,
    error: homeError,
  } = usePortfolioHome();

  const {
    summary,
    loading: laboratoryLoading,
    error: laboratoryError,
  } = useLaboratoryHome();

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setShowDeferredSections(true);
    });

    return () => window.cancelAnimationFrame(id);
  }, []);

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

      {homeError ? (
        <div className="state-wrapper error centered">
          <h2>Error de conexión</h2>
          <p>{homeError}</p>
        </div>
      ) : (
        <>
          <HeroSection
            profile={profile}
            expertise={expertise}
            socialLinks={socialLinks}
          />

          <AboutPreview profile={profile} />

          {showDeferredSections ? (
            <>
              <FeaturedProjects
                projects={featuredProjects}
                loading={homeLoading}
              />

              {laboratoryError ? (
                <section className="section section-spaced section-separated">
                  <div className="empty-inline-state">
                    <p>No se pudo cargar el resumen del laboratorio en este momento.</p>
                  </div>
                </section>
              ) : (
                <FeaturedLaboratory
                  serversCount={summary?.servers_count ?? 0}
                  metricsCount={summary?.metrics_count ?? 0}
                  nodesCount={summary?.nodes_count ?? 0}
                  loading={laboratoryLoading}
                />
              )}

              <ContactPreview
                profile={profile}
                socialLinks={socialLinks}
              />
            </>
          ) : null}
        </>
      )}
    </>
  );
}

export default Home;