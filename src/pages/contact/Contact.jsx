import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

import usePageTitle from "../../hooks/usePageTitle";
import "./Contact.css";

function SocialCard({ href = "#", icon, label, title, text, className = "" }) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isMail || href === "#" ? undefined : "_blank"}
      rel={isMail || href === "#" ? undefined : "noreferrer"}
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

function Contact() {
  usePageTitle("Contacto | Alexander Galvez");

  return (
    <section className="section section-spaced section-separated">
      <div className="section-head-centered">
        <span className="section-kicker">Contacto</span>
        <h1>Canales profesionales y colaboración</h1>
        <p>
          Disponible para colaboraciones, soporte técnico, desarrollo,
          automatización, infraestructura y soluciones integradas.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h2>Enlaces</h2>

          <div className="social-mini-grid">
            <SocialCard
              href="https://github.com/alexgb23"
              icon={<FaGithub />}
              label="GitHub"
              title="Alexgb23"
              text="Repos y código"
            />

            <SocialCard
              href="https://www.linkedin.com/in/alexander-galvez-benavides-450917281/"
              icon={<FaLinkedin />}
              label="LinkedIn"
              title="Alexander Galvez"
              text="Perfil profesional"
            />

            <SocialCard
              href="mailto:alexandergalvez880208@gmail.com"
              icon={<FaEnvelope />}
              label="Correo"
              title="Email"
              text="Contacto directo"
            />

            <SocialCard
              href="#"
              icon={<FaGlobe />}
              label="Web"
              title="Cubalinks"
              text="Empresa y servicios"
            />

            <SocialCard
              href="https://instagram.com"
              icon={<FaInstagram />}
              label="Instagram"
              title="@alefgb"
              text="Perfil personal"
            />

            <SocialCard
              href="https://facebook.com"
              icon={<FaFacebook />}
              label="Facebook"
              title="Alexander Galvez"
              text="Perfil personal"
            />
          </div>

          <div className="section-more left">
            <Link to="/contacto" className="inline-link">
              Ir a contacto
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

            <form className="cmd-form" onSubmit={(e) => e.preventDefault()}>
              <div className="cmd-input-line">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  placeholder="tu-correo@empresa.com"
                  required
                />
              </div>

              <div className="cmd-input-line">
                <label htmlFor="msg">MENSAJE</label>
                <textarea
                  id="msg"
                  placeholder="Describe brevemente el proyecto"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button type="submit" className="cmd-submit-btn">
                enviar()
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
