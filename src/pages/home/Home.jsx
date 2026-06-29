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
import useProjects from "../../hooks/pages/useProjects";
import usePageTitle from "../../hooks/usePageTitle";

function Home() {
  usePageTitle("Alex Galvez | Sistemas, infraestructura y desarrollo de software");

  const [showDeferredSections, setShowDeferredSections] = useState(false);

  const {
    profile,
    socialLinks,
    expertise,
    loading: homeLoading,
    error: homeError,
  } = usePortfolioHome();

  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects(true);

  const {
    summary,
    loading: laboratoryLoading,
    error: laboratoryError,
  } = useLaboratoryHome(showDeferredSections);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raf =
      window.requestAnimationFrame ||
      ((callback) => window.setTimeout(callback, 16));

    const cancelRaf =
      window.cancelAnimationFrame ||
      ((id) => window.clearTimeout(id));

    const id = raf(() => {
      setShowDeferredSections(true);
    });

    return () => cancelRaf(id);
  }, []);

  const safeProjects = Array.isArray(projects) ? projects : [];
  const featuredOnly = safeProjects.filter((project) => project.is_featured);
  const nonFeatured = safeProjects.filter((project) => !project.is_featured);
  const featuredProjects = [...featuredOnly, ...nonFeatured].slice(0, 3);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://alex.syskovex.com/#alex-galvez",
    name: profile?.full_name || "Alex Galvez",
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

      <HeroSection
        profile={profile}
        socialLinks={socialLinks}
        expertise={expertise}
        loading={homeLoading}
        error={homeError}
      />

      <AboutPreview />

      {projectsError ? (
        <section className="section section-spaced section-separated">
          <div className="empty-inline-state">
            <p>No se pudieron cargar los proyectos en este momento.</p>
          </div>
        </section>
      ) : (
        <FeaturedProjects
          projects={featuredProjects}
          loading={projectsLoading}
        />
      )}

      {showDeferredSections ? (
        <>
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
  );
}

export default Home;