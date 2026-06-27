import { FaBroadcastTower } from "react-icons/fa";

import "./Cards.css";

export default function MetricCard({ metric, index = 0 }) {
  if (!metric) return null;

  const tone = index % 3;
  const room = metric.room || "Ubicación N/D";
  const title = metric.display_name || metric.parameter || "Sensor";
  const value = metric.value ?? "0";
  const unit = metric.unit ?? "";

  return (
    <article className={`card card-hover card-metric tone-${tone}`}>
      <div className="metric-card-inner">
        <div className="card-top">
          <span className="card-badge">{metric.category || "Telemetría"}</span>
          <span className="date">{room}</span>
        </div>

        <div className="card-head">
          <div className="card-icon">
            <FaBroadcastTower />
          </div>

          <div className="card-title-wrap">
            <h3>{title}</h3>
          </div>
        </div>

        <div className="metric-display">
          <span className="metric-value">{value}</span>
          <span className="metric-unit">{unit}</span>
        </div>
      </div>
    </article>
  );
}
