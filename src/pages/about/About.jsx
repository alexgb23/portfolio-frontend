import {
  FaCode,
  FaNetworkWired,
  FaMicrochip,
  FaDatabase,
  FaServer,
} from "react-icons/fa";

import usePageTitle from "../../hooks/usePageTitle";
import usePortfolioHome from "../../hooks/pages/usePortfolioHome";
import "./About.css";

const expertiseIconMap = {
  code: FaCode,
  database: FaDatabase,
  network: FaNetworkWired,
  networking: FaNetworkWired,
  microchip: FaMicrochip,
  automation: FaMicrochip,
  server: FaServer,
  infrastructure: FaServer,
};

const defaultExpertise = [
  {
    id: "about-development",
    title: "Desarrollo",
    text: "Frontend, backend y soluciones orientadas a producto y experiencia real.",
    icon_key: "code",
    tone: "tone-0",
  },
  {
    id: "about-infrastructure",
    title: "Infraestructura",
    text: "Servidores, virtualización y despliegues técnicos con enfoque estable y escalable.",
    icon_key: "server",
    tone: "tone-1",
  },
  {
    id: "about-networking",
    title: "Redes",
    text: "Segmentación, conectividad, routing y seguridad aplicados a entornos reales.",
    icon_key: "network",
    tone: "tone-2",
  },
  {
    id: "about-automation",
    title: "Automatización",
    text: "Sistemas físicos, sensores e integración técnica para procesos inteligentes.",
    icon_key: "automation",
    tone: "tone-0",
  },
];

function About() {
  usePageTitle("Sobre mí | Alexander Galvez");

  const { profile, skills, highlights, expertise, loading } = usePortfolioHome();

  const technologies = (skills ?? []).map((skill) => skill.name).filter(Boolean);

  const visibleExpertise =
    Array.isArray(expertise) && expertise.length > 0
      ? expertise
      : defaultExpertise;

  const aboutTitle =
    profile?.about_title ||
    "Tecnología, infraestructura y desarrollo en una sola visión";

  const aboutIntro =
    profile?.about_intro ||
    "Soy Alexander Galvez, profesional del sector IT especializado en desarrollo de software, sistemas informáticos, redes y automatización.";

  const aboutParagraphs = profile?.bio_long
    ? profile.bio_long.split("\n\n").filter(Boolean)
    : [];

  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        <div className="about-left">
          <span className="about-kicker">// Sobre mí</span>

          <h1 className="about-title">
            {loading ? "Cargando..." : aboutTitle}
          </h1>

          <p className="about-text">{aboutIntro}</p>

          {aboutParagraphs.map((paragraph, index) => (
            <p key={index} className="about-text">
              {paragraph}
            </p>
          ))}

          {technologies.length > 0 ? (
            <div className="tech-badges">
              {technologies.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="about-right">
          <div className="photo-wrapper">
            <div className="photo-container">
              <picture className="about-picture">
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
                  className="profile-photo"
                  width="450"
                  height="580"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>

      <section className="technical-section">
        <div className="technical-line"></div>

        <div className="technical-timeline">
          {(highlights ?? []).map((item, index) => (
            <article
              key={item.id || item.number || index}
              className={`stat-card ${item.side || "left"}`}
            >
              <span className="stat-number">{item.number}</span>

              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="expertise-section">
        <div className="expertise-grid">
          {visibleExpertise.map((item, index) => {
            const Icon =
              expertiseIconMap[(item?.icon_key || "").toLowerCase()] || FaCode;

            return (
              <article
                key={item.id || item.title || index}
                className={`expertise-card expertise-card-hover ${item.tone || "tone-0"}`}
              >
                <div className="card-head">
                  <div className="expertise-icon">
                    <Icon />
                  </div>

                  <div className="card-title-wrap">
                    <h3>{item.title || "Especialidad"}</h3>
                  </div>
                </div>

                <p>{item.text || "Descripción no disponible."}</p>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default About;