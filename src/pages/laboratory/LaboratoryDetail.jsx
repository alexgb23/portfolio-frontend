import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaTag,
  FaLayerGroup,
  FaCircle,
} from "react-icons/fa";

import { useLaboratoryDetail } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";
import "./Laboratory.css";

function getDetailTone(item) {
  const value = item?.category || item?.type || "";

  const map = {
    automation: "tone-0",
    monitoring: "tone-1",
    ai: "tone-2",
    research: "tone-1",
    virtualization: "tone-1",
    networking: "tone-2",
    backup: "tone-0",
  };

  return map[value] || "tone-1";
}

function LaboratoryDetail() {
  const { id } = useParams();
  const { laboratoryItem, loading, error } = useLaboratoryDetail(id);

  const title =
    laboratoryItem?.title || laboratoryItem?.name || "Detalle del laboratorio";

  usePageTitle(`${title} | Laboratorio Técnico`);

  if (loading) {
    return (
      <div className="state-wrapper centered">
        <div className="sys-loader"></div>
        <h2>Cargando detalle del proyecto...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-wrapper error centered">
        <h2>Error al cargar el detalle</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!laboratoryItem) {
    return (
      <div className="state-wrapper centered">
        <h2>Proyecto no encontrado</h2>
        <p>No se ha encontrado información para este elemento del laboratorio.</p>
      </div>
    );
  }

  const tags = Array.isArray(laboratoryItem?.tags) ? laboratoryItem.tags : [];
  const stack = Array.isArray(laboratoryItem?.stack) ? laboratoryItem.stack : [];
  const links = Array.isArray(laboratoryItem?.links) ? laboratoryItem.links : [];

  const summary =
    laboratoryItem?.summary ||
    laboratoryItem?.excerpt ||
    laboratoryItem?.description_short ||
    "";

  const description =
    laboratoryItem?.description ||
    laboratoryItem?.content ||
    laboratoryItem?.body ||
    laboratoryItem?.details ||
    "";

  const toneClass = getDetailTone(laboratoryItem);

  return (
    <section className="section section-spaced laboratory-page">
      <div className="lab-back-link-wrap">
        <Link to="/laboratorio" className="inline-link">
          <FaArrowLeft />
          Volver al laboratorio
        </Link>
      </div>

      <header className="laboratory-detail-hero">
        <span className="section-kicker">
          {laboratoryItem?.type ||
            laboratoryItem?.category ||
            "Proyecto técnico"}
        </span>

        <h1>{title}</h1>

        {summary ? <p>{summary}</p> : null}
      </header>

      <section className="laboratory-detail-layout">
        <article className="laboratory-detail-main">
          <div className={`expertise-card card-hover laboratory-card lab-detail-card ${toneClass}`}>
            <div className="card-head">
              <div className="expertise-icon">
                <FaLayerGroup />
              </div>

              <div className="card-title-wrap">
                <h3>Descripción</h3>
              </div>
            </div>

            <p>
              {description ||
                "Este proyecto todavía no tiene una descripción detallada disponible."}
            </p>
          </div>

          {laboratoryItem?.demo_url ||
          laboratoryItem?.repository_url ||
          links.length > 0 ? (
            <div className={`expertise-card card-hover laboratory-card lab-detail-card ${toneClass}`}>
              <div className="card-head">
                <div className="expertise-icon">
                  <FaExternalLinkAlt />
                </div>

                <div className="card-title-wrap">
                  <h3>Recursos</h3>
                </div>
              </div>

              <div className="lab-detail-links">
                {laboratoryItem?.demo_url ? (
                  <a
                    href={laboratoryItem.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                  >
                    <FaExternalLinkAlt />
                    Ver demo
                  </a>
                ) : null}

                {laboratoryItem?.repository_url ? (
                  <a
                    href={laboratoryItem.repository_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                  >
                    <FaGithub />
                    Ver repositorio
                  </a>
                ) : null}

                {links.map((link, index) => {
                  const href = link?.url || link?.href;
                  const label =
                    link?.label || link?.title || `Enlace ${index + 1}`;

                  if (!href) return null;

                  return (
                    <a
                      key={`${href}-${index}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-link"
                    >
                      <FaExternalLinkAlt />
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}
        </article>

        <aside className="laboratory-detail-side">
          <div className={`expertise-card card-hover laboratory-card lab-detail-card ${toneClass}`}>
            <div className="card-head">
              <div className="expertise-icon">
                <FaCircle />
              </div>

              <div className="card-title-wrap">
                <h3>Metadatos</h3>
              </div>
            </div>

            <div className="lab-detail-meta">
              <div>
                <span>Estado</span>
                <strong>{laboratoryItem?.status || "No especificado"}</strong>
              </div>

              <div>
                <span>Tipo</span>
                <strong>
                  {laboratoryItem?.type ||
                    laboratoryItem?.category ||
                    "General"}
                </strong>
              </div>

              <div>
                <span>Slug / ID</span>
                <strong>{laboratoryItem?.slug || laboratoryItem?.id || id}</strong>
              </div>
            </div>
          </div>

          {tags.length > 0 ? (
            <div className={`expertise-card card-hover laboratory-card lab-detail-card ${toneClass}`}>
              <div className="card-head">
                <div className="expertise-icon">
                  <FaTag />
                </div>

                <div className="card-title-wrap">
                  <h3>Tags</h3>
                </div>
              </div>

              <div className="lab-project-tags">
                {tags.map((tag, index) => (
                  <span className="tag" key={`tag-${index}`}>
                    <FaTag />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {stack.length > 0 ? (
            <div className={`expertise-card card-hover laboratory-card lab-detail-card ${toneClass}`}>
              <div className="card-head">
                <div className="expertise-icon">
                  <FaLayerGroup />
                </div>

                <div className="card-title-wrap">
                  <h3>Stack</h3>
                </div>
              </div>

              <div className="lab-project-tags">
                {stack.map((item, index) => (
                  <span className="tag" key={`stack-${index}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>
    </section>
  );
}

export default LaboratoryDetail;