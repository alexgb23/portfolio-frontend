import { useEffect, useRef } from "react";
import {
  Download,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Braces,
  Package,
  Video,
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

function getResourceCards(project) {
  const attachments = getVisibleAttachments(project);
  const docs = asArray(project?.documentacion);

  const imageItems = findMany(
    attachments,
    (item) =>
      byGroup("capturas")(item) ||
      byGroup("galeria")(item) ||
      byType("image")(item) ||
      includesText("captura")(item) ||
      includesText("screenshot")(item) ||
      includesText("imagen")(item),
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

      /*
       * Solo bloquea el scroll vertical de la página si todavía existe
       * contenido horizontal por recorrer. Si estás en el extremo, permite
       * continuar desplazando la página normalmente.
       */
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
    </section>
  );
}

export default ProjectResources;
