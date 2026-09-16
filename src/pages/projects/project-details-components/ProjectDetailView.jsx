import { useEffect, useMemo, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import ProjectDetailSidebar from "./sidebar/ProjectDetailSidebar";
import ProjectDetailBody from "./body/ProjectDetailBody";
import ProjectDetailFooter from "./footer/ProjectDetailFooter";

import "./ProjectDetailView.css";

function ProjectDetailView({
  slug,
  loading = false,
  error = "",
  isRefreshing = false,
  isRetrying = false,
  project = null,
  onOpenCv,
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("overview");

  const hasProject = Boolean(project);

  /*
   * Render arrancando no es un error definitivo:
   * si no hay datos, mostramos estado de conexión;
   * si hay caché, renderizamos el proyecto mientras se actualiza.
   */
  const isConnecting = Boolean(isRetrying || (loading && !hasProject));

  const sectionIds = useMemo(
    () => ["overview", "showcase", "resources", "timeline", "stack"],
    [],
  );

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target?.id) {
          setActiveSectionId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -48% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [project, sectionIds]);

  useEffect(() => {
    setActiveSectionId("overview");
    setIsMobileSidebarOpen(false);
  }, [project?.slug]);

  /*
   * Primera carga sin proyecto y Render arrancando.
   * No se enseña “Error”, porque el hook sigue reintentando.
   */
  if (!hasProject && isConnecting) {
    return (
      <section className="project-detail">
        <div className="project-detail__container">
          <div className="state-wrapper centered" aria-live="polite">
            <h2>Conectando con el servidor</h2>
            <p>
              El backend está iniciándose. El detalle del proyecto aparecerá en
              breve.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * Error definitivo: solo se muestra cuando no hay datos, no está cargando
   * y el hook no está reintentando.
   */
  if (!hasProject && error) {
    return (
      <section className="project-detail">
        <div className="project-detail__container">
          <div className="state-wrapper error centered" role="alert">
            <h2>Error al cargar el proyecto</h2>
            <p>
              {typeof error === "string" && error.trim()
                ? error
                : `No se encontró el proyecto: ${slug}`}
            </p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * No hay carga, ni reintento, ni error, ni proyecto:
   * esto sí puede ser un slug inexistente o una respuesta válida sin proyecto.
   */
  if (!hasProject) {
    return (
      <section className="project-detail">
        <div className="project-detail__container">
          <div className="state-wrapper centered">
            <h2>Proyecto no encontrado</h2>
            <p>{`No se encontró el proyecto: ${slug}`}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail">
      <div className="project-detail__container">
        {(isRefreshing || isRetrying) && (
          <div className="section-inline-status" aria-live="polite">
            <p>
              {isRetrying
                ? "Conectando con el servidor para actualizar el proyecto..."
                : "Actualizando información del proyecto..."}
            </p>
          </div>
        )}

        <div className="project-detail-mobilebar">
          <div className="project-detail-mobilebar__title-wrap">
            <span className="project-detail-mobilebar__kicker">
              {project?.area_principal || "Proyecto"}
            </span>

            <strong className="project-detail-mobilebar__title">
              {project?.title}
            </strong>
          </div>

          <button
            type="button"
            className="project-detail-mobilebar__toggle"
            aria-label="Abrir navegación del proyecto"
            aria-expanded={isMobileSidebarOpen}
            aria-controls="project-detail-mobile-drawer"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <FiMenu aria-hidden="true" />
          </button>
        </div>

        <div className="project-detail__shell">
          <ProjectDetailSidebar
            project={project}
            activeSectionId={activeSectionId}
            onOpenCv={onOpenCv}
          />

          <ProjectDetailBody
            project={project}
            isRefreshing={isRefreshing || isRetrying}
          />
        </div>

        <ProjectDetailFooter project={project} />
      </div>

      <div
        className={`project-detail-drawer ${
          isMobileSidebarOpen ? "is-open" : ""
        }`}
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
              <FiX aria-hidden="true" />
            </button>
          </div>

          <ProjectDetailSidebar
            project={project}
            isMobile
            activeSectionId={activeSectionId}
            onOpenCv={onOpenCv}
            onNavigate={() => setIsMobileSidebarOpen(false)}
          />
        </aside>
      </div>
    </section>
  );
}

export default ProjectDetailView;
