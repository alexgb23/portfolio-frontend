import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaServer,
  FaChartLine,
  FaMicrochip,
  FaNetworkWired,
} from "react-icons/fa";

import "./sectionsGlobals.css";

function FeaturedLaboratory({
  servers = [],
  metrics = [],
  nodes = [],
  loading = false,
}) {
  return (
    <section
      className="section section-spaced section-separated"
      id="laboratorio"
    >
      <div className="section-head-centered">
        <span className="section-kicker">Laboratorio</span>

        <h2>Infraestructura, automatización y sistemas conectados</h2>

        <p>
          Entorno técnico donde desarrollo, pruebo y monitorizo soluciones
          combinando servidores, redes, hardware y software.
        </p>
      </div>

      <div className="expertise-grid">
        <article className="expertise-card card-hover tone-1">
          <div className="card-head">
            <div className="expertise-icon">
              <FaServer />
            </div>

            <div className="card-title-wrap">
              <h3>Infraestructura IT</h3>
            </div>
          </div>

          <p>
            Servidores, virtualización y servicios desplegados en entornos
            técnicos reales.
          </p>

          <div className="laboratory-counter">
            <strong>{loading ? "..." : servers.length}</strong>

            <span>servidores</span>
          </div>
        </article>

        <article className="expertise-card card-hover tone-2">
          <div className="card-head">
            <div className="expertise-icon">
              <FaChartLine />
            </div>

            <div className="card-title-wrap">
              <h3>Monitorización</h3>
            </div>
          </div>

          <p>
            Supervisión del estado de sistemas, recursos y comportamiento
            operativo.
          </p>

          <div className="laboratory-counter">
            <strong>{loading ? "..." : metrics.length}</strong>

            <span>métricas</span>
          </div>
        </article>

        <article className="expertise-card card-hover tone-0">
          <div className="card-head">
            <div className="expertise-icon">
              <FaMicrochip />
            </div>

            <div className="card-title-wrap">
              <h3>Automatización IoT</h3>
            </div>
          </div>

          <p>
            Nodos, sensores y controladores integrados para crear sistemas
            inteligentes.
          </p>

          <div className="laboratory-counter">
            <strong>{loading ? "..." : nodes.length}</strong>

            <span>nodos</span>
          </div>
        </article>
      </div>

      <div className="section-more">
        <Link to="/laboratorio" className="inline-link">
          <span>Explorar laboratorio completo</span>

          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedLaboratory;
