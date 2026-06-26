import NodeCard from "../../components/cards/NodeCard";
import { useLaboratoryHome } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";
import { FaMicrochip, FaSlidersH, FaBroadcastTower } from "react-icons/fa";
import "./Automation.css";

function Automation() {
  usePageTitle("Automatización e IoT | Alexander Galvez");

  const { nodes = [], loading, error } = useLaboratoryHome();
  const hasNodes = Array.isArray(nodes) && nodes.length > 0;

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

      <h2 className="sr-only">Resumen de automatización</h2>

      <div className="expertise-grid automation-intro-grid">
        <article className="expertise-card card-hover tone-1">
          <div className="card-head">
            <div className="expertise-icon">
              <FaMicrochip />
            </div>
            <div className="card-title-wrap">
              <h3>Integración hardware</h3>
            </div>
          </div>
          <p>
            Uso de nodos, placas y controladores para resolver necesidades
            concretas en automatización e inmótica.
          </p>
        </article>

        <article className="expertise-card card-hover tone-2">
          <div className="card-head">
            <div className="expertise-icon">
              <FaSlidersH />
            </div>
            <div className="card-title-wrap">
              <h3>Control operativo</h3>
            </div>
          </div>
          <p>
            Diseño de flujos funcionales para activar, leer, supervisar y
            mantener procesos automatizados.
          </p>
        </article>

        <article className="expertise-card card-hover tone-0">
          <div className="card-head">
            <div className="expertise-icon">
              <FaBroadcastTower />
            </div>
            <div className="card-title-wrap">
              <h3>Comunicación y datos</h3>
            </div>
          </div>
          <p>
            Enlace entre sensores, red, paneles y servicios para dar contexto
            real a cada automatismo.
          </p>
        </article>
      </div>

      <h2 className="sr-only">Nodos desplegados</h2>

      <div className="automation-band automation-page-band">
        <div className="mini-head">
          <h3>
            <FaMicrochip /> Nodos desplegados
          </h3>
        </div>

        <div className="automation-band-body">
          {hasNodes ? (
            <div className="list-linear">
              {nodes.map((node, index) => (
                <NodeCard
                  key={
                    node.id ?? `${node.node_name || node.nombre_nodo}-${index}`
                  }
                  node={node}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="empty-inline-state compact">
              <p>No hay nodos cargados actualmente.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Automation;
