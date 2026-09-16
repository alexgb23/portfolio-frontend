import { useMemo, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
  FaInstagram,
} from "react-icons/fa";

import usePageTitle from "../../hooks/usePageTitle";
import useContactChat from "../../hooks/pages/useContactChat";
import { usePortfolioHome } from "../../hooks/usePortfolioData";

import "./Contact.css";

function SocialCard({ href = "", icon, label, title, text, className = "" }) {
  const isLink = Boolean(href);
  const isMail = href.startsWith("mailto:");

  if (!isLink) {
    return null;
  }

  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className={`social-mini-card${className ? ` ${className}` : ""}`}
      aria-label={`${label}: ${title || text || href}`}
    >
      <div className="social-mini-front">
        <div className="social-mini-shine" aria-hidden="true" />

        <div className="social-mini-icon expertise-icon" aria-hidden="true">
          {icon}
        </div>

        <div className="social-mini-textbox">
          <span className="social-mini-name">{label}</span>
          <span className="social-mini-desc">{text}</span>
        </div>

        <span className="social-mini-meta">{title}</span>
      </div>

      <div className="social-mini-shadow" aria-hidden="true" />
    </a>
  );
}

function getSocialIcon(item) {
  const key = `${item?.icon_key ?? ""} ${item?.platform ?? ""} ${
    item?.label ?? ""
  }`.toLowerCase();

  if (key.includes("github")) return <FaGithub />;
  if (key.includes("linkedin")) return <FaLinkedin />;
  if (key.includes("email") || key.includes("mail")) {
    return <FaEnvelope />;
  }
  if (key.includes("instagram")) return <FaInstagram />;

  return <FaGlobe />;
}

function normalizeHref(item) {
  const raw = typeof item?.url === "string" ? item.url.trim() : "";

  if (!raw) {
    return "";
  }

  const platform = String(item?.platform ?? "").toLowerCase();
  const iconKey = String(item?.icon_key ?? "").toLowerCase();

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

  if (!raw.startsWith("http://") && !raw.startsWith("https://")) {
    return `https://${raw}`;
  }

  return raw;
}

function formatElapsed(ms) {
  if (!Number.isFinite(ms) || ms <= 0) {
    return "0.0 s";
  }

  return `${(ms / 1000).toFixed(1)} s`;
}

function Contact() {
  usePageTitle("Contacto | Alexander Galvez");

  const {
    socialLinks,
    loading: socialLinksLoading,
    error: socialLinksError,
    isRefreshing: socialLinksRefreshing,
    isRetrying: socialLinksRetrying,
  } = usePortfolioHome();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const {
    loading: chatLoading,
    error: chatError,
    success,
    elapsed,
    sendMessage,
  } = useContactChat();

  const visibleSocialLinks = useMemo(() => {
    const baseLinks = Array.isArray(socialLinks) ? socialLinks : [];

    const cleanedLinks = baseLinks
      .filter((item) => {
        const key = `${item?.platform ?? ""} ${item?.icon_key ?? ""} ${
          item?.label ?? ""
        }`.toLowerCase();

        return !key.includes("facebook");
      })
      .map((item, index) => ({
        id: item?.id ?? `social-${index}`,
        href: normalizeHref(item),
        icon: getSocialIcon(item),
        label: item?.label || item?.platform || "Enlace",
        title: item?.title || item?.platform || "",
        text: item?.text || item?.url || "",
      }))
      .filter((item) => item.href);

    /*
     * Este enlace no depende del backend y siempre sigue visible.
     */
    cleanedLinks.push({
      id: "syskovex-link",
      href: "https://syskovex.com",
      icon: <FaGlobe />,
      label: "Syskovex",
      title: "Laboratorio",
      text: "syskovex.com",
    });

    return cleanedLinks.filter(
      (item, index, array) =>
        array.findIndex((entry) => entry.href === item.href) === index,
    );
  }, [socialLinks]);

  const socialLinksFromBackend = visibleSocialLinks.filter(
    (item) => item.id !== "syskovex-link",
  );

  const hasBackendSocialLinks = socialLinksFromBackend.length > 0;

  const isSocialLinksConnecting = Boolean(
    socialLinksRetrying || (socialLinksLoading && !hasBackendSocialLinks),
  );

  const isServerStarting = chatLoading && elapsed >= 8_000;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
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
      // useContactChat ya muestra el mensaje correspondiente.
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

          {isSocialLinksConnecting ? (
            <div className="section-inline-status" aria-live="polite">
              <p>
                Conectando con el servidor. Los canales de contacto aparecerán
                en breve.
              </p>
            </div>
          ) : null}

          {socialLinksRefreshing && hasBackendSocialLinks ? (
            <div className="section-inline-status" aria-live="polite">
              <p>Actualizando canales de contacto...</p>
            </div>
          ) : null}

          {socialLinksError &&
          !hasBackendSocialLinks &&
          !isSocialLinksConnecting ? (
            <p className="cmd-feedback cmd-feedback-error" role="alert">
              No se pudieron cargar los canales de contacto en este momento.
            </p>
          ) : null}

          <div className="social-mini-grid">
            {visibleSocialLinks.map((item) => (
              <SocialCard
                key={item.id}
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
              <span className="c-red" />
              <span className="c-yellow" />
              <span className="c-green" />
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
                  disabled={chatLoading}
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
                  disabled={chatLoading}
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
                  disabled={chatLoading}
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
                  disabled={chatLoading}
                  required
                />
              </div>

              {chatLoading ? (
                <div
                  className="contact-server-wakeup"
                  role="status"
                  aria-live="polite"
                >
                  <span className="contact-server-spinner" aria-hidden="true" />

                  <span className="contact-server-text">
                    <strong>
                      {isServerStarting
                        ? "Servidor iniciándose…"
                        : "Conectando con el servidor…"}
                    </strong>

                    <small>
                      {isServerStarting
                        ? "Render está despertando el backend. El mensaje se enviará al estar disponible."
                        : "Enviando tu mensaje de forma segura."}
                    </small>
                  </span>

                  <span className="contact-server-time">
                    {formatElapsed(elapsed)}
                  </span>
                </div>
              ) : null}

              {chatError ? (
                <p className="cmd-feedback cmd-feedback-error">{chatError}</p>
              ) : null}

              {success ? (
                <p className="cmd-feedback cmd-feedback-success">{success}</p>
              ) : null}

              <button
                type="submit"
                className="cmd-submit-btn"
                disabled={chatLoading}
              >
                {chatLoading ? "conectando()" : "enviar()"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
