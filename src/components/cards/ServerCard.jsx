import { FaServer } from "react-icons/fa";

export default function ServerCard({ server, index = 0 }) {
  if (!server) return null;

  const tone = index % 3;

  return (
    <article className={`card card-hover card-server tone-${tone}`}>
      <div className="server-card-inner">
        <div className="card-top">
          <span className="card-badge">Infraestructura</span>
          <span className="date">{server.os ?? "Linux OS"}</span>
        </div>

        <div className="server-card-head">
          <div className="server-card-icon">
            <FaServer />
          </div>

          <div className="server-card-title-wrap">
            <h3>{server.hostname ?? "vps-server"}</h3>
          </div>
        </div>

        <div className="system-data-metrics">
          <span>IP:</span>{" "}
          <code className="server-code">{server.public_ip ?? "0.0.0.0"}</code>
        </div>

        <div className="system-data-metrics">
          <span>Carga:</span> <strong>CPU {server.cpu_usage ?? "0%"}</strong> |{" "}
          <span>RAM</span> <strong>{server.ram_usage ?? "0MB"}</strong>
        </div>

        <span className="status status-ok">ACTIVE</span>
      </div>
    </article>
  );
}
