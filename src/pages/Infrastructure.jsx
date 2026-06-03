import ServerCard from "../components/cards/ServerCard";
import MetricCard from "../components/cards/MetricCard";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { FaServer, FaChartLine, FaNetworkWired } from "react-icons/fa";

function Infrastructure() {
  const { servers, metrics, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="state-wrapper centered">
        <div className="sys-loader"></div>
        <h2>Cargando infraestructura...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-wrapper error centered">
        <h2>Error al cargar infraestructura</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="section section-spaced">
      <div className="section-head-centered">
        <span className="section-kicker">Infraestructura</span>
        <h1>Servidores, servicios y telemetría</h1>
        <p>
          Entornos técnicos con foco en disponibilidad, organización, despliegue
          de servicios y lectura operativa de métricas.
        </p>
      </div>

      <div className="expertise-grid" style={{ marginBottom: "2rem" }}>
        <article className="expertise-card">
          <div className="expertise-icon">
            <FaServer />
          </div>
          <h3>Servicios desplegados</h3>
          <p>
            Máquinas, servicios y laboratorios técnicos preparados para pruebas,
            integración y operación real.
          </p>
        </article>

        <article className="expertise-card">
          <div className="expertise-icon">
            <FaNetworkWired />
          </div>
          <h3>Conectividad y estructura</h3>
          <p>
            La red y la organización del entorno forman parte del diseño
            técnico, no un añadido posterior.
          </p>
        </article>

        <article className="expertise-card">
          <div className="expertise-icon">
            <FaChartLine />
          </div>
          <h3>Monitorización</h3>
          <p>
            Supervisión de estado, recursos y comportamiento para detectar y
            anticipar incidencias.
          </p>
        </article>
      </div>

      <div className="section-head-centered narrow">
        <h2>Servidores</h2>
        <p>Listado operativo de entornos y servicios principales.</p>
      </div>

      <div className="list-linear" style={{ marginBottom: "2rem" }}>
        {servers?.length > 0 ? (
          servers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))
        ) : (
          <div className="empty-inline-state">
            <p>No hay servidores cargados actualmente.</p>
          </div>
        )}
      </div>

      <div className="section-head-centered narrow">
        <h2>Métricas</h2>
        <p>Lecturas clave para supervisión técnica y estado operativo.</p>
      </div>

      <div className="grid-telemetry">
        {metrics?.length > 0 ? (
          metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))
        ) : (
          <div className="empty-inline-state">
            <p>No hay métricas cargadas actualmente.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Infrastructure;
