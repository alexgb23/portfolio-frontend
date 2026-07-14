import { Link } from "react-router";
import {
  ArrowUpRight,
  FolderKanban,
  Rocket,
  Activity,
  FlaskConical,
} from "lucide-react";
import "./FeaturedLaboratoryCard.css";

export default function LaboratoryCard({ item, className = "" }) {
  if (!item) return null;

  const {
    title = "Laboratorio destacado",
    summary = "Laboratorio técnico real.",
    category = "Laboratorio",
    status = "Activo",
    relatedAreas = [],
    documentationCount = 0,
    progressCount = 0,
    coverImage = null,
  } = item;

  const safeRelatedAreas = Array.isArray(relatedAreas) ? relatedAreas : [];
  const hasImage = Boolean(coverImage);

  return (
    <article
      className={[
        "lab-card-rich",
        hasImage ? "has-media" : "is-empty-media",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="lab-card-rich__media">
        {hasImage ? (
          <img
            src={coverImage}
            alt={`Vista previa del laboratorio ${title}`}
            className="lab-card-rich__image"
            loading="lazy"
            decoding="async"
            width="1400"
            height="900"
          />
        ) : (
          <div className="lab-card-rich__image-fallback" aria-hidden="true">
            <FlaskConical size={28} />
          </div>
        )}

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
                to="/laboratorio"
                className="lab-card-rich__primary-link"
                aria-label={`Abrir laboratorio ${title}`}
              >
                {title}
              </Link>
            </h3>

            <p className="lab-card-rich__description">{summary}</p>
          </div>

          <Link
            to="/laboratorio"
            className="lab-card-rich__cta lab-card-rich__cta-link"
            aria-label={`Ir a laboratorio desde ${title}`}
          >
            <span>Ir a laboratorio</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {safeRelatedAreas.length > 0 ? (
          <div className="lab-card-rich__tags">
            {safeRelatedAreas.map((tag) => (
              <span className="lab-card-rich__tag" key={`tag-${tag}`}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

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
            <strong>{progressCount}</strong>
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
