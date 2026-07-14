import { useEffect, useMemo } from "react";
import { useOutletContext } from "react-router";
import HeroSection from "../../layout/sections/heroSection/HeroSection";
import AboutPreview from "../../layout/sections/aboutPreview/AboutPreview";
import FeaturedProjects from "../../layout/sections/FeaturedProjects";
import FeaturedLaboratory from "../../layout/sections/FeaturedLaboratory";
import ContactPreview from "../../layout/sections/ContactPreview";
import { usePortfolioHome } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

function Home() {
  const { openCvModal, setCvSocialLinks } = useOutletContext();

  usePageTitle(
    "Alexander Galvez | Sistemas, infraestructura y desarrollo de software",
  );

  const {
    socialLinks,
    projects,
    laboratories,
    loading: homeLoading,
    error: homeError,
  } = usePortfolioHome();

  useEffect(() => {
    if (typeof setCvSocialLinks === "function") {
      setCvSocialLinks(socialLinks);
    }
  }, [socialLinks, setCvSocialLinks]);

  const featuredProjects = useMemo(() => {
    return Array.isArray(projects) ? projects.slice(0, 2) : [];
  }, [projects]);

  const featuredLaboratory = useMemo(() => {
    return Array.isArray(laboratories) && laboratories.length > 0
      ? laboratories[0]
      : null;
  }, [laboratories]);

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
            <p>No se pudieron cargar los datos de inicio en este momento.</p>
          </div>
        </section>
      ) : (
        <>
          <FeaturedProjects projects={featuredProjects} loading={homeLoading} />

          <FeaturedLaboratory
            item={featuredLaboratory}
            loading={homeLoading}
            error={homeError}
          />

          <ContactPreview socialLinks={socialLinks} />
        </>
      )}
    </main>
  );
}

export default Home;
