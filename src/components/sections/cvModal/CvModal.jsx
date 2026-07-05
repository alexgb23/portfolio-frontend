import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaServer,
  FaCode,
  FaNetworkWired,
  FaMicrochip,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
  FaDatabase,
  FaEye,
  FaTimes,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaLayerGroup,
  FaStar,
  FaStamp,
  FaCheckCircle,
  FaDownload,
  FaBriefcase,
  FaGlobe,
} from "react-icons/fa";
import "./CvModal.css";


function CvModal({ isOpen, onClose, socialLinks }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const previousBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.position = previousBodyStyle.position;
      document.body.style.top = previousBodyStyle.top;
      document.body.style.left = previousBodyStyle.left;
      document.body.style.right = previousBodyStyle.right;
      document.body.style.width = previousBodyStyle.width;
      document.body.style.overflow = previousBodyStyle.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div className="cv-modal-overlay" onClick={onClose} role="presentation">
      <section
        className="cv-page"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        {/* TOPBAR */}
        <header className="cv-topbar">
          <div className="cv-topbar-left">
            <FaStamp className="cv-icon-small" />
            <span className="cv-topbar-title">Currículum interactivo</span>
          </div>

          <div className="cv-topbar-actions">
            {/* Botón descargar + menú */}
            <div className="cv-download-group">
              <button
                type="button"
                className="cv-download-btn"
                onClick={() => setIsDownloadMenuOpen((prev) => !prev)}
                aria-expanded={isDownloadMenuOpen}
                aria-haspopup="menu"
              >
                <FaDownload className="cv-icon-small" />
                <span>Descargar CV</span>
              </button>

              {isDownloadMenuOpen && (
                <div className="cv-download-menu" role="menu">
                  <a
                    href="/cvv/curriculum-friendly-dev.pdf"
                    download="CV_Dev.pdf"
                    role="menuitem"
                    onClick={() => setIsDownloadMenuOpen(false)}
                  >
                    CV Desarrollo
                  </a>
                  <a
                    href="/cvv/curriculum-friendly-sistemas.pdf"
                    download="CV_Sistemas.pdf"
                    role="menuitem"
                    onClick={() => setIsDownloadMenuOpen(false)}
                  >
                    CV Sistemas
                  </a>
                </div>
              )}
            </div>

            {/* Botón cerrar */}
            <button
              ref={closeButtonRef}
              type="button"
              className="cv-close-btn"
              onClick={() => {
                console.log("click cerrar, onClose =", onClose);
                onClose();
              }}
              aria-label="Cerrar currículum"
            >
              <FaTimes className="cv-icon-small" />
            </button>
          </div>
        </header>

        {/* LAYOUT PRINCIPAL */}
        <div className="cv-layout">
          {/* SIDEBAR */}
          <div className="cv-sidebar">
            <div className="cv-photo-wrap">
              <picture>
                <source
                  srcSet="/imagen_portfolio_mia_retocada-480.avif"
                  type="image/avif"
                />
                <source
                  srcSet="/imagen_portfolio_mia_retocada-480.webp"
                  type="image/webp"
                />
                <img
                  src="/imagen_portfolio_mia_retocada-480.webp"
                  alt="Perfil"
                  className="cv-photo"
                />
              </picture>
            </div>

            <section className="cv-sidebar-block cv-contact-block">
              <h3>
                <FaInfoCircle className="cv-icon-small" /> Contacto
              </h3>
              <ul className="cv-contact-list">
                <li>
                  <div className="cv-contact-link">
                    <FaMapMarkerAlt className="cv-icon-small" />
                    <span>Bilbao, España</span>
                  </div>
                </li>
                <li>
                  <div className="cv-contact-link">
                    <FaPhone className="cv-icon-small" />
                    <span>614 794 625</span>
                  </div>
                </li>
                <li>
                  <a
                    href="mailto:alex@syskovex.com"
                    className="cv-contact-link"
                  >
                    <FaEnvelope className="cv-icon-small" />
                    <span>alex@syskovex.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://syskovex.com"
                    className="cv-contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe className="cv-icon-small" />
                    <span>https://syskovex.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/alexsyskovex"
                    className="cv-contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="cv-icon-small" />
                    <span>github.com/alexsyskovex</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/alexsyskovex"
                    className="cv-contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="cv-icon-small" />
                    <span>linkedin.com/in/alexsyskovex</span>
                  </a>
                </li>
              </ul>
            </section>

            <section className="cv-sidebar-block cv-stack-block">
              <h3>
                <FaLayerGroup className="cv-icon-small" /> Core Stack
              </h3>
              <div className="cv-chip-list">
                {[
                  "Linux",
                  "React",
                  "Laravel",
                  "PHP",
                  "Python",
                  "Java",
                  "JavaScript",
                  "Vue",
                  "Proxmox",
                  "pfSense",
                  "APIs",
                  "VLAN",
                  "Networking",
                  "Virtualización",
                  "Home Assistant",
                  "Automatización",
                  "IoT",
                  "Neon",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>

            <section className="cv-sidebar-block cv-strengths-block">
              <h3>
                <FaStar className="cv-icon-small" /> Fortalezas
              </h3>
              <ul className="cv-bullet-list">
                <li>
                  <FaCheckCircle className="cv-icon-small" />
                  <span>Resolución de problemas técnicos.</span>
                </li>
                <li>
                  <FaCheckCircle className="cv-icon-small" />
                  <span>Aprendizaje rápido y autonomía.</span>
                </li>
                <li>
                  <FaCheckCircle className="cv-icon-small" />
                  <span>Visión híbrida entre sistemas y desarrollo.</span>
                </li>
                <li>
                  <FaCheckCircle className="cv-icon-small" />
                  <span>Enfoque práctico y orientado a producción.</span>
                </li>
              </ul>
            </section>

            <section className="cv-sidebar-note">
              <FaCode className="cv-icon-medium" />
              <p>
                Mentalidad tecnológica, curiosidad constante y pasión por
                innovar.
              </p>
            </section>
          </div>

          {/* MAIN */}
          <div className="cv-main">
            <section className="cv-main-block cv-hero">
              <div className="cv-hero-copy">
                <h1 id="cv-modal-title">
                  <span>Alexander</span>
                  <span className="accent">Gálvez Benavides</span>
                </h1>
                <p className="cv-role">PERFIL TÉCNICO HÍBRIDO</p>
                <p className="cv-specialties">
                  SISTEMAS • DESARROLLO • REDES • AUTOMATIZACIÓN • IA
                </p>
              </div>

              <div className="cv-hero-brand">
                <img
                  src="/logoSyskovex.png"
                  alt="SYSKOVEX"
                  className="cv-brand-logo-img"
                />
                <div className="cv-brand-lines">
                  <span>Infrastructure</span>
                  <span>Development</span>
                  <span>Automation</span>
                </div>
              </div>
            </section>

            <section className="cv-main-block cv-about">
              <h3 className="cv-section-title">
                <FaInfoCircle className="cv-icon-small" /> SOBRE MÍ
              </h3>
              <p>
                Profesional con perfil híbrido en sistemas, redes, desarrollo y
                automatización. Combino experiencia práctica en infraestructura
                y administración de sistemas con formación sólida en desarrollo
                web, programación y domótica.
              </p>
            </section>

            <section className="cv-main-block cv-specialization">
              <h3 className="cv-section-title">
                <FaStamp className="cv-icon-small" /> ESPECIALIZACIÓN HÍBRIDA
              </h3>

              <div className="cv-mini-grid">
                <div className="cv-mini-card blue">
                  <FaServer className="cv-card-icon" />
                  <strong>Infraestructura y virtualización</strong>
                  <span>
                    Administración de sistemas, virtualización y continuidad.
                  </span>
                </div>

                <div className="cv-mini-card green">
                  <FaNetworkWired className="cv-card-icon" />
                  <strong>Redes y conectividad</strong>
                  <span>
                    VLAN, pfSense, protocolos y resolución de incidencias.
                  </span>
                </div>

                <div className="cv-mini-card violet">
                  <FaCode className="cv-card-icon" />
                  <strong>Desarrollo web y programación</strong>
                  <span>Frontend, backend, APIs y arquitectura limpia.</span>
                </div>

                <div className="cv-mini-card amber">
                  <FaMicrochip className="cv-card-icon" />
                  <strong>Automatización y domótica</strong>
                  <span>
                    IoT, sensores, actuadores, BMS y automatización real.
                  </span>
                </div>
              </div>
            </section>

            <section className="cv-main-block">
              <h3 className="cv-section-title">
                <FaBriefcase className="cv-icon-small" /> EXPERIENCIA
                PROFESIONAL
              </h3>

              <div className="cv-placeholder-list">
                <div className="cv-placeholder-item">
                  <strong>2013 — 2018 · Informático</strong> · Dirección
                  Integral de Supervisión
                </div>
                <div className="cv-placeholder-item">
                  <strong>
                    2007 — 2011 · Técnico de laboratorio informático
                  </strong>
                </div>
                <div className="cv-placeholder-item">
                  <strong>2023 — 2024 · Prácticas en EDE</strong> · Domótica e
                  inmótica
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="cv-footerbar">
          <div className="cv-footer-left">SYSKOVEX</div>
          <div className="cv-footer-center">
            Infrastructure • Development • Automation
          </div>
          <div className="cv-footer-right">Actualizado · 2026</div>
        </footer>
      </section>
    </div>,
    document.body,
  );
}

export default CvModal;
