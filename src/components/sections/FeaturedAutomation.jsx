import { Link } from "react-router-dom";
import { FaArrowRight, FaMicrochip } from "react-icons/fa";
import NodeCard from "../cards/NodeCard";
import "./sectionsGlobals.css";

function FeaturedAutomation({ nodes = [] }) {
  const hasNodes = nodes.length > 0;

  return (
    <section
      className="section section-spaced section-separated"
      id="automatizacion"
    >
      <div className="section-head-centered">
        <span className="section-kicker">Automatización</span>
        <h2>Nodos y controladores</h2>
        <p>
          Dispositivos, automatismos y puntos de control integrados en flujos
          funcionales y escenarios reales.
        </p>
      </div>

      <div className="automation-band">
        <div className="mini-head">
          <h3>
            <FaMicrochip /> Nodos destacados
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
              <p>No hay nodos cargados.</p>
            </div>
          )}
        </div>
      </div>

      <div className="section-more">
        <Link to="/automatizacion" className="inline-link">
          <span>Ver automatización completa</span>
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedAutomation;
