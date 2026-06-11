import { Link } from "react-router-dom";
import {
  FaCode,
  FaServer,
  FaNetworkWired,
  FaMicrochip,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import "../sectionsGlobals.css";
import "./HeroSection.css";

function HeroSection() {
  return (
    <header className="hero-centered-section" id="inicio">
      <div className="container hero-center-content">
        <div className="hero-top-row">
          <div className="hero-title-container">
            <h1 className="hero-main-title">
              Construyo soluciones donde el software, la red y la automatización
              trabajan juntas.
            </h1>
          </div>

          <div className="avatar-block">
            <div className="avatar-wrapper">
              <img
                src="/imagen_portfolio_mia_retocada.webp"
                alt="Foto de Alex"
                className="profile-avatar"
                width="420"
                height="420"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="hero-badge-wrap">
              <div className="hero-badge-glow">
                <div className="hero-badge-inner">
                  <span className="hero-badge-text">
                    Informática · Redes · Sistemas · Domótica · Desarrollo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom-block">
          <p className="hero-text">
            Técnico informático y desarrollador full-stack con experiencia en
            sistemas, redes, domótica, inmótica, programación y diseño web.
            Diseño entornos robustos para infraestructura, monitorización,
            control y aplicaciones funcionales orientadas a resultados reales.
          </p>

          <div
            className="hero-highlights"
            aria-label="Especialidades principales"
          >
            <span>
              <FaCode aria-hidden="true" /> Laravel / React
            </span>
            <span>
              <FaNetworkWired aria-hidden="true" /> Redes
            </span>
            <span>
              <FaServer aria-hidden="true" /> Infraestructura
            </span>
            <span>
              <FaMicrochip aria-hidden="true" /> IoT / Automatización
            </span>
          </div>

          <div className="hero-actions">
            <Link to="/proyectos" className="nav-cta">
              Ver proyectos <FaArrowRight aria-hidden="true" />
            </Link>

            <Link to="/contacto" className="social-btn alt-btn">
              Contactar
            </Link>
          </div>

          <div className="social-center-links" aria-label="Perfiles y contacto">
            <a
              href="https://github.com/TU-USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Abrir perfil de GitHub en una pestaña nueva"
            >
              <FaGithub aria-hidden="true" /> GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/TU-USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Abrir perfil de LinkedIn en una pestaña nueva"
            >
              <FaLinkedin aria-hidden="true" /> LinkedIn
            </a>

            <a
              href="mailto:tuemail@dominio.com"
              className="social-btn"
              aria-label="Enviar correo electrónico a Alex"
            >
              <FaEnvelope aria-hidden="true" /> Email
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
