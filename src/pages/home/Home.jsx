import { useEffect, useState, useMemo } from "react";
import HeroSection from "../../components/sections/heroSection/HeroSection";
import AboutPreview from "../../components/sections/aboutPreview/AboutPreview";
import FeaturedProjects from "../../components/sections/FeaturedProjects";
import FeaturedLaboratory from "../../components/sections/FeaturedLaboratory";
import ContactPreview from "../../components/sections/ContactPreview";

import { usePortfolioHome } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

function Home() {
  usePageTitle(
    "Alexander Galvez | Sistemas, infraestructura y desarrollo de software",
  );

  const [showDeferredSections, setShowDeferredSections] = useState(false);

  const {
    socialLinks,
    projects,
    laboratorySummary,
    error: homeError,
  } = usePortfolioHome();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raf =
      window.requestAnimationFrame ||
      ((callback) => window.setTimeout(callback, 16));

    const cancelRaf =
      window.cancelAnimationFrame || ((id) => window.clearTimeout(id));

    const id = raf(() => {
      setShowDeferredSections(true);
    });

    return () => cancelRaf(id);
  }, []);

  const featuredProjects = useMemo(() => {
    const featuredOnly = projects.filter((project) => project.is_featured);
    const nonFeatured = projects.filter((project) => !project.is_featured);
    return [...featuredOnly, ...nonFeatured].slice(0, 3);
  }, [projects]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://alex.syskovex.com/#alexander-galvez",
    name: "Alexander Galvez",
    url: "https://alex.syskovex.com/",
    image: "https://alex.syskovex.com/imagen_portfolio_mia_retocada-960.avif",
    jobTitle: "Systems, Infrastructure and Software Engineer",
    description:
      "Perfil técnico especializado en infraestructura IT, redes, virtualización, automatización y desarrollo de software.",
    knowsAbout: [
      "Infraestructura IT",
      "Administración de sistemas",
      "Virtualización",
      "Redes",
      "Seguridad perimetral",
      "Automatización",
      "IoT",
      "Linux",
      "APIs",
      "Desarrollo de software",
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
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      <HeroSection socialLinks={socialLinks} />

      <AboutPreview />

      {homeError ? (
        <section className="section section-spaced section-separated">
          <div className="empty-inline-state">
            <p>No se pudieron cargar los proyectos en este momento.</p>
          </div>
        </section>
      ) : (
        <FeaturedProjects projects={featuredProjects} />
      )}

      {showDeferredSections ? (
        <>
          {homeError ? (
            <section className="section section-spaced section-separated">
              <div className="empty-inline-state">
                <p>
                  No se pudo cargar el resumen del laboratorio en este momento.
                </p>
              </div>
            </section>
          ) : (
            <FeaturedLaboratory
              serversCount={laboratorySummary.servers_count}
              metricsCount={laboratorySummary.metrics_count}
              nodesCount={laboratorySummary.nodes_count}
            />
          )}

          <ContactPreview socialLinks={socialLinks} />
        </>
      ) : null}
    </main>
  );
}

export default Home;
