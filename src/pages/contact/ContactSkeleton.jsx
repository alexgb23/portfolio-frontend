// src/pages/contact/ContactSkeleton.jsx
import "./Contact.css";

function ContactSkeleton() {
  return (
    <section className="section section-spaced section-separated skeleton">
      <div className="section-head-centered">
        <span className="section-kicker skeleton-block skeleton-text-sm" />
        <h1 className="skeleton-block skeleton-text-lg" />
        <p className="skeleton-block skeleton-text-md" />
        <p className="skeleton-block skeleton-text-md" />
      </div>

      <div className="contact-grid">
        {/* Tarjeta de enlaces */}
        <div className="contact-card">
          <h2 className="skeleton-block skeleton-text-md" />

          <p className="skeleton-block skeleton-text-sm" />

          <div className="social-mini-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="social-mini-card skeleton-block skeleton-card"
              >
                <div className="social-mini-front">
                  <div className="social-mini-icon skeleton-block skeleton-icon" />
                  <div className="social-mini-textbox">
                    <span className="skeleton-block skeleton-text-sm" />
                    <span className="skeleton-block skeleton-text-sm" />
                  </div>
                  <span className="social-mini-meta skeleton-block skeleton-text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal de contacto */}
        <div className="neo-terminal skeleton-block skeleton-card">
          <div className="term-top-bar">
            <div className="term-controls">
              <span className="c-red"></span>
              <span className="c-yellow"></span>
              <span className="c-green"></span>
            </div>
            <span className="term-tab-title skeleton-block skeleton-text-sm" />
          </div>

          <div className="term-content-area">
            <p className="cmd-input skeleton-block skeleton-text-sm" />
            <p className="cmd-output skeleton-block skeleton-text-sm" />
            <p className="cmd-output skeleton-block skeleton-text-sm" />

            <div className="cmd-form">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="cmd-input-line">
                  <label className="skeleton-block skeleton-text-sm" />
                  <div className="skeleton-block skeleton-text-md" />
                </div>
              ))}

              <div className="cmd-submit-btn skeleton-block skeleton-pill" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSkeleton;