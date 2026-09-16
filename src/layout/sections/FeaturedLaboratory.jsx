import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

import FeaturedLaboratoryCard from "../../components/cards/FeaturedLaboratoryCard";

function FeaturedLaboratory({
  item = null,
  loading = false,
  isRefreshing = false,
  isRetrying = false,
  error = "",
}) {
  const laboratoryUrl = "/laboratorio";
  const hasLaboratory = Boolean(item);

  /*
   * Render arrancando no equivale a error.
   * Si el laboratorio ya se obtuvo antes desde caché, se conserva visible
   * mientras llegan los datos actualizados.
   */
  const isConnecting = Boolean(isRetrying || (loading && !hasLaboratory));

  return (
    <section
      className="section section-spaced section-separated"
      id="laboratorio"
    >
      <div className="section-head-centered">
        <span className="section-kicker">Laboratorio</span>

        <h2>Laboratorio destacado</h2>

        <p>
          Arquitectura backend, documentación técnica y evolución real del
          sistema dentro del portfolio.
        </p>
      </div>

      {hasLaboratory ? (
        <>
          {isRefreshing || isRetrying ? (
            <div className="section-inline-status" aria-live="polite">
              <p>
                {isRetrying
                  ? "Conectando con el servidor para actualizar el laboratorio..."
                  : "Actualizando laboratorio..."}
              </p>
            </div>
          ) : null}

          <div className="featured-laboratory-card-wrap">
            <FeaturedLaboratoryCard item={item} />
          </div>
        </>
      ) : isConnecting ? (
        <div className="empty-inline-state" aria-live="polite">
          <p>
            Conectando con el servidor. El laboratorio destacado aparecerá en
            breve.
          </p>
        </div>
      ) : error ? (
        <div className="empty-inline-state" role="alert">
          <p>
            No se pudo cargar el resumen del laboratorio en este momento.
            Inténtalo de nuevo más tarde.
          </p>
        </div>
      ) : (
        <div className="empty-inline-state">
          <p>
            El laboratorio destacado aún no está disponible, pero la sección
            está preparada para mostrarlo cuando llegue.
          </p>
        </div>
      )}

      <div className="section-more">
        <Link to={laboratoryUrl} className="inline-link">
          <span>Explorar laboratorio completo</span>
          <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedLaboratory;
