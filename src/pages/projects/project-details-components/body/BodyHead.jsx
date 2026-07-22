import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Globe,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import styles from "./BodyHead.module.css";

function BodyHead({ project }) {
  if (!project) return null;

  const technologies = Array.isArray(project.technologies)
    ? project.technologies.filter(Boolean)
    : [];

  const visibleAdjuntos = Array.isArray(project.adjuntos)
    ? [...project.adjuntos]
        .filter((item) => item?.es_visible && item?.url)
        .filter(
          (item) =>
            !String(item.titulo || "")
              .toLowerCase()
              .includes("fondo_tarjeta") &&
            !String(item.url || "").includes("/imgTarjetasProjects/"),
        )
        .sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999))
    : [];

  const mainActions = visibleAdjuntos
    .filter((item) => item.es_destacado)
    .slice(0, 4);
  const quickLinks = visibleAdjuntos.slice(0, 6);

  const area = String(project?.area_principal || "").toLowerCase();
  const heroIcon =
    area === "frontend"
      ? "/imgFondoProjects/icono_frontend.png"
      : "/imgFondoProjects/icono_backend.png";

  return (
    <section className={styles.head}>
      <div className={styles.backRow}>
        <Link to="/projects" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Volver a Proyectos</span>
        </Link>
      </div>

      <div className={styles.layout}>
        <article className={styles.heroCard}>
          <div className={styles.heroMain}>
            <div className={styles.heroMedia}>
              <img
                src={heroIcon}
                alt={project.title}
                className={styles.heroImage}
                loading="lazy"
              />
            </div>

            <div className={styles.heroContent}>
              <div className={styles.badges}>
                <span className={styles.featuredBadge}>
                  <Sparkles size={14} />
                  Proyecto destacado
                </span>
              </div>

              <h1>{project.title}</h1>

              <p className={styles.lead}>
                {project.short_description ||
                  project.description ||
                  project.resumen}
              </p>

              {technologies.length > 0 ? (
                <div className={styles.techList}>
                  {technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {mainActions.length > 0 ? (
            <div className={styles.heroFooter}>
              {mainActions.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                >
                  {getActionIcon(item)}
                  <span>{item.titulo}</span>
                </a>
              ))}
            </div>
          ) : null}
        </article>

        <div className={styles.sideCards}>
          <article className={styles.card}>
            <h2>Estado del Proyecto</h2>

            <div className={styles.statusRow}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>
                {getStatusLabel(project)}
              </span>
            </div>

            <dl className={styles.metaList}>
              <div>
                <dt>Fecha</dt>
                <dd>{formatMonthYear(project.fecha_inicio)}</dd>
              </div>

              <div>
                <dt>Duración</dt>
                <dd>
                  {getDurationLabel(project.fecha_inicio, project.fecha_fin)}
                </dd>
              </div>

              <div>
                <dt>Área</dt>
                <dd>{project.area_principal || "General"}</dd>
              </div>

              <div>
                <dt>Tipo</dt>
                <dd>{getProjectType(project)}</dd>
              </div>
            </dl>
          </article>

          <article className={styles.card}>
            <h2>Enlaces Rápidos</h2>

            <div className={styles.quickLinks}>
              {quickLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quickLink}
                >
                  <span className={styles.quickIcon}>{getQuickIcon(item)}</span>

                  <span className={styles.quickText}>
                    <strong>{item.titulo}</strong>
                    <small>{item.subtitulo || item.grupo || "Recurso"}</small>
                  </span>

                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function getStatusLabel(project) {
  const estado = String(
    project?.laboratorio_origen?.estado || "",
  ).toLowerCase();
  if (estado === "activo") return "Activo";
  if (estado === "completado") return "Completado";
  if (estado === "pausado") return "Pausado";
  return "En progreso";
}

function getProjectType(project) {
  const area = String(project?.area_principal || "").toLowerCase();
  if (area === "backend") return "Backend / API";
  if (area === "frontend") return "Frontend";
  if (area === "fullstack") return "Full Stack";
  return "Proyecto técnico";
}

function formatMonthYear(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function getDurationLabel(start, end) {
  if (!start) return "No definida";

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  if (months <= 0) return "En curso";
  if (months === 1) return "1 mes";
  return `${months} meses`;
}

function getActionIcon(item) {
  const title = String(item?.titulo || "").toLowerCase();

  if (title.includes("frontend") || title.includes("demo"))
    return <Globe size={18} />;
  if (title.includes("documentación")) return <FileText size={18} />;
  if (title.includes("json") || title.includes("descargar"))
    return <Download size={18} />;
  return <Code2 size={18} />;
}

function getQuickIcon(item) {
  const title = String(item?.titulo || "").toLowerCase();
  const group = String(item?.grupo || "").toLowerCase();

  if (title.includes("documentación")) return <FileText size={17} />;
  if (title.includes("health")) return <HeartPulse size={17} />;
  if (group === "general") return <Globe size={17} />;
  if (group === "api" || group === "backend") return <Code2 size={17} />;
  return <ExternalLink size={17} />;
}

export default BodyHead;
