import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaDownload, FaTimes, FaStamp } from "react-icons/fa";
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
              <span className="cv-topbar-title">Currículum interactivo</span>
            </div>

            <div className="cv-topbar-actions">
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
