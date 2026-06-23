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

function SocialCard({ href = "", icon, label, title, text, className = "" }) {
  const isLink = Boolean(href);
  const isMail = href.startsWith("mailto:");

  const content = (
    <>
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
    </>
  );

  if (!isLink) {
    return null;
  }

  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className={`social-mini-card${className ? ` ${className}` : ""}`}
      aria-label={`${label}: ${title}`}
    >
      {content}
    </a>
  );
}

function Contact() {
  usePageTitle("Contacto | Alexander Galvez");

  const socialLinks = [
    {
      href: "https://github.com/alexgb23",
      icon: <FaGithub />,
      label: "GitHub",
      title: "Alexgb23",
      text: "Repos y código",
    },
    {
      href: "https://www.linkedin.com/in/alexander-galvez-benavides-450917281/",
      icon: <FaLinkedin />,
      label: "LinkedIn",
      title: "Alexander Galvez",
      text: "Perfil profesional",
    },
    {
      href: "mailto:alexandergalvez880208@gmail.com",
      icon: <FaEnvelope />,
      label: "Correo",
      title: "Email",
      text: "Contacto directo",
    },
    {
      href: "",
      icon: <FaGlobe />,
      label: "Web",
      title: "Cubalinks",
      text: "Empresa y servicios",
    },
    {
      href: "https://instagram.com/_aaleex_88",
      icon: <FaInstagram />,
      label: "Instagram",
      title: "@_aaleex_88",
      text: "Perfil personal",
    },
    {
      href: "https://www.facebook.com/alexander.galvez.benavides",
      icon: <FaFacebook />,
      label: "Facebook",
      title: "Alexander Galvez Benavides",
      text: "Perfil personal",
    },
  ];

  const visibleSocialLinks = socialLinks.filter((item) => item.href);

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
            {visibleSocialLinks.map((item) => (
              <SocialCard
                key={`${item.label}-${item.title}`}
                href={item.href}
                icon={item.icon}
                label={item.label}
                title={item.title}
                text={item.text}
              />
            ))}
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
