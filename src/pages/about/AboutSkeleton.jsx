import "./About.css";

function AboutSkeleton() {
  return (
    <section className="about-section" id="about">
      <div className="container about-container skeleton">
        <div className="about-left">
          <span className="about-kicker skeleton-block skeleton-text-sm" />

          <h1 className="about-title skeleton-block skeleton-text-lg" />

          <p className="about-text skeleton-block skeleton-text-md" />
          <p className="about-text skeleton-block skeleton-text-md" />
          <p className="about-text skeleton-block skeleton-text-md" />

          <div className="tech-badges">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="badge skeleton-block skeleton-pill"
              />
            ))}
          </div>
        </div>

        <div className="about-right">
          <div className="photo-wrapper">
            <div className="photo-container">
              <div className="profile-photo skeleton-block skeleton-photo" />
            </div>
          </div>
        </div>
      </div>

      {/* Línea y tarjetas técnicas en skeleton */}
      <section className="technical-section">
        <div className="technical-line skeleton-block skeleton-line" />

        <div className="technical-timeline">
          {Array.from({ length: 3 }).map((_, i) => (
            <article
              key={i}
              className={`stat-card skeleton-block skeleton-card`}
            >
              <span className="stat-number skeleton-block skeleton-text-lg" />
              <div>
                <h2 className="skeleton-block skeleton-text-md" />
                <p className="skeleton-block skeleton-text-sm" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="expertise-section">
        <div className="expertise-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <article
              key={i}
              className="expertise-card card-hover skeleton-block skeleton-card"
            >
              <div className="card-head">
                <div className="expertise-icon card-icon skeleton-block skeleton-icon" />
                <div className="card-title-wrap">
                  <h2 className="skeleton-block skeleton-text-md" />
                </div>
              </div>

              <p className="skeleton-block skeleton-text-sm" />
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default AboutSkeleton;