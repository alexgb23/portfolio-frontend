import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import HeroSection from "../../layout/sections/heroSection/HeroSection";
import AboutPreview from "../../layout/sections/aboutPreview/AboutPreview";
import FeaturedProjects from "../../layout/sections/FeaturedProjects";
import FeaturedLaboratory from "../../layout/sections/FeaturedLaboratory";
import ContactPreview from "../../layout/sections/ContactPreview";
import { usePortfolioHome } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

function normalizeProjects(projects) {
  return Array.isArray(projects) ? projects : [];
}

function normalizeLaboratories(items) {
  return Array.isArray(items) ? items : [];
}

function Home() {
  const { openCvModal, setCvSocialLinks } = useOutletContext();

  usePageTitle(
    "Alexander Galvez | Sistemas, infraestructura y desarrollo de software",
  );

  const [showDeferredSections, setShowDeferredSections] = useState(false);

  const {
    socialLinks = [],
    projects = [],
    laboratories = [],
    loading: homeLoading,
    error: homeError,
  } = usePortfolioHome();

  useEffect(() => {
    if (typeof setCvSocialLinks === "function") {
      setCvSocialLinks(socialLinks);
    }
  }, [socialLinks, setCvSocialLinks]);

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

  const safeProjects = useMemo(() => normalizeProjects(projects), [projects]);

  const featuredProjects = useMemo(() => {
    const featuredOnly = safeProjects.filter((project) => project?.is_featured);
    const nonFeatured = safeProjects.filter((project) => !project?.is_featured);

    return [...featuredOnly, ...nonFeatured].slice(0, 3);
  }, [safeProjects]);

  const safeLaboratories = useMemo(
    () => normalizeLaboratories(laboratories),
    [laboratories],
  );

  const featuredLaboratory = useMemo(() => {
    const featuredOnly = safeLaboratories.filter((item) => item?.is_featured);
    const nonFeatured = safeLaboratories.filter((item) => !item?.is_featured);

    return [...featuredOnly, ...nonFeatured][0] ?? null;
  }, [safeLaboratories]);

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

      <HeroSection socialLinks={socialLinks} onOpenCv={openCvModal} />

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
          <FeaturedLaboratory
            item={featuredLaboratory}
            loading={homeLoading}
            error={homeError}
          />

          <ContactPreview socialLinks={socialLinks} />
        </>
      ) : null}
    </main>
  );
}

export default Home;
