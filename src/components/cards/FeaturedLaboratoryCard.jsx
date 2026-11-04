import { Link } from "react-router";
import {
  ArrowUpRight,
  FolderKanban,
  Rocket,
  Activity,
  FlaskConical,
} from "lucide-react";
import "./FeaturedLaboratoryCard.css";

const DEFAULT_SIZES =
  "(max-width: 767px) 92vw, (max-width: 1279px) 48vw, 420px";

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value !== "string") return [];

  const trimmed = value.trim();

  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);

    if (Array.isArray(parsed)) {
      return normalizeList(parsed);
    }

    if (typeof parsed === "string") {
      return parsed
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  } catch {
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function hasImageExtension(path) {
  return /\.(avif|webp|jpe?g|png|svg)(?:[?#].*)?$/i.test(path);
}

function buildVariant(basePath, extension) {
  if (!basePath) return "";

  if (hasImageExtension(basePath)) {
    return basePath;
  }

  const [, path, suffix = ""] = basePath.match(/^([^?#]*)(.*)$/);

  return `${path}-960.${extension}${suffix}`;
}

function buildBackgroundImageSources(value) {
  const images = normalizeList(value);

  const avifBase =
    images.find((image) => /\.avif(?:[?#].*)?$/i.test(image)) ||
    images.find((image) => /avif$/i.test(image)) ||
    "";

  const webpBase =
    images.find((image) => /\.webp(?:[?#].*)?$/i.test(image)) ||
    images.find((image) => /webp$/i.test(image)) ||
    "";

  const avifSrc = buildVariant(avifBase, "avif");
  const webpSrc = buildVariant(webpBase, "webp");

  const otherImage = images.find((image) => hasImageExtension(image)) || "";

  return {
    avifSrcSet: avifSrc,
    webpSrcSet: webpSrc,
    fallbackSrcSet: "",
    sizes: DEFAULT_SIZES,
    fallbackSrc: webpSrc || avifSrc || otherImage,
    width: 1400,
    height: 900,
  };
}

function buildResponsiveImageSources(mediaLike, fallbackImage = "") {
  const media = mediaLike || null;

  return {
    avifSrcSet: media?.avifSrcSet || media?.avif_srcset || "",
    webpSrcSet: media?.webpSrcSet || media?.webp_srcset || "",
    fallbackSrcSet: media?.srcSet || media?.srcset || "",
    sizes: media?.sizes || DEFAULT_SIZES,
    fallbackSrc: media?.src || fallbackImage || "",
    width: Number(media?.width || 1400),
    height: Number(media?.height || 900),
  };
}

function getThemeImageSources(item) {
  const lightBackground = buildBackgroundImageSources(
    item?.fondo_tarjeta_light,
  );

  const darkBackground = buildBackgroundImageSources(item?.fondo_tarjeta_dark);

  const lightMedia =
    item?.coverImageMediaLight ||
    item?.cover_image_media_light ||
    item?.coverImageMedia?.light ||
    item?.cover_image_media?.light ||
    null;

  const darkMedia =
    item?.coverImageMediaDark ||
    item?.cover_image_media_dark ||
    item?.coverImageMedia?.dark ||
    item?.cover_image_media?.dark ||
    null;

  const lightImage = item?.coverImageLight || item?.cover_image_light || "";

  const darkImage = item?.coverImageDark || item?.cover_image_dark || "";

  const legacyLight = buildResponsiveImageSources(lightMedia, lightImage);
  const legacyDark = buildResponsiveImageSources(darkMedia, darkImage);

  const sharedImage = buildResponsiveImageSources(
    null,
    item?.coverImage || item?.cover_image || "",
  );

  const light = lightBackground.fallbackSrc ? lightBackground : legacyLight;

  const dark = darkBackground.fallbackSrc ? darkBackground : legacyDark;

  return {
    light: light.fallbackSrc ? light : dark.fallbackSrc ? dark : sharedImage,

    dark: dark.fallbackSrc ? dark : light.fallbackSrc ? light : sharedImage,
  };
}

function BackgroundPicture({ sources, className, alt = "" }) {
  if (!sources?.fallbackSrc) return null;

  return (
    <picture className={className} aria-hidden={alt ? undefined : "true"}>
      {sources.avifSrcSet ? (
        <source
          type="image/avif"
          srcSet={sources.avifSrcSet}
          sizes={sources.sizes}
        />
      ) : null}

      {sources.webpSrcSet ? (
        <source
          type="image/webp"
          srcSet={sources.webpSrcSet}
          sizes={sources.sizes}
        />
      ) : null}

      <img
        src={sources.fallbackSrc}
        srcSet={sources.fallbackSrcSet || undefined}
        sizes={sources.fallbackSrcSet ? sources.sizes : undefined}
        alt={alt}
        className="lab-card-rich__image"
        loading="lazy"
        decoding="async"
        width={sources.width}
        height={sources.height}
      />
    </picture>
  );
}

export default function LaboratoryCard({ item, className = "" }) {
  if (!item) return null;

  const title = item.title || item.titulo || "Laboratorio destacado";

  const summary = item.summary || item.resumen || "Laboratorio técnico real.";

  const category = item.category || item.categoria || "Laboratorio";
  const status = item.status || item.estado || "Activo";

  const relatedAreas = item.relatedAreas ?? item.areas_relacionadas ?? [];

  const documentationCount =
    item.documentationCount ?? item.documentacion_count ?? 0;

  const progressCount = item.progressCount ?? 0;

  const safeRelatedAreas = Array.isArray(relatedAreas) ? relatedAreas : [];

  const themeSources = getThemeImageSources(item);

  const hasImage = Boolean(
    themeSources.light.fallbackSrc || themeSources.dark.fallbackSrc,
  );

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
          <>
            <BackgroundPicture
              sources={themeSources.light}
              className="lab-card-rich__picture lab-card-rich__picture--light"
            />

            <BackgroundPicture
              sources={themeSources.dark}
              className="lab-card-rich__picture lab-card-rich__picture--dark"
            />
          </>
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
