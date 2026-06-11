import { Link } from "react-router-dom";
import { FaArrowRight, FaServer, FaChartLine } from "react-icons/fa";
import ServerCard from "../cards/ServerCard";
import MetricCard from "../cards/MetricCard";
import "./sectionsGlobals.css";

function FeaturedInfrastructure({
  servers = [],
  metrics = [],
  loading = false,
}) {
  const hasServers = servers.length > 0;
  const hasMetrics = metrics.length > 0;

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

          <div className="infra-block-body">
            {loading ? (
              <div className="list-linear">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    className="server-skeleton-card"
                    key={`server-skeleton-${index}`}
                  >
                    <div className="sk sk-badge"></div>
                    <div className="sk sk-title"></div>
                    <div className="sk sk-text"></div>
                    <div className="sk sk-row">
                      <span className="sk sk-chip"></span>
                      <span className="sk sk-chip"></span>
                    </div>
                    <div className="sk sk-status"></div>
                  </div>
                ))}
              </div>
            ) : hasServers ? (
              <div className="list-linear">
                {servers.map((server, index) => (
                  <ServerCard
                    key={server.id ?? `${server.hostname}-${index}`}
                    server={server}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-inline-state compact">
                <p>No hay servidores cargados.</p>
              </div>
            )}
          </div>
        </div>

        <div className="infra-block">
          <div className="mini-head">
            <h3>
              <FaChartLine /> Métricas clave
            </h3>
          </div>

          <div className="infra-block-body">
            {loading ? (
              <div className="grid-telemetry">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="metric-skeleton-card"
                    key={`metric-skeleton-${index}`}
                  >
                    <div className="sk sk-metric-label"></div>
                    <div className="sk sk-metric-value"></div>
                    <div className="sk sk-metric-trend"></div>
                  </div>
                ))}
              </div>
            ) : hasMetrics ? (
              <div className="grid-telemetry">
                {metrics.map((metric, index) => (
                  <MetricCard
                    key={metric.id ?? `${metric.parameter}-${index}`}
                    metric={metric}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-inline-state compact">
                <p>No hay métricas cargadas.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="section-more">
        <Link to="/infraestructura" className="inline-link">
          <span>Ver infraestructura completa</span>
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedInfrastructure;
