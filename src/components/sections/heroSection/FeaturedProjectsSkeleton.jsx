import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProjectCard from "../cards/ProjectCard";
import "./sectionsGlobals.css";

function FeaturedProjects({ projects = [], loading = false }) {
  const safeProjects = Array.isArray(projects) ? projects : [];
  const hasProjects = safeProjects.length > 0;

  return (
    <section
      className="section section-spaced section-separated"
      id="proyectos"
    >
      <div className="section-head-centered">
        <span className="section-kicker">Portfolio</span>
        <h2>Proyectos destacados</h2>
        <p>
          Aplicaciones, integraciones y herramientas técnicas orientadas a
          resultados reales.
        </p>
      </div>

      {loading && !hasProjects ? (
        <div className="grid-cards projects-skeleton-grid">
          {Array.from({ length: 2 }).map((_, index) => (
            <article
              className="project-skeleton-card"
              key={`project-skeleton-${index}`}
              aria-hidden="true"
            >
              <div className="skeleton-block project-sk-badge" />

              <div className="project-sk-head">
                <div className="skeleton-block project-sk-title w-80" />
                <div className="skeleton-block project-sk-title w-60" />
              </div>

              <div className="project-sk-body">
                <div className="skeleton-block project-sk-text w-100" />
                <div className="skeleton-block project-sk-text w-90" />
                <div className="skeleton-block project-sk-text w-70" />
              </div>

              <div className="project-sk-stack">
                <div className="skeleton-block project-sk-line w-65" />
              </div>

              <div className="project-sk-footer">
                <span className="skeleton-block skeleton-pill" />
                <span className="skeleton-block skeleton-pill" />
                <span className="skeleton-block skeleton-pill" />
              </div>
            </article>
          ))}
        </div>
      ) : hasProjects ? (
        <div className="grid-cards">
          {safeProjects.map((project, index) => (
            <ProjectCard
              key={project.id ?? `${project.title}-${index}`}
              project={project}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="empty-inline-state">
          <p>Aún no hay proyectos destacados cargados.</p>
        </div>
      )}

      <div className="section-more">
        <Link to="/proyectos" className="inline-link">
          <span>Ver todos los proyectos</span>
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProjects;