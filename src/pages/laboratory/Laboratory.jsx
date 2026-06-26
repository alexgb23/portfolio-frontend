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
  FaMapMarkerAlt,
  FaLayerGroup,
  FaCircle,
} from "react-icons/fa";

import { useLaboratoryHome } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";
import "./Laboratory.css";

function getCategoryLabel(category) {
  const map = {
    automation: "Automatización",
    monitoring: "Observabilidad",
    ai: "IA local",
    research: "Research",
    virtualization: "Virtualización",
    networking: "Redes",
    backup: "Backups",
  };

  return map[category] || "Laboratorio";
}

function getStatusLabel(status) {
  const map = {
    active: "Activo",
    building: "En construcción",
    paused: "Pausado",
    draft: "Borrador",
    online: "Online",
    normal: "Normal",
    ok: "OK",
  };

  return map[status] || status || "Sin estado";
}

function LabItemCard({ item, icon }) {
  return (
    <article className="lab-story-card">
      <div className="lab-story-head">
        <div className="lab-float-icon">{icon}</div>

        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      </div>

      <div className="lab-chip-row">
        <span>
          <FaLayerGroup /> {getCategoryLabel(item.category)}
        </span>
        <span>
          <FaMapMarkerAlt /> {item.location_name || "Sin ubicación"}
        </span>
        <span>
          <FaCircle /> {getStatusLabel(item.status)}
        </span>
        <span>{item.item_type || "item"}</span>
      </div>
    </article>
  );
}

function Laboratory() {
  usePageTitle("Laboratorio Técnico | Alexander Galvez");

  const {
    summary,
    featuredItems,
    clusters,
    servers,
    nodes,
    metrics,
    homeAssistant,
    localAi,
    capabilities,
    loading,
    error,
  } = useLaboratoryHome();

  const automationItems = featuredItems.filter(
    (item) => item.category === "automation",
  );

  const infrastructureItems = featuredItems.filter((item) =>
    ["monitoring", "research", "ai"].includes(item.category),
  );

  const homeAssistantMain = homeAssistant[0] ?? null;
  const homeAssistantUseCases = Array.isArray(homeAssistantMain?.use_cases)
    ? homeAssistantMain.use_cases
    : [];

  const localAiMain = localAi[0] ?? null;
  const mainCluster = clusters[0] ?? null;
  const firstMetric = metrics[0] ?? null;
  const secondMetric = metrics[1] ?? null;

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
            <p>
              {summary?.servers_count ?? 0} servidores,{" "}
              {summary?.clusters_count ?? 0} clúster y telemetría del entorno.
            </p>
          </div>
        </article>

        <article className="lab-overview-card">
          <div className="lab-overview-icon">
            <FaMicrochip />
          </div>
          <div>
            <h2>Automatización</h2>
            <p>
              {summary?.nodes_count ?? 0} nodos y flujos conectados al entorno.
            </p>
          </div>
        </article>

        <article className="lab-overview-card">
          <div className="lab-overview-icon">
            <FaHome />
          </div>
          <div>
            <h2>Home Assistant</h2>
            <p>
              {homeAssistantMain?.description ||
                "Domótica doméstica, integraciones y observación del hogar."}
            </p>
          </div>
        </article>

        <article className="lab-overview-card">
          <div className="lab-overview-icon">
            <FaBrain />
          </div>
          <div>
            <h2>IA local</h2>
            <p>
              {localAiMain?.description ||
                "Modelos, pruebas aplicadas y flujos experimentales."}
            </p>
          </div>
        </article>
      </section>

      <section className="lab-section">
        <div className="lab-section-top">
          <div className="lab-section-intro">
            <span className="lab-label">Infraestructura</span>
            <h2>Servicios, observabilidad y plataformas del entorno</h2>
            <p>
              Base técnica del laboratorio donde organizo despliegues,
              conectividad, disponibilidad y seguimiento operativo del sistema.
            </p>
          </div>
        </div>

        <div className="lab-feature-grid">
          <div className="lab-panel">
            <div className="lab-panel-head">
              <h3>
                <FaServer /> Elementos destacados
              </h3>
            </div>

            <div className="lab-panel-body">
              {infrastructureItems.length > 0 ? (
                <div className="lab-story-grid">
                  {infrastructureItems.slice(0, 3).map((item) => (
                    <LabItemCard
                      key={item.id}
                      item={item}
                      icon={<FaServer />}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-inline-state compact">
                  <p>
                    No hay elementos de infraestructura cargados actualmente.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lab-panel">
            <div className="lab-panel-head">
              <h3>
                <FaChartLine /> Vista rápida del laboratorio
              </h3>
            </div>

            <div className="lab-panel-body">
              <div className="lab-chip-row">
                <span>Items: {summary?.featured_items_count ?? 0}</span>
                <span>Servidores: {summary?.servers_count ?? 0}</span>
                <span>Nodos: {summary?.nodes_count ?? 0}</span>
                <span>Métricas: {summary?.metrics_count ?? 0}</span>
              </div>

              {mainCluster ? (
                <div className="empty-inline-state compact">
                  <p>
                    Clúster principal: {mainCluster.name} · Estado:{" "}
                    {getStatusLabel(mainCluster.status)}
                  </p>
                </div>
              ) : null}
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
              <FaMicrochip /> Automatizaciones destacadas
            </h3>
          </div>

          <div className="lab-panel-body">
            {automationItems.length > 0 ? (
              <div className="lab-story-grid">
                {automationItems.slice(0, 3).map((item) => (
                  <LabItemCard
                    key={item.id}
                    item={item}
                    icon={<FaMicrochip />}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-inline-state compact">
                <p>No hay automatizaciones cargadas actualmente.</p>
              </div>
            )}

            {nodes.length > 0 ? (
              <div className="lab-chip-row">
                {nodes.slice(0, 4).map((node) => (
                  <span key={node.id}>
                    {node.node_name}: {node.current_value}
                  </span>
                ))}
              </div>
            ) : null}
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
                <h3>{homeAssistantMain?.name || "Estado del sistema"}</h3>
                <p>
                  {homeAssistantMain?.description ||
                    "Vista pensada para mostrar instancia, uptime, integraciones y automatizaciones activas."}
                </p>
              </div>
            </div>

            <div className="lab-chip-row">
              <span>Instancia: {homeAssistantMain?.name || "—"}</span>
              <span>Versión: {homeAssistantMain?.version || "—"}</span>
              <span>Automatizaciones: {homeAssistantUseCases.length || 0}</span>
              <span>Estado: {getStatusLabel(homeAssistantMain?.status)}</span>
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
              {homeAssistantUseCases.length > 0 ? (
                homeAssistantUseCases
                  .slice(0, 4)
                  .map((useCase) => (
                    <span key={useCase.id}>{useCase.title}</span>
                  ))
              ) : (
                <>
                  <span>Escenas: —</span>
                  <span>Sensores: —</span>
                  <span>Zonas: —</span>
                  <span>Eventos: —</span>
                </>
              )}
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
              {localAiMain?.description ||
                "Espacio reservado para modelos, runtimes, tiempos de respuesta, uso de recursos y calidad de resultados."}
            </p>
            <ul className="lab-data-list" role="list">
              <li>Modelo: {localAiMain?.model_name || "—"}</li>
              <li>Runtime: {localAiMain?.provider || "—"}</li>
              <li>Tamaño: {localAiMain?.model_size || "—"}</li>
              <li>Estado: {getStatusLabel(localAiMain?.status)}</li>
            </ul>
          </article>

          <article className="lab-data-card">
            <div className="lab-data-icon">
              <FaDatabase />
            </div>
            <h3>Casos de estudio</h3>
            <p>
              {localAiMain?.hardware_notes ||
                "Preparado para documentar clasificación, síntesis, extracción de señales y apoyo a investigación técnica o comercial."}
            </p>
            <ul className="lab-data-list" role="list">
              <li>Interfaz: {localAiMain?.interface_name || "—"}</li>
              <li>Proveedor: {localAiMain?.provider || "—"}</li>
              <li>Base URL: {localAiMain?.base_url || "—"}</li>
              <li>Estado: {getStatusLabel(localAiMain?.status)}</li>
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
              {featuredItems.find((item) => item.category === "research")
                ?.description ||
                "Preparado para incorporar datasets, fuentes externas, paneles y resultados de análisis todavía en construcción."}
            </p>
            <div className="lab-chip-row">
              <span>Fuentes: APIs externas</span>
              <span>Panel: En evolución</span>
              <span>Estado: Building</span>
              <span>Enfoque: Research</span>
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
              Espacio para indicadores, tendencias y señales servidas desde la
              API del laboratorio.
            </p>
            <div className="lab-chip-row">
              <span>
                {firstMetric
                  ? `${firstMetric.display_name}: ${firstMetric.value}${firstMetric.unit}`
                  : "Tendencia: —"}
              </span>
              <span>
                {secondMetric
                  ? `${secondMetric.display_name}: ${secondMetric.value}${secondMetric.unit}`
                  : "Score: —"}
              </span>
              <span>Alertas: En preparación</span>
              <span>Estado API: Activa</span>
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
          {capabilities.length > 0 ? (
            capabilities.map((capability) => (
              <span className="lab-tag" key={capability.id}>
                {capability.title}
              </span>
            ))
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>
    </section>
  );
}

export default Laboratory;
