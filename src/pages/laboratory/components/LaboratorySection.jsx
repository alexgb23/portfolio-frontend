import styles from "./LaboratorySection.module.css";

const laboratoryFallback = {
  id: "lab-upcoming-ai",
  title: "Inteligencia Artificial",
  category: "IA aplicada",
  area: "inteligencia artificial",
  status: "activo",
  summary:
    "Modelos de IA, machine learning, agentes, pipelines de datos y aplicaciones útiles orientadas a casos reales.",
  documentationCount: 2,
  progressCount: 3,
  ideasCount: 6,
  is_featured: true,
  stack: ["Python", "OpenAI", "Automatización", "APIs"],
  isPlaceholder: true,
};

const stats = [
  { id: "labs", value: "20+", label: "Laboratorios activos", icon: "flask" },
  {
    id: "hours",
    value: "1500+",
    label: "Horas de investigación",
    icon: "terminal",
  },
  { id: "tech", value: "30+", label: "Tecnologías utilizadas", icon: "chip" },
  { id: "docs", value: "50+", label: "Documentos técnicos", icon: "docs" },
];

const technologies = [
  { id: "proxmox", label: "Proxmox", icon: "proxmox" },
  { id: "docker", label: "Docker", icon: "docker" },
  { id: "kubernetes", label: "Kubernetes", icon: "kubernetes" },
  { id: "linux", label: "Linux", icon: "linux" },
  { id: "pfsense", label: "PfSense", icon: "pfsense" },
  { id: "home-assistant", label: "Home Assistant", icon: "homeassistant" },
  { id: "python", label: "Python", icon: "python" },
  { id: "more", label: "+20", icon: "more" },
];

function buildLaboratories(items = []) {
  const normalized = Array.isArray(items) ? items.slice(0, 2) : [];

  if (normalized.length >= 3) {
    return normalized.slice(0, 3);
  }

  return [...normalized, laboratoryFallback];
}

function getLabHref(lab) {
  if (lab?.isPlaceholder) return "/laboratorio";
  return lab?.id ? `/laboratorio/${lab.id}` : "/laboratorio";
}

function getLabTone(index) {
  if (index === 0) return "cyan";
  if (index === 1) return "green";
  return "violet";
}

function getStatusMeta(status) {
  const normalized = String(status || "")
    .toLowerCase()
    .trim();

  if (normalized === "activo") {
    return {
      label: "Activo",
      className: "isActive",
    };
  }

  return {
    label: normalized
      ? normalized.charAt(0).toUpperCase() + normalized.slice(1)
      : "Inactivo",
    className: "isInactive",
  };
}

function renderStatIcon(type) {
  switch (type) {
    case "flask":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 2v5l-5.5 9.2A3.2 3.2 0 0 0 7.2 21h9.6a3.2 3.2 0 0 0 2.7-4.8L14 7V2" />
          <path d="M9 2h6" />
          <path d="M8.5 14h7" />
        </svg>
      );
    case "terminal":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6.5h16A1.5 1.5 0 0 1 21.5 8v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Z" />
          <path d="m7 10 2 2-2 2" />
          <path d="M11.5 14h4.5" />
        </svg>
      );
    case "chip":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M9 1.5v3M15 1.5v3M9 19.5v3M15 19.5v3M1.5 9h3M1.5 15h3M19.5 9h3M19.5 15h3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="6.5" y="3" width="11" height="18" rx="2" />
          <path d="M9.5 7.5h5M9.5 11h5M9.5 14.5h5" />
        </svg>
      );
  }
}

function renderTechIcon(type) {
  switch (type) {
    case "proxmox":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 6 11 12 5 18" />
          <path d="M11 6 17 12 11 18" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="10" width="3" height="3" rx="0.6" />
          <rect x="8" y="10" width="3" height="3" rx="0.6" />
          <rect x="12" y="10" width="3" height="3" rx="0.6" />
          <rect x="8" y="6" width="3" height="3" rx="0.6" />
          <rect x="12" y="6" width="3" height="3" rx="0.6" />
          <path d="M4 14h11.5c2.5 0 4.2-1.1 4.9-3.3.8.1 1.4-.1 2.1-.6-.1 1.2-.6 2.2-1.4 3 0 3.1-2.7 5.4-6.2 5.4H10c-3.3 0-5.4-1.8-6-4.5" />
        </svg>
      );
    case "kubernetes":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.8 19.2 7v10L12 21.2 4.8 17V7z" />
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 4.8v3M12 16.2v3M6.7 8.1l2.5 1.5M14.8 14.4l2.5 1.5M17.3 8.1l-2.5 1.5M9.2 14.4l-2.5 1.5" />
        </svg>
      );
    case "linux":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4.2c2.2 0 3.6 2.1 3.6 4.7 0 1.2-.3 2.3-.8 3.2.8.7 1.4 1.9 1.7 3.1.3 1.1.9 2 1.7 2.8-.8.9-1.9 1.5-3.1 1.5-.9 0-1.6-.4-2.1-1.1-.4.7-1.1 1.1-2 1.1s-1.6-.4-2-1.1c-.5.7-1.2 1.1-2.1 1.1-1.2 0-2.3-.6-3.1-1.5.8-.8 1.4-1.7 1.7-2.8.3-1.2.9-2.4 1.7-3.1-.5-.9-.8-2-.8-3.2 0-2.6 1.4-4.7 3.6-4.7Z" />
          <circle cx="10" cy="9.4" r="0.7" />
          <circle cx="14" cy="9.4" r="0.7" />
          <path d="M10.2 12.6c1 .6 2.6.6 3.6 0" />
        </svg>
      );
    case "pfsense":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.8 19.2 7v10L12 21.2 4.8 17V7z" />
          <circle cx="9.2" cy="11" r="1.3" />
          <circle cx="14.8" cy="11" r="1.3" />
          <path d="M8.4 15c.9-.8 2.1-1.2 3.6-1.2s2.7.4 3.6 1.2" />
        </svg>
      );
    case "homeassistant":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 11.2 12 5l7.5 6.2v7.3a.9.9 0 0 1-.9.9h-4.2v-5h-4.8v5H5.4a.9.9 0 0 1-.9-.9z" />
          <path d="M9.5 10.2h.01M14.5 10.2h.01" />
          <path d="M10 12.8c.6.5 1.2.8 2 .8s1.4-.3 2-.8" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5c-3.4 0-3.2 1.5-3.2 1.5v2.3h4.9v.8H6.9S3.5 7.7 3.5 12c0 4.3 2.9 4.1 2.9 4.1h1.7v-2.4s-.1-2.9 2.9-2.9h4.9s2.8 0 2.8-2.7V5.9S19 3.5 15.6 3.5z" />
          <path d="M12 20.5c3.4 0 3.2-1.5 3.2-1.5v-2.3h-4.9v-.8h6.8s3.4.4 3.4-3.9c0-4.3-2.9-4.1-2.9-4.1h-1.7v2.4s.1 2.9-2.9 2.9H8.1S5.3 13.2 5.3 16v2.1s.1 2.4 3.5 2.4z" />
          <circle cx="10.2" cy="5.9" r="0.6" />
          <circle cx="13.8" cy="18.1" r="0.6" />
        </svg>
      );
    default:
      return <span className={styles.moreTech}>+20</span>;
  }
}

function renderLabGlyph(title = "") {
  const normalized = title.toLowerCase();

  if (normalized.includes("backend")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="5" ry="2.2" />
        <path d="M7 6v4c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2V6" />
        <path d="M7 10v4c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2v-4" />
        <path d="M7 14v4c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2v-4" />
      </svg>
    );
  }

  if (normalized.includes("frontend")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8.5 12 3l8 5.5v9L12 21l-8-3.5v-9Z" />
        <path d="M8.5 13.5V11a3.5 3.5 0 0 1 7 0v2.5" />
        <path d="M8 13.5h8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5c-3.8 0-6.8 2.7-6.8 6.1 0 2 1 3.7 2.7 4.8V19l2.7-1.5c.45.08.92.12 1.4.12 3.8 0 6.8-2.7 6.8-6.1S15.8 4.5 12 4.5Z" />
      <path d="M9.5 10.5c.45-.9 1.2-1.35 2.1-1.35 1.05 0 1.9.6 2.35 1.5" />
      <path d="M9.4 13.4c.55.75 1.45 1.2 2.6 1.2s2.05-.45 2.6-1.2" />
    </svg>
  );
}

export default function LaboratorySection({
  featuredItems = [],
  loading = false,
  error = "",
}) {
  const laboratories = buildLaboratories(featuredItems);
  const hasLaboratories = laboratories.length > 0;

  if (loading && !hasLaboratories) {
    return (
      <section className={`section ${styles.laboratorySection}`}>
        <div className="container">
          <div className="section-head-centered">
            <span className="section-kicker">Laboratorios destacados</span>
            <h2>Áreas activas en SYSKOVEX</h2>
            <p>Cargando laboratorios destacados...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && !hasLaboratories) {
    return (
      <section className={`section ${styles.laboratorySection}`}>
        <div className="container">
          <div className="section-head-centered">
            <span className="section-kicker">Laboratorios destacados</span>
            <h2>Áreas activas en SYSKOVEX</h2>
            <p>No se pudieron cargar los laboratorios en este momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.laboratorySection}`}>
      <div className="container">
        <div className={styles.block}>
          <div className={styles.blockHead}>
            <span className={styles.blockKicker}>Laboratorios destacados</span>
          </div>

          <div className={styles.featuredRow}>
            <div className={styles.featuredScroller}>
              {laboratories.map((lab, index) => {
                const tone = getLabTone(index);
                const statusMeta = getStatusMeta(lab.status);

                return (
                  <article
                    key={lab.id}
                    className={`${styles.labCard} ${
                      styles[
                        `tone${tone.charAt(0).toUpperCase() + tone.slice(1)}`
                      ]
                    }`}
                  >
                    <div className={styles.labCardInner}>
                      <div className={styles.labIconWrap}>
                        <div className={styles.labHex}>
                          <span className={styles.hexOuter} />
                          <span className={styles.hexInner} />
                          <span className={styles.hexLines} />
                          <span className={styles.hexHalo} />
                          <span className={styles.hexShadow} />

                          <span className={styles.labHexIcon}>
                            {renderLabGlyph(lab.title)}
                          </span>
                        </div>
                      </div>

                      <div className={styles.labContent}>
                        <div className={styles.labTop}>
                          <h3>{lab.title}</h3>

                          <span
                            className={`${styles.status} ${styles[statusMeta.className]}`}
                          >
                            <span className={styles.statusDot} />
                            {statusMeta.label}
                          </span>
                        </div>

                        <p>{lab.summary}</p>

                        <div className={styles.labActions}>
                          <a
                            href={getLabHref(lab)}
                            className={styles.detailButton}
                          >
                            Ver detalles
                          </a>

                          <span className={styles.countBadge}>
                            {lab.progressCount || lab.documentationCount || 0}{" "}
                            proyectos
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <a
              href="/laboratorio"
              className={styles.arrowButton}
              aria-label="Ver más laboratorios"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.bottomGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>
                Mi laboratorio en cifras
              </span>
            </div>

            <div className={styles.statsGrid}>
              {stats.map((item) => (
                <div key={item.id} className={styles.statCard}>
                  <div className={styles.statIcon}>
                    {renderStatIcon(item.icon)}
                  </div>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Tecnologías principales</span>
            </div>

            <div className={styles.techGrid}>
              {technologies.map((tech) => (
                <div key={tech.id} className={styles.techCard}>
                  <div className={styles.techLogo}>
                    {renderTechIcon(tech.icon)}
                  </div>
                  <span>{tech.label}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
