import { useNavigate } from "react-router";
import "./Cards.css";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
} from "react-icons/fa";

// Normaliza cualquier campo tipo lista para que siempre sea un array limpio.
function normalizeList(value) {
  // Si ya viene como array, limpia vacíos y espacios.
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  // Si viene como string, intenta leerlo como JSON.
  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);

      // Si el JSON es un array, lo devuelve limpio.
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }

      // Si el JSON era un string simple, lo convierte en array de un solo valor.
      if (typeof parsed === "string" && parsed.trim()) {
        return [parsed.trim()];
      }
    } catch {
      // Si no era JSON, lo trata como texto simple o lista por comas.
      if (trimmed.includes(",")) {
        return trimmed
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      return [trimmed];
    }
  }

  // Fallback seguro.
  return [];
}

// Devuelve la primera imagen válida del proyecto.
function getProjectImage(project) {
  const images = normalizeList(project?.image_url);
  return images[0] || "";
}

// Elige un icono automático según el contenido técnico del proyecto.
function getProjectIcon(project, techList) {
  // Une varios campos del proyecto en un solo texto para detectar palabras clave.
  const text =
    `${project?.title || ""} ${project?.short_description || ""} ${project?.stack_summary || ""} ${techList.join(" ")}`.toLowerCase();

  // Proyectos de backend, APIs o servidor.
  if (
    text.includes("api") ||
    text.includes("backend") ||
    text.includes("laravel") ||
    text.includes("node") ||
    text.includes("server")
  ) {
    return <FaServer />;
  }

  // Proyectos orientados a base de datos.
  if (
    text.includes("postgres") ||
    text.includes("mysql") ||
    text.includes("database") ||
    text.includes("sql")
  ) {
    return <FaDatabase />;
  }

  // Proyectos de redes o infraestructura de red.
  if (
    text.includes("red") ||
    text.includes("network") ||
    text.includes("firewall") ||
    text.includes("pfsense") ||
    text.includes("dns") ||
    text.includes("vlan")
  ) {
    return <FaNetworkWired />;
  }

  // Proyectos relacionados con seguridad o autenticación.
  if (
    text.includes("security") ||
    text.includes("seguridad") ||
    text.includes("auth") ||
    text.includes("jwt")
  ) {
    return <FaShieldAlt />;
  }

  // Proyectos de cloud, despliegue o virtualización.
  if (
    text.includes("cloud") ||
    text.includes("docker") ||
    text.includes("deploy") ||
    text.includes("proxmox")
  ) {
    return <FaCloud />;
  }

  // Icono genérico si no coincide ninguna categoría.
  return <FaCode />;
}

export default function ProjectCard({ project, index = 0 }) {
  // Hook de React Router para navegar al detalle del proyecto.
  const navigate = useNavigate();

  // Si no hay proyecto, no renderiza nada.
  if (!project) return null;

  // Convierte technologies a un array reutilizable.
  const techList = normalizeList(project.technologies);

  // Obtiene la imagen principal de la tarjeta.
  const projectImage = getProjectImage(project);

  // Define una variación visual por índice para alternar estilos.
  const tone = index % 3;

  // Selecciona el icono más adecuado según el contenido del proyecto.
  const icon = getProjectIcon(project, techList);

  // Textos preparados con fallback para evitar huecos vacíos.
  const badgeText = project.is_featured ? "Destacado" : "Proyecto";
  const summaryText = project.stack_summary || "Software";
  const titleText = project.title || "Sin título";
  const descriptionText = project.short_description || "Sin descripción";

  // Normaliza el slug antes de construir la ruta.
  const projectSlug =
    typeof project.slug === "string" ? project.slug.trim() : "";

  // Abre la página de detalle si el proyecto tiene slug válido.
  const handleOpenProject = () => {
    if (!projectSlug) return;
    navigate(`/proyectos/${projectSlug}`);
  };

  return (
    <article
      className={`card card-hover card-project tone-${tone} ${projectImage ? "has-project-image" : "no-project-image"}`}
      onClick={handleOpenProject}
      onKeyDown={(event) => {
        // Permite abrir la tarjeta con teclado para accesibilidad.
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenProject();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Abrir proyecto ${titleText}`}
      style={{ cursor: projectSlug ? "pointer" : "default" }}
    >
      {/* Fondo visual de la tarjeta si existe imagen */}
      {projectImage && (
        <div
          className="project-card-media"
          aria-hidden="true"
          style={{
            backgroundImage: `url("${projectImage}")`,
          }}
        />
      )}

      {/* Capa de contenido principal */}
      <div className="project-card-inner">
        {/* Cabecera superior con badge y resumen de stack */}
        <div className="card-top">
          <span className="card-badge">{badgeText}</span>
          <span className="date">{summaryText}</span>
        </div>

        {/* Bloque principal con icono y título */}
        <div className="card-head">
          <div className="card-icon">{icon}</div>

          <div className="card-title-wrap">
            <h3>{titleText}</h3>
          </div>
        </div>

        {/* Separador visual entre cabecera y contenido */}
        <div className="project-card-divider" />

        {/* Descripción breve del proyecto */}
        <p>{descriptionText}</p>

        {/* Lista de tecnologías si existen */}
        {techList.length > 0 && (
          <div className="tags">
            {techList.map((tech, i) => (
              <span key={`${tech}-${i}`} className="tag">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
