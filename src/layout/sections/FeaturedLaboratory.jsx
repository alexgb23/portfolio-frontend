import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import FeaturedLaboratoryCard from "../../components/cards/FeaturedLaboratoryCard";

function FeaturedLaboratory({
  item = null,
  loading = false,
  isRefreshing = false,
  error = "",
}) {
  const laboratoryUrl = "/laboratorio";

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

      {item ? (
        <>
          {isRefreshing ? (
            <div className="section-inline-status">
              <p>Actualizando laboratorio...</p>
            </div>
          ) : null}

          <div className="featured-laboratory-card-wrap">
            <FeaturedLaboratoryCard item={item} />
          </div>
        </>
      ) : loading ? (
        <div className="empty-inline-state">
          <p>Cargando laboratorio destacado...</p>
        </div>
      ) : error ? (
        <div className="empty-inline-state">
          <p>No se pudo cargar el resumen del laboratorio en este momento.</p>
        </div>
      ) : (
        <div className="empty-inline-state">
          <p>
            El laboratorio destacado aún no está disponible, pero la sección ya
            está preparada para mostrarlo cuando llegue.
          </p>
        </div>
      )}

      <div className="section-more">
        <Link to={laboratoryUrl} className="inline-link">
          <span>Explorar laboratorio completo</span>
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedLaboratory;
