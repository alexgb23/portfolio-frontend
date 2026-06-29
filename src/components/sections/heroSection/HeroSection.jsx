import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  FaServer,
  FaCode,
  FaNetworkWired,
  FaMicrochip,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
  FaDatabase,
} from "react-icons/fa";

import "./HeroSection.css";

const expertiseIconMap = {
  server: FaServer,
  infrastructure: FaServer,
  code: FaCode,
  development: FaCode,
  software: FaCode,
  network: FaNetworkWired,
  networking: FaNetworkWired,
  shield: FaNetworkWired,
  microchip: FaMicrochip,
  automation: FaMicrochip,
  ai: FaMicrochip,
  database: FaDatabase,
  data: FaDatabase,
};

const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  envelope: FaEnvelope,
};

const staticExpertise = [
  {
    id: "networking-virtualization",
    title: "Redes y Virtualización",
    text: "Diseño de redes, segmentación y despliegue de entornos virtuales eficientes.",
    icon_key: "server",
    tone: "tone-1",
  },
  {
    id: "linux-systems",
    title: "Sistemas Linux",
    text: "Administración, configuración y gestión de servidores robustos.",
    icon_key: "code",
    tone: "tone-0",
  },
  {
    id: "automation-iot",
    title: "Automatización e IoT",
    text: "Scripts de optimización, domótica avanzada y conectividad inteligente.",
    icon_key: "microchip",
    tone: "tone-4",
  },
  {
    id: "applied-ai",
    title: "IA Aplicada",
    text: "Integración de inteligencia artificial para resolver problemas reales.",
    icon_key: "network",
    tone: "tone-2",
  },
];

const toneFallbacks = ["tone-0", "tone-1", "tone-2", "tone-4"];

function HeroSection({
  profile = null,
  socialLinks = [],
  expertise = [],
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const raf =
      window.requestAnimationFrame ||
      ((callback) => window.setTimeout(callback, 16));

    const cancelRaf =
      window.cancelAnimationFrame ||
      ((id) => window.clearTimeout(id));

    const id = raf(() => {
      setIsVisible(true);
    });

    return () => cancelRaf(id);
  }, []);

  const displayedSocialLinks = useMemo(() => {
    const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];

    return safeSocialLinks
      .filter((item) =>
        ["github", "linkedin", "email", "envelope"].includes(
          (item?.platform || item?.icon_key || "").toLowerCase()
        )
      )
      .sort((a, b) => (a?.sort_order ?? 999) - (b?.sort_order ?? 999))
      .map((item) => {
        const key = (item?.platform || item?.icon_key || "").toLowerCase();
        let url = item?.url || "#";

        if ((key === "email" || key === "envelope") && url && !url.startsWith("mailto:")) {
          url = `mailto:${url}`;
        }

        return { ...item, url };
      });
  }, [socialLinks]);

  const displayedExpertise = useMemo(() => {
    const safeExpertise = Array.isArray(expertise) ? expertise : [];
    const source = safeExpertise.length > 0 ? safeExpertise : staticExpertise;

    return source.slice(0, 4).map((item, index) => ({
      id: item?.id || item?.slug || item?.title || `expertise-${index}`,
      title: item?.title || "Especialidad",
      text: item?.text || item?.description || "",
      icon_key: item?.icon_key || item?.iconName || "code",
      tone: item?.tone || toneFallbacks[index % toneFallbacks.length],
    }));
  }, [expertise]);

  const displayName = profile?.display_name || profile?.full_name || "Alex Galvez";

  const heroKicker =
    "INFRAESTRUCTURA · SISTEMAS · SOFTWARE · AUTOMATIZACIÓN";

  const heroTitlePrefix = "Diseño soluciones donde";
  const heroTitleHighlight = "software, sistemas y redes";
  const heroTitleSuffix = "trabajan como un ecosistema.";

  const heroIntro =
    "Perfil técnico orientado a infraestructura IT, virtualización, redes, automatización y desarrollo de soluciones web y software.";

  const avatarAlt = `Retrato profesional de ${displayName}`;

  return (
    <header
      className={`hero-centered-section ${isVisible ? "hero-mounted" : ""}`}
      id="inicio"
    >
      <div className="container hero-center-content">
        <div className="hero-top-row">
          <div className="hero-title-container">
            <span className="hero-kicker">{heroKicker}</span>

            <h1 className="hero-main-title">
              {heroTitlePrefix} <span>{heroTitleHighlight}</span>{" "}
              {heroTitleSuffix}
            </h1>

            <h2 className="sr-only">Especialidades principales</h2>

            <p className="hero-intro">{heroIntro}</p>
          </div>

          <div className="avatar-block">
            <div className="avatar-wrapper">
              <picture className="avatar-picture">
                <source
                  type="image/avif"
                  srcSet="/imagen_portfolio_mia_retocada-480.avif 480w, /imagen_portfolio_mia_retocada-768.avif 768w, /imagen_portfolio_mia_retocada-960.avif 960w, /imagen_portfolio_mia_retocada-1280.avif 1280w"
                  sizes="(max-width: 767px) 300px, (max-width: 1279px) 400px, 450px"
                />
                <source
                  type="image/webp"
                  srcSet="/imagen_portfolio_mia_retocada-480.webp 480w, /imagen_portfolio_mia_retocada-768.webp 768w, /imagen_portfolio_mia_retocada-960.webp 960w, /imagen_portfolio_mia_retocada-1280.webp 1280w"
                  sizes="(max-width: 767px) 300px, (max-width: 1279px) 400px, 450px"
                />
                <img
                  src="/imagen_portfolio_mia_retocada-960.avif"
                  alt={avatarAlt}
                  className="profile-avatar"
                  width="450"
                  height="580"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>

        <div className="hero-bottom-block">
          <section className="speciality-grid" aria-label="Especialidades principales">
            {displayedExpertise.map((item, index) => {
              const Icon =
                expertiseIconMap[(item?.icon_key || "").toLowerCase()] || FaCode;

              return (
                <article
                  key={item.id || item.title || index}
                  className={`expertise-card expertise-card-hover ${item.tone || "tone-0"} speciality-card`}
                >
                  <div className="card-head">
                    <div className="expertise-icon">
                      <Icon />
                    </div>

                    <div className="card-title-wrap">
                      <h3>{item.title}</h3>
                    </div>
                  </div>

                  <p>{item.text}</p>
                </article>
              );
            })}
          </section>

          <div className="hero-actions">
            <Link to="/laboratorio" className="nav-cta">
              <span>Ver laboratorio</span>
              <FaArrowRight />
            </Link>

            <Link to="/contacto" className="social-btn alt-btn">
              Contactar
            </Link>
          </div>

          {displayedSocialLinks.length > 0 ? (
            <div className="social-center-links">
              {displayedSocialLinks.map((item, index) => {
                const key = (item?.platform || item?.icon_key || "").toLowerCase();
                const Icon = socialIconMap[key] || FaEnvelope;
                const href = item?.url || "#";
                const isMail = href.startsWith("mailto:");

                return (
                  <a
                    key={item.id || item.platform || index}
                    href={href}
                    className="social-btn"
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                  >
                    <Icon />
                    <span>{item.platform || "Social"}</span>
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
