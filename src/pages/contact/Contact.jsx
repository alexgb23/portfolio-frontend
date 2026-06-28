import { useMemo, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

import usePageTitle from "../../hooks/usePageTitle";
import useContactChat from "../../hooks/pages/useContactChat";
import { usePortfolioHome } from "../../hooks/usePortfolioData";
import "./Contact.css";

function SocialCard({ href = "", icon, label, title, text, className = "" }) {
  const isLink = Boolean(href);
  const isMail = href.startsWith("mailto:");

  const content = (
    <>
      <div className="social-mini-front">
        <div className="social-mini-shine" aria-hidden="true"></div>

        <div className="social-mini-icon expertise-icon" aria-hidden="true">
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

  if (!isLink) return null;

  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className={`social-mini-card${className ? ` ${className}` : ""}`}
      aria-label={`${label}: ${title ?? text ?? href}`}
    >
      {content}
    </a>
  );
}

function getSocialIcon(item) {
  const key = `${item.icon_key ?? ""} ${item.platform ?? ""}`.toLowerCase();

  if (key.includes("github")) return <FaGithub />;
  if (key.includes("linkedin")) return <FaLinkedin />;
  if (key.includes("email") || key.includes("mail")) return <FaEnvelope />;
  if (key.includes("instagram")) return <FaInstagram />;
  if (key.includes("facebook")) return <FaFacebook />;
  return <FaGlobe />;
}

function normalizeHref(item) {
  const raw = item?.url?.trim() ?? "";
  if (!raw) return "";

  const platform = (item?.platform ?? "").toLowerCase();
  const iconKey = (item?.icon_key ?? "").toLowerCase();

  if (
    raw.includes("@") &&
    !raw.startsWith("http://") &&
    !raw.startsWith("https://") &&
    !raw.startsWith("mailto:")
  ) {
    return `mailto:${raw}`;
  }

  if (platform.includes("email") || iconKey.includes("email")) {
    return raw.startsWith("mailto:") ? raw : `mailto:${raw}`;
  }

  return raw;
}

function Contact() {
  usePageTitle("Contacto | Alexander Galvez");

  // Social links vienen del mismo home que ya usas en la landing (cacheados por useAsyncResource)
  const { socialLinks, loading: homeLoading, error: homeError } =
    usePortfolioHome();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { loading, error, success, sendMessage } = useContactChat();

  const visibleSocialLinks = useMemo(() => {
    return (socialLinks ?? [])
      .map((item) => ({
        href: normalizeHref(item),
        icon: getSocialIcon(item),
        label: item.label || item.platform || "Enlace",
        title: item.title || item.platform || "",
        text: item.text || item.url || "",
      }))
      .filter((item) => item.href);
  }, [socialLinks]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      // El error ya lo gestiona el hook.
    }
  }

  return (
    <section className="section section-spaced section-separated">
      <div className="section-head-centered contact-page-head">
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

  {/* Solo mostramos el error si falla la carga */}
  {homeError && <p>{homeError}</p>}

  <div className="social-mini-grid">
    {/* Skeleton de enlaces cuando NO hay datos todavía */}
    {homeLoading && visibleSocialLinks.length === 0 && (
      <>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="social-mini-card skeleton-block skeleton-card"
          >
            <div className="social-mini-front">
              <div className="social-mini-icon skeleton-block skeleton-icon" />
              <div className="social-mini-textbox">
                <span className="skeleton-block skeleton-text-sm" />
                <span className="skeleton-block skeleton-text-sm" />
              </div>
              <span className="social-mini-meta skeleton-block skeleton-text-sm" />
            </div>
          </div>
        ))}
      </>
    )}

    {/* Enlaces reales cuando ya hay datos */}
    {visibleSocialLinks.map((item) => (
      <SocialCard
        key={`${item.label}-${item.title}-${item.href}`}
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

            <form className="cmd-form" onSubmit={handleSubmit}>
              <div className="cmd-input-line">
                <label htmlFor="name">NOMBRE</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cmd-input-line">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tu-correo@empresa.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cmd-input-line">
                <label htmlFor="subject">ASUNTO</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Consulta, propuesta o proyecto"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="cmd-input-line">
                <label htmlFor="message">MENSAJE</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Describe brevemente el proyecto"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {error && (
                <p className="cmd-feedback cmd-feedback-error">{error}</p>
              )}
              {success && (
                <p className="cmd-feedback cmd-feedback-success">{success}</p>
              )}

              <button
                type="submit"
                className="cmd-submit-btn"
                disabled={loading}
              >
                {loading ? "enviando()" : "enviar()"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;