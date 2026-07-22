import "./ProjectDetailSidebar.css";
import {
  FiCode,
  FiHome,
  FiGrid,
  FiFolder,
  FiTrendingUp,
  FiBox,
  FiBookmark,
  FiSettings,
} from "react-icons/fi";

function ProjectDetailSidebar({ project, isMobile = false, onNavigate }) {
  const firstLetter = project?.title?.charAt(0)?.toUpperCase() || "P";
  const sectionsCount = Array.isArray(project?.secciones)
    ? project.secciones.filter((section) => section.es_visible).length
    : 0;

  const handleClick = () => {
    if (typeof onNavigate === "function") {
      onNavigate();
    }
  };

  return (
    <aside
      className={`project-detail__sidebar ${isMobile ? "is-mobile-drawer" : ""}`}
    >
      <div className="project-sidebar__top">
        <button
          type="button"
          className="project-sidebar__logo"
          aria-label="Proyecto"
          onClick={handleClick}
        >
          <FiCode />
        </button>

        <nav
          className="project-sidebar__nav"
          aria-label="Navegación del proyecto"
        >
          <button
            type="button"
            className="project-sidebar__item is-active"
            aria-label="Resumen"
            onClick={handleClick}
          >
            <FiHome />
          </button>

          <button
            type="button"
            className="project-sidebar__item"
            aria-label="Secciones"
            onClick={handleClick}
          >
            <FiGrid />
          </button>

          <button
            type="button"
            className="project-sidebar__item"
            aria-label="Adjuntos"
            onClick={handleClick}
          >
            <FiFolder />
          </button>

          <button
            type="button"
            className="project-sidebar__item"
            aria-label="Estado"
            onClick={handleClick}
          >
            <FiTrendingUp />
          </button>

          <button
            type="button"
            className="project-sidebar__item"
            aria-label="Stack"
            onClick={handleClick}
          >
            <FiBox />
          </button>

          <button
            type="button"
            className="project-sidebar__item"
            aria-label="Guardar"
            onClick={handleClick}
          >
            <FiBookmark />
          </button>

          <button
            type="button"
            className="project-sidebar__item"
            aria-label="Configuración"
            onClick={handleClick}
          >
            <FiSettings />
          </button>
        </nav>
      </div>

      <div className="project-sidebar__bottom">
        <div className="project-sidebar__meta">
          <span className="project-sidebar__badge">
            {project?.area_principal || "project"}
          </span>
          <span className="project-sidebar__count">{sectionsCount}</span>
        </div>

        <button
          type="button"
          className="project-sidebar__avatar"
          aria-label={project?.title}
          onClick={handleClick}
        >
          <span>{firstLetter}</span>
          <i className="project-sidebar__status" />
        </button>
      </div>
    </aside>
  );
}

export default ProjectDetailSidebar;
