import ProjectFoldersModule from "./ProjectFoldersModule";
import styles from "./ProjectShowcase.module.css";

function normalizeCodeLines(items) {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    if (typeof item === "string") {
      return item.split("\n");
    }

    if (item && typeof item === "object" && item.codigo) {
      return String(item.codigo).split("\n");
    }

    return [];
  });
}

function normalizeTechnologies(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (typeof item === "string") {
        return {
          name: item,
          value: null,
        };
      }

      if (item && typeof item === "object") {
        return {
          name: item.name || item.titulo || "Tecnología",
          value: Number.isFinite(Number(item.value)) ? Number(item.value) : null,
        };
      }

      return null;
    })
    .filter(Boolean);
}

function ProjectShowcase({ project }) {
  const section =
    project?.secciones?.find((item) => item?.clave === "project_showcase") ||
    null;

  if (!section) return null;

  const metadata =
    section?.metadata &&
    typeof section.metadata === "object" &&
    !Array.isArray(section.metadata)
      ? section.metadata
      : {};

  const title = section?.titulo || "Estructura técnica del proyecto";
  const tree = Array.isArray(metadata.tree) ? metadata.tree : [];
  const badge = metadata.stack_badge || section?.codigo_lenguaje || "Proyecto";

  const highlightedCode = normalizeCodeLines(metadata.highlighted_code);
  const technologies = normalizeTechnologies(metadata.technologies);

  const codeTitle = metadata.code_title || "Código Destacado";
  const codeBadge = metadata.code_badge || "routes/api.php";
  const techTitle = metadata.tech_title || "Tecnologías Utilizadas";

  return (
    <section className={styles.section} id="showcase">
      <div className={styles.grid}>
        <article className={`${styles.panel} ${styles.panelStretch}`}>
          <ProjectFoldersModule title={title} tree={tree} badge={badge} />
        </article>

        <article
          className={`${styles.panel} ${styles.panelStretch} ${styles.codePanel}`}
        >
          <div className={styles.panelHeader}>
            <h3>{codeTitle}</h3>
            <span className={styles.fileBadge}>{codeBadge}</span>
          </div>

          <div className={styles.panelBody}>
            <div className={`${styles.codeBlock} ${styles.customScroll}`}>
              {highlightedCode.length > 0 ? (
                highlightedCode.map((line, index) => (
                  <div key={`${line}-${index}`} className={styles.codeLine}>
                    <span className={styles.lineNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <code>{line || " "}</code>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  No hay código destacado disponible.
                </div>
              )}
            </div>
          </div>
        </article>

        <article className={`${styles.panel} ${styles.panelStretch}`}>
          <div className={styles.panelHeader}>
            <h3>{techTitle}</h3>
          </div>

          <div className={styles.panelBody}>
            <div className={`${styles.techList} ${styles.customScroll}`}>
              {technologies.length > 0 ? (
                technologies.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className={styles.techItem}
                  >
                    <div className={styles.techMeta}>
                      <span>{item.name}</span>
                      <span>
                        {item.value === null ? "—" : `${item.value}%`}
                      </span>
                    </div>

                    <div className={styles.techBar}>
                      <span
                        style={{
                          width: `${item.value ?? 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  No hay tecnologías disponibles.
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ProjectShowcase;
