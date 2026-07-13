import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router";
import { useProjectDetail } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaCalendarAlt,
  FaCode,
  FaBoxes,
  FaChevronLeft,
  FaChevronRight,
  FaTerminal,
  FaServer,
  FaGlobe,
  FaDatabase,
  FaFolderOpen,
} from "react-icons/fa";
import "./ProjectDetail.css";

function normalizeArrayValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function ProjectDetail() {
  const { slug } = useParams();
  const { project, loading, error } = useProjectDetail(slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  usePageTitle(`${project?.title || "Detalle del Proyecto"} | Alex González`);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [slug]);

  const titleText = project?.title || "Proyecto sin título";
  const summaryText =
    project?.short_description ||
    "No se ha proporcionado una descripción breve para este proyecto.";
  const stackSummaryText = project?.stack_summary || "Especificación técnica";

  const images = useMemo(() => {
    const imageList = normalizeArrayValue(project?.image_url);
    const galleryList = normalizeArrayValue(project?.galeria_urls);
    const merged = [...imageList, ...galleryList];
    return merged.length > 0
      ? merged
      : ["/imagen_portfolio_mia_retocada-960.avif"];
  }, [project]);

  const technologies = useMemo(
    () => normalizeArrayValue(project?.technologies),
    [project],
  );

  const relatedAreas = useMemo(
    () => normalizeArrayValue(project?.areas_relacionadas),
    [project],
  );

  const documentationUrls = useMemo(
    () => normalizeArrayValue(project?.documentacion_urls),
    [project],
  );

  const links = [
    {
      label: "Proyecto",
      url: project?.project_url,
      icon: <FaExternalLinkAlt />,
    },
    { label: "Frontend", url: project?.frontend_url, icon: <FaGlobe /> },
    { label: "Backend", url: project?.backend_url, icon: <FaServer /> },
    { label: "API", url: project?.api_base_url, icon: <FaDatabase /> },
    {
      label: "Staging",
      url: project?.staging_url,
      icon: <FaExternalLinkAlt />,
    },
    { label: "Repositorio", url: project?.repo_url, icon: <FaGithub /> },
    {
      label: "Referencia",
      url: project?.referencia_externa,
      icon: <FaFolderOpen />,
    },
  ].filter((item) => item.url);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="project-detail-skeleton">
        <div
          style={{
            padding: "100px",
            color: "var(--text-sub)",
            fontFamily: "monospace",
          }}
        >
          <p>// Sincronizando con el entorno de persistencia de datos...</p>
        </div>
      </div>
    );
  }

  if (error || (!project && !loading)) {
    return (
      <section className="project-detail-container error-state">
        <Link to="/proyectos" className="back-link">
          <FaArrowLeft /> Volver a proyectos
        </Link>

        <div className="empty-inline-state" style={{ marginTop: "40px" }}>
          <h2>Proyecto no encontrado</h2>
          <p>
            No existe ningún proyecto publicado asociado al slug:{" "}
            <strong>{slug}</strong>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail-container">
      <div className="project-detail-nav">
        <Link to="/proyectos" className="back-link">
          <FaArrowLeft /> <span>Volver a proyectos</span>
        </Link>

        <div className="project-meta-top">
          <FaCalendarAlt />
          <span>
            {project?.is_featured ? "Entorno destacado" : "Proyecto técnico"}
          </span>
        </div>
      </div>

      <header className="project-detail-header">
        <span className="project-kicker">
          {project?.tipo_proyecto || "// Core Engine"}
        </span>
        <h1 className="project-main-title">{titleText}</h1>
        <p className="project-subtitle">{stackSummaryText}</p>
        <p className="project-detail-summary">{summaryText}</p>
      </header>

      <div className="project-detail-layout">
        <div className="project-detail-main">
          <div className="project-slider-wrapper">
            <div className="project-slider">
              <img
                src={images[activeImageIndex]}
                alt={`${titleText} - Visualización ${activeImageIndex + 1}`}
                className="slider-image"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="slider-btn prev"
                    aria-label="Anterior"
                    type="button"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={nextImage}
                    className="slider-btn next"
                    aria-label="Siguiente"
                    type="button"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="slider-dots">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`dot ${idx === activeImageIndex ? "active" : ""}`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Ir a imagen ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {project?.resumen && (
            <article className="project-docs">
              <h2>Resumen</h2>
              <div className="docs-content">
                <p style={{ whiteSpace: "pre-line" }}>{project.resumen}</p>
              </div>
            </article>
          )}

          <article className="project-docs">
            <h2>
              <FaTerminal /> Descripción
            </h2>
            <div className="docs-content">
              <p style={{ whiteSpace: "pre-line" }}>
                {project?.description || summaryText}
              </p>
            </div>
          </article>

          {project?.objetivo && (
            <article className="project-docs">
              <h2>Objetivo</h2>
              <div className="docs-content">
                <p style={{ whiteSpace: "pre-line" }}>{project.objetivo}</p>
              </div>
            </article>
          )}

          {project?.resultado_actual && (
            <article className="project-docs">
              <h2>Resultado actual</h2>
              <div className="docs-content">
                <p style={{ whiteSpace: "pre-line" }}>
                  {project.resultado_actual}
                </p>
              </div>
            </article>
          )}

          {project?.notas_tecnicas && (
            <article className="project-docs">
              <h2>Notas técnicas</h2>
              <div className="docs-content">
                <p style={{ whiteSpace: "pre-line" }}>
                  {project.notas_tecnicas}
                </p>
              </div>
            </article>
          )}
        </div>

        <aside className="project-detail-sidebar">
          <div className="sidebar-card actions-card">
            {links.length > 0 ? (
              links.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-project primary"
                >
                  {item.label} {item.icon}
                </a>
              ))
            ) : (
              <span className="confidential-badge">
                Código privado / acceso no público
              </span>
            )}
          </div>

          <div className="sidebar-card tags-card">
            <h3>
              <FaCode /> Tecnologías
            </h3>

            <div className="tech-badges-grid">
              {technologies.length > 0 ? (
                technologies.map((tech, idx) => (
                  <span key={`${tech}-${idx}`} className="tech-tag-premium">
                    {tech}
                  </span>
                ))
              ) : (
                <span className="empty-tag">Stack no especificado</span>
              )}
            </div>
          </div>

          {relatedAreas.length > 0 && (
            <div className="sidebar-card tags-card">
              <h3>Áreas relacionadas</h3>
              <div className="tech-badges-grid">
                {relatedAreas.map((area, idx) => (
                  <span key={`${area}-${idx}`} className="tech-tag-premium">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar-card info-card">
            <h3>
              <FaBoxes /> Ficha técnica
            </h3>

            <div className="architecture-table">
              <div className="arch-row">
                <span>Slug</span>
                <strong>{project?.slug || "-"}</strong>
              </div>

              <div className="arch-row">
                <span>Tipo</span>
                <strong>{project?.tipo_proyecto || "-"}</strong>
              </div>

              <div className="arch-row">
                <span>Área principal</span>
                <strong>{project?.area_principal || "-"}</strong>
              </div>

              <div className="arch-row">
                <span>Estado</span>
                <strong>{project?.status || "-"}</strong>
              </div>

              <div className="arch-row">
                <span>Publicado</span>
                <strong>{project?.is_published ? "Sí" : "No"}</strong>
              </div>

              <div className="arch-row">
                <span>Destacado</span>
                <strong>{project?.is_featured ? "Sí" : "No"}</strong>
              </div>

              <div className="arch-row">
                <span>Inicio</span>
                <strong>{project?.fecha_inicio || "-"}</strong>
              </div>

              <div className="arch-row">
                <span>Fin</span>
                <strong>{project?.fecha_fin || "-"}</strong>
              </div>

              {project?.laboratorio_origen?.titulo && (
                <div className="arch-row">
                  <span>Laboratorio</span>
                  <strong>{project.laboratorio_origen.titulo}</strong>
                </div>
              )}
            </div>
          </div>

          {documentationUrls.length > 0 && (
            <div className="sidebar-card info-card">
              <h3>Documentación</h3>
              <div className="architecture-table">
                {documentationUrls.map((url, idx) => (
                  <div key={`${url}-${idx}`} className="arch-row">
                    <span>Documento {idx + 1}</span>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Abrir
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export default ProjectDetail;
