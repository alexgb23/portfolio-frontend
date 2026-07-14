import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import FeaturedProjectsProjectCard from "../../components/cards/FeaturedProjectCard";
import "./FeaturedProjects.css";

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

      {hasProjects ? (
        <div className="expertise-grid featured-projects-grid">
          {visibleProjects.map((project, index) => (
            <FeaturedProjectsProjectCard
              key={project.id ?? project.slug ?? `${project.title}-${index}`}
              project={project}
              index={index}
              maxTags={3}
            />
          ))}
        </div>
      ) : loading ? null : (
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
