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
    "Alex Alexander Galvez | Sistemas, infraestructura y desarrollo de software",
  );

  const [showDeferredSections, setShowDeferredSections] = useState(false);

  // 1. UNA ÚNICA PETICIÓN: Extraemos todo del nuevo JSON unificado
  const {
    socialLinks,
    projects,
    servers,
    nodes,
    metrics,
    loading: homeLoading,
    error: homeError,
  } = usePortfolioHome();

  // 2. Control de renderizado diferido para optimizar el hilo principal de la UI
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

  // 3. Procesamiento local de proyectos destacados basado en los datos del endpoint
  const featuredProjects = useMemo(() => {
    const featuredOnly = projects.filter((project) => project.is_featured);
    const nonFeatured = projects.filter((project) => !project.is_featured);
    return [...featuredOnly, ...nonFeatured].slice(0, 3);
  }, [projects]);

  // 4. Conteo directo de arrays en tiempo de ejecución (Cero peticiones extra)
  const laboratorySummary = useMemo(() => {
    return {
      servers_count: servers.length,
      nodes_count: nodes.length,
      metrics_count: metrics.length,
    };
  }, [servers, nodes, metrics]);

  // Structured Data (SEO Schema) con datos estáticos seguros
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      {/* Hero recibe las redes de la API. Datos de profile y expertise usarán los fallbacks estáticos internos */}
      <HeroSection
        profile={null}
        socialLinks={socialLinks}
        expertise={[]}
        loading={homeLoading}
        error={homeError}
      />

      <AboutPreview />

      {homeError ? (
        <section className="section section-spaced section-separated">
          <div className="empty-inline-state">
            <p>No se pudieron cargar los proyectos en este momento.</p>
          </div>
        </section>
      ) : (
        <FeaturedProjects projects={featuredProjects} loading={homeLoading} />
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
              loading={homeLoading}
            />
          )}

          <ContactPreview profile={null} socialLinks={socialLinks} />
        </>
      ) : null}
    </>
  );
}

export default Home;
