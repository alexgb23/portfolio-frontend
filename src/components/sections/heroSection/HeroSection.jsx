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
} from "react-icons/fa";

import "../sectionsGlobals.css";
import "./HeroSection.css";

function HeroSection() {
  return (
    <header className="hero-centered-section" id="inicio">
      <div className="container hero-center-content">
        <div className="hero-top-row">
          <div className="hero-title-container">
            <span className="hero-kicker">
              DESARROLLO WEB · INFRAESTRUCTURA IT · AUTOMATIZACIÓN
            </span>

            <h1 className="hero-main-title">
              Diseño soluciones donde
              <span> software, sistemas y red </span>
              trabajan como un solo ecosistema.
            </h1>

            <h2 className="sr-only">Especialidades principales</h2>

            <p className="hero-intro">
              Soy Alex, desarrollador web y profesional IT con enfoque en
              frontend moderno, backend, virtualización y redes. Trabajo con
              React y Vite en la capa visual, Laravel y APIs para la gestión de
              datos, y entornos cloud y homelab para desplegar soluciones más
              completas, estables y escalables.
            </p>
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
                  alt="Alexander Galvez"
                  className="profile-avatar"
                  width="450"
                  height="580"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>

            <div className="hero-badge-wrap">
              <div className="hero-badge-inner">
                React · Laravel · Proxmox · pfSense
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom-block">
          <section className="speciality-grid">
            <article className="card card-hover tone-0 speciality-card">
              <div className="card-head">
                <div className="card-icon">
                  <FaServer />
                </div>
                <div className="card-title-wrap">
                  <h3>Infraestructura IT</h3>
                </div>
              </div>
              <p>
                Servidores Linux, virtualización con Proxmox, despliegues cloud
                y administración técnica de entornos.
              </p>
            </article>

            <article className="card card-hover tone-1 speciality-card">
              <div className="card-head">
                <div className="card-icon">
                  <FaCode />
                </div>
                <div className="card-title-wrap">
                  <h3>Desarrollo Full Stack</h3>
                </div>
              </div>
              <p>
                Frontend con React y Vite, backend con Laravel, APIs y
                aplicaciones conectadas a datos reales.
              </p>
            </article>

            <article className="card card-hover tone-2 speciality-card">
              <div className="card-head">
                <div className="card-icon">
                  <FaNetworkWired />
                </div>
                <div className="card-title-wrap">
                  <h3>Redes y Seguridad</h3>
                </div>
              </div>
              <p>
                VLANs, pfSense, segmentación de red, conectividad y diseño de
                entornos más seguros y organizados.
              </p>
            </article>

            <article className="card card-hover tone-0 speciality-card">
              <div className="card-head">
                <div className="card-icon">
                  <FaMicrochip />
                </div>
                <div className="card-title-wrap">
                  <h3>Automatización IoT</h3>
                </div>
              </div>
              <p>
                Domótica, inmótica y sistemas inteligentes orientados a control,
                integración y eficiencia.
              </p>
            </article>
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
            <a
              href="https://github.com/alexgb23"
              className="social-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/alexander-galvez-benavides-450917281/"
              className="social-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a
              href="mailto:alexandergalvez880208@gmail.com"
              className="social-btn"
            >
              <FaEnvelope />
              Email
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
