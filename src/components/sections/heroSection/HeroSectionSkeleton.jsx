import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import "../sectionsGlobals.css";
import "./HeroSection.css";

function HeroSectionSkeleton() {
  return (
    <header className="hero-centered-section skeleton" id="inicio">
      <div className="container hero-center-content">
        <div className="hero-top-row">
          <div className="hero-title-container">
            <span className="hero-kicker skeleton-block skeleton-text-sm hero-sk-kicker" />

            <div className="hero-main-title hero-sk-title">
              <div className="skeleton-block skeleton-text-lg hero-sk-line w-70" />
              <div className="skeleton-block skeleton-text-lg hero-sk-line w-100" />
              <div className="skeleton-block skeleton-text-lg hero-sk-line w-65" />
            </div>

            <h2 className="sr-only">Especialidades principales</h2>

            <div className="hero-intro hero-sk-intro">
              <p className="skeleton-block skeleton-text-md hero-sk-line w-100" />
              <p className="skeleton-block skeleton-text-md hero-sk-line w-90" />
              <p className="skeleton-block skeleton-text-md hero-sk-line w-75" />
            </div>
          </div>

          <div className="avatar-block">
            <div className="avatar-wrapper">
              <div className="skeleton-block skeleton-photo hero-sk-photo" />
            </div>

            <div className="hero-badge-wrap">
              <span className="skeleton-block skeleton-pill hero-sk-badge" />
            </div>
          </div>
        </div>

        <div className="hero-bottom-block">
          <section className="speciality-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <article
                key={index}
                className="card speciality-card skeleton-card hero-sk-card"
              >
                <div className="card-head">
                  <div className="card-icon skeleton-block skeleton-icon" />
                  <div className="card-title-wrap">
                    <div className="skeleton-block skeleton-text-md w-70" />
                  </div>
                </div>

                <p className="skeleton-block skeleton-text-sm w-100" />
                <p className="skeleton-block skeleton-text-sm w-80" />
              </article>
            ))}
          </section>

          <div className="hero-actions">
            <Link to="/proyectos" className="nav-cta">
              Ver proyectos
              <FaArrowRight />
            </Link>

            <Link to="/contacto" className="social-btn alt-btn">
              Contactar
            </Link>
          </div>

          <div className="social-center-links">
            {Array.from({ length: 3 }).map((_, index) => (
              <span key={index} className="social-btn hero-sk-social">
                <span className="skeleton-block skeleton-icon hero-sk-social-icon" />
                <span className="skeleton-block skeleton-text-sm hero-sk-social-text" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSectionSkeleton;