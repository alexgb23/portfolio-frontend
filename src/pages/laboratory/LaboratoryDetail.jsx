import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaTag,
  FaLayerGroup,
  FaCircle,
} from "react-icons/fa";
import { useMemo } from "react";

import { useLaboratoryDetail } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";
import LaboratorySkeleton from "./LaboratorySkeleton";
import "./Laboratory.css";

function getDetailSectionClass(item) {
  const value = item?.category || item?.type || "";

  const map = {
    automation: "lab-section-automation",
    monitoring: "lab-section-infra",
    virtualization: "lab-section-infra",
    networking: "lab-section-infra",
    ai: "lab-section-ai",
    research: "lab-section-research",
    backup: "lab-section-automation",
  };

  return map[value] || "lab-section-infra";
}

function LaboratoryDetail() {
  const { id } = useParams();
  const { laboratoryItem, loading, error } = useLaboratoryDetail(id);

  const normalized = useMemo(() => {
    return {
      title:
        laboratoryItem?.title ||
        laboratoryItem?.name ||
        "Detalle del laboratorio",
      tags: Array.isArray(laboratoryItem?.tags) ? laboratoryItem.tags : [],
      stack: Array.isArray(laboratoryItem?.stack) ? laboratoryItem.stack : [],
      links: Array.isArray(laboratoryItem?.links) ? laboratoryItem.links : [],
      summary:
        laboratoryItem?.summary ||
        laboratoryItem?.excerpt ||
        laboratoryItem?.description_short ||
        "",
      description:
        laboratoryItem?.description ||
        laboratoryItem?.content ||
        laboratoryItem?.body ||
        laboratoryItem?.details ||
        "",
      sectionClass: getDetailSectionClass(laboratoryItem),
    };
  }, [laboratoryItem]);

  usePageTitle(`${normalized.title} | Laboratorio Técnico`);

  if (loading) return <LaboratorySkeleton />;

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
        <p>
          No se ha encontrado información para este elemento del laboratorio.
        </p>
      </div>
    );
  }

  return (
    <section
      className={`section section-spaced laboratory-page laboratory-detail-page ${normalized.sectionClass}`}
    >
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

        <h1>{normalized.title}</h1>

        {normalized.summary ? <p>{normalized.summary}</p> : null}
      </header>

      <section className="laboratory-detail-layout">
        <article className="laboratory-detail-main">
          <div className="expertise-card expertise-card-hover laboratory-card lab-detail-card">
            <div className="card-head">
              <div className="expertise-icon">
                <FaLayerGroup />
              </div>

              <div className="card-title-wrap">
                <h3>Descripción</h3>
              </div>
            </div>

            <p>
              {normalized.description ||
                "Este proyecto todavía no tiene una descripción detallada disponible."}
            </p>
          </div>

          {laboratoryItem?.demo_url ||
          laboratoryItem?.repository_url ||
          normalized.links.length > 0 ? (
            <div className="expertise-card expertise-card-hover laboratory-card lab-detail-card">
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

                {normalized.links.map((link, index) => {
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
          <div className="expertise-card expertise-card-hover laboratory-card lab-detail-card">
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
                <strong>
                  {laboratoryItem?.slug || laboratoryItem?.id || id}
                </strong>
              </div>
            </div>
          </div>

          {normalized.tags.length > 0 ? (
            <div className="expertise-card expertise-card-hover laboratory-card lab-detail-card">
              <div className="card-head">
                <div className="expertise-icon">
                  <FaTag />
                </div>

                <div className="card-title-wrap">
                  <h3>Tags</h3>
                </div>
              </div>

              <div className="lab-project-tags">
                {normalized.tags.map((tag, index) => (
                  <span className="tag" key={`tag-${index}`}>
                    <FaTag />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {normalized.stack.length > 0 ? (
            <div className="expertise-card expertise-card-hover laboratory-card lab-detail-card">
              <div className="card-head">
                <div className="expertise-icon">
                  <FaLayerGroup />
                </div>

                <div className="card-title-wrap">
                  <h3>Stack</h3>
                </div>
              </div>

              <div className="lab-project-tags">
                {normalized.stack.map((item, index) => (
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
