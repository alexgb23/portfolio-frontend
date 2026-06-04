export default function MetricCard({ metric }) {
  if (!metric) return null;

  return (
    <article className="card card-metric">
      <div className="card-top">
        <span className="card-badge">Telemetría IoT</span>
        <span className="date">{metric.room ?? "Ubicación N/D"}</span>
      </div>
      <h3>{metric.parameter ?? "Sensor"}</h3>
      <div className="node-metrics highlight">
        <div className="metric-display">
          <span className="metric-value">{metric.value ?? "0"}</span>
          <span className="metric-unit">{metric.unit ?? ""}</span>
        </div>
      </div>
    </article>
  );
}
