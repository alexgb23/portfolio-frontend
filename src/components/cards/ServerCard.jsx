import { FaServer, FaMicrochip, FaMemory, FaClock } from "react-icons/fa";

export default function ServerCard({ server, index = 0 }) {
  if (!server) return null;

  const tone = index % 3;

  // 🟢 SOLUCIÓN: Validamos dinámicamente según el uptime si la API no manda status
  const hasUptime = server.uptime && server.uptime !== "0%";
  const status = hasUptime ? "ACTIVE" : "DOWN";
  const statusClass = hasUptime ? "status-ok" : "status-down";

  return (
    <article className={`card card-hover card-server tone-${tone}`}>
      <div className="server-card-inner">
        <div className="card-top">
          <span className="card-badge">Infraestructura</span>
          <span className="date">{server.os ?? "Linux OS"}</span>
        </div>

        <div className="card-head">
          <div className="card-icon">
            <FaServer />
          </div>

          <div className="card-title-wrap">
            <h3>{server.hostname ?? "vps-server"}</h3>
          </div>
        </div>

        <div className="server-panel">
          <div className="server-meta-row">
            <span>IP:</span>
            <code className="server-code">{server.public_ip ?? "0.0.0.0"}</code>
          </div>

          <div className="server-stats">
            <span className="server-stat-chip">
              <FaMicrochip />
              CPU {server.cpu_usage ?? "0%"}
            </span>

            <span className="server-stat-chip">
              <FaMemory />
              RAM {server.ram_usage ?? "0MB"}
            </span>
          </div>

          {/* 🟢 NUEVO: Añadimos el Uptime real que viene de tu API */}
          <div
            className="server-meta-row"
            style={{ marginTop: "8px", fontSize: "0.85rem", opacity: 0.8 }}
          >
            <FaClock style={{ marginRight: "5px", verticalAlign: "middle" }} />
            <span>Uptime: {server.uptime ?? "N/A"}</span>
          </div>
        </div>

        <span className={`status ${statusClass}`}>{status}</span>
      </div>
    </article>
  );
}
