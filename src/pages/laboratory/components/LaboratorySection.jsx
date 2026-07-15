import * as TheSvg from "@thesvg/react";
import styles from "./LaboratorySection.module.css";

function buildLaboratories(items = []) {
  return Array.isArray(items) ? items.slice(0, 3) : [];
}

function buildStats(statsData = {}) {
  return [
    {
      id: "labs",
      value: `${statsData?.active_laboratories ?? 0}`,
      label: "Laboratorios activos",
      icon: "flask",
    },
    {
      id: "projects",
      value: `${statsData?.projects_count ?? 0}`,
      label: "Proyectos asociados",
      icon: "terminal",
    },
    {
      id: "tech",
      value: `${statsData?.technologies_count ?? 0}`,
      label: "Tecnologías utilizadas",
      icon: "chip",
    },
    {
      id: "docs",
      value: `${statsData?.documents_count ?? 0}`,
      label: "Documentos técnicos",
      icon: "docs",
    },
  ];
}

function getLabHref(lab) {
  return lab?.slug ? `/laboratorio/${lab.slug}` : "/laboratorio";
}

function getStatusMeta(status) {
  const normalized = String(status || "")
    .toLowerCase()
    .trim();

  if (normalized === "activo") {
    return { label: "Activo", className: "isActive" };
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

function renderTechFallback(label = "") {
  const short =
    String(label || "")
      .trim()
      .slice(0, 2)
      .toUpperCase() || "•";

  return <span className={styles.moreTech}>{short}</span>;
}

function normalizeTechSlug(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]/g, "");
}

function toPascalCase(value = "") {
  return String(value || "")
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function getIconCandidates(slug = "", label = "") {
  const normalizedSlug = normalizeTechSlug(slug);
  const normalizedLabel = normalizeTechSlug(label);

  const aliases = {
    js: "javascript",
    javascript: "javascript",
    ts: "typescript",
    node: "nodejs",
    nodejs: "nodejs",
    reactrouter: "reactrouter",
    reactrouterdom: "reactrouter",
    postgres: "postgresql",
    postgresql: "postgresql",
    php84: "php",
    php: "php",
    dockercompose: "docker",
    githubactions: "githubactions",
    cloudflareworkers: "cloudflare",
  };

  const base =
    aliases[normalizedSlug] ||
    aliases[normalizedLabel] ||
    normalizedSlug ||
    normalizedLabel;

  const rawCandidates = [
    base,
    normalizedSlug,
    normalizedLabel,
    label,
    slug,
  ].filter(Boolean);

  return [...new Set(rawCandidates)]
    .map((candidate) => toPascalCase(String(candidate)))
    .filter(Boolean);
}

function resolveTechIcon(slug = "", label = "") {
  const candidates = getIconCandidates(slug, label);

  for (const key of candidates) {
    if (TheSvg[key]) {
      return TheSvg[key];
    }
  }

  return null;
}

function buildAutomaticTopTechnologies(
  featuredItems = [],
  topTechnologies = [],
  limit = 8,
) {
  const source =
    Array.isArray(topTechnologies) && topTechnologies.length > 0
      ? topTechnologies
      : Array.isArray(featuredItems)
        ? featuredItems.flatMap((item) => item?.stack || [])
        : [];

  const registry = new Map();

  source.forEach((tech, index) => {
    if (!tech) return;

    if (typeof tech === "string") {
      const label = tech.trim();
      if (!label) return;

      const slug = normalizeTechSlug(label);
      const key = slug || `tech-${index}`;

      if (!registry.has(key)) {
        registry.set(key, {
          label,
          slug,
          weight: 1,
        });
      } else {
        registry.get(key).weight += 1;
      }

      return;
    }

    const label = tech?.label?.trim?.() || "";
    const rawSlug = tech?.slug?.trim?.() || "";
    const slug = normalizeTechSlug(rawSlug || label);
    const key = slug || label || `tech-${index}`;

    if (!label && !slug) return;

    if (!registry.has(key)) {
      registry.set(key, {
        label: label || rawSlug || "Tecnología",
        slug,
        weight: 1,
      });
    } else {
      registry.get(key).weight += 1;
    }
  });

  const uniqueTechnologies = Array.from(registry.values());

  uniqueTechnologies.sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight;
    return a.label.localeCompare(b.label, "es");
  });

  if (uniqueTechnologies.length <= limit) {
    return uniqueTechnologies;
  }

  const firstBlock = uniqueTechnologies.slice(
    0,
    Math.max(4, Math.floor(limit / 2)),
  );
  const remaining = uniqueTechnologies.slice(firstBlock.length);

  const shuffled = [...remaining].sort((a, b) => {
    const seedA = normalizeTechSlug(a.slug || a.label)
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seedB = normalizeTechSlug(b.slug || b.label)
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return seedA - seedB;
  });

  return [...firstBlock, ...shuffled.slice(0, limit - firstBlock.length)];
}

function TechLogo({ tech }) {
  const Icon = resolveTechIcon(tech?.slug, tech?.label);

  if (!Icon) {
    return renderTechFallback(tech?.label);
  }

  return (
    <Icon
      width={30}
      height={30}
      aria-label={tech?.label || "Tecnología"}
      role="img"
    />
  );
}

export default function LaboratorySection({
  featuredItems = [],
  statsData = {},
  topTechnologies = [],
  loading = false,
  error = "",
}) {
  const laboratories = buildLaboratories(featuredItems);
  const stats = buildStats(statsData);
  const visibleTechnologies = buildAutomaticTopTechnologies(
    featuredItems,
    topTechnologies,
    8,
  );
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
                const title = lab?.title ?? lab?.titulo ?? "";
                const summary = lab?.summary ?? lab?.resumen ?? "";
                const status = lab?.status ?? lab?.estado ?? "";
                const statusMeta = getStatusMeta(status);

                return (
                  <article key={lab.id ?? index} className={styles.labCard}>
                    <div className={styles.labCardInner}>
                      <div className={styles.labIconWrap}>
                        <div className={styles.labHex}>
                          <span className={styles.hexOuter} />
                          <span className={styles.hexInner} />
                          <span className={styles.hexLines} />
                          <span className={styles.hexHalo} />
                          <span className={styles.hexShadow} />
                          <span className={styles.labHexIcon}>
                            {renderLabGlyph(title)}
                          </span>
                        </div>
                      </div>

                      <div className={styles.labContent}>
                        <div className={styles.labTop}>
                          <h3>{title}</h3>
                          <span
                            className={`${styles.status} ${styles[statusMeta.className]}`}
                          >
                            <span className={styles.statusDot} />
                            {statusMeta.label}
                          </span>
                        </div>

                        <p>{summary}</p>

                        <div className={styles.labActions}>
                          <a
                            href={getLabHref(lab)}
                            className={styles.detailButton}
                          >
                            Ver detalles
                          </a>
                          <span className={styles.countBadge}>
                            {lab?.projects_count ?? 0} proyectos
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
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
              {visibleTechnologies.map((tech, index) => (
                <div
                  key={`${tech?.slug || tech?.label || "tech"}-${index}`}
                  className={styles.techCard}
                >
                  <div className={styles.techLogo}>
                    <TechLogo tech={tech} />
                  </div>
                  <span>{tech?.label ?? "Tecnología"}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
