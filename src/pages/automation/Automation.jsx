import NodeCard from "../../components/cards/NodeCard";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { FaMicrochip, FaSlidersH, FaBroadcastTower } from "react-icons/fa";
import "./Automation.css";

function Automation() {
  const { nodes, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="state-wrapper centered">
        <div className="sys-loader"></div>
        <h2>Cargando automatización...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-wrapper error centered">
        <h2>Error al cargar nodos</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="section section-spaced">
      <div className="section-head-centered">
        <span className="section-kicker">Automatización</span>
        <h1>Nodos, sensores y controladores</h1>
        <p>
          Sistemas de control, lectura de sensores, lógica de automatización e
          integración entre hardware, red y supervisión.
        </p>
      </div>

      <div className="expertise-grid" style={{ marginBottom: "2rem" }}>
        <article className="expertise-card">
          <div className="expertise-icon">
            <FaMicrochip />
          </div>
          <h3>Integración hardware</h3>
          <p>
            Uso de nodos, placas y controladores para resolver necesidades
            concretas en automatización e inmótica.
          </p>
        </article>

        <article className="expertise-card">
          <div className="expertise-icon">
            <FaSlidersH />
          </div>
          <h3>Control operativo</h3>
          <p>
            Diseño de flujos funcionales para activar, leer, supervisar y
            mantener procesos automatizados.
          </p>
        </article>

        <article className="expertise-card">
          <div className="expertise-icon">
            <FaBroadcastTower />
          </div>
          <h3>Comunicación y datos</h3>
          <p>
            Enlace entre sensores, red, paneles y servicios para dar contexto
            real a cada automatismo.
          </p>
        </article>
      </div>

      <div className="list-linear">
        {nodes?.length > 0 ? (
          nodes.map((node, index) => (
            <NodeCard key={node.id} node={node} index={index} />
          ))
        ) : (
          <div className="empty-inline-state">
            <p>No hay nodos cargados actualmente.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Automation;
