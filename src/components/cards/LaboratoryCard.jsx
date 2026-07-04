import { Link } from "react-router";
import {
  ArrowUpRight,
  FolderKanban,
  Rocket,
  Activity,
  Target,
  Cpu,
  CalendarDays,
  FolderOpen,
  Database,
  ShieldCheck,
  Server,
  Layers3,
  Workflow,
  Cable,
} from "lucide-react";
import "./LaboratoryCard.css";

function normalizeArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return [value].filter(Boolean);
}

function pickCount(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (Array.isArray(value)) return value.length;
  return fallback;
}

function pickImage(lab) {
  if (!lab) return null;

  if (typeof lab.coverImage === "string" && lab.coverImage.trim()) {
    return lab.coverImage;
  }

  if (typeof lab.cover_image === "string" && lab.cover_image.trim()) {
    return lab.cover_image;
  }

  if (Array.isArray(lab.galeria_urls) && lab.galeria_urls.length > 0) {
    return lab.galeria_urls[0];
  }

  if (Array.isArray(lab.galleryUrls) && lab.galleryUrls.length > 0) {
    return lab.galleryUrls[0];
  }

  if (Array.isArray(lab.gallery) && lab.gallery.length > 0) {
    return lab.gallery[0];
  }

  return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80";
}

function pickCategory(lab) {
  return (
    lab?.tipo_proyecto ||
    lab?.categoria ||
    lab?.category ||
    lab?.tipo ||
    "Laboratorio"
  );
}

function pickStatus(lab) {
  return lab?.estado || lab?.status || "Activo";
}

function pickTitle(lab) {
  return lab?.titulo || lab?.title || lab?.nombre || "Laboratorio destacado";
}

function pickDescription(lab) {
  return (
    lab?.resumen ||
    lab?.summary ||
    lab?.excerpt ||
    lab?.descripcion_corta ||
    lab?.descripcion ||
    "Laboratorio técnico real integrado en el portfolio con documentación viva y evolución continua."
  );
}

function pickObjective(lab) {
  return lab?.objetivo || lab?.objective || null;
}

function pickCurrentResult(lab) {
  return lab?.resultado_actual || lab?.currentResult || null;
}

function pickTechnicalNotes(lab) {
  return lab?.notas_tecnicas || lab?.technicalNotes || null;
}

function pickArea(lab) {
  return lab?.area_principal || lab?.mainArea || null;
}

function pickSlug(lab) {
  return lab?.slug || lab?.id || "";
}

function pickTags(lab) {
  const source =
    lab?.areas_relacionadas ||
    lab?.relatedAreas ||
    lab?.stack ||
    lab?.tecnologias ||
    lab?.tech_stack ||
    [];

  return normalizeArray(source).slice(0, 4);
}

function pickDocumentationCount(lab) {
  return (
    lab?.documentacion_count ??
    lab?.documentationCount ??
    lab?.documentacion_total ??
    pickCount(lab?.documentacion, 0)
  );
}

function pickAdvancesCount(lab) {
  return (
    lab?.avances_count ??
    lab?.progressCount ??
    lab?.avances_total ??
    pickCount(lab?.avances, 0)
  );
}

function pickDocFilesCount(lab) {
  if (typeof lab?.documentacion_urls?.length === "number") {
    return lab.documentacion_urls.length;
  }

  if (typeof lab?.documentationUrls?.length === "number") {
    return lab.documentationUrls.length;
  }

  return pickCount(lab?.documentacion, 0);
}

function formatDate(value) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
  }).format(date);
}

function pickDateRange(lab) {
  const start = lab?.fecha_inicio || lab?.startDate || null;
  const end = lab?.fecha_fin || lab?.endDate || null;

  const startFormatted = formatDate(start);
  const endFormatted = formatDate(end);

  if (startFormatted && endFormatted)
    return `${startFormatted} → ${endFormatted}`;
  if (startFormatted) return `Desde ${startFormatted}`;
  if (endFormatted) return `Hasta ${endFormatted}`;
  return null;
}

function pickCtaUrl() {
  return "/laboratorio";
}

function buildStackItems(lab) {
  const metadata = lab?.metadata || {};
  const raw = [
    metadata.framework && { label: metadata.framework, icon: Layers3 },
    metadata.backend && { label: metadata.backend, icon: Server },
    metadata.database && { label: metadata.database, icon: Database },
    metadata.auth && { label: metadata.auth, icon: ShieldCheck },
    metadata.api && { label: metadata.api, icon: Workflow },
    metadata.infrastructure && { label: metadata.infrastructure, icon: Cable },
  ].filter(Boolean);

  if (raw.length > 0) return raw.slice(0, 4);

  return [
    { label: "Laravel", icon: Layers3 },
    { label: "API REST", icon: Workflow },
    { label: "Base de datos", icon: Database },
    { label: "Infraestructura", icon: Server },
  ];
}

export default function LaboratoryCard({ item, className = "" }) {
  const title = pickTitle(item);
  const description = pickDescription(item);
  const category = pickCategory(item);
  const status = pickStatus(item);
  const area = pickArea(item);
  const objective = pickObjective(item);
  const currentResult = pickCurrentResult(item);
  const technicalNotes = pickTechnicalNotes(item);
  const tags = pickTags(item);
  const documentationCount = pickDocumentationCount(item);
  const advancesCount = pickAdvancesCount(item);
  const docFilesCount = pickDocFilesCount(item);
  const dateRange = pickDateRange(item);
  const image = pickImage(item);
  const ctaUrl = pickCtaUrl();

  return (
    <article className={["lab-card-rich", className].filter(Boolean).join(" ")}>
      <div className="lab-card-rich__media">
        <img
          src={image}
          alt={`Vista previa del laboratorio ${title}`}
          className="lab-card-rich__image"
          loading="lazy"
          width="1400"
          height="900"
        />

        <div className="lab-card-rich__overlay" />

        <div className="lab-card-rich__floating">
          <span className="lab-card-rich__badge">{category}</span>
          <span className="lab-card-rich__badge is-status">{status}</span>
        </div>
      </div>

      <div className="lab-card-rich__body">
        <div className="lab-card-rich__top">
          <div className="lab-card-rich__heading">
            <span className="lab-card-rich__kicker">Laboratorio real</span>

            <h3 className="lab-card-rich__title">
              <Link
                to={ctaUrl}
                className="lab-card-rich__primary-link"
                aria-label={`Abrir sección laboratorio desde ${title}`}
              >
                {title}
              </Link>
            </h3>

            <p className="lab-card-rich__description">{description}</p>
          </div>

          <Link
            to={ctaUrl}
            className="lab-card-rich__cta lab-card-rich__cta-link"
            aria-label={`Ir a laboratorio desde ${title}`}
          >
            <span>Ir a laboratorio</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {(area || dateRange || docFilesCount > 0) && (
          <div className="lab-card-rich__quickmeta">
            {area && (
              <span className="lab-card-rich__meta-pill">
                <Cpu size={15} />
                {area}
              </span>
            )}

            {dateRange && (
              <span className="lab-card-rich__meta-pill">
                <CalendarDays size={15} />
                {dateRange}
              </span>
            )}

            <span className="lab-card-rich__meta-pill">
              <FolderOpen size={15} />
              {docFilesCount} recursos
            </span>
          </div>
        )}

        {tags.length > 0 && (
          <div className="lab-card-rich__tags">
            {tags.map((tag) => (
              <span className="lab-card-rich__tag" key={`tag-${tag}`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {(objective || currentResult || technicalNotes) && (
          <div className="lab-card-rich__info-grid">
            {objective && (
              <div className="lab-card-rich__panel">
                <div className="lab-card-rich__panel-label">
                  <Target size={16} />
                  Objetivo
                </div>
                <p>{objective}</p>
              </div>
            )}

            {currentResult && (
              <div className="lab-card-rich__panel">
                <div className="lab-card-rich__panel-label">
                  <Activity size={16} />
                  Resultado actual
                </div>
                <p>{currentResult}</p>
              </div>
            )}

            {technicalNotes && (
              <div className="lab-card-rich__panel is-full">
                <div className="lab-card-rich__panel-label">
                  <Cpu size={16} />
                  Notas técnicas
                </div>
                <p>{technicalNotes}</p>
              </div>
            )}
          </div>
        )}

        <div className="lab-card-rich__stats">
          <div className="lab-card-rich__stat">
            <div className="lab-card-rich__stat-label">
              <FolderKanban size={16} />
              Documentación
            </div>
            <strong>{documentationCount}</strong>
            <span>bloques</span>
          </div>

          <div className="lab-card-rich__stat">
            <div className="lab-card-rich__stat-label">
              <Rocket size={16} />
              Avances
            </div>
            <strong>{advancesCount}</strong>
            <span>hitos</span>
          </div>

          <div className="lab-card-rich__stat">
            <div className="lab-card-rich__stat-label">
              <Activity size={16} />
              Estado
            </div>
            <strong className="is-text">{status}</strong>
            <span>actual</span>
          </div>
        </div>
      </div>
    </article>
  );
}