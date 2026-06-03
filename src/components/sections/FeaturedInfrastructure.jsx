import { Link } from "react-router-dom";
import { FaArrowRight, FaServer, FaChartLine } from "react-icons/fa";
import ServerCard from "../cards/ServerCard";
import MetricCard from "../cards/MetricCard";
import "./sectionsGlobals.css";

function FeaturedInfrastructure({ servers = [], metrics = [] }) {
  return (
    <section
      className="section section-spaced section-separated"
      id="infraestructura"
    >
      <div className="section-head-centered">
        <span className="section-kicker">Infraestructura</span>
        <h2>Servidores, servicios y telemetría</h2>
        <p>
          Estado operativo de entornos, servicios técnicos y supervisión de
          métricas en tiempo real.
        </p>
      </div>

      <div className="infra-preview-grid">
        <div className="infra-block">
          <div className="mini-head">
            <h3>
              <FaServer /> Servidores destacados
            </h3>
          </div>

          <div className="list-linear">
            {servers.length > 0 ? (
              servers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))
            ) : (
              <p className="mini-empty">No hay servidores cargados.</p>
            )}
          </div>
        </div>

        <div className="infra-block">
          <div className="mini-head">
            <h3>
              <FaChartLine /> Métricas clave
            </h3>
          </div>

          <div className="grid-telemetry">
            {metrics.length > 0 ? (
              metrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))
            ) : (
              <p className="mini-empty">No hay métricas cargadas.</p>
            )}
          </div>
        </div>
      </div>

      <div className="section-more">
        <Link to="/infraestructura" className="inline-link">
          Ver infraestructura completa <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedInfrastructure;
