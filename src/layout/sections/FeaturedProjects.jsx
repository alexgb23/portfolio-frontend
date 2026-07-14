import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import ProjectCard from "../../components/cards/ProjectCard";
import "./FeaturedProjects.css";

function ProjectCardSkeleton({ tone = 0 }) {
  return (
    <article
      className={`expertise-card tone-${tone} skeleton-card`}
      aria-hidden="true"
    >
      <div className="card-head">
        <div className="expertise-icon skeleton-block skeleton-icon" />

        <div className="card-title-wrap project-card-skeleton-title">
          <div className="skeleton-block skeleton-text-md w-80" />
        </div>
      </div>

      <div className="skeleton-copy">
        <div className="skeleton-block skeleton-text-sm w-100" />
        <div className="skeleton-block skeleton-text-sm w-90" />
        <div className="skeleton-block skeleton-text-sm w-70" />
      </div>

      <div className="laboratory-counter project-card-skeleton-counter">
        <strong className="skeleton-block skeleton-text-xs w-40" />
      </div>

      <div className="project-card-skeleton-tags">
        <span className="skeleton-block skeleton-pill" />
        <span className="skeleton-block skeleton-pill" />
        <span className="skeleton-block skeleton-pill" />
      </div>
    </article>
  );
}

function FeaturedProjects({ projects = [], loading = false }) {
  const safeProjects = Array.isArray(projects) ? projects : [];
  const visibleProjects = safeProjects.slice(0, 2);
  const hasProjects = visibleProjects.length > 0;

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
        <div
          className="expertise-grid featured-projects-grid skeleton"
          aria-busy="true"
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <ProjectCardSkeleton
              key={`project-skeleton-${index}`}
              tone={index % 3}
            />
          ))}
        </div>
      ) : hasProjects ? (
        <div className="expertise-grid featured-projects-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id ?? project.slug ?? `${project.title}-${index}`}
              project={project}
              index={index}
              maxTags={3}
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
