import { Link } from "react-router";
import { ArrowUpRight, FolderKanban, Rocket, Activity } from "lucide-react";
import "./LaboratoryCard.css";

function normalizeArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return [value].filter(Boolean);
}

function pickImage(lab) {
  if (!lab) return null;

  if (typeof lab.coverImage === "string" && lab.coverImage.trim()) {
    return lab.coverImage;
  }

  if (typeof lab.cover_image === "string" && lab.cover_image.trim()) {
    return lab.cover_image;
  }

  return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80";
}

function pickCategory(lab) {
  return lab?.categoria || lab?.category || lab?.tipo_proyecto || "Laboratorio";
}

function pickStatus(lab) {
  return lab?.estado || lab?.status || "Activo";
}

function pickTitle(lab) {
  return lab?.titulo || lab?.title || "Laboratorio destacado";
}

function pickDescription(lab) {
  return lab?.resumen || lab?.summary || "Laboratorio técnico real.";
}

function pickTags(lab) {
  return normalizeArray(lab?.areas_relacionadas || lab?.relatedAreas).slice(
    0,
    4,
  );
}

function pickDocumentationCount(lab) {
  return Number(lab?.documentacion_count ?? lab?.documentationCount ?? 0);
}

function pickAdvancesCount(lab) {
  return Number(lab?.avances_count ?? lab?.progressCount ?? 0);
}

function pickCtaUrl() {
  return "/laboratorio";
}

export default function LaboratoryCard({ item, className = "" }) {
  const title = pickTitle(item);
  const description = pickDescription(item);
  const category = pickCategory(item);
  const status = pickStatus(item);
  const tags = pickTags(item);
  const documentationCount = pickDocumentationCount(item);
  const advancesCount = pickAdvancesCount(item);
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
                aria-label={`Abrir laboratorio ${title}`}
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

        {tags.length > 0 && (
          <div className="lab-card-rich__tags">
            {tags.map((tag) => (
              <span className="lab-card-rich__tag" key={`tag-${tag}`}>
                {tag}
              </span>
            ))}
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
