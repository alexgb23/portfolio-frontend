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
          <article key={i} className="card card-project">
            <div className="card-head">
              <div className="card-title-wrap">
                <h3 className="skeleton-block skeleton-text-md" />
              </div>
            </div>

            <div className="project-card-divider" />

            <p className="skeleton-block skeleton-text-sm" />
            <p className="skeleton-block skeleton-text-sm" />

            <div className="tags">
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