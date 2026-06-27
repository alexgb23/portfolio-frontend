
function ProjectsSkeleton() {
  return (
    <section className="section section-spaced skeleton">
      <div className="section-head-centered">
        <span className="section-kicker skeleton-block skeleton-text-sm" />
        <h1 className="skeleton-block skeleton-text-lg" />
        <p className="skeleton-block skeleton-text-md" />
        <p className="skeleton-block skeleton-text-md" />
      </div>

      <h2 className="sr-only">Listado de proyectos</h2>

      <div className="grid-cards">
        {Array.from({ length: 6 }).map((_, i) => (
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
    </section>
  );
}

export default ProjectsSkeleton;