import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
} from "react-icons/fa";
import "./FeaturedProjectCard.css";

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
  }

  return [];
}

function getProjectThemeImages(project, isDark) {
  const darkImages = normalizeList(project?.card_background_dark);
  const lightImages = normalizeList(project?.card_background_light);

  if (isDark) {
    return darkImages.length ? darkImages : lightImages;
  }

  return lightImages.length ? lightImages : darkImages;
}

function getImageSources(images) {
  const normalized = normalizeList(images);

  const avif = normalized.find((item) => /\.avif(\?.*)?$/i.test(item)) || "";
  const webp = normalized.find((item) => /\.webp(\?.*)?$/i.test(item)) || "";
  const fallback = webp || avif || normalized[0] || "";

  return { avif, webp, fallback };
}

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

export default function ProjectCard({
  project = null,
  index = 0,
  maxTags = 3,
}) {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }
    return false;
  });

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

  const techList = useMemo(() => {
    return normalizeList(project?.technologies ?? project?.tecnologías).slice(
      0,
      maxTags,
    );
  }, [project?.technologies, project?.tecnologías, maxTags]);

  const tone = index % 3;

  const projectSlug = useMemo(() => {
    return typeof project?.slug === "string" ? project.slug.trim() : "";
  }, [project?.slug]);

  const icon = useMemo(() => {
    return getProjectIcon(project, techList);
  }, [project, techList]);

  const themeImages = useMemo(() => {
    return getProjectThemeImages(project, isDark);
  }, [project, isDark]);

  const imageSources = useMemo(() => {
    return getImageSources(themeImages);
  }, [themeImages]);

  const hasBackground = Boolean(imageSources.fallback);

  const handleOpenProject = () => {
    if (!projectSlug) return;
    navigate(`/proyectos/${projectSlug}`);
  };

  if (!project) return null;

  return (
    <article
      className={`expertise-card expertise-card-hover tone-${tone} ${
        hasBackground ? "has-project-bg" : ""
      }`}
      onClick={handleOpenProject}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenProject();
        }
      }}
      role="button"
      tabIndex={projectSlug ? 0 : -1}
      aria-label={`Abrir proyecto ${project?.title || "sin título"}`}
      style={{ cursor: projectSlug ? "pointer" : "default" }}
    >
      {hasBackground ? (
        <>
          <div className="project-card-bg" aria-hidden="true">
            <picture className="project-card-bg__picture">
              {imageSources.avif ? (
                <source type="image/avif" srcSet={imageSources.avif} />
              ) : null}

              {imageSources.webp ? (
                <source type="image/webp" srcSet={imageSources.webp} />
              ) : null}

              <img
                src={imageSources.fallback}
                alt=""
                className="project-card-bg__image"
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="expertise-card-overlay" aria-hidden="true" />
        </>
      ) : null}

      <div className="card-head">
        <div className="expertise-icon">{icon}</div>

        <div className="card-title-wrap">
          <h3>{project?.title || "Sin título"}</h3>
        </div>
      </div>

      <p>{project?.short_description || "Sin descripción"}</p>

      <div className="laboratory-counter project-card-stack">
        <strong>{project?.stack_summary || "Software"}</strong>
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
