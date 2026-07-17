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
    isRefreshing,
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

  const hasProjects = featuredProjects.length > 0;
  const hasLaboratory = Boolean(featuredLaboratory);
  const hasSocialLinks = Array.isArray(socialLinks) && socialLinks.length > 0;
  const hasHomeContent = hasProjects || hasLaboratory || hasSocialLinks;

  const homeSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://alex.syskovex.com/#website",
          url: "https://alex.syskovex.com/",
          name: "Portfolio de Alexander Galvez",
          description:
            "Portfolio técnico de Alexander Galvez especializado en infraestructura IT, redes, virtualización, automatización y desarrollo de software.",
          inLanguage: "es",
        },
        {
          "@type": "Person",
          "@id": "https://alex.syskovex.com/#alexander-galvez",
          name: "Alexander Galvez",
          alternateName: "Alex Galvez",
          url: "https://alex.syskovex.com/",
          image:
            "https://alex.syskovex.com/imagen_portfolio_mia_retocada-960.avif",
          jobTitle: "Systems, Infrastructure and Software Tecnic",
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
            "Desarrollo de software"
          ],
          sameAs: [
            "https://github.com/alexgb23",
            "https://www.linkedin.com/in/alexander-galvez-benavides-450917281/",
            "https://instagram.com/_aaleex_88",
            "https://www.facebook.com/alexander.galvez.benavides"
          ],
          mainEntityOfPage: {
            "@id": "https://alex.syskovex.com/#website"
          }
        }
      ]
    }),
    [],
  );

  const safeJsonLd = useMemo(
    () => JSON.stringify(homeSchema).replace(/<\//g, "<\\/"),
    [homeSchema],
  );

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      <HeroSection socialLinks={socialLinks} onOpenCv={openCvModal} />

      <AboutPreview />

      {homeError && !hasHomeContent ? (
        <section className="section section-spaced section-separated">
          <div className="empty-inline-state">
            <p>No se pudieron cargar los datos de inicio en este momento.</p>
          </div>
        </section>
      ) : (
        <>
          <FeaturedProjects
            projects={featuredProjects}
            loading={homeLoading}
            isRefreshing={isRefreshing}
            error={homeError}
          />

          <FeaturedLaboratory
            item={featuredLaboratory}
            loading={homeLoading}
            isRefreshing={isRefreshing}
            error={homeError}
          />

          <ContactPreview socialLinks={socialLinks} />
        </>
      )}
    </main>
  );
}

export default Home;