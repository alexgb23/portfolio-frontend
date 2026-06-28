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
            <div className="photo-container is-skeleton">
              <div className="profile-photo skeleton-block skeleton-photo" />
            </div>
          </div>
        </div>
      </div>

      <section className="technical-section">
        <div className="technical-line skeleton-block skeleton-line" />

        <div className="technical-timeline">
          {Array.from({ length: 3 }).map((_, i) => (
            <article
              key={i}
              className={`stat-card ${i % 2 === 0 ? "left" : "right"} is-skeleton`}
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
              className={`expertise-card tone-${i % 3} is-skeleton`}
              aria-hidden="true"
            >
              <div className="card-head">
                <div className="expertise-icon skeleton-block skeleton-icon" />

                <div className="card-title-wrap">
                  <div className="skeleton-block skeleton-text-md w-80" />
                </div>
              </div>

              <div className="skeleton-copy">
                <div className="skeleton-block skeleton-text-sm w-100" />
                <div className="skeleton-block skeleton-text-sm w-90" />
                <div className="skeleton-block skeleton-text-sm w-70" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default AboutSkeleton;