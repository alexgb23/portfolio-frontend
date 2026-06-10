import { FaNetworkWired, FaWaveSquare } from "react-icons/fa";

export default function NodeCard({ node, index = 0 }) {
  if (!node) return null;

  const tone = index % 3;
  const rawStatus = node.status || "ONLINE";
  const normalizedStatus = rawStatus.toLowerCase();
  const statusClass = `status-${normalizedStatus}`;

  const name = node.node_name || node.nombre_nodo || "Nodo Anónimo";
  const type = node.type || node.tipo || "General";
  const value = node.current_value || node.valor_actual || "Sin Telemetría";

  return (
    <article className={`card card-hover card-node tone-${tone}`}>
      <div className="node-card-inner">
        <div className="card-top">
          <span className="card-badge">Infraestructura</span>
          <span className="date">{type}</span>
        </div>

        <div className="card-head">
          <div className="card-icon">
            <FaNetworkWired />
          </div>

          <div className="card-title-wrap">
            <h3>{name}</h3>
          </div>
        </div>

        <div className="server-panel">
          <div className="server-meta-row">
            <span>Estado:</span>
            <span className={`status ${statusClass}`}>{rawStatus}</span>
          </div>

          <div className="server-stats">
            <span className="server-stat-chip">
              <FaWaveSquare />
              {value}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
