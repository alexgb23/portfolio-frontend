import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from "react-icons/fa";
import "../../pages/contact/Contact.css";

function SocialCard({
  href = "#",
  icon,
  label,
  title,
  text,
  className = "",
}) {
  const safeHref = typeof href === "string" && href.trim() ? href : "#";
  const isMail = safeHref.startsWith("mailto:");

  return (
    <a
      href={safeHref}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer"}
      className={`social-mini-card${className ? ` ${className}` : ""}`}
      aria-label={`${label}: ${title}`}
    >
      <div className="social-mini-front">
        <div className="social-mini-shine" aria-hidden="true"></div>

        <div className=" expertise-icon" aria-hidden="true">
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

function ContactPreview({ profile = null, socialLinks = [] }) {
  const safeLinks = Array.isArray(socialLinks) ? socialLinks : [];

  const github = safeLinks.find(
    (item) => (item?.platform || item?.icon_key || "").toLowerCase() === "github"
  );

  const linkedin = safeLinks.find(
    (item) => (item?.platform || item?.icon_key || "").toLowerCase() === "linkedin"
  );

  const email = safeLinks.find((item) =>
    ["email", "envelope"].includes(
      (item?.platform || item?.icon_key || "").toLowerCase()
    )
  );

  return (
    <section className="section section-spaced section-separated">
      <div className="section-head-centered">
        <span className="section-kicker">Contacto</span>
        <h2>{profile?.contact_title || "Hablemos de tu proyecto"}</h2>
        <p>
          {profile?.contact_intro ||
            "Desarrollo, infraestructura, automatización y soporte técnico para proyectos reales."}
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Canales principales</h3>

          <div className="social-mini-grid">
            {github?.url ? (
              <SocialCard
                href={github.url}
                icon={<FaGithub />}
                label="GitHub"
                title={github.label || github.username || "GitHub"}
                text="Repos y código"
              />
            ) : null}

            {linkedin?.url ? (
              <SocialCard
                href={linkedin.url}
                icon={<FaLinkedin />}
                label="LinkedIn"
                title={linkedin.label || "LinkedIn"}
                text="Perfil profesional"
              />
            ) : null}

            {email?.url ? (
              <SocialCard
                href={email.url}
                icon={<FaEnvelope />}
                label="Correo"
                title={email.label || profile?.email || "Email"}
                text="Contacto directo"
              />
            ) : null}
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