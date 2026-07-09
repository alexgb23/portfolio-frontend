import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaDownload, FaTimes, FaStamp, FaPrint } from "react-icons/fa";
import "./CvModal.css";

import Avatar from "./cvComponents/Avatar";
import Sidebar from "./cvComponents/Sidebar";
import HeaderBanner from "./cvComponents/HeaderBanner";
import SobreMi from "./cvComponents/SobreMi";
import Especializacion from "./cvComponents/Especializacion";
import Experiencia from "./cvComponents/Experiencia";
import EducacionTecnologias from "./cvComponents/EducacionTecnologias";
import ProyectosIdiomas from "./cvComponents/ProyectosIdiomas";
import Footer from "./cvComponents/Footer";

function CvModal({ isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);

  const closeButtonRef = useRef(null);
  const downloadGroupRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const cleanupPrintMode = () => {
      document.body.classList.remove("cv-print-mode");
    };

    window.addEventListener("afterprint", cleanupPrintMode);

    return () => {
      window.removeEventListener("afterprint", cleanupPrintMode);
      document.body.classList.remove("cv-print-mode");
    };
  }, []);

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

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.position = previousBodyStyle.position;
      document.body.style.top = previousBodyStyle.top;
      document.body.style.left = previousBodyStyle.left;
      document.body.style.right = previousBodyStyle.right;
      document.body.style.width = previousBodyStyle.width;
      document.body.style.overflow = previousBodyStyle.overflow;
      document.body.classList.remove("cv-print-mode");
      setIsDownloadMenuOpen(false);
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      if (isDownloadMenuOpen) {
        setIsDownloadMenuOpen(false);
        return;
      }

      onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isDownloadMenuOpen, onClose]);

  useEffect(() => {
    if (!isDownloadMenuOpen) return;

    const handlePointerDownOutside = (event) => {
      if (!downloadGroupRef.current?.contains(event.target)) {
        setIsDownloadMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDownOutside);
    document.addEventListener("touchstart", handlePointerDownOutside);

    return () => {
      document.removeEventListener("mousedown", handlePointerDownOutside);
      document.removeEventListener("touchstart", handlePointerDownOutside);
    };
  }, [isDownloadMenuOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const mobileMq = window.matchMedia("(max-width: 699px)");
    const tabletMq = window.matchMedia(
      "(min-width: 700px) and (max-width: 1199px)",
    );

    const MOBILE_BASE_WIDTH = 840;
    const MOBILE_BASE_HEIGHT = 1188;

    const TABLET_BASE_WIDTH = 840;
    const TABLET_BASE_HEIGHT = 1188;

    const resetWrapperStyles = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      wrapper.style.removeProperty("--cv-scale");
      wrapper.style.width = "";
      wrapper.style.height = "";
      wrapper.style.minHeight = "";
    };

    const getContainerMetrics = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return null;

      const container = wrapper.parentElement;
      if (!container) return null;

      if (window.matchMedia("print").matches) return null;

      const rect = container.getBoundingClientRect();
      const styles = window.getComputedStyle(container);

      const padX =
        parseFloat(styles.paddingLeft || 0) +
        parseFloat(styles.paddingRight || 0);

      const padY =
        parseFloat(styles.paddingTop || 0) +
        parseFloat(styles.paddingBottom || 0);

      return {
        wrapper,
        availableWidth: Math.max(0, rect.width - padX),
        availableHeight: Math.max(0, rect.height - padY),
      };
    };

    const applyLayout = (baseWidth, baseHeight, scale) => {
      const metrics = getContainerMetrics();
      if (!metrics) return;

      const { wrapper } = metrics;
      const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;

      resetWrapperStyles();

      wrapper.style.setProperty("--cv-scale", String(safeScale));
      wrapper.style.width = `${baseWidth * safeScale}px`;
      wrapper.style.height = `${baseHeight * safeScale}px`;
      wrapper.style.minHeight = `${baseHeight * safeScale}px`;
    };

    const applyMobileLayout = () => {
      const metrics = getContainerMetrics();
      if (!metrics) return;

      const { availableWidth, availableHeight } = metrics;
      const scaleX = availableWidth / MOBILE_BASE_WIDTH;
      const scaleY = availableHeight / MOBILE_BASE_HEIGHT;
      const scale = Math.min(scaleX, scaleY, 1);

      applyLayout(MOBILE_BASE_WIDTH, MOBILE_BASE_HEIGHT, scale);
    };

    const applyTabletLayout = () => {
      const metrics = getContainerMetrics();
      if (!metrics) return;

      const { availableWidth, availableHeight } = metrics;
      const scaleX = availableWidth / TABLET_BASE_WIDTH;
      const scaleY = availableHeight / TABLET_BASE_HEIGHT;
      const scale = Math.min(scaleX, scaleY, 1);

      applyLayout(TABLET_BASE_WIDTH, TABLET_BASE_HEIGHT, scale);
    };

    const updateLayoutByViewport = () => {
      resetWrapperStyles();

      if (mobileMq.matches) {
        applyMobileLayout();
        return;
      }

      if (tabletMq.matches) {
        applyTabletLayout();
        return;
      }

      resetWrapperStyles();
    };

    updateLayoutByViewport();

    const handleViewportChange = () => {
      window.requestAnimationFrame(() => {
        updateLayoutByViewport();
      });
    };

    mobileMq.addEventListener("change", handleViewportChange);
    tabletMq.addEventListener("change", handleViewportChange);
    window.addEventListener("resize", handleViewportChange);

    return () => {
      mobileMq.removeEventListener("change", handleViewportChange);
      tabletMq.removeEventListener("change", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      resetWrapperStyles();
    };
  }, [isOpen]);

  const handleToggleDownloadMenu = () => {
    setIsDownloadMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsDownloadMenuOpen(false);
  };

  const handlePrintCurrentCV = () => {
    setIsDownloadMenuOpen(false);

    const previousBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    document.body.classList.add("cv-print-mode");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    window.setTimeout(() => {
      window.print();

      window.setTimeout(() => {
        if (isOpen) {
          document.body.style.position = previousBodyStyle.position;
          document.body.style.top = previousBodyStyle.top;
          document.body.style.left = previousBodyStyle.left;
          document.body.style.right = previousBodyStyle.right;
          document.body.style.width = previousBodyStyle.width;
          document.body.style.overflow = previousBodyStyle.overflow;
        }
      }, 150);
    }, 100);
  };

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div className="cv-modal-overlay" onClick={onClose} role="presentation">
      <section
        className="cv-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        <div className="cv-modal-shell">
          <header className="cv-topbar no-print">
            <div className="cv-topbar-inner">
              <div className="cv-topbar-left">
                <FaStamp className="cv-icon-small" />
                <span id="cv-modal-title" className="cv-topbar-title">
                  Currículum interactivo
                </span>
              </div>

              <div className="cv-topbar-actions">
                <div className="cv-download-group" ref={downloadGroupRef}>
                  <button
                    type="button"
                    className="cv-download-btn"
                    onClick={handleToggleDownloadMenu}
                    aria-expanded={isDownloadMenuOpen}
                    aria-haspopup="menu"
                    aria-label="Opciones de descarga e impresión"
                  >
                    <FaDownload className="cv-icon-small" />
                    <span>Descargar CV</span>
                  </button>

                  {isDownloadMenuOpen && (
                    <div className="cv-download-menu" role="menu">
                      <button
                        type="button"
                        className="cv-download-menu-btn"
                        role="menuitem"
                        onClick={handlePrintCurrentCV}
                      >
                        <FaPrint className="cv-icon-small" />
                        <span>Imprimir / Guardar PDF</span>
                      </button>

                      <a
                        href="/cvv/curriculum-friendly-dev.pdf"
                        download="CV_Dev.pdf"
                        role="menuitem"
                        onClick={handleCloseMenu}
                      >
                        CV Desarrollo
                      </a>

                      <a
                        href="/cvv/curriculum-friendly-sistemas.pdf"
                        download="CV_Sistemas.pdf"
                        role="menuitem"
                        onClick={handleCloseMenu}
                      >
                        CV Sistemas
                      </a>
                    </div>
                  )}
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  className="cv-close-btn"
                  onClick={onClose}
                  aria-label="Cerrar currículum"
                >
                  <FaTimes className="cv-icon-small" />
                </button>
              </div>
            </div>
          </header>

          <div className="cv-modal-body-wrapper">
            <div className="cv-layout-wrapper" ref={wrapperRef}>
              <div className="cv-page">
                <aside className="cv-sidebar">
                  <Avatar />
                  <Sidebar />
                </aside>

                <main className="cv-main">
                  <div className="cv-header">
                    <HeaderBanner />
                  </div>

                  <div className="cv-body">
                    <SobreMi />
                    <Especializacion />
                    <Experiencia />
                    <EducacionTecnologias />
                  </div>
                </main>

                <section className="cv-bottom">
                  <ProyectosIdiomas />
                </section>

                <footer className="cv-footer">
                  <Footer />
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export default CvModal;
