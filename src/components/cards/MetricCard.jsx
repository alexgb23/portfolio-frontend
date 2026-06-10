import { FaBroadcastTower } from "react-icons/fa";

export default function MetricCard({ metric, index = 0 }) {
  if (!metric) return null;

  const tone = index % 3;

  return (
    <article className={`card card-hover card-metric tone-${tone}`}>
      <div className="metric-card-inner">
        <div className="card-top">
          <span className="card-badge">Telemetría IoT</span>
          <span className="date">{metric.room ?? "Ubicación N/D"}</span>
        </div>

        <div className="metric-card-head">
          <div className="metric-card-icon">
            <FaBroadcastTower />
          </div>

          <div className="metric-card-title-wrap">
            <h3>{metric.parameter ?? "Sensor"}</h3>
          </div>
        </div>

        <div className="node-metrics highlight">
          <div className="metric-display">
            <span className="metric-value">{metric.value ?? "0"}</span>
            <span className="metric-unit">{metric.unit ?? ""}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
