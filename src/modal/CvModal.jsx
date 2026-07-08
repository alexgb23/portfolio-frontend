import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaDownload, FaTimes, FaStamp, FaPrint } from "react-icons/fa";
import "./CvModal.css";

import CVLayout from "../layout/CVLayout";
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
            <CVLayout
              sidebar={
                <>
                  <Avatar />
                  <Sidebar />
                </>
              }
              header={<HeaderBanner />}
              body={
                <>
                  <SobreMi />
                  <Especializacion />
                  <Experiencia />
                  <EducacionTecnologias />
                </>
              }
              bottom={<ProyectosIdiomas />}
              footer={<Footer />}
            />
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export default CvModal;
