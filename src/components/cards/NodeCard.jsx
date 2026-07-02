import {
  FaMicrochip,
  FaMapMarkerAlt,
  FaNetworkWired,
  FaBroadcastTower,
  FaInfoCircle,
  FaClock,
} from "react-icons/fa";
import "./Cards.css";

export default function NodeCard({ node, index = 0 }) {
  if (!node) return null;

  const tone = index % 3;
  const rawStatus = node.status || "unknown";
  const normalizedStatus = rawStatus.toLowerCase();
  const statusClass = `status-${normalizedStatus}`;

  const name = node.node_name || "Nodo";
  const location = node.location_name || "Ubicación N/D";
  const type = node.type || "general";
  const source = node.source_system || "N/D";
  const protocol = node.protocol || "N/D";
  const currentValue = node.current_value || "Sin lectura";
  const unit = node.unit || "";
  const ip = node.ip_address || "N/D";
  const notes = node.notes || "Sin descripción";
  const lastSeen = node.last_seen_at
    ? new Date(node.last_seen_at).toLocaleString("es-ES")
    : "N/D";

  return (
    <article className={`card card-hover card-node tone-${tone}`}>
      <div className="node-card-inner">
        <div className="card-top">
          <span className="card-badge">{type}</span>
          <span className="date">{location}</span>
        </div>

        <div className="card-head">
          <div className="card-icon">
            <FaMicrochip />
          </div>

          <div className="card-title-wrap">
            <h3>{name}</h3>
          </div>
        </div>

        <div className="server-panel">
          <div className="server-meta-row">
            <span>
              <FaMapMarkerAlt style={{ marginRight: "6px" }} />
              Ubicación:
            </span>
            <span>{location}</span>
          </div>

          <div className="server-meta-row">
            <span>
              <FaBroadcastTower style={{ marginRight: "6px" }} />
              Protocolo:
            </span>
            <span>{protocol}</span>
          </div>

          <div className="server-meta-row">
            <span>
              <FaNetworkWired style={{ marginRight: "6px" }} />
              Sistema:
            </span>
            <span>{source}</span>
          </div>

          <div className="server-meta-row">
            <span>IP:</span>
            <code className="server-code">{ip}</code>
          </div>

          <div className="metric-display" style={{ marginTop: "12px" }}>
            <span className="metric-value">{currentValue}</span>
            {unit && <span className="metric-unit">{unit}</span>}
          </div>

          <div
            className="server-meta-row"
            style={{ marginTop: "10px", fontSize: "0.9rem", opacity: 0.85 }}
          >
            <FaClock style={{ marginRight: "5px", verticalAlign: "middle" }} />
            <span>Última lectura: {lastSeen}</span>
          </div>

          <div
            className="server-meta-row"
            style={{ marginTop: "10px", alignItems: "flex-start" }}
          >
            <span>
              <FaInfoCircle style={{ marginRight: "6px" }} />
              Notas:
            </span>
            <span>{notes}</span>
          </div>
        </div>

        <span className={`status ${statusClass}`}>{rawStatus}</span>
      </div>
    </article>
  );
}
