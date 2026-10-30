import { useCallback, useEffect, useRef, useState } from "react";
import {
  Download,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Braces,
  Package,
  Video,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import styles from "./ProjectResources.module.css";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getVisibleAttachments(project) {
  return asArray(project?.adjuntos).filter(
    (item) =>
      item &&
      item.es_visible !== false &&
      !normalizeText(item?.titulo).includes("fondo_tarjeta"),
  );
}

function findFirst(items, predicate) {
  return items.find(predicate) || null;
}

function findMany(items, predicate) {
  return items.filter(predicate);
}

function byGroup(group) {
  return (item) => normalizeText(item?.grupo) === group;
}

function byType(type) {
  return (item) => normalizeText(item?.tipo) === type;
}

function includesText(text) {
  return (item) =>
    normalizeText(item?.titulo).includes(text) ||
    normalizeText(item?.subtitulo).includes(text) ||
    normalizeText(item?.descripcion).includes(text);
}

function sortItems(items) {
  return [...items].sort(
    (a, b) => Number(a?.orden ?? 0) - Number(b?.orden ?? 0),
  );
}

function getResourceCards(project) {
  const attachments = getVisibleAttachments(project);
  const docs = asArray(project?.documentacion);

  const imageItems = sortItems(
    findMany(
      attachments,
      (item) =>
        byGroup("capturas")(item) ||
        byGroup("galeria")(item) ||
        byType("image")(item) ||
        includesText("captura")(item) ||
        includesText("screenshot")(item) ||
        includesText("imagen")(item),
    ),
  );

  const videoItems = findMany(
    attachments,
    (item) =>
      byGroup("videos")(item) ||
      byType("video")(item) ||
      includesText("video")(item) ||
      includesText("demo")(item),
  );

  const pdfItem =
    findFirst(docs, (item) => item?.url) ||
    findFirst(
      attachments,
      (item) =>
        byType("doc")(item) ||
        byType("file")(item) ||
        includesText("documentación")(item) ||
        includesText("documentacion")(item) ||
        includesText("pdf")(item),
    );

  const apiDocsItem = findFirst(
    attachments,
    (item) =>
      includesText("swagger")(item) ||
      includesText("openapi")(item) ||
      normalizeText(item?.titulo) === "documentación api",
  );

  const serviceItems = findMany(
    attachments,
    (item) => byType("link")(item) && !includesText("fondo_tarjeta")(item),
  );

  const installerItem = findFirst(
    attachments,
    (item) =>
      includesText("instalador")(item) ||
      includesText("windows")(item) ||
      includesText("linux")(item),
  );

  const dockerItem = findFirst(
    attachments,
    (item) =>
      includesText("docker")(item) ||
      includesText("docker hub")(item) ||
      includesText("image")(item),
  );

  return [
    {
      key: "screenshots",
      title: "Capturas de pantalla",
      subtitle:
        imageItems.length > 0
          ? `${imageItems.length} imágenes`
          : "Galería pendiente",
      href: imageItems[0]?.url || null,
      icon: ImageIcon,
      accent: "cyan",
    },
    {
      key: "videos",
      title: "Vídeos",
      subtitle:
        videoItems.length > 0
          ? `${videoItems.length} demostraciones`
          : "Demos pendientes",
      href: videoItems[0]?.url || null,
      icon: Video,
      accent: "violet",
    },
    {
      key: "docs",
      title: "Documentación (PDF)",
      subtitle: pdfItem ? "Guía completa" : "Sin PDF aún",
      href: pdfItem?.url || null,
      icon: FileText,
      accent: "white",
    },
    {
      key: "api",
      title: "API Docs (Swagger)",
      subtitle: apiDocsItem ? "Explorar API" : "Sin docs aún",
      href: apiDocsItem?.url || null,
      icon: Braces,
      accent: "green",
    },
    {
      key: "services",
      title: "URLs de servicios",
      subtitle:
        serviceItems.length > 0
          ? `${serviceItems.length} endpoints`
          : "Sin servicios aún",
      href: serviceItems[0]?.url || null,
      icon: LinkIcon,
      accent: "blue",
    },
    {
      key: "installer",
      title: "Instalador",
      subtitle: installerItem?.subtitulo || "Linux / Windows",
      href: installerItem?.url || null,
      icon: Download,
      accent: "lime",
    },
    {
      key: "docker",
      title: "Docker Image",
      subtitle: dockerItem ? "Ver en Docker Hub" : "No disponible",
      href: dockerItem?.url || null,
      icon: Package,
      accent: "cyanSoft",
    },
  ];
}

function ProjectResources({ project }) {
  const trackRef = useRef(null);
  const [activeCaptureIndex, setActiveCaptureIndex] = useState(null);

  const captureItems = sortItems(
    getVisibleAttachments(project).filter(
      (item) =>
        byGroup("capturas")(item) ||
        byGroup("galeria")(item) ||
        byType("image")(item) ||
        includesText("captura")(item) ||
        includesText("screenshot")(item),
    ),
  );

  const closeGallery = useCallback(() => {
    setActiveCaptureIndex(null);
  }, []);

  const showPreviousCapture = useCallback(() => {
    setActiveCaptureIndex((current) =>
      current === null
        ? null
        : (current - 1 + captureItems.length) % captureItems.length,
    );
  }, [captureItems.length]);

  const showNextCapture = useCallback(() => {
    setActiveCaptureIndex((current) =>
      current === null ? null : (current + 1) % captureItems.length,
    );
  }, [captureItems.length]);

  useEffect(() => {
    if (activeCaptureIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPreviousCapture();
      if (event.key === "ArrowRight") showNextCapture();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCaptureIndex, closeGallery, showNextCapture, showPreviousCapture]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    const handleWheel = (event) => {
      const canScrollHorizontally = track.scrollWidth > track.clientWidth;

      if (!canScrollHorizontally) {
        return;
      }

      const isVerticalWheel = Math.abs(event.deltaY) > Math.abs(event.deltaX);

      if (!isVerticalWheel) {
        return;
      }

      const goingLeft = event.deltaY < 0;
      const goingRight = event.deltaY > 0;

      const isAtStart = track.scrollLeft <= 0;
      const isAtEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

      if ((goingLeft && !isAtStart) || (goingRight && !isAtEnd)) {
        event.preventDefault();
        track.scrollLeft += event.deltaY;
      }
    };

    track.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      track.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (!project) {
    return null;
  }

  const cards = getResourceCards(project);

  return (
    <section
      className={styles.section}
      id="resources"
      aria-label="Recursos del proyecto"
    >
      <div ref={trackRef} className={styles.track}>
        {cards.map((card) => {
          const Icon = card.icon;

          const content = (
            <>
              <div
                className={`${styles.iconBox} ${
                  styles[`accent${card.accent}`]
                }`}
              >
                <Icon size={18} strokeWidth={2} aria-hidden="true" />
              </div>

              <div className={styles.texts}>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.subtitle}>{card.subtitle}</p>
              </div>
            </>
          );

          if (card.key === "screenshots" && captureItems.length > 0) {
            return (
              <button
                key={card.key}
                type="button"
                onClick={() => setActiveCaptureIndex(0)}
                className={styles.card}
                aria-label="Abrir galería de capturas de pantalla"
              >
                {content}
              </button>
            );
          }

          if (!card.href) {
            return (
              <article
                key={card.key}
                className={styles.card}
                aria-label={`${card.title}: ${card.subtitle}`}
              >
                {content}
              </article>
            );
          }

          return (
            <a
              key={card.key}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              aria-label={`Abrir ${card.title} en una pestaña nueva`}
            >
              {content}
            </a>
          );
        })}
      </div>

      {activeCaptureIndex !== null && captureItems[activeCaptureIndex] && (
        <div
          className={styles.galleryOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Galería de capturas"
          onClick={closeGallery}
        >
          <div
            className={styles.galleryDialog}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.galleryClose}
              onClick={closeGallery}
              aria-label="Cerrar galería"
            >
              <X size={20} />
            </button>

            <img
              className={styles.galleryImage}
              src={captureItems[activeCaptureIndex].url}
              alt={captureItems[activeCaptureIndex].titulo}
            />

            <div className={styles.galleryFooter}>
              <button
                type="button"
                className={styles.galleryNav}
                onClick={showPreviousCapture}
                aria-label="Captura anterior"
              >
                <ChevronLeft size={20} />
              </button>

              <p className={styles.galleryCaption}>
                {captureItems[activeCaptureIndex].titulo}
                <span>
                  {" "}
                  {activeCaptureIndex + 1} / {captureItems.length}
                </span>
              </p>

              <button
                type="button"
                className={styles.galleryNav}
                onClick={showNextCapture}
                aria-label="Captura siguiente"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectResources;
