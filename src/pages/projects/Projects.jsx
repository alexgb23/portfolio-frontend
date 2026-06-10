import ProjectCard from "../../components/cards/ProjectCard";
import { usePortfolioData } from "../../hooks/usePortfolioData";

function Projects() {
  const { projects, loading, error } = usePortfolioData();
  const hasProjects = Array.isArray(projects) && projects.length > 0;

  if (loading) {
    return (
      <div className="state-wrapper centered">
        <div className="sys-loader"></div>
        <h2>Cargando proyectos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-wrapper error centered">
        <h2>Error al cargar proyectos</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="section section-spaced">
      <div className="section-head-centered">
        <span className="section-kicker">Portfolio</span>
        <h1>Proyectos de desarrollo e integración</h1>
        <p>
          Aplicaciones, paneles, integraciones y herramientas técnicas
          orientadas a resolver necesidades reales con software útil.
        </p>
      </div>

      {hasProjects ? (
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
          <p>No hay proyectos cargados actualmente.</p>
        </div>
      )}
    </section>
  );
}

export default Projects;
