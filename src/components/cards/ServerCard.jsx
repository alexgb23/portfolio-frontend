export default function ServerCard({ server }) {
  if (!server) return null;

  return (
    <article
      className="card card-row-system card-hover"
      style={{ borderLeft: "2px solid var(--color-blue)" }}
    >
      <div className="system-title-group">
        <h3>{server.hostname ?? "vps-server"}</h3>
        <div className="system-meta-desc">{server.os ?? "Linux OS"}</div>
      </div>
      <div className="system-data-metrics">
        <span>IP:</span>{" "}
        <code style={{ color: "var(--color-cyan)" }}>
          {server.public_ip ?? "0.0.0.0"}
        </code>
      </div>
      <div className="system-data-metrics">
        <span>Carga:</span> <strong>CPU {server.cpu_usage ?? "0%"}</strong> |{" "}
        <span>RAM</span> <strong>{server.ram_usage ?? "0MB"}</strong>
      </div>
      <span className="status status-ok">ACTIVE</span>
    </article>
  );
}
