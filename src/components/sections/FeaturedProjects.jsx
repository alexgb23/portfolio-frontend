import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProjectCard from "../cards/ProjectCard";
import "./sectionsGlobals.css";

function FeaturedProjects({ projects = [], loading = false }) {
  const hasProjects = projects.length > 0;

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

      {loading ? (
        <div className="grid-cards">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="project-skeleton-card"
              key={`project-skeleton-${index}`}
            >
              <div className="sk sk-badge"></div>
              <div className="sk sk-title"></div>
              <div className="sk sk-text"></div>
              <div className="sk sk-text short"></div>
              <div className="sk sk-row">
                <span className="sk sk-chip"></span>
                <span className="sk sk-chip"></span>
                <span className="sk sk-chip"></span>
              </div>
            </div>
          ))}
        </div>
      ) : hasProjects ? (
        <div className="grid-cards">
          {projects.map((project, index) => (
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
