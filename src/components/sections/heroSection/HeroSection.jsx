import { Link } from "react-router-dom";
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

import usePortfolioHome from "../../../hooks/pages/usePortfolioHome";
import "../sectionsGlobals.css";
import "./HeroSection.css";

const expertiseIconMap = {
  server: FaServer,
  infrastructure: FaServer,
  code: FaCode,
  development: FaCode,
  network: FaNetworkWired,
  networking: FaNetworkWired,
  microchip: FaMicrochip,
  automation: FaMicrochip,
  database: FaDatabase,
};

const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  envelope: FaEnvelope,
};

function HeroSection() {
  const { profile, expertise, socialLinks, loading } = usePortfolioHome();

  const displayedExpertise = (expertise ?? []).slice(0, 4);

  const displayedSocialLinks = (socialLinks ?? []).filter((item) =>
    ["github", "linkedin", "email", "envelope"].includes(
      (item.platform || item.icon_key || "").toLowerCase()
    )
  );

  const heroKicker =
    profile?.hero_kicker ||
    "DESARROLLO WEB · INFRAESTRUCTURA IT · AUTOMATIZACIÓN";

  const heroTitlePrefix = profile?.hero_title_prefix || "Diseño soluciones donde";
  const heroTitleHighlight =
    profile?.hero_title_highlight || "software, sistemas y red";
  const heroTitleSuffix =
    profile?.hero_title_suffix || "trabajan como un solo ecosistema.";

  const heroIntro =
    profile?.bio_short ||
    "Desarrollador web y perfil técnico IT con enfoque en frontend moderno, backend, virtualización, redes y automatización.";

  const heroBadge =
    profile?.hero_stack_badge || "React · Laravel · Proxmox · pfSense";

  return (
    <header className="hero-centered-section" id="inicio">
      <div className="container hero-center-content">
        <div className="hero-top-row">
          <div className="hero-title-container">
            <span className="hero-kicker">
              {loading ? "Cargando..." : heroKicker}
            </span>

            <h1 className="hero-main-title">
              {heroTitlePrefix} <span>{heroTitleHighlight}</span>{" "}
              {heroTitleSuffix}
            </h1>

            <h2 className="sr-only">Especialidades principales</h2>

            <p className="hero-intro">{loading ? "Cargando perfil..." : heroIntro}</p>
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
                  alt={profile?.display_name || "Alexander Galvez"}
                  className="profile-avatar"
                  width="450"
                  height="580"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>

            <div className="hero-badge-wrap">
              <div className="hero-badge-inner">{heroBadge}</div>
            </div>
          </div>
        </div>

        <div className="hero-bottom-block">
          <section className="speciality-grid">
            {displayedExpertise.map((item, index) => {
              const Icon =
                expertiseIconMap[(item.icon_key || "").toLowerCase()] || FaCode;

              return (
                <article
                  key={item.id || item.title || index}
                  className={`card card-hover ${item.tone || "tone-0"} speciality-card`}
                >
                  <div className="card-head">
                    <div className="card-icon">
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
            <Link to="/proyectos" className="nav-cta">
              Ver proyectos
              <FaArrowRight />
            </Link>

            <Link to="/contacto" className="social-btn alt-btn">
              Contactar
            </Link>
          </div>

          <div className="social-center-links">
            {displayedSocialLinks.map((item, index) => {
              const key = (item.platform || item.icon_key || "").toLowerCase();
              const Icon = socialIconMap[key] || FaEnvelope;

              return (
                <a
                  key={item.id || item.platform || index}
                  href={item.url}
                  className="social-btn"
                  target={item.url?.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    item.url?.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                >
                  <Icon />
                  {item.label || item.platform}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;