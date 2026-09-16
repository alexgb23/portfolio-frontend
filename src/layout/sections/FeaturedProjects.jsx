import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

import FeaturedProjectsProjectCard from "../../components/cards/FeaturedProjectCard";

import "./FeaturedProjects.css";

function FeaturedProjects({
  projects = [],
  loading = false,
  isRefreshing = false,
  isRetrying = false,
  error = "",
}) {
  const safeProjects = Array.isArray(projects) ? projects : [];
  const visibleProjects = safeProjects.slice(0, 2);
  const hasProjects = visibleProjects.length > 0;

  /*
   * Si Render está despertando:
   * - sin datos cacheados: mostramos “conectando”, no error.
   * - con datos cacheados: mantenemos las tarjetas y mostramos actualización.
   */
  const isConnecting = Boolean(isRetrying || (loading && !hasProjects));

  return (
    <section
      className="section section-spaced section-separated"
      id="proyectos"
    >
      <div className="section-head-centered">
        <span className="section-kicker">Portfolio</span>

        <h2>Proyectos destacados</h2>

        <p>
          Aplicaciones, integraciones y herramientas técnicas orientadas a
          resultados reales.
        </p>
      </div>

      {hasProjects ? (
        <>
          {isRefreshing || isRetrying ? (
            <div className="section-inline-status" aria-live="polite">
              <p>
                {isRetrying
                  ? "Conectando con el servidor para actualizar proyectos..."
                  : "Actualizando proyectos..."}
              </p>
            </div>
          ) : null}

          <div className="expertise-grid featured-projects-grid">
            {visibleProjects.map((project, index) => (
              <FeaturedProjectsProjectCard
                key={project.id ?? project.slug ?? `${project.title}-${index}`}
                project={project}
                index={index}
                maxTags={3}
              />
            ))}
          </div>
        </>
      ) : isConnecting ? (
        <div className="empty-inline-state" aria-live="polite">
          <p>
            Conectando con el servidor. Los proyectos destacados aparecerán en
            breve.
          </p>
        </div>
      ) : error ? (
        <div className="empty-inline-state" role="alert">
          <p>
            No se pudieron cargar los proyectos destacados en este momento.
            Inténtalo de nuevo más tarde.
          </p>
        </div>
      ) : (
        <div className="empty-inline-state">
          <p>Aún no hay proyectos destacados cargados.</p>
        </div>
      )}

      <div className="section-more">
        <Link to="/proyectos" className="inline-link">
          <span>Ver todos los proyectos</span>
          <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProjects;
