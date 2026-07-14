import { Link } from "react-router";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from "react-icons/fa";
import "../../pages/contact/Contact.css";

function normalizeHref(href = "", type = "") {
  const safeHref = typeof href === "string" ? href.trim() : "";
  const normalizedType = String(type || "").toLowerCase();

  if (!safeHref) return "#";

  if (
    ["email", "envelope"].includes(normalizedType) &&
    !safeHref.startsWith("mailto:")
  ) {
    return `mailto:${safeHref}`;
  }

  return safeHref;
}

function SocialCard({ href = "#", icon, label, title, text, className = "" }) {
  const safeHref = typeof href === "string" && href.trim() ? href : "#";
  const isMail = safeHref.startsWith("mailto:");

  return (
    <a
      href={safeHref}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className={`social-mini-card${className ? ` ${className}` : ""}`}
      aria-label={`${label}: ${title}`}
    >
      <div className="social-mini-front">
        <div className="social-mini-shine" aria-hidden="true"></div>

        <div className="expertise-icon" aria-hidden="true">
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

function ContactPreview({ socialLinks = [] }) {
  const safeLinks = Array.isArray(socialLinks) ? socialLinks : [];

  const github = safeLinks.find(
    (item) =>
      (item?.platform || item?.icon_key || "").toLowerCase() === "github",
  );

  const linkedin = safeLinks.find(
    (item) =>
      (item?.platform || item?.icon_key || "").toLowerCase() === "linkedin",
  );

  const email = safeLinks.find((item) =>
    ["email", "envelope"].includes(
      (item?.platform || item?.icon_key || "").toLowerCase(),
    ),
  );

  const hasAnySocial = Boolean(github?.url || linkedin?.url || email?.url);

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
            {github?.url ? (
              <SocialCard
                href={normalizeHref(github.url, "github")}
                icon={<FaGithub />}
                label="GitHub"
                title={github.label || github.username || "GitHub"}
                text="Repos y código"
              />
            ) : null}

            {linkedin?.url ? (
              <SocialCard
                href={normalizeHref(linkedin.url, "linkedin")}
                icon={<FaLinkedin />}
                label="LinkedIn"
                title={linkedin.label || "LinkedIn"}
                text="Perfil profesional"
              />
            ) : null}

            {email?.url ? (
              <SocialCard
                href={normalizeHref(
                  email.url,
                  email?.platform || email?.icon_key || "email",
                )}
                icon={<FaEnvelope />}
                label="Correo"
                title={email.label || "Email"}
                text="Contacto directo"
              />
            ) : null}
          </div>

          {!hasAnySocial ? (
            <p className="empty-inline-copy">
              Los canales directos estarán disponibles aquí en breve.
            </p>
          ) : null}

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
