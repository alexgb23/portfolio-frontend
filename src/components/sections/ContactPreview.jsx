import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";
import "./sectionsGlobals.css";

function ContactPreview() {
  return (
    <section className="section section-spaced section-separated" id="contacto">
      <div className="section-head-centered">
        <span className="section-kicker">Contacto</span>
        <h2>Canales profesionales y colaboración</h2>
        <p>
          Disponible para desarrollo, integración, soporte técnico,
          infraestructura y automatización.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Enlaces</h3>

          <ul className="contact-links">
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub /> GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin /> LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:tu-correo@empresa.com">
                <FaEnvelope /> Correo profesional
              </a>
            </li>
            <li>
              <a href="https://tuempresa.com" target="_blank" rel="noreferrer">
                <FaGlobe /> Sitio corporativo
              </a>
            </li>
          </ul>

          <div className="section-more left">
            <Link to="/contacto" className="inline-link">
              Ir a contacto <FaArrowRight />
            </Link>
          </div>
        </div>

        <div className="neo-terminal">
          <div className="term-top-bar">
            <div className="term-controls">
              <span className="c-red"></span>
              <span className="c-yellow"></span>
              <span className="c-green"></span>
            </div>
            <span className="term-tab-title">contact@alex-sys:~</span>
          </div>

          <div className="term-content-area">
            <p className="cmd-input">
              <span className="prompt-color">guest@portfolio:~$</span>{" "}
              iniciar_contacto
            </p>

            <p className="cmd-output">
              Canal disponible para consultas, propuestas y proyectos técnicos.
            </p>

            <p className="cmd-output">
              Respuesta orientada a desarrollo, infraestructura, redes y
              automatización.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPreview;
