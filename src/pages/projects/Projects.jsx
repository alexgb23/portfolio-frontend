import ProjectCard from "../../components/cards/ProjectCard";
import { useProjects } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

function Projects() {
  usePageTitle("Proyectos de Desarrollo e Integración | Alex González");

  const { projects, loading, error } = useProjects();
  const hasProjects = Array.isArray(projects) && projects.length > 0;

  if (error) {
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

        <div className="state-wrapper error centered">
          <h2>Error al cargar proyectos</h2>
          <p>{error}</p>
        </div>
      </section>
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

      {/* estados:
         - loading && !hasProjects  -> skeleton inline
         - !loading && hasProjects  -> tarjetas reales
         - !loading && !hasProjects -> mensaje vacío
      */}
      {loading && !hasProjects ? (
        <div className="grid-cards">
          {Array.from({ length: 4 }).map((_, i) => (
            <article
              key={i}
              className="project-card skeleton-block skeleton-card"
            >
              <div className="project-card-head">
                <div className="skeleton-block skeleton-text-md" />
              </div>
              <div className="project-card-body">
                <p className="skeleton-block skeleton-text-sm" />
                <p className="skeleton-block skeleton-text-sm" />
              </div>
              <div className="project-card-footer">
                <span className="skeleton-block skeleton-pill" />
                <span className="skeleton-block skeleton-pill" />
              </div>
            </article>
          ))}
        </div>
      ) : hasProjects ? (
        <>
          <h2 className="sr-only">Listado de proyectos</h2>

          <div className="grid-cards">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id ?? `${project.title}-${index}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-inline-state">
          <p>No hay proyectos cargados actualmente.</p>
        </div>
      )}
    </section>
  );
}

export default Projects;