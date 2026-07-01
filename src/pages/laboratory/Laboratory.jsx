import { Link } from "react-router";
import { useMemo } from "react";
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
  FaLayerGroup,
  FaCircle,
} from "react-icons/fa";

import { useLaboratoryHome } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";
import LaboratorySkeleton from "./LaboratorySkeleton";
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
    <article className="expertise-card expertise-card-hover laboratory-card">
      <div className="card-head">
        <div className="expertise-icon">{icon}</div>

        <div className="card-title-wrap">
          <h3>{item.name || "Sin nombre"}</h3>
        </div>
      </div>

      <p>{item.description || "Sin descripción"}</p>

      <div className="laboratory-counter laboratory-counter-inline">
        <span>{getCategoryLabel(item.category)}</span>
        <strong>{item.location_name || "Sin ubicación"}</strong>
      </div>

      <div className="lab-chip-row">
        <span className="tag">
          <FaCircle />
          {getStatusLabel(item.status)}
        </span>
        <span className="tag">
          <FaLayerGroup />
          {item.item_type || "item"}
        </span>
      </div>
    </article>
  );
}

function OverviewCard({
  sectionClass,
  icon,
  title,
  description,
  countLabel,
  countValue,
}) {
  return (
    <article
      className={`lab-overview-card ${sectionClass} expertise-card expertise-card-hover laboratory-card`}
    >
      <div className="card-head">
        <div className="expertise-icon">{icon}</div>

        <div className="card-title-wrap">
          <h3>{title}</h3>
        </div>
      </div>

      <p>{description}</p>

      <div className="laboratory-counter">
        <span>{countLabel}</span>
        <strong>{countValue}</strong>
      </div>
    </article>
  );
}

function normalizeServer(server) {
  return {
    name: server.name || server.hostname || "Servidor",
    description:
      server.description ||
      `Servidor operativo${server.role ? ` · Rol: ${server.role}` : ""}`,
    category: server.category || "virtualization",
    location_name: server.location_name || server.location || "Sin ubicación",
    status: server.status || "active",
    item_type: server.type || "server",
  };
}

function Laboratory() {
  usePageTitle("Laboratorio Técnico | Alexander Galvez");

  const {
    summary,
    featuredItems = [],
    clusters = [],
    servers = [],
    nodes = [],
    metrics = [],
    homeAssistant = [],
    localAi = [],
    capabilities = [],
    loading,
    error,
  } = useLaboratoryHome();

  const {
    automationItems,
    infrastructureItems,
    researchItem,
    homeAssistantMain,
    homeAssistantUseCases,
    localAiMain,
    mainCluster,
    firstMetric,
    secondMetric,
    normalizedServers,
  } = useMemo(() => {
    const homeAssistantMainItem = homeAssistant[0] ?? null;
    const localAiMainItem = localAi[0] ?? null;

    return {
      automationItems: featuredItems.filter(
        (item) => item.category === "automation",
      ),
      infrastructureItems: featuredItems.filter((item) =>
        ["monitoring", "research", "ai"].includes(item.category),
      ),
      researchItem:
        featuredItems.find((item) => item.category === "research") ?? null,
      homeAssistantMain: homeAssistantMainItem,
      homeAssistantUseCases: Array.isArray(homeAssistantMainItem?.use_cases)
        ? homeAssistantMainItem.use_cases
        : [],
      localAiMain: localAiMainItem,
      mainCluster: clusters[0] ?? null,
      firstMetric: metrics[0] ?? null,
      secondMetric: metrics[1] ?? null,
      normalizedServers: servers.map(normalizeServer),
    };
  }, [featuredItems, homeAssistant, localAi, clusters, metrics, servers]);

  if (loading) return <LaboratorySkeleton />;

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
        className="laboratory-overview expertise-grid"
        aria-label="Resumen del laboratorio"
      >
        <OverviewCard
          sectionClass="lab-section-infra"
          icon={<FaServer />}
          title="Infraestructura"
          description="Servidores, virtualización y telemetría del entorno técnico."
          countLabel="servidores"
          countValue={summary?.servers_count ?? 0}
        />

        <OverviewCard
          sectionClass="lab-section-automation"
          icon={<FaMicrochip />}
          title="Automatización"
          description="Nodos, flujos y controladores conectados al entorno."
          countLabel="nodos"
          countValue={summary?.nodes_count ?? 0}
        />

        <OverviewCard
          sectionClass="lab-section-home"
          icon={<FaHome />}
          title="Home Assistant"
          description={
            homeAssistantMain?.description ||
            "Domótica doméstica, integraciones y observación del hogar."
          }
          countLabel="automatizaciones"
          countValue={homeAssistantUseCases.length || 0}
        />

        <OverviewCard
          sectionClass="lab-section-ai"
          icon={<FaBrain />}
          title="IA local"
          description={
            localAiMain?.description ||
            "Modelos, pruebas aplicadas y flujos experimentales."
          }
          countLabel="métricas"
          countValue={summary?.metrics_count ?? 0}
        />
      </section>

      <section className="lab-section lab-section-divider lab-section-infra">
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
                <FaServer /> Servidores del laboratorio
              </h3>
            </div>

            <div className="lab-panel-body">
              {normalizedServers.length > 0 ? (
                <div className="lab-story-grid">
                  {normalizedServers.map((server, index) => (
                    <LabItemCard
                      key={servers[index]?.id || server.name}
                      item={server}
                      icon={<FaServer />}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-inline-state compact">
                  <p>
                    No se han registrado servidores en el laboratorio todavía.
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
              <div className="lab-story-grid">
                <article className="expertise-card expertise-card-hover laboratory-card">
                  <div className="card-head">
                    <div className="expertise-icon">
                      <FaChartLine />
                    </div>
                    <div className="card-title-wrap">
                      <h3>Vista operativa</h3>
                    </div>
                  </div>

                  <p>
                    Resumen rápido de actividad, inventario y estado general.
                  </p>

                  <div className="lab-chip-row">
                    <span className="tag">
                      Items: {summary?.featured_items_count ?? 0}
                    </span>
                    <span className="tag">
                      Servidores: {summary?.servers_count ?? 0}
                    </span>
                    <span className="tag">
                      Nodos: {summary?.nodes_count ?? 0}
                    </span>
                    <span className="tag">
                      Métricas: {summary?.metrics_count ?? 0}
                    </span>
                  </div>

                  {mainCluster ? (
                    <div className="laboratory-counter laboratory-counter-inline">
                      <span>Clúster principal</span>
                      <strong>{mainCluster.name}</strong>
                    </div>
                  ) : null}
                </article>
              </div>
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

      <section className="lab-section lab-section-divider lab-section-automation">
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
              <div className="lab-chip-row lab-chip-row-spaced">
                {nodes.slice(0, 4).map((node) => (
                  <span className="tag" key={node.id}>
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

      <section className="lab-section lab-section-divider lab-section-home">
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

        <div className="lab-panel">
          <div className="lab-panel-head">
            <h3>
              <FaHome /> Estado e integraciones
            </h3>
          </div>

          <div className="lab-panel-body">
            <div className="lab-story-grid">
              <article className="expertise-card expertise-card-hover laboratory-card">
                <div className="card-head">
                  <div className="expertise-icon">
                    <FaHome />
                  </div>
                  <div className="card-title-wrap">
                    <h3>{homeAssistantMain?.name || "Estado del sistema"}</h3>
                  </div>
                </div>

                <p>
                  {homeAssistantMain?.description ||
                    "Vista pensada para mostrar instancia, uptime, integraciones y automatizaciones activas."}
                </p>

                <div className="lab-chip-row">
                  <span className="tag">
                    Instancia: {homeAssistantMain?.name || "—"}
                  </span>
                  <span className="tag">
                    Versión: {homeAssistantMain?.version || "—"}
                  </span>
                  <span className="tag">
                    Automatizaciones: {homeAssistantUseCases.length || 0}
                  </span>
                  <span className="tag">
                    Estado: {getStatusLabel(homeAssistantMain?.status)}
                  </span>
                </div>
              </article>

              <article className="expertise-card expertise-card-hover laboratory-card">
                <div className="card-head">
                  <div className="expertise-icon">
                    <FaNetworkWired />
                  </div>
                  <div className="card-title-wrap">
                    <h3>Casos de uso en casa</h3>
                  </div>
                </div>

                <p>
                  Escenas, sensores, consumos y eventos conectados a futuras
                  integraciones y APIs.
                </p>

                <div className="lab-chip-row">
                  {homeAssistantUseCases.length > 0 ? (
                    homeAssistantUseCases.slice(0, 4).map((useCase) => (
                      <span className="tag" key={useCase.id}>
                        {useCase.title}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="tag">Escenas: —</span>
                      <span className="tag">Sensores: —</span>
                      <span className="tag">Zonas: —</span>
                      <span className="tag">Eventos: —</span>
                    </>
                  )}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-section lab-section-divider lab-section-ai">
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

        <div className="lab-panel">
          <div className="lab-panel-head">
            <h3>
              <FaBrain /> Modelos y casos de estudio
            </h3>
          </div>

          <div className="lab-panel-body">
            <div className="lab-column-cards">
              <article className="expertise-card expertise-card-hover laboratory-card">
                <div className="card-head">
                  <div className="expertise-icon">
                    <FaBrain />
                  </div>
                  <div className="card-title-wrap">
                    <h3>Banco de pruebas</h3>
                  </div>
                </div>

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

              <article className="expertise-card expertise-card-hover laboratory-card">
                <div className="card-head">
                  <div className="expertise-icon">
                    <FaDatabase />
                  </div>
                  <div className="card-title-wrap">
                    <h3>Casos de estudio</h3>
                  </div>
                </div>

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
          </div>
        </div>
      </section>

      <section className="lab-section lab-section-divider lab-section-research">
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

        <div className="lab-panel">
          <div className="lab-panel-head">
            <h3>
              <FaSearch /> Observación y métricas
            </h3>
          </div>

          <div className="lab-panel-body">
            <div className="lab-research-grid">
              <article className="expertise-card expertise-card-hover laboratory-card">
                <div className="card-head">
                  <div className="expertise-icon">
                    <FaSearch />
                  </div>
                  <div className="card-title-wrap">
                    <h3>Observación de mercado</h3>
                  </div>
                </div>

                <p>
                  {researchItem?.description ||
                    "Preparado para incorporar datasets, fuentes externas, paneles y resultados de análisis todavía en construcción."}
                </p>

                <div className="lab-chip-row">
                  <span className="tag">Fuentes: APIs externas</span>
                  <span className="tag">Panel: En evolución</span>
                  <span className="tag">Estado: Building</span>
                  <span className="tag">Enfoque: Research</span>
                </div>
              </article>

              <article className="expertise-card expertise-card-hover laboratory-card">
                <div className="card-head">
                  <div className="expertise-icon">
                    <FaChartLine />
                  </div>
                  <div className="card-title-wrap">
                    <h3>Métricas futuras</h3>
                  </div>
                </div>

                <p>
                  Espacio para indicadores, tendencias y señales servidas desde
                  la API del laboratorio.
                </p>

                <div className="lab-chip-row">
                  <span className="tag">
                    {firstMetric
                      ? `${firstMetric.display_name}: ${firstMetric.value}${firstMetric.unit}`
                      : "Tendencia: —"}
                  </span>
                  <span className="tag">
                    {secondMetric
                      ? `${secondMetric.display_name}: ${secondMetric.value}${secondMetric.unit}`
                      : "Score: —"}
                  </span>
                  <span className="tag">Alertas: En preparación</span>
                  <span className="tag">Estado API: Activa</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-section lab-section-divider lab-section-capabilities">
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
