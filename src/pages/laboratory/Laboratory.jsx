import { Link } from "react-router-dom";
import {
  FaServer,
  FaMicrochip,
  FaArrowRight,
  FaChartLine,
  FaNetworkWired,
  FaHome,
  FaBrain,
  FaDatabase,
  FaSearch,
} from "react-icons/fa";

import ServerCard from "../../components/cards/ServerCard";
import MetricCard from "../../components/cards/MetricCard";
import NodeCard from "../../components/cards/NodeCard";
import { useInfrastructureData, useNodes } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";
import "./Laboratory.css";

function Laboratory() {
  usePageTitle("Laboratorio Técnico | Alexander Galvez");

  const {
    servers = [],
    metrics = [],
    loading: infraLoading,
    error: infraError,
  } = useInfrastructureData();

  const { nodes = [], loading: nodesLoading, error: nodesError } = useNodes();

  const loading = infraLoading || nodesLoading;
  const error = infraError || nodesError;

  const previewServers = Array.isArray(servers) ? servers.slice(0, 3) : [];
  const previewMetrics = Array.isArray(metrics) ? metrics.slice(0, 4) : [];
  const previewNodes = Array.isArray(nodes) ? nodes.slice(0, 3) : [];

  if (loading) {
    return (
      <div className="state-wrapper centered">
        <div className="sys-loader"></div>
        <h2>Cargando laboratorio...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-wrapper error centered">
        <h2>Error al cargar el laboratorio</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="section section-spaced laboratory-page">
      <header className="section-head-centered laboratory-hero">
        <span className="section-kicker">Laboratorio técnico</span>
        <h1>Entorno vivo de sistemas, automatización y experimentación</h1>
        <p>
          Espacio donde documento infraestructura, automatizaciones reales en
          casa, pruebas con IA local y futuros sistemas de análisis conectados a
          APIs y paneles de observación.
        </p>
      </header>

      <section
        className="laboratory-overview"
        aria-label="Resumen del laboratorio"
      >
        <article className="lab-overview-card">
          <div className="lab-overview-icon">
            <FaServer />
          </div>
          <div>
            <h2>Infraestructura</h2>
            <p>Servicios, virtualización, red y telemetría del entorno.</p>
          </div>
        </article>

        <article className="lab-overview-card">
          <div className="lab-overview-icon">
            <FaMicrochip />
          </div>
          <div>
            <h2>Automatización</h2>
            <p>Nodos, sensores y lógica operativa conectada.</p>
          </div>
        </article>

        <article className="lab-overview-card">
          <div className="lab-overview-icon">
            <FaHome />
          </div>
          <div>
            <h2>Home Assistant</h2>
            <p>Domótica doméstica, integraciones y observación del hogar.</p>
          </div>
        </article>

        <article className="lab-overview-card">
          <div className="lab-overview-icon">
            <FaBrain />
          </div>
          <div>
            <h2>IA local</h2>
            <p>Modelos, pruebas aplicadas y flujos experimentales.</p>
          </div>
        </article>
      </section>

      <section className="lab-section">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label">Infraestructura</span>
            <h2>Servidores, servicios y lectura operativa</h2>
            <p>
              Base técnica del laboratorio donde organizo despliegues,
              conectividad, disponibilidad y observación del estado del sistema.
            </p>
          </div>
        </div>

        <div className="lab-feature-grid">
          <div className="lab-panel">
            <div className="lab-panel-head">
              <h3>
                <FaServer /> Servidores destacados
              </h3>
            </div>

            <div className="lab-panel-body">
              {previewServers.length > 0 ? (
                <div className="list-linear lab-list">
                  {previewServers.map((server, index) => (
                    <ServerCard
                      key={`lab-srv-${server.id || index}`}
                      server={server}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-inline-state compact">
                  <p>No hay servidores cargados actualmente.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lab-panel">
            <div className="lab-panel-head">
              <h3>
                <FaChartLine /> Métricas destacadas
              </h3>
            </div>

            <div className="lab-panel-body">
              {previewMetrics.length > 0 ? (
                <div className="grid-telemetry lab-metrics">
                  {previewMetrics.map((metric, index) => (
                    <MetricCard
                      key={`lab-met-${metric.id || index}`}
                      metric={metric}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-inline-state compact">
                  <p>No hay métricas cargadas actualmente.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lab-actions">
          <Link to="/infraestructura" className="inline-link">
            Ver infraestructura completa
            <FaArrowRight />
          </Link>
        </div>
      </section>

      <section className="lab-section lab-section-divider">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label">Automatización</span>
            <h2>Nodos, controladores y lógica conectada</h2>
            <p>
              Área orientada a integración hardware, red y software para pruebas
              funcionales, lectura de señales y automatismos técnicos.
            </p>
          </div>
        </div>

        <div className="lab-panel">
          <div className="lab-panel-head">
            <h3>
              <FaMicrochip /> Nodos desplegados
            </h3>
          </div>

          <div className="lab-panel-body">
            {previewNodes.length > 0 ? (
              <div className="list-linear lab-list">
                {previewNodes.map((node, index) => (
                  <NodeCard
                    key={
                      node.id ??
                      `${node.node_name || node.nombre_nodo}-${index}`
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

        <div className="lab-actions">
          <Link to="/automatizacion" className="inline-link">
            Ver automatización completa
            <FaArrowRight />
          </Link>
        </div>
      </section>

      <section className="lab-section lab-section-divider">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label">Home Assistant</span>
            <h2>Domótica real desplegada en casa</h2>
            <p>
              Entorno doméstico donde centralizo automatizaciones, estados,
              dispositivos y escenas para experimentar con control y
              observabilidad del hogar.
            </p>
          </div>
        </div>

        <div className="lab-story-grid">
          <article className="lab-story-card">
            <div className="lab-story-head">
              <div className="lab-float-icon">
                <FaHome />
              </div>
              <div>
                <h3>Estado del sistema</h3>
                <p>
                  Vista pensada para mostrar instancia, uptime, integraciones y
                  automatizaciones activas.
                </p>
              </div>
            </div>

            <div className="lab-chip-row">
              <span>Instancia: —</span>
              <span>Integraciones: —</span>
              <span>Automatizaciones: —</span>
              <span>Dispositivos: —</span>
            </div>
          </article>

          <article className="lab-story-card">
            <div className="lab-story-head">
              <div className="lab-float-icon alt">
                <FaNetworkWired />
              </div>
              <div>
                <h3>Casos de uso en casa</h3>
                <p>
                  Escenas, sensores, consumos y eventos conectados a futuras
                  integraciones y APIs.
                </p>
              </div>
            </div>

            <div className="lab-chip-row">
              <span>Escenas: —</span>
              <span>Sensores: —</span>
              <span>Zonas: —</span>
              <span>Eventos: —</span>
            </div>
          </article>
        </div>
      </section>

      <section className="lab-section lab-section-divider">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label">IA local</span>
            <h2>Experimentos con modelos corriendo en local</h2>
            <p>
              Zona enfocada en instalar, comparar y evaluar soluciones de IA
              local para automatización, productividad y análisis aplicado.
            </p>
          </div>
        </div>

        <div className="lab-column-cards">
          <article className="lab-data-card">
            <div className="lab-data-icon">
              <FaBrain />
            </div>
            <h3>Banco de pruebas</h3>
            <p>
              Espacio reservado para modelos, runtimes, tiempos de respuesta,
              uso de recursos y calidad de resultados.
            </p>
            <ul className="lab-data-list" role="list">
              <li>Modelo: —</li>
              <li>Runtime: —</li>
              <li>VRAM/RAM: —</li>
              <li>Estado: —</li>
            </ul>
          </article>

          <article className="lab-data-card">
            <div className="lab-data-icon">
              <FaDatabase />
            </div>
            <h3>Casos de estudio</h3>
            <p>
              Preparado para documentar clasificación, síntesis, extracción de
              señales y apoyo a investigación técnica o comercial.
            </p>
            <ul className="lab-data-list" role="list">
              <li>Clasificación: —</li>
              <li>Resúmenes: —</li>
              <li>Extracción: —</li>
              <li>Comparativas: —</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="lab-section lab-section-divider">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label">Research lab</span>
            <h2>Análisis experimental y estudio de mercado</h2>
            <p>
              Área en evolución para conectar fuentes externas, procesar datos,
              crear comparativas y estudiar señales útiles con apoyo de IA y
              APIs.
            </p>
          </div>
        </div>

        <div className="lab-research-grid">
          <article className="lab-research-card">
            <div className="lab-research-head">
              <div className="lab-float-icon research">
                <FaSearch />
              </div>
              <h3>Observación de mercado</h3>
            </div>
            <p>
              Preparado para incorporar datasets, fuentes externas, paneles y
              resultados de análisis todavía en construcción.
            </p>
            <div className="lab-chip-row">
              <span>Fuente A: —</span>
              <span>Fuente B: —</span>
              <span>Panel: —</span>
              <span>Insight: —</span>
            </div>
          </article>

          <article className="lab-research-card">
            <div className="lab-research-head">
              <div className="lab-float-icon research alt">
                <FaChartLine />
              </div>
              <h3>Métricas futuras</h3>
            </div>
            <p>
              Espacio reservado para indicadores, tendencias, scoring, alertas y
              comparativas servidas desde la API.
            </p>
            <div className="lab-chip-row">
              <span>Tendencia: —</span>
              <span>Score: —</span>
              <span>Alertas: —</span>
              <span>Estado API: —</span>
            </div>
          </article>
        </div>
      </section>

      <section className="lab-section lab-section-divider">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label">Capacidades</span>
            <h2>Líneas activas y áreas en evolución</h2>
            <p>
              Este laboratorio une infraestructura, domótica, redes,
              automatización e investigación aplicada dentro de un mismo
              ecosistema técnico.
            </p>
          </div>
        </div>

        <div className="lab-capabilities">
          <span className="lab-tag">Virtualización</span>
          <span className="lab-tag">Servicios self-hosted</span>
          <span className="lab-tag">Telemetría</span>
          <span className="lab-tag">Home Assistant</span>
          <span className="lab-tag">IoT</span>
          <span className="lab-tag">Automatización</span>
          <span className="lab-tag">IA local</span>
          <span className="lab-tag">APIs</span>
          <span className="lab-tag">Análisis experimental</span>
          <span className="lab-tag">Market research</span>
        </div>
      </section>
    </section>
  );
}

export default Laboratory;
