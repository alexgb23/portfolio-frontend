// src/pages/laboratory/LaboratorySkeleton.jsx
import "./Laboratory.css";
import "./Skeletons.css";

function SkeletonCard({ chips = 2, withCounter = true }) {
  return (
    <article
      className="expertise-card expertise-card-hover laboratory-card skeleton-card"
      aria-hidden="true"
    >
      <div className="card-head">
        <div className="expertise-icon skeleton-block skeleton-icon" />

        <div className="card-title-wrap" style={{ width: "100%" }}>
          <div className="skeleton-block skeleton-text-md w-70" />
        </div>
      </div>

      <div className="skeleton-copy">
        <div className="skeleton-block skeleton-text-sm w-100" />
        <div className="skeleton-block skeleton-text-sm w-90" />
        <div className="skeleton-block skeleton-text-sm w-65" />
      </div>

      {withCounter ? (
        <div className="laboratory-counter laboratory-counter-inline">
          <span className="skeleton-block skeleton-text-xs w-30" />
          <strong className="skeleton-block skeleton-text-xs w-40" />
        </div>
      ) : null}

      <div className="lab-chip-row">
        {Array.from({ length: chips }).map((_, index) => (
          <span
            key={`chip-${index}`}
            className="tag skeleton-block skeleton-pill"
          />
        ))}
      </div>
    </article>
  );
}

function SkeletonPanel({ cards = 2, chips = 2, withCounter = true }) {
  return (
    <div className="lab-panel" aria-hidden="true">
      <div className="lab-panel-head">
        <div className="skeleton-block skeleton-text-md w-55" />
      </div>

      <div className="lab-panel-body">
        <div className="lab-story-grid">
          {Array.from({ length: cards }).map((_, index) => (
            <SkeletonCard
              key={`panel-card-${index}`}
              chips={chips}
              withCounter={withCounter}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LaboratorySkeleton() {
  return (
    <section
      className="section section-spaced laboratory-page skeleton"
      role="status"
      aria-busy="true"
      aria-label="Cargando laboratorio"
    >
      <span className="sr-only">Cargando laboratorio</span>

      <header
        className="section-head-centered laboratory-hero"
        aria-hidden="true"
      >
        <span className="section-kicker skeleton-block skeleton-text-sm w-24" />
        <div className="skeleton-block skeleton-text-lg w-85" />
        <div className="skeleton-block skeleton-text-md w-80" />
        <div className="skeleton-block skeleton-text-md w-72" />
      </header>

      <section
        className="laboratory-overview expertise-grid"
        aria-hidden="true"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <article
            key={`overview-${index}`}
            className="expertise-card expertise-card-hover laboratory-card skeleton-card"
            aria-hidden="true"
          >
            <div className="card-head">
              <div className="expertise-icon skeleton-block skeleton-icon" />
              <div className="card-title-wrap" style={{ width: "100%" }}>
                <div className="skeleton-block skeleton-text-md w-60" />
              </div>
            </div>

            <div className="skeleton-copy">
              <div className="skeleton-block skeleton-text-sm w-100" />
              <div className="skeleton-block skeleton-text-sm w-82" />
            </div>

            <div className="laboratory-counter">
              <span className="skeleton-block skeleton-text-xs w-32" />
              <strong className="skeleton-block skeleton-text-xs w-22" />
            </div>
          </article>
        ))}
      </section>

      <section className="lab-section" aria-hidden="true">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label skeleton-block skeleton-text-sm w-24" />
            <div className="skeleton-block skeleton-text-md w-72" />
            <div className="skeleton-block skeleton-text-sm w-88" />
          </div>
        </div>

        <div className="lab-feature-grid">
          <SkeletonPanel cards={3} chips={2} withCounter />
          <SkeletonPanel cards={2} chips={2} withCounter />

          <div className="lab-panel" aria-hidden="true">
            <div className="lab-panel-head">
              <div className="skeleton-block skeleton-text-md w-58" />
            </div>

            <div className="lab-panel-body">
              <div className="lab-story-grid">
                <article className="expertise-card expertise-card-hover laboratory-card skeleton-card">
                  <div className="card-head">
                    <div className="expertise-icon skeleton-block skeleton-icon" />
                    <div className="card-title-wrap" style={{ width: "100%" }}>
                      <div className="skeleton-block skeleton-text-md w-55" />
                    </div>
                  </div>

                  <div className="skeleton-copy">
                    <div className="skeleton-block skeleton-text-sm w-100" />
                    <div className="skeleton-block skeleton-text-sm w-75" />
                  </div>

                  <div className="lab-chip-row">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <span
                        key={`metric-${index}`}
                        className="tag skeleton-block skeleton-pill"
                      />
                    ))}
                  </div>

                  <div className="laboratory-counter laboratory-counter-inline">
                    <span className="skeleton-block skeleton-text-xs w-34" />
                    <strong className="skeleton-block skeleton-text-xs w-42" />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div className="lab-actions">
          <span className="inline-link skeleton-block skeleton-pill w-30" />
        </div>
      </section>

      <section className="lab-section lab-section-divider" aria-hidden="true">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label skeleton-block skeleton-text-sm w-24" />
            <div className="skeleton-block skeleton-text-md w-68" />
            <div className="skeleton-block skeleton-text-sm w-84" />
          </div>
        </div>

        <SkeletonPanel cards={3} chips={3} withCounter />

        <div className="lab-actions">
          <span className="inline-link skeleton-block skeleton-pill w-32" />
        </div>
      </section>

      <section className="lab-section lab-section-divider" aria-hidden="true">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label skeleton-block skeleton-text-sm w-28" />
            <div className="skeleton-block skeleton-text-md w-62" />
            <div className="skeleton-block skeleton-text-sm w-86" />
          </div>
        </div>

        <div className="lab-story-grid">
          <SkeletonCard chips={4} withCounter={false} />
          <SkeletonCard chips={4} withCounter={false} />
        </div>
      </section>

      <section className="lab-section lab-section-divider" aria-hidden="true">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label skeleton-block skeleton-text-sm w-20" />
            <div className="skeleton-block skeleton-text-md w-64" />
            <div className="skeleton-block skeleton-text-sm w-84" />
          </div>
        </div>

        <div className="lab-column-cards">
          <article
            className="expertise-card expertise-card-hover laboratory-card skeleton-card"
            aria-hidden="true"
          >
            <div className="card-head">
              <div className="expertise-icon skeleton-block skeleton-icon" />
              <div className="card-title-wrap" style={{ width: "100%" }}>
                <div className="skeleton-block skeleton-text-md w-48" />
              </div>
            </div>

            <div className="skeleton-copy">
              <div className="skeleton-block skeleton-text-sm w-100" />
              <div className="skeleton-block skeleton-text-sm w-85" />
              <div className="skeleton-block skeleton-text-sm w-72" />
            </div>

            <ul className="lab-data-list" role="list">
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={`data-left-${index}`}>
                  <div className="skeleton-block skeleton-text-sm w-75" />
                </li>
              ))}
            </ul>
          </article>

          <article
            className="expertise-card expertise-card-hover laboratory-card skeleton-card"
            aria-hidden="true"
          >
            <div className="card-head">
              <div className="expertise-icon skeleton-block skeleton-icon" />
              <div className="card-title-wrap" style={{ width: "100%" }}>
                <div className="skeleton-block skeleton-text-md w-52" />
              </div>
            </div>

            <div className="skeleton-copy">
              <div className="skeleton-block skeleton-text-sm w-100" />
              <div className="skeleton-block skeleton-text-sm w-82" />
              <div className="skeleton-block skeleton-text-sm w-66" />
            </div>

            <ul className="lab-data-list" role="list">
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={`data-right-${index}`}>
                  <div className="skeleton-block skeleton-text-sm w-70" />
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="lab-section lab-section-divider" aria-hidden="true">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label skeleton-block skeleton-text-sm w-24" />
            <div className="skeleton-block skeleton-text-md w-66" />
            <div className="skeleton-block skeleton-text-sm w-88" />
          </div>
        </div>

        <div className="lab-research-grid">
          <SkeletonCard chips={4} withCounter={false} />
          <SkeletonCard chips={4} withCounter={false} />
        </div>
      </section>

      <section className="lab-section lab-section-divider" aria-hidden="true">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label skeleton-block skeleton-text-sm w-22" />
            <div className="skeleton-block skeleton-text-md w-60" />
            <div className="skeleton-block skeleton-text-sm w-80" />
          </div>
        </div>

        <div className="lab-capabilities">
          {Array.from({ length: 10 }).map((_, index) => (
            <span
              key={`capability-${index}`}
              className="lab-tag skeleton-block skeleton-pill"
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default LaboratorySkeleton;
