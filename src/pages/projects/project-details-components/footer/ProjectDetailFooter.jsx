import { Link } from "react-router";
import { FiCode, FiPlay, FiSend } from "react-icons/fi";

import "./ProjectDetailFooter.css";

function ProjectDetailFooter({ project }) {
  const visibleLinks = Array.isArray(project?.adjuntos)
    ? project.adjuntos.filter(
        (item) =>
          item &&
          item.es_visible !== false &&
          typeof item.url === "string" &&
          item.url.trim().length > 0,
      )
    : [];

  const codeLink =
    visibleLinks.find((item) => item.grupo === "backend") ||
    visibleLinks.find((item) => item.grupo === "api") ||
    visibleLinks[0] ||
    null;

  const demoLink =
    visibleLinks.find((item) => item.grupo === "general") ||
    visibleLinks.find((item) => item.es_destacado) ||
    visibleLinks[1] ||
    null;

  return (
    <footer className="project-detail__footer project-footer" id="stack">
      <div className="project-footer__card">
        <div className="project-footer__background" aria-hidden="true" />

        <div className="project-footer__content">
          <div className="project-footer__visual" aria-hidden="true" />

          <div className="project-footer__copy">
            <h2>¿Te interesa este proyecto?</h2>

            <p>
              Si tienes alguna pregunta o quieres colaborar en algo similar,
              estaré encantado de hablar contigo.
            </p>
          </div>

          <div className="project-footer__actions">
            {codeLink ? (
              <a
                href={codeLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-footer__button"
                aria-label="Abrir código del proyecto en una pestaña nueva"
              >
                <FiCode aria-hidden="true" />
                <span>Ver código</span>
              </a>
            ) : null}

            {demoLink ? (
              <a
                href={demoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-footer__button"
                aria-label="Abrir demostración del proyecto en una pestaña nueva"
              >
                <FiPlay aria-hidden="true" />
                <span>Ver demo</span>
              </a>
            ) : null}

            <Link
              to="/contacto"
              className="project-footer__button project-footer__button--primary"
              aria-label="Ir a la página de contacto"
            >
              <FiSend aria-hidden="true" />
              <span>Contactar</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ProjectDetailFooter;
