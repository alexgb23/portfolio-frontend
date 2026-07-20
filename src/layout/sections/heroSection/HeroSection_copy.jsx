import { Link } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  FaEye,
} from "react-icons/fa";

import HeroScene3D from "./HeroScene3D/HeroScene3D";
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

function HeroSection({ socialLinks = [], onOpenCv }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const displayedSocialLinks = useMemo(() => {
    const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];

    return safeSocialLinks
      .filter((item) =>
        ["github", "linkedin", "email", "envelope"].includes(
          (item?.platform || item?.icon_key || "").toLowerCase(),
        ),
      )
      .sort((a, b) => (a?.sort_order ?? 999) - (b?.sort_order ?? 999))
      .map((item) => {
        const key = (item?.platform || item?.icon_key || "").toLowerCase();
        let url = item?.url || "#";

        if (
          (key === "email" || key === "envelope") &&
          url &&
          !url.startsWith("mailto:")
        ) {
          url = `mailto:${url}`;
        }

        return { ...item, url, key };
      });
  }, [socialLinks]);

  const displayName = "Alexander Galvez";
  const heroKicker = "INFRAESTRUCTURA · SISTEMAS · SOFTWARE · AUTOMATIZACIÓN";
  const heroTitlePrefix = "Diseño soluciones donde";
  const heroTitleHighlight = "software, sistemas y redes";
  const heroTitleSuffix = "trabajan como un ecosistema.";
  const heroIntro =
    "Perfil técnico orientado a infraestructura IT, virtualización, redes, automatización y desarrollo de soluciones web y software.";

  const handleOpenCv = useCallback(() => {
    if (typeof onOpenCv === "function") {
      onOpenCv();
    }
  }, [onOpenCv]);

  return (
    <header
      id="inicio"
      className={`hero-centered-section ${isVisible ? "hero-mounted" : ""}`}
    >
      <div className="container hero-center-content">
        <div className="hero-top-row">
          <div className="hero-title-container">
            <span className="hero-kicker">{heroKicker}</span>

            <h1 className="hero-main-title">
              {heroTitlePrefix} <span>{heroTitleHighlight}</span>{" "}
              {heroTitleSuffix}
            </h1>

            <h2 className="sr-only">
              Portfolio de Alexander Galvez - Técnico Superior en Sistemas y
              Desarrollo
            </h2>

            <p className="hero-intro">{heroIntro}</p>
          </div>

          <div className="avatar-block">
            <div className="avatar-wrapper avatar-wrapper-3d">
              <HeroScene3D
                imageUrl="/imagen_portfolio_mia_retocada-960.avif"
                name="Alexander Galvez"
                role="Systems Engineer"
                stack={["React", "Laravel", "Docker", "PostgreSQL"]}
                location="Madrid, España"
                status="Disponible para proyectos"
              />
            </div>
          </div>
        </div>

        <div className="hero-bottom-block">
          <section
            className="speciality-grid"
            aria-label="Especialidades principales"
          >
            {staticExpertise.map((item, index) => {
              const Icon =
                expertiseIconMap[(item?.icon_key || "").toLowerCase()] ||
                FaCode;

              return (
                <article
                  key={item.id || item.title || index}
                  className={`expertise-card expertise-card-hover ${
                    item.tone || "tone-0"
                  } speciality-card`}
                >
                  <div className="card-head">
                    <div className="expertise-icon" aria-hidden="true">
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
              <FaArrowRight aria-hidden="true" />
            </Link>

            <Link to="/contacto" className="social-btn alt-btn">
              Contactar
            </Link>

            <button
              type="button"
              className="social-btn cv-trigger-btn"
              onClick={handleOpenCv}
            >
              <FaEye aria-hidden="true" />
              <span>Ver / Descargar CV</span>
            </button>
          </div>

          {displayedSocialLinks.length > 0 ? (
            <div className="social-center-links">
              {displayedSocialLinks.map((item, index) => {
                const Icon = socialIconMap[item.key] || FaEnvelope;
                const href = item?.url || "#";
                const isMail = href.startsWith("mailto:");

                return (
                  <a
                    key={item.id || item.platform || index}
                    href={href}
                    className="social-btn"
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    aria-label={item.platform || "Social"}
                  >
                    <Icon aria-hidden="true" />
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
