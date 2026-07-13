import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
} from "react-icons/fa";
import "./ProjectCard.css";

/**
 * Convierte cualquier valor a un array limpio de strings.
 *
 * Soporta:
 * - arrays reales
 * - strings JSON
 * - strings separados por comas
 * - strings simples
 * - valores vacíos o inválidos
 */
function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }

      if (typeof parsed === "string" && parsed.trim()) {
        return [parsed.trim()];
      }
    } catch {
      if (trimmed.includes(",")) {
        return trimmed
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      return [trimmed];
    }
  }

  return [];
}

/**
 * Elige la imagen de fondo adecuada según el tema actual.
 *
 * Prioridad:
 * - En dark: primero dark, si no hay usa light.
 * - En light: primero light, si no hay usa dark.
 */
function getProjectThemeBackground(project, isDark) {
  const darkImages = normalizeList(project?.card_background_dark);
  const lightImages = normalizeList(project?.card_background_light);

  if (isDark) {
    return darkImages[0] || lightImages[0] || "";
  }

  return lightImages[0] || darkImages[0] || "";
}

/**
 * Selecciona un icono en función del contenido técnico del proyecto.
 */
function getProjectIcon(project, techList) {
  const text =
    `${project?.title || ""} ${project?.short_description || ""} ${project?.stack_summary || ""} ${techList.join(" ")}`.toLowerCase();

  if (
    text.includes("api") ||
    text.includes("backend") ||
    text.includes("laravel") ||
    text.includes("node") ||
    text.includes("server")
  ) {
    return <FaServer />;
  }

  if (
    text.includes("postgres") ||
    text.includes("mysql") ||
    text.includes("database") ||
    text.includes("sql")
  ) {
    return <FaDatabase />;
  }

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

  if (
    text.includes("security") ||
    text.includes("seguridad") ||
    text.includes("auth") ||
    text.includes("jwt")
  ) {
    return <FaShieldAlt />;
  }

  if (
    text.includes("cloud") ||
    text.includes("docker") ||
    text.includes("deploy") ||
    text.includes("proxmox")
  ) {
    return <FaCloud />;
  }

  return <FaCode />;
}

/**
 * Tarjeta reutilizable para proyectos.
 *
 * Responsabilidades:
 * - Detectar el tema actual.
 * - Escoger la imagen de fondo adecuada.
 * - Pintar icono, contenido y tags.
 * - Navegar al detalle del proyecto.
 */
export default function ProjectCard({ project, index = 0, maxTags = 3 }) {
  const navigate = useNavigate();

  /**
   * Estado que indica si el tema activo es dark.
   */
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }
    return false;
  });

  /**
   * Observa cambios en data-theme del <html> para actualizar
   * automáticamente la imagen de fondo cuando el usuario cambia de tema.
   */
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    const syncTheme = () => {
      setIsDark(root.getAttribute("data-theme") === "dark");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (!project) return null;

  /**
   * Lista de tecnologías, limitada para no romper el layout.
   */
  const techList = normalizeList(
    project?.technologies ?? project?.tecnologías,
  ).slice(0, maxTags);

  /**
   * Variantes visuales y datos derivados.
   */
  const icon = getProjectIcon(project, techList);
  const tone = index % 3;
  const projectSlug =
    typeof project?.slug === "string" ? project.slug.trim() : "";
  const backgroundImage = getProjectThemeBackground(project, isDark);

  /**
   * Navega al detalle del proyecto si hay slug válido.
   */
  const handleOpenProject = () => {
    if (!projectSlug) return;
    navigate(`/proyectos/${projectSlug}`);
  };

  return (
    <article
      className={`expertise-card expertise-card-hover tone-${tone} ${
        backgroundImage ? "has-project-bg" : ""
      }`}
      onClick={handleOpenProject}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenProject();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Abrir proyecto ${project.title || "sin título"}`}
      style={{
        cursor: projectSlug ? "pointer" : "default",
      }}
    >
      {backgroundImage ? (
        <>
          <div
            className="project-card-bg"
            aria-hidden="true"
            style={{ backgroundImage: `url("${backgroundImage}")` }}
          />
          <div className="expertise-card-overlay" aria-hidden="true" />
        </>
      ) : null}

      <div className="card-head">
        <div className="expertise-icon">{icon}</div>

        <div className="card-title-wrap">
          <h3>{project.title || "Sin título"}</h3>
        </div>
      </div>

      <p>{project.short_description || "Sin descripción"}</p>

      <div className="laboratory-counter project-card-stack">
        <strong>{project.stack_summary || "Software"}</strong>
      </div>

      {techList.length > 0 ? (
        <div className="project-card-tags">
          {techList.map((tech, techIndex) => (
            <span key={`${tech}-${techIndex}`} className="project-tech-tag">
              {tech}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
