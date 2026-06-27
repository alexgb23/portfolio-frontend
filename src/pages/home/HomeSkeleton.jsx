// src/pages/home/HomeSkeleton.jsx

function HomeSkeleton() {
  return (
    <>
      <section className="section hero-section skeleton">
        <div className="hero-grid">
          <div className="hero-main">
            <span className="section-kicker skeleton-block skeleton-text-sm" />
            <h1 className="skeleton-block skeleton-text-lg" />
            <p className="skeleton-block skeleton-text-md" />
            <p className="skeleton-block skeleton-text-md" />

            <div className="hero-actions">
              <span className="skeleton-block skeleton-pill" />
              <span className="skeleton-block skeleton-pill" />
            </div>
          </div>

          <div className="hero-side is-skeleton">
            <div className="skeleton-block skeleton-photo" />
          </div>
        </div>
      </section>

      <section className="section section-spaced skeleton">
        <div className="section-head">
          <span className="section-kicker skeleton-block skeleton-text-sm" />
          <h2 className="skeleton-block skeleton-text-md" />
          <p className="skeleton-block skeleton-text-sm" />
        </div>

        <div className="about-preview-grid">
          <div className="skeleton-block skeleton-text-md" />
          <div className="skeleton-block skeleton-text-md" />
        </div>
      </section>

      <section className="section section-spaced section-separated skeleton">
        <div className="section-head-centered">
          <span className="section-kicker skeleton-block skeleton-text-sm" />
          <h2 className="skeleton-block skeleton-text-md" />
          <p className="skeleton-block skeleton-text-sm" />
        </div>

        <div className="grid-cards">
          {Array.from({ length: 3 }).map((_, i) => (
            <article
              key={i}
              className="card card-project is-skeleton"
            >
              <div className="card-top">
                <span className="skeleton-block skeleton-text-sm" />
                <span className="skeleton-block skeleton-text-sm" />
              </div>

              <div className="card-head">
                <div className="card-icon skeleton-block skeleton-icon" />
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
                <span className="skeleton-block skeleton-pill" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-spaced section-separated skeleton">
        <div className="section-head-centered">
          <span className="section-kicker skeleton-block skeleton-text-sm" />
          <h2 className="skeleton-block skeleton-text-md" />
          <p className="skeleton-block skeleton-text-sm" />
        </div>

        <div className="lab-feature-grid">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="lab-panel is-skeleton">
              <div className="lab-panel-head">
                <h3 className="skeleton-block skeleton-text-md" />
              </div>
              <div className="lab-panel-body">
                <div className="lab-chip-row">
                  <span className="skeleton-block skeleton-pill" />
                  <span className="skeleton-block skeleton-pill" />
                  <span className="skeleton-block skeleton-pill" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-spaced skeleton">
        <div className="section-head">
          <span className="section-kicker skeleton-block skeleton-text-sm" />
          <h2 className="skeleton-block skeleton-text-md" />
          <p className="skeleton-block skeleton-text-sm" />
        </div>

        <div className="contact-preview-grid">
          <div className="skeleton-block skeleton-text-md" />
          <div className="skeleton-block skeleton-text-md" />
        </div>
      </section>
    </>
  );
}

export default HomeSkeleton;