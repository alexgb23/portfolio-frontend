import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import ProjectDetailSidebar from "./sidebar/ProjectDetailSidebar";
import ProjectDetailBody from "./body/ProjectDetailBody";
import ProjectDetailFooter from "./footer/ProjectDetailFooter";
import "./ProjectDetailView.css";

function ProjectDetailView({ slug, loading, error, isRefreshing, project }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  if (loading) {
    return (
      <section className="project-detail">
        <div className="project-detail__container">
          <div className="state-wrapper centered">
            <h2>Cargando proyecto</h2>
          </div>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="project-detail">
        <div className="project-detail__container">
          <div className="state-wrapper error centered">
            <h2>Error al cargar el proyecto</h2>
            <p>{error?.message || `No se encontró el proyecto: ${slug}`}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail">
      <div className="project-detail__container">
        <div className="project-detail-mobilebar">
          <button
            type="button"
            className="project-detail-mobilebar__toggle"
            aria-label="Abrir navegación del proyecto"
            aria-expanded={isMobileSidebarOpen}
            aria-controls="project-detail-mobile-drawer"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <FiMenu />
          </button>

          <div className="project-detail-mobilebar__title-wrap">
            <span className="project-detail-mobilebar__kicker">
              {project?.area_principal || "Proyecto"}
            </span>
            <strong className="project-detail-mobilebar__title">
              {project?.title}
            </strong>
          </div>
        </div>

        <div className="project-detail__shell">
          <ProjectDetailSidebar project={project} />
          <ProjectDetailBody project={project} isRefreshing={isRefreshing} />
        </div>

        <ProjectDetailFooter project={project} />
      </div>

      <div
        className={`project-detail-drawer ${isMobileSidebarOpen ? "is-open" : ""}`}
        aria-hidden={!isMobileSidebarOpen}
      >
        <button
          type="button"
          className="project-detail-drawer__overlay"
          aria-label="Cerrar navegación"
          onClick={() => setIsMobileSidebarOpen(false)}
        />

        <aside
          id="project-detail-mobile-drawer"
          className="project-detail-drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navegación del proyecto"
        >
          <div className="project-detail-drawer__head">
            <div>
              <span className="project-detail-drawer__kicker">
                {project?.area_principal || "Proyecto"}
              </span>
              <h2 className="project-detail-drawer__title">{project?.title}</h2>
            </div>

            <button
              type="button"
              className="project-detail-drawer__close"
              aria-label="Cerrar navegación del proyecto"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <FiX />
            </button>
          </div>

          <ProjectDetailSidebar
            project={project}
            isMobile
            onNavigate={() => setIsMobileSidebarOpen(false)}
          />
        </aside>
      </div>
    </section>
  );
}

export default ProjectDetailView;
