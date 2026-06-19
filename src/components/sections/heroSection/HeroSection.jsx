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
        {/* =========================
            CABECERA HERO
        ========================== */}

        <div className="hero-top-row">
          <div className="hero-title-container">
            <span className="hero-kicker">
              IT SPECIALIST · FULL STACK DEVELOPER · SYSTEMS ENGINEER
            </span>

            <h1 className="hero-main-title">
              Creo ecosistemas tecnológicos donde
              <span> software, infraestructura y automatización </span>
              trabajan juntos.
            </h1>

            <p className="hero-intro">
              Soy Alexander, profesional del sector tecnológico especializado en
              desarrollo de aplicaciones, administración de sistemas y diseño de
              infraestructuras IT. Trabajo creando soluciones completas que
              conectan el mundo del software con servidores, redes,
              virtualización, bases de datos y sistemas inteligentes.
            </p>
          </div>

          {/* FOTO */}

          <div className="avatar-block">
            <div className="avatar-wrapper">
              <img
                src="/imagen_portfolio_mia_retocada.webp"
                alt="Alex González"
                className="profile-avatar"
              />
            </div>

            <div className="hero-badge-wrap">
              <div className="hero-badge-inner">
                Sistemas · Redes · Desarrollo · Automatización
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            BLOQUE INFERIOR
        ========================== */}

        <div className="hero-bottom-block">
          {/* =========================
              ESPECIALIDADES
          ========================== */}

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
                Servidores Linux, virtualización, cloud, despliegues y
                administración de sistemas.
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
                Aplicaciones web modernas, APIs, bases de datos y soluciones
                empresariales.
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
                Diseño de redes, segmentación, conectividad y entornos
                profesionales.
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

              <p>Domótica, inmótica y sistemas inteligentes conectados.</p>
            </article>
          </section>

          {/* =========================
              ACCIONES
          ========================== */}

          <div className="hero-actions">
            <Link to="/proyectos" className="nav-cta">
              Ver proyectos
              <FaArrowRight />
            </Link>

            <Link to="/contacto" className="social-btn alt-btn">
              Contactar
            </Link>
          </div>

          {/* =========================
              REDES
          ========================== */}

          <div className="social-center-links">
            <a href="https://github.com/alexgb23" className="social-btn">
              <FaGithub />
              GitHub
            </a>

            <a href="#" className="social-btn">
              <FaLinkedin />
              LinkedIn
            </a>

            <a href="mailto:tuemail@dominio.com" className="social-btn">
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
