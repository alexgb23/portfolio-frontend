import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bot,
  Boxes,
  Cable,
  CalendarDays,
  CheckCircle2,
  Database,
  FileText,
  Globe,
  Lightbulb,
  Network,
  Server,
  ShieldCheck,
  TrendingUp,
  Workflow,
  Wrench,
} from "lucide-react";
import { useLaboratoryHome } from "../../hooks/usePortfolioData";
import "./Laboratory.css";

function formatDate(value) {
  if (!value) return "Sin fecha";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function getStatusTone(status) {
  switch (status) {
    case "activo":
      return { label: "Estable", className: "is-online" };
    case "pendiente":
      return { label: "Pendiente", className: "is-pending" };
    default:
      return { label: "En curso", className: "is-building" };
  }
}

function getAreaIcon(area) {
  const map = {
    backend: Server,
    api: Workflow,
    base_de_datos: Database,
    infraestructura: Network,
    automatizacion: Bot,
    seguridad: ShieldCheck,
    frontend: Globe,
  };

  return map[area] || Boxes;
}

function getResourceIcon(type) {
  const map = {
    backend: Server,
    api: Workflow,
    infraestructura: Network,
    automatizacion: Bot,
    frontend: Globe,
  };

  return map[type] || Cable;
}

function getDocPhaseLabel(value) {
  const map = {
    planificacion: "Planificación",
    desarrollo: "Desarrollo",
    investigacion: "Investigación",
  };

  return map[value] || "General";
}

function normalizeDashboardLab(item) {
  return {
    id: item?.id ?? null,
    title: item?.title ?? "",
    slug: item?.slug ?? "",
    category: item?.category ?? "",
    type: item?.type ?? "",
    area: item?.area ?? item?.category ?? "",
    status: item?.status ?? "",
    summary: item?.summary ?? "",
    description: item?.description ?? item?.summary ?? "",
    objective: item?.objective ?? "",
    result: item?.currentResult ?? "",
    notes: item?.technicalNotes ?? "",
    relatedAreas: asArray(item?.relatedAreas),
    coverImage: item?.coverImage ?? null,
    documentationCount: Number(item?.documentationCount) || 0,
    progressCount: Number(item?.progressCount) || 0,
    ideasCount: Number(item?.ideasCount) || 0,
    resourcesCount: Number(item?.resourcesCount) || 0,
    updatedAt: item?.updatedAt ?? null,
    stack: asArray(item?.stack),
    docs: asArray(item?.documentation),
    progress: asArray(item?.progress),
    ideas: asArray(item?.ideas),
    resources: asArray(item?.resources),
    links: asArray(item?.documentationUrls),
    featured: Boolean(item?.is_featured),
  };
}

function EmptyBlock({ text }) {
  return <p className="lab-empty-copy">{text}</p>;
}

export default function Laboratory() {
  const { items, featuredItems, loading, error } = useLaboratoryHome(true);

  const labs = useMemo(() => {
    return asArray(items).map(normalizeDashboardLab);
  }, [items]);

  const preferredLabs = useMemo(() => {
    const source = featuredItems?.length ? featuredItems : items;
    return asArray(source).map(normalizeDashboardLab);
  }, [featuredItems, items]);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!selectedId && preferredLabs.length > 0) {
      setSelectedId(preferredLabs[0].id);
    }
  }, [preferredLabs, selectedId]);

  useEffect(() => {
    if (
      selectedId &&
      labs.length > 0 &&
      !labs.some((lab) => lab.id === selectedId)
    ) {
      setSelectedId(preferredLabs[0]?.id ?? labs[0]?.id ?? null);
    }
  }, [labs, preferredLabs, selectedId]);

  const activeLab =
    labs.find((lab) => lab.id === selectedId) ??
    preferredLabs[0] ??
    labs[0] ??
    null;

  if (loading) {
    return (
      <section className="laboratory-dashboard-page section section-spaced">
        <div className="container">
          <div className="lab-state-card">
            <p>Cargando laboratorio...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="laboratory-dashboard-page section section-spaced">
        <div className="container">
          <div className="lab-state-card is-error">
            <p>No se pudo cargar el dashboard del laboratorio.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!activeLab) {
    return (
      <section className="laboratory-dashboard-page section section-spaced">
        <div className="container">
          <div className="lab-state-card">
            <p>No hay laboratorios visibles en este momento.</p>
          </div>
        </div>
      </section>
    );
  }

  const ActiveAreaIcon = getAreaIcon(activeLab.area);
  const statusTone = getStatusTone(activeLab.status);

  return (
    <section className="laboratory-dashboard-page section section-spaced">
      <div className="container">
        <header className="lab-dashboard-head">
          <div>
            <span className="lab-eyebrow">Laboratory control center</span>
            <h1>Laboratorios reales</h1>
            <p>
              Vista operativa para backend, documentación, avances, ideas y
              recursos conectados desde la API del portfolio.
            </p>
          </div>

          <div className={`lab-system-pill ${statusTone.className}`}>
            <span className="status-dot" />
            <span>{statusTone.label}</span>
          </div>
        </header>

        <div className="lab-dashboard-layout">
          <aside className="lab-sidebar">
            <div className="lab-sidebar__title">Laboratorios</div>

            <div className="lab-sidebar__list">
              {labs.map((lab, index) => {
                const tone = getStatusTone(lab.status);
                const AreaIcon = getAreaIcon(lab.area);

                return (
                  <button
                    key={lab.id}
                    type="button"
                    className={`lab-nav-card ${
                      lab.id === activeLab.id ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedId(lab.id)}
                  >
                    <div className="lab-nav-card__index">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="lab-nav-card__icon">
                      <AreaIcon size={18} />
                    </div>

                    <div className="lab-nav-card__body">
                      <strong>{lab.title}</strong>
                      <span>
                        {lab.stack.slice(0, 3).join(" · ") || lab.area}
                      </span>

                      <div className={`lab-nav-card__status ${tone.className}`}>
                        <span className="status-dot" />
                        <span>{tone.label}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="lab-main">
            <div className="lab-kpi-grid">
              <article className="lab-kpi-card">
                <span>Laboratorios activos</span>
                <strong>{labs.length}</strong>
              </article>

              <article className="lab-kpi-card">
                <span>Avances</span>
                <strong>
                  {activeLab.progress.length || activeLab.progressCount}
                </strong>
              </article>

              <article className="lab-kpi-card">
                <span>Documentación</span>
                <strong>
                  {activeLab.docs.length || activeLab.documentationCount}
                </strong>
              </article>

              <article className="lab-kpi-card">
                <span>Ideas</span>
                <strong>
                  {activeLab.ideas.length || activeLab.ideasCount}
                </strong>
              </article>

              <article className="lab-kpi-card">
                <span>Adjuntos</span>
                <strong>
                  {activeLab.resources.length || activeLab.resourcesCount}
                </strong>
              </article>
            </div>

            <section className="lab-hero-grid">
              <article className="lab-hero-card">
                <div className="lab-hero-card__top">
                  <div>
                    <span className="lab-section-kicker">
                      Laboratorio activo
                    </span>
                    <h2>{activeLab.title}</h2>
                    <p>{activeLab.description || activeLab.summary}</p>
                  </div>

                  <div className="lab-area-pill">
                    <ActiveAreaIcon size={16} />
                    <span>{activeLab.area || activeLab.category}</span>
                  </div>
                </div>

                {activeLab.stack.length > 0 ? (
                  <div className="lab-stack-row">
                    {activeLab.stack.slice(0, 8).map((item) => (
                      <span key={item} className="lab-chip">
                        <Wrench size={14} />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <EmptyBlock text="No hay stack técnico disponible todavía." />
                )}

                <div className="lab-status-grid">
                  <div className="lab-ring-card">
                    <span>Estado del sistema</span>
                    <strong>99.4%</strong>
                    <small>Operacional</small>
                  </div>

                  <div className="lab-status-list">
                    <div>
                      <Workflow size={16} />
                      <span>API</span>
                      <strong>Online</strong>
                    </div>

                    <div>
                      <Database size={16} />
                      <span>Base de datos</span>
                      <strong>Online</strong>
                    </div>

                    <div>
                      <FileText size={16} />
                      <span>Documentación</span>
                      <strong>Sincronizada</strong>
                    </div>

                    <div>
                      <ShieldCheck size={16} />
                      <span>Autenticación</span>
                      <strong>Operativa</strong>
                    </div>
                  </div>
                </div>
              </article>

              <article className="lab-panel-card">
                <span className="lab-section-kicker">Resumen técnico</span>
                <h3>Arquitectura y objetivo</h3>

                <div className="lab-feature-list">
                  <div>
                    <Server size={16} />
                    <span>
                      {activeLab.objective || "Objetivo no definido todavía."}
                    </span>
                  </div>

                  <div>
                    <CheckCircle2 size={16} />
                    <span>
                      {activeLab.result || "Resultado actual no disponible."}
                    </span>
                  </div>

                  <div>
                    <Activity size={16} />
                    <span>
                      {activeLab.notes || "Notas técnicas pendientes."}
                    </span>
                  </div>
                </div>
              </article>

              <article className="lab-panel-card">
                <span className="lab-section-kicker">Stack principal</span>
                <h3>Tecnologías del laboratorio</h3>

                {activeLab.stack.length > 0 ? (
                  <div className="lab-stack-list">
                    {activeLab.stack.map((item) => (
                      <div key={item}>
                        <Boxes size={15} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyBlock text="No hay tecnologías registradas para este laboratorio." />
                )}
              </article>
            </section>

            <section className="lab-bottom-grid">
              <article className="lab-panel-card">
                <span className="lab-section-kicker">Avances recientes</span>
                <h3>Últimos hitos</h3>

                {activeLab.progress.length > 0 ? (
                  <div className="lab-timeline-list">
                    {activeLab.progress.slice(0, 5).map((item) => (
                      <div key={item.id ?? item.titulo}>
                        <TrendingUp size={15} />
                        <div>
                          <strong>{item.titulo ?? "Avance técnico"}</strong>
                          <span>
                            {formatDate(item.fecha_avance ?? item.updated_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyBlock text="No hay avances visibles todavía." />
                )}
              </article>

              <article className="lab-panel-card">
                <span className="lab-section-kicker">Documentación</span>
                <h3>Bloques por fases</h3>

                {activeLab.docs.length > 0 ? (
                  <div className="lab-doc-list">
                    {activeLab.docs.slice(0, 6).map((item) => (
                      <div key={item.id ?? item.titulo}>
                        <FileText size={15} />
                        <div>
                          <strong>{item.titulo ?? "Documento técnico"}</strong>
                          <span>{getDocPhaseLabel(item.fase)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyBlock text="No hay documentación cargada todavía." />
                )}
              </article>

              <article className="lab-panel-card">
                <span className="lab-section-kicker">Ideas futuras</span>
                <h3>Línea de evolución</h3>

                {activeLab.ideas.length > 0 ? (
                  <div className="lab-idea-list">
                    {activeLab.ideas.slice(0, 5).map((item) => (
                      <div key={item.id ?? item.titulo}>
                        <Lightbulb size={15} />
                        <div>
                          <strong>{item.titulo ?? "Idea pendiente"}</strong>
                          <span>
                            {item.idea ?? "Sin descripción adicional."}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyBlock text="No hay ideas registradas todavía." />
                )}
              </article>
            </section>

            <section className="lab-resource-strip">
              <div className="lab-resource-strip__title">
                <span className="lab-section-kicker">Recursos conectados</span>
                <h3>Adjuntos y referencias</h3>
              </div>

              {activeLab.resources.length > 0 ? (
                <div className="lab-resource-strip__grid">
                  {activeLab.resources.slice(0, 6).map((item) => {
                    const ResourceIcon = getResourceIcon(item?.metadata?.tipo);

                    return (
                      <article
                        key={item.id ?? item.nombre_archivo}
                        className="lab-resource-card"
                      >
                        <div className="lab-resource-card__icon">
                          <ResourceIcon size={16} />
                        </div>

                        <div className="lab-resource-card__body">
                          <strong>{item.nombre_archivo ?? "Recurso"}</strong>
                          <span>{item.descripcion ?? "Sin descripción."}</span>
                        </div>

                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noreferrer">
                            <ArrowRight size={16} />
                          </a>
                        ) : (
                          <span className="lab-resource-card__fallback">
                            <ArrowRight size={16} />
                          </span>
                        )}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <EmptyBlock text="No hay adjuntos o referencias disponibles." />
              )}
            </section>

            <footer className="lab-footer-line">
              <div>
                <CalendarDays size={16} />
                <span>
                  Última actualización: {formatDate(activeLab.updatedAt)}
                </span>
              </div>

              <div className="lab-footer-tags">
                <span>
                  {activeLab.category || activeLab.area || "laboratorio"}
                </span>

                {activeLab.relatedAreas.slice(0, 3).map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
