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

function normalizeTechList(technologies) {
  if (Array.isArray(technologies)) {
    return technologies.filter(Boolean);
  }

  if (typeof technologies === "string") {
    try {
      const parsed = JSON.parse(technologies);

      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch {
      return technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
    }
  }

  return [];
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

export default function ProjectCard({ project, index = 0 }) {
  const navigate = useNavigate();

  if (!project) return null;

  const techList = normalizeTechList(project.technologies);
  const tone = index % 3;
  const icon = getProjectIcon(project, techList);

  const badgeText = project.is_featured ? "Destacado" : "Proyecto";
  const summaryText = project.stack_summary || "Software";
  const titleText = project.title || "Sin título";
  const descriptionText = project.short_description || "Sin descripción";
  const projectSlug =
    typeof project.slug === "string" ? project.slug.trim() : "";

  const handleOpenProject = () => {
    if (!projectSlug) return;
    navigate(`/proyectos/${projectSlug}`);
  };

  return (
    <article
      className={`card card-hover card-project tone-${tone}`}
      onClick={handleOpenProject}
      onKeyDown={(event) => {
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
      <div className="project-card-inner">
        <div className="card-top">
          <span className="card-badge">{badgeText}</span>
          <span className="date">{summaryText}</span>
        </div>

        <div className="card-head">
          <div className="card-icon">{icon}</div>

          <div className="card-title-wrap">
            <h3>{titleText}</h3>
          </div>
        </div>

        <div className="project-card-divider" />

        <p>{descriptionText}</p>

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
