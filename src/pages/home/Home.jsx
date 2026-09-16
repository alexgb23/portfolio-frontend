import { useEffect, useMemo } from "react";
import { useOutletContext } from "react-router";

import HeroSection from "../../layout/sections/heroSection/HeroSection";
import AboutPreview from "../../layout/sections/aboutPreview/AboutPreview";
import FeaturedProjects from "../../layout/sections/FeaturedProjects";
import FeaturedLaboratory from "../../layout/sections/FeaturedLaboratory";
import ContactPreview from "../../layout/sections/ContactPreview";
import usePageTitle from "../../hooks/usePageTitle";

function Home() {
  const {
    openCvModal,
    setCvSocialLinks,
    socialLinks,
    projects,
    laboratories,
    loading,
    error,
    isRefreshing,
    isRetrying,
  } = useOutletContext();

  usePageTitle(
    "Alexander Galvez | Sistemas, infraestructura y desarrollo de software",
  );

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

  const isConnecting = Boolean(isRetrying || (loading && !hasHomeContent));

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
            "Desarrollo de software",
          ],
          sameAs: [
            "https://github.com/alexgb23",
            "https://www.linkedin.com/in/alexander-galvez-benavides-450917281/",
            "https://instagram.com/_aaleex_88",
            "https://www.facebook.com/alexander.galvez.benavides",
          ],
          mainEntityOfPage: {
            "@id": "https://alex.syskovex.com/#website",
          },
        },
      ],
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

      {/*
        Si Render está despertando, no mostramos “error”.
        Dejamos que FeaturedProjects y FeaturedLaboratory rendericen sus
        propios skeletons usando loading/isRetrying.
      */}
      {error && !hasHomeContent && !isConnecting ? (
        <section className="section section-spaced section-separated">
          <div className="empty-inline-state" role="alert">
            <p>
              No se pudieron cargar los datos de inicio en este momento.
              Inténtalo de nuevo más tarde.
            </p>
          </div>
        </section>
      ) : (
        <>
          {isConnecting && !hasHomeContent ? (
            <section
              className="section section-spaced section-separated"
              aria-live="polite"
            >
              <div className="empty-inline-state">
                <p>
                  Conectando con el laboratorio. El servidor se está iniciando;
                  los proyectos y laboratorios aparecerán en breve.
                </p>
              </div>
            </section>
          ) : null}

          <FeaturedProjects
            projects={featuredProjects}
            loading={loading}
            isRefreshing={isRefreshing}
            isRetrying={isRetrying}
            error={error}
          />

          <FeaturedLaboratory
            item={featuredLaboratory}
            loading={loading}
            isRefreshing={isRefreshing}
            isRetrying={isRetrying}
            error={error}
          />

          <ContactPreview
            socialLinks={socialLinks}
            loading={loading}
            isRefreshing={isRefreshing}
            isRetrying={isRetrying}
          />
        </>
      )}
    </main>
  );
}

export default Home;
