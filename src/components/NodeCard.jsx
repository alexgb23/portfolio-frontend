export default function NodeCard({ node }) {
  if (!node) return null
  const statusClass = `status-${node.status?.toLowerCase() || 'ok'}`
  const name = node.node_name || node.nombre_nodo || 'Nodo Anónimo'
  const type = node.type || node.tipo || 'General'
  const value = node.current_value || node.valor_actual || 'Sin Telemetría'

  return (
    <article className="card card-row-system">
      <div className="system-title-group">
        <h3>{name}</h3>
        <div className="system-meta-desc">{type}</div>
      </div>
      <div className="system-data-metrics">
        <span>Status:</span> <strong className="status status-ok">{node.status || 'ONLINE'}</strong>
      </div>
      <div className="system-data-metrics">
        <span>Telemetría:</span> <strong>{value}</strong>
      </div>
      <span className={`status ${statusClass}`}>{node.status || 'OK'}</span>
    </article>
  )
}
