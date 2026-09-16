import ProjectCard from "../../components/cards/FeaturedProjectCard";
import { useProjects } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

function Projects() {
  usePageTitle("Proyectos de Desarrollo e Integración | Alexander Galvez");

  const {
    projects = [],
    loading = false,
    error = "",
    isRefreshing = false,
    isRetrying = false,
  } = useProjects();

  const safeProjects = Array.isArray(projects) ? projects : [];
  const hasProjects = safeProjects.length > 0;

  /*
   * Un servidor despertando no es un error.
   * Si existen datos cacheados, se mantienen visibles mientras el hook
   * actualiza la respuesta en segundo plano.
   */
  const isConnecting = Boolean(isRetrying || (loading && !hasProjects));

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
        <>
          {isRefreshing || isRetrying ? (
            <div className="section-inline-status" aria-live="polite">
              <p>
                {isRetrying
                  ? "Conectando con el servidor para actualizar los proyectos..."
                  : "Actualizando proyectos..."}
              </p>
            </div>
          ) : null}

          <h2 className="sr-only">Listado de proyectos</h2>

          <div className="grid-cards">
            {safeProjects.map((project, index) => (
              <ProjectCard
                key={
                  project?.slug ??
                  project?.id ??
                  `${project?.title || "project"}-${index}`
                }
                project={project}
                index={index}
              />
            ))}
          </div>
        </>
      ) : isConnecting ? (
        <div className="empty-inline-state" aria-live="polite">
          <p>Conectando con el servidor. Los proyectos aparecerán en breve.</p>
        </div>
      ) : error ? (
        <div className="state-wrapper error centered" role="alert">
          <h2>Error al cargar proyectos</h2>
          <p>{typeof error === "string" ? error : "Inténtalo más tarde."}</p>
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
