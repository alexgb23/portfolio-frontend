import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from "react-icons/fa";
import "../../pages/contact/Contact.css";
import "../sections/sectionsGlobals.css";

function SocialCard({ href, icon, label, title, text, className = "" }) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer"}
      className={`social-mini-card${className ? ` ${className}` : ""}`}
      aria-label={`${label}: ${title}`}
    >
      <div className="social-mini-front">
        <div className="social-mini-shine" aria-hidden="true"></div>

        <div className="social-mini-icon" aria-hidden="true">
          {icon}
        </div>

        <div className="social-mini-textbox">
          <span className="social-mini-name">{label}</span>
          <span className="social-mini-desc">{text}</span>
        </div>

        <span className="social-mini-meta">{title}</span>
      </div>

      <div className="social-mini-shadow" aria-hidden="true"></div>
    </a>
  );
}

function ContactPreview() {
  return (
    <section className="section section-spaced section-separated">
      <div className="section-head-centered">
        <span className="section-kicker">Contacto</span>
        <h2>Hablemos de tu proyecto</h2>
        <p>
          Desarrollo, infraestructura, automatización y soporte técnico para
          proyectos reales.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Canales principales</h3>

          <div className="social-mini-grid">
            <SocialCard
              href="https://github.com"
              icon={<FaGithub />}
              label="GitHub"
              title="AlexDev"
              text="Repos y código"
            />

            <SocialCard
              href="https://linkedin.com"
              icon={<FaLinkedin />}
              label="LinkedIn"
              title="Alex Fernández"
              text="Perfil profesional"
            />

            <SocialCard
              href="mailto:tu-correo@empresa.com"
              icon={<FaEnvelope />}
              label="Correo"
              title="Email"
              text="Contacto directo"
            />
          </div>

          <div className="section-more left">
            <Link to="/contacto" className="inline-link">
              <span>Ir a contacto</span>
              <FaArrowRight />
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
              Canal disponible para propuestas, soporte y colaboración técnica.
            </p>

            <p className="cmd-output">
              Acceso rápido a desarrollo, sistemas, redes y automatización.
            </p>

            <div className="section-more left">
              <Link to="/contacto" className="inline-link">
                <span>Abrir formulario completo</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPreview;
