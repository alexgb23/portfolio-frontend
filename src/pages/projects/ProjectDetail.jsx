import { useState, useEffect } from "react"; // 💡 Añadido useEffect por si deseas resetear el slider al cambiar de proyecto
import { useParams, Link } from "react-router-dom";
import { useProjects } from "../../hooks/usePortfolioData";
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
} from "react-icons/fa";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { id } = useParams();
  const { projects, loading, error } = useProjects();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const project = projects?.find((p) => String(p.id) === String(id));

  usePageTitle(`${project?.title || "Detalle del Proyecto"} | Alex González`);

  // Resetear el índice del slider si el usuario cambia a otro proyecto
  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  const titleText = project?.title || "Untitled Project";
  const descriptionText =
    project?.short_description ||
    "No se ha proporcionado un desglose documental para este módulo de software.";
  const stackSummaryText = project?.stack_summary || "Especificación Técnica";

  // 💡 SOLUCIÓN DEFINITIVA PARA TU JSON: Parseamos el string JSON de image_url
  const mockImages = (() => {
    if (!project?.image_url) return ["/imagen_portfolio_mia_retocada-960.avif"];

    try {
      // JSON.parse convertirá "[\"url1\", \"url2\"]" en un array real ['url1', 'url2']
      const parsedImages = JSON.parse(project.image_url);
      return Array.isArray(parsedImages) && parsedImages.length > 0
        ? parsedImages
        : ["/imagen_portfolio_mia_retocada-960.avif"];
    } catch (e) {
      console.error("Error al deserializar las imágenes del proyecto:", e);
      return ["/imagen_portfolio_mia_retocada-960.avif"];
    }
  })();

  const technologies = project?.technologies
    ? project.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean)
    : [];

  const liveUrl = project?.project_url;
  const githubUrl = project?.repo_url;
  const isFeatured = project?.is_featured;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % mockImages.length);
  };
  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + mockImages.length) % mockImages.length,
    );
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
          <h2>Proyecto no encontrado (ID: {id})</h2>
          <p>
            El identificador no coincide con ningún registro indexado en el
            sistema.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail-container">
      {/* Cabecera de Navegación */}
      <div className="project-detail-nav">
        <Link to="/proyectos" className="back-link">
          <FaArrowLeft /> <span>Volver al portfolio</span>
        </Link>
        <div className="project-meta-top">
          <FaCalendarAlt />{" "}
          <span>{isFeatured ? "Entorno Destacado" : "Módulo Técnico"}</span>
        </div>
      </div>

      {/* Cabecera del Proyecto */}
      <header className="project-detail-header">
        <span className="project-kicker">// Core Engine</span>
        <h1 className="project-main-title">{titleText}</h1>
        <p className="project-subtitle">{stackSummaryText}</p>
      </header>

      {/* Layout Principal Exótico */}
      <div className="project-detail-layout">
        {/* COLUMNA IZQUIERDA: Slider y Documentación */}
        <div className="project-detail-main">
          {/* Slider Exótico */}
          <div className="project-slider-wrapper">
            <div className="project-slider">
              <img
                src={mockImages[activeImageIndex]}
                alt={`${titleText} - Visualización ${activeImageIndex + 1}`}
                className="slider-image"
              />
              {mockImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="slider-btn prev"
                    aria-label="Anterior"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="slider-btn next"
                    aria-label="Siguiente"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
            {/* Indicadores inferiores (Dots) */}
            {mockImages.length > 1 && (
              <div className="slider-dots">
                {mockImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === activeImageIndex ? "active" : ""}`}
                    onClick={() => setActiveImageIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bloque de Documentación Técnica */}
          <article className="project-docs">
            <h2>
              <FaTerminal /> Especificaciones del Sistema
            </h2>
            <div className="docs-content">
              {/* Aquí usamos project.description en vez de short_description para mostrar todo el texto largo de tu JSON */}
              <p style={{ whiteSpace: "pre-line" }}>
                {project?.description || descriptionText}
              </p>
            </div>
          </article>
        </div>

        {/* COLUMNA DERECHA: Sidebar de Arquitectura */}
        <aside className="project-detail-sidebar">
          {/* Tarjeta de Acciones */}
          <div className="sidebar-card actions-card">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-project primary"
              >
                Desplegar Entorno <FaExternalLinkAlt />
              </a>
            ) : null}

            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-project secondary"
              >
                Analizar Repositorio <FaGithub />
              </a>
            ) : null}

            {!liveUrl && !githubUrl && (
              <span className="confidential-badge">
                Código Privado / Persistencia Local
              </span>
            )}
          </div>

          {/* Stack Tecnológico */}
          <div className="sidebar-card tags-card">
            <h3>
              <FaCode /> Componentes de Stack
            </h3>
            <div className="tech-badges-grid">
              {technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag-premium">
                  {tech}
                </span>
              ))}
              {technologies.length === 0 && (
                <span className="empty-tag">Vanilla Stack</span>
              )}
            </div>
          </div>

          {/* Métricas de Core */}
          <div className="sidebar-card info-card">
            <h3>
              <FaBoxes /> Métricas de Infraestructura
            </h3>
            <div className="architecture-table">
              <div className="arch-row">
                <span>Database Engine</span>
                <strong>
                  {technologies.includes("MySQL")
                    ? "MySQL Server"
                    : "SQLite / NoSQL"}
                </strong>
              </div>
              <div className="arch-row">
                <span>Architecture</span>
                <strong>
                  {project?.slug?.includes("poo")
                    ? "Object-Oriented (POO)"
                    : "Functional Core"}
                </strong>
              </div>
              <div className="arch-row">
                <span>Environment</span>
                <strong>
                  {project?.slug?.includes("linux")
                    ? "GNU/Linux Container"
                    : "Windows Desktop Application"}
                </strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ProjectDetail;
