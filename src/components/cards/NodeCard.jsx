import { FaServer, FaMicrochip, FaMemory, FaClock } from "react-icons/fa";
import "./Cards.css";

export default function ServerCard({ server, index = 0 }) {
  if (!server) return null;

  const tone = index % 3;
  const rawStatus = server.status || "unknown";
  const normalizedStatus = rawStatus.toLowerCase();
  const statusClass = `status-${normalizedStatus}`;

  const name = server.display_name || server.hostname || "Servidor";
  const role = server.role || "general";
  const os = server.os || "Sistema operativo N/D";
  const ip = server.public_ip || "N/D";
  const cpu = server.cpu_usage || "N/A";
  const ram = server.ram_usage || "N/A";
  const uptime = server.uptime || "N/A";

  return (
    <article className={`card card-hover card-server tone-${tone}`}>
      <div className="server-card-inner">
        <div className="card-top">
          <span className="card-badge">{role}</span>
          <span className="date">{server.location_name || os}</span>
        </div>

        <div className="card-head">
          <div className="card-icon">
            <FaServer />
          </div>

          <div className="card-title-wrap">
            <h3>{name}</h3>
          </div>
        </div>

        <div className="server-panel">
          <div className="server-meta-row">
            <span>IP:</span>
            <code className="server-code">{ip}</code>
          </div>

          <div className="server-meta-row">
            <span>Sistema:</span>
            <span>{os}</span>
          </div>

          <div className="server-stats">
            <span className="server-stat-chip">
              <FaMicrochip />
              CPU {cpu}
            </span>

            <span className="server-stat-chip">
              <FaMemory />
              RAM {ram}
            </span>
          </div>

          <div
            className="server-meta-row"
            style={{ marginTop: "8px", fontSize: "0.85rem", opacity: 0.8 }}
          >
            <FaClock style={{ marginRight: "5px", verticalAlign: "middle" }} />
            <span>Uptime: {uptime}</span>
          </div>
        </div>

        <span className={`status ${statusClass}`}>{rawStatus}</span>
      </div>
    </article>
  );
}
