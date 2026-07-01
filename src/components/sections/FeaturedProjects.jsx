import { Link, useNavigate } from "react-router"; // 💡 CAMBIO: Importamos useNavigate junto a Link
import {
  FaArrowRight,
  FaCode,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
} from "react-icons/fa";
import "./FeaturedProjects.css";

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

function ProjectCardSkeleton({ tone = 0 }) {
  return (
    <article
      className={`expertise-card tone-${tone} skeleton-card`}
      aria-hidden="true"
    >
      <div className="card-head">
        <div className="expertise-icon skeleton-block skeleton-icon" />

        <div className="card-title-wrap project-card-skeleton-title">
          <div className="skeleton-block skeleton-text-md w-80" />
        </div>
      </div>

      <div className="skeleton-copy">
        <div className="skeleton-block skeleton-text-sm w-100" />
        <div className="skeleton-block skeleton-text-sm w-90" />
        <div className="skeleton-block skeleton-text-sm w-70" />
      </div>

      <div className="laboratory-counter project-card-skeleton-counter">
        <strong className="skeleton-block skeleton-text-xs w-40" />
      </div>

      <div className="project-card-skeleton-tags">
        <span className="skeleton-block skeleton-pill" />
        <span className="skeleton-block skeleton-pill" />
        <span className="skeleton-block skeleton-pill" />
      </div>
    </article>
  );
}

function FeaturedProjects({ projects = [], loading = false }) {
  const navigate = useNavigate(); // 💡 Inicializamos el hook para cambiar de página programáticamente
  const safeProjects = Array.isArray(projects) ? projects : [];
  const visibleProjects = safeProjects.slice(0, 3);
  const hasProjects = visibleProjects.length > 0;

  return (
    <section
      className="section section-spaced section-separated"
      id="proyectos"
    >
      <div className="section-head-centered">
        <span className="section-kicker">Portfolio</span>
        <h2>Proyectos destacados</h2>
        <p>
          Aplicaciones, integraciones y herramientas técnicas orientadas a
          resultados reales.
        </p>
      </div>

      {loading && !hasProjects ? (
        <div className="expertise-grid skeleton" aria-busy="true">
          {Array.from({ length: 2 }).map((_, index) => (
            <ProjectCardSkeleton
              key={`project-skeleton-${index}`}
              tone={index % 3}
            />
          ))}
        </div>
      ) : hasProjects ? (
        <div className="expertise-grid">
          {visibleProjects.map((project, index) => {
            const techList = Array.isArray(project?.technologies)
              ? project.technologies.filter(Boolean)
              : typeof project?.technologies === "string"
                ? project.technologies
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean)
                : [];

            const icon = getProjectIcon(project, techList);
            const tone = index % 3;

            // 💡 Control de ID seguro por si llega nulo o indefinido temporalmente
            const projectId =
              project.id !== undefined && project.id !== null
                ? project.id
                : index;

            return (
              /* 
                💡 SOLUCIÓN DEFINITIVA: Añadimos onClick y estilo de cursor directo 
                en el artículo para redirigir al detalle usando el ID dinámico de la BBDD.
              */
              <article
                key={project.id ?? `${project.title}-${index}`}
                className={`expertise-card expertise-card-hover tone-${tone}`}
                onClick={() => navigate(`/proyectos/${projectId}`)}
                style={{ cursor: "pointer" }}
              >
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
                    {techList.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={`${tech}-${techIndex}`}
                        className="project-tech-tag"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-inline-state">
          <p>Aún no hay proyectos destacados cargados.</p>
        </div>
      )}

      <div className="section-more">
        <Link to="/proyectos" className="inline-link">
          <span>Ver todos los proyectos</span>
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProjects;
