import { Link } from 'react-router-dom'
import {
  FaCode,
  FaServer,
  FaNetworkWired,
  FaMicrochip,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
} from 'react-icons/fa'

function HeroSection() {
  return (
    <header className="hero-centered-section" id="inicio">
      <div className="container hero-center-content">
        <div className="avatar-wrapper">
          <img
            src="/imagen_portfolio_mia_retocada.webp"
            alt="Alex - Infraestructura, desarrollo y automatización"
            className="profile-avatar"
          />
        </div>

        <div className="hero-text-block">
          <span className="hero-eyebrow">
            Informática · Redes · Sistemas · Domótica · Desarrollo
          </span>

          <h1>
            Construyo soluciones donde el software, la red y la automatización
            trabajan juntas.
          </h1>

          <p className="hero-text">
            Técnico informático y desarrollador full-stack con experiencia en
            sistemas, redes, domótica, inmótica, programación y diseño web.
            Creo entornos robustos, visuales y funcionales para infraestructura,
            monitorización y control.
          </p>

          <div className="hero-highlights">
            <span><FaCode /> Laravel / React</span>
            <span><FaNetworkWired /> Redes</span>
            <span><FaServer /> Infraestructura</span>
            <span><FaMicrochip /> IoT / Automatización</span>
          </div>

          <div className="hero-actions">
            <Link to="/proyectos" className="nav-cta">
              Ver proyectos <FaArrowRight />
            </Link>

            <Link to="/contacto" className="social-btn alt-btn">
              Contactar
            </Link>
          </div>

          <div className="social-center-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
            >
              <FaGithub /> GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
            >
              <FaLinkedin /> LinkedIn
            </a>

            <a href="mailto:tu-correo@empresa.com" className="social-btn">
              <FaEnvelope /> Email
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeroSection