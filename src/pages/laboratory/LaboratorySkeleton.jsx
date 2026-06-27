// src/pages/laboratory/LaboratorySkeleton.jsx
import "./Laboratory.css"; // reutiliza tus mismos estilos

function LaboratorySkeleton() {
  return (
    <section className="section section-spaced laboratory-page skeleton">
      {/* HERO */}
      <header className="section-head-centered laboratory-hero">
        <span className="section-kicker skeleton-block skeleton-text-sm" />
        <h1 className="skeleton-block skeleton-text-lg" />
        <p className="skeleton-block skeleton-text-md" />
        <p className="skeleton-block skeleton-text-md" />
      </header>

      {/* OVERVIEW CARDS */}
      <section
        className="laboratory-overview"
        aria-label="Resumen del laboratorio"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <article key={i} className="lab-overview-card">
            <div className="lab-overview-icon skeleton-block skeleton-icon" />
            <div>
              <h2 className="skeleton-block skeleton-text-md" />
              <p className="skeleton-block skeleton-text-sm" />
            </div>
          </article>
        ))}
      </section>

      {/* INFRAESTRUCTURA */}
      <section className="lab-section">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label skeleton-block skeleton-text-sm" />
            <h2 className="skeleton-block skeleton-text-md" />
            <p className="skeleton-block skeleton-text-sm" />
          </div>
        </div>

        <div className="lab-feature-grid">
          {/* Panel elementos destacados */}
          <div className="lab-panel">
            <div className="lab-panel-head">
              <h3 className="skeleton-block skeleton-text-md" />
            </div>

            <div className="lab-panel-body">
              <div className="lab-story-grid">
                {Array.from({ length: 3 }).map((_, i) => (
                  <article
                    key={i}
                    className="lab-story-card skeleton-block skeleton-card"
                  >
                    <div className="lab-story-head">
                      <div className="lab-float-icon skeleton-block skeleton-icon" />
                      <div>
                        <h3 className="skeleton-block skeleton-text-md" />
                        <p className="skeleton-block skeleton-text-sm" />
                      </div>
                    </div>

                    <div className="lab-chip-row">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <span
                          key={j}
                          className="skeleton-block skeleton-pill"
                        />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Panel servidores */}
          <div className="lab-panel">
            <div className="lab-panel-head">
              <h3 className="skeleton-block skeleton-text-md" />
            </div>

            <div className="lab-panel-body">
              <div className="lab-story-grid">
                {Array.from({ length: 2 }).map((_, i) => (
                  <article
                    key={i}
                    className="lab-story-card skeleton-block skeleton-card"
                  >
                    <div className="lab-story-head">
                      <div className="lab-float-icon skeleton-block skeleton-icon" />
                      <div>
                        <h3 className="skeleton-block skeleton-text-md" />
                        <p className="skeleton-block skeleton-text-sm" />
                      </div>
                    </div>

                    <div className="lab-chip-row">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <span
                          key={j}
                          className="skeleton-block skeleton-pill"
                        />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Panel vista rápida */}
          <div className="lab-panel">
            <div className="lab-panel-head">
              <h3 className="skeleton-block skeleton-text-md" />
            </div>

            <div className="lab-panel-body">
              <div className="lab-chip-row">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className="skeleton-block skeleton-pill"
                  />
                ))}
              </div>

              <div className="empty-inline-state compact">
                <p className="skeleton-block skeleton-text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="lab-actions">
          <span className="inline-link skeleton-block skeleton-pill" />
        </div>
      </section>

      {/* AUTOMATIZACIÓN */}
      <section className="lab-section lab-section-divider">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label skeleton-block skeleton-text-sm" />
            <h2 className="skeleton-block skeleton-text-md" />
            <p className="skeleton-block skeleton-text-sm" />
          </div>
        </div>

        <div className="lab-panel">
          <div className="lab-panel-head">
            <h3 className="skeleton-block skeleton-text-md" />
          </div>

          <div className="lab-panel-body">
            <div className="lab-story-grid">
              {Array.from({ length: 3 }).map((_, i) => (
                <article
                  key={i}
                  className="lab-story-card skeleton-block skeleton-card"
                >
                  <div className="lab-story-head">
                    <div className="lab-float-icon skeleton-block skeleton-icon" />
                    <div>
                      <h3 className="skeleton-block skeleton-text-md" />
                      <p className="skeleton-block skeleton-text-sm" />
                    </div>
                  </div>

                  <div className="lab-chip-row">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <span
                        key={j}
                        className="skeleton-block skeleton-pill"
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="lab-actions">
          <span className="inline-link skeleton-block skeleton-pill" />
        </div>
      </section>

      {/* HOME ASSISTANT + IA + RESEARCH + CAPACIDADES, simplificados */}
      {["Home Assistant", "IA local", "Research lab", "Capacidades"].map(
        (sectionKey, idx) => (
          <section
            key={sectionKey}
            className="lab-section lab-section-divider"
          >
            <div className="lab-section-top">
              <div className="lab-section-intro">
                <span className="lab-label skeleton-block skeleton-text-sm" />
                <h2 className="skeleton-block skeleton-text-md" />
                <p className="skeleton-block skeleton-text-sm" />
              </div>
            </div>

            {idx === 3 ? (
              // Capabilities chips
              <div className="lab-capabilities">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="lab-tag skeleton-block skeleton-pill"
                  />
                ))}
              </div>
            ) : (
              <div className="lab-story-grid">
                {Array.from({ length: 2 }).map((_, i) => (
                  <article
                    key={i}
                    className="lab-story-card skeleton-block skeleton-card"
                  >
                    <div className="lab-story-head">
                      <div className="lab-float-icon skeleton-block skeleton-icon" />
                      <div>
                        <h3 className="skeleton-block skeleton-text-md" />
                        <p className="skeleton-block skeleton-text-sm" />
                      </div>
                    </div>

                    <div className="lab-chip-row">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <span
                          key={j}
                          className="skeleton-block skeleton-pill"
                        />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ),
      )}
    </section>
  );
}

export default LaboratorySkeleton;