import * as BrandIcons from "react-icons/si";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./LaboratorySection.module.css";

const FIXED_TECHNOLOGIES = [
  {
    id: "proxmox",
    label: "Proxmox",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/proxmox/default.svg",
  },
  {
    id: "docker",
    label: "Docker",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/docker/default.svg",
  },
  {
    id: "n8n",
    label: "n8n",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/n8n/dark.svg",
  },
  {
    id: "home-assistant",
    label: "Home Assistant",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/home-assistant/default.svg",
  },
  {
    id: "react",
    label: "React",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/react/default.svg",
  },
];


function useLaboratoryWheel(ref, count) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleWheel = (event) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (!event.deltaY) return;

      const max = element.scrollWidth - element.clientWidth;
      if (max <= 1) return;

      const unit = event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? element.clientWidth
          : 1;

      const delta = event.deltaY * unit;
      const canMove = delta > 0
        ? element.scrollLeft < max - 1
        : element.scrollLeft > 1;

      if (!canMove) return;

      event.preventDefault();
      element.scrollLeft += delta;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [ref, count]);
}

const TECHNOLOGY_ICON_CATALOG = {
  laravel: { Icon: BrandIcons.SiLaravel, color: "#f05340" },
  sanctum: { Icon: BrandIcons.SiLaravel, color: "#f05340" },
  php: { Icon: BrandIcons.SiPhp, color: "#8993be" },
  docker: { Icon: BrandIcons.SiDocker, color: "#2496ed" },
  dockercompose: { Icon: BrandIcons.SiDocker, color: "#2496ed" },
  render: { Icon: BrandIcons.SiRender, color: "#46bca6" },
  postgresql: { Icon: BrandIcons.SiPostgresql, color: "#5f91ba" },
  neonpostgresql: { Icon: BrandIcons.SiPostgresql, color: "#38b997" },
  filament: { Icon: BrandIcons.SiFilament, color: "#e8a83e" },
  resend: { Icon: BrandIcons.SiResend, color: "#7188a5" },
  react: { Icon: BrandIcons.SiReact, color: "#20a6c8" },
  vite: { Icon: BrandIcons.SiVite, color: "#9872ed" },
  javascript: { Icon: BrandIcons.SiJavascript, color: "#d4af12" },
  axios: { Icon: BrandIcons.SiAxios, color: "#9867e8" },
  reactrouter: { Icon: BrandIcons.SiReactrouter, color: "#ef5b65" },
  cloudflare: { Icon: BrandIcons.SiCloudflare, color: "#f48120" },
  proxmox: { Icon: BrandIcons.SiProxmox, color: "#e57000" },
  homeassistant: { Icon: BrandIcons.SiHomeassistant, color: "#18a7d5" },
};

function normalizeTechnologyKey(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function collectLaboratoryTechnologies(laboratories) {
  const technologies = new Map();

  for (const tech of FIXED_TECHNOLOGIES) {
    technologies.set(normalizeTechnologyKey(tech.label), tech);
  }

  for (const lab of laboratories) {
    const stack = Array.isArray(lab?.stack) ? lab.stack : [];

    for (const entry of stack) {
      const label = typeof entry === "string"
        ? entry.trim()
        : String(entry?.label || entry?.name || "").trim();

      if (!label) continue;

      const key = normalizeTechnologyKey(label);
      if (!key || technologies.has(key)) continue;

      const slug = normalizeTechnologyKey(entry?.slug);
      const catalog =
        TECHNOLOGY_ICON_CATALOG[key] ||
        TECHNOLOGY_ICON_CATALOG[slug] ||
        {};

      technologies.set(key, {
        id: key,
        label,
        Icon: catalog.Icon,
        iconColor: catalog.color || "currentColor",
        iconUrl: typeof entry === "object"
          ? entry?.iconUrl || entry?.icon_url || ""
          : "",
      });
    }
  }

  return Array.from(technologies.values());
}

function TechnologyListIcon({ tech, index }) {
  const [failed, setFailed] = useState(false);
  const Icon = tech.Icon;

  return (
    <span
      className={styles.popoverTechIcon}
      style={{ "--tech-hue": (index * 47 + 190) % 360 }}
      aria-hidden="true"
    >
      {tech.iconUrl && !failed ? (
        <img
          src={tech.iconUrl}
          alt=""
          width="26"
          height="26"
          onError={() => setFailed(true)}
        />
      ) : (
        <span style={{ color: tech.iconColor || undefined }}>
            {Icon ? (
              <Icon size={26} aria-hidden="true" />
            ) : (
              tech.label.slice(0, 2).toUpperCase()
            )}
          </span>
      )}
    </span>
  );
}

function TechnologiesDialog({ open, onClose, technologies, id }) {
  const panelRef = useRef(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }

    const trigger = document.querySelector(
      `[aria-controls="${CSS.escape(id)}"]`
    );
    const panel = panelRef.current;
    if (!trigger || !panel) return;

    const updatePosition = () => {
      const rect = trigger.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const gap = 10;
      const margin = 12;

      if (
        rect.bottom < 0 || rect.top > viewportHeight ||
        rect.right < 0 || rect.left > viewportWidth
      ) {
        onClose();
        return;
      }

      const width = Math.min(340, viewportWidth - margin * 2);
      const below = Math.max(0, viewportHeight - rect.bottom - gap - margin);
      const above = Math.max(0, rect.top - gap - margin);
      const wantedHeight = Math.min(panel.scrollHeight, 340);

      const placement = below >= wantedHeight || below >= above
        ? "bottom"
        : "top";

      const maxHeight = Math.min(340, placement === "bottom" ? below : above);
      const height = Math.min(panel.scrollHeight, maxHeight);

      const left = Math.max(
        margin,
        Math.min(rect.right - width, viewportWidth - width - margin)
      );

      const top = placement === "bottom"
        ? rect.bottom + gap
        : rect.top - gap - height;

      setPosition({ left, top, width, maxHeight, placement });
    };

    const handleOutside = (event) => {
      if (
        !panel.contains(event.target) &&
        !trigger.contains(event.target)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        trigger.focus();
      }
    };

    const handleFocus = (event) => {
      if (
        !panel.contains(event.target) &&
        !trigger.contains(event.target)
      ) {
        onClose();
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocus);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocus);
    };
  }, [open, onClose, id, technologies.length]);

  if (!open) return null;

  return createPortal(
    <div
      ref={panelRef}
      id={id}
      className={styles.technologiesPopover}
      role="region"
      aria-labelledby={`${id}-title`}
      data-placement={position?.placement || "bottom"}
      style={{
        left: position?.left ?? 0,
        top: position?.top ?? 0,
        width: position?.width ?? 320,
        maxHeight: position?.maxHeight ?? 340,
        visibility: position ? "visible" : "hidden",
      }}
    >
      <div className={styles.popoverHeader}>
        <h3 id={`${id}-title`}>Más tecnologías</h3>
        <button
          type="button"
          onClick={onClose}
          className={styles.popoverClose}
          aria-label="Cerrar tecnologías"
        >
          ×
        </button>
      </div>

      <ul className={styles.popoverTechList}>
        {technologies.map((tech, index) => (
          <li key={tech.id}>
            <TechnologyListIcon tech={tech} index={index} />
            <span className={styles.popoverTechName}>{tech.label}</span>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
}


function TechnologyTile({ tech }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={styles.techCard}>
      <div className={styles.techLogo}>
        {tech.iconUrl && !imageFailed ? (
          <img
            src={tech.iconUrl}
            alt=""
            width="28"
            height="28"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className={styles.techInitial} aria-hidden="true">
            {tech.label.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span>{tech.label}</span>
    </div>
  );
}


function buildLaboratories(items = []) {
  return Array.isArray(items) ? items : [];
}

function buildStats(statsData = {}) {
  return [
    {
      id: "labs",
      value: Number(statsData?.active_laboratories ?? 0),
      label: "Laboratorios activos",
      icon: "flask",
      tone: "cyan",
    },
    {
      id: "projects",
      value: Number(statsData?.projects_count ?? 0),
      label: "Proyectos asociados",
      icon: "terminal",
      tone: "violet",
    },
    {
      id: "tech",
      value: Number(statsData?.technologies_count ?? 0),
      label: "Tecnologías utilizadas",
      icon: "chip",
      tone: "green",
    },
    {
      id: "docs",
      value: Number(statsData?.documents_count ?? 0),
      label: "Documentos técnicos",
      icon: "docs",
      tone: "orange",
    },
  ];
}

function getStatDisplayValue(value, id) {
  const safeValue = Number(value ?? 0);
  return String(safeValue);
}

function getLabHref(lab) {
  return lab?.slug ? `/laboratorio/${lab.slug}` : "/laboratorio";
}

function getStatusMeta(status) {
  const normalized = String(status || "").toLowerCase().trim();

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

function getLabThemeStyle(lab) {
  const raw =
    typeof lab?.target_color === "string" ? lab.target_color.trim() : "";

  const accent = raw
    ? raw.startsWith("--")
      ? `var(${raw})`
      : raw
    : "var(--accent, #0891b2)";

  return {
    "--lab-accent": accent,

    /* escala principal */
    "--lab-accent-soft": `color-mix(in srgb, ${accent} 22%, white 78%)`,
    "--lab-accent-light": `color-mix(in srgb, ${accent} 38%, white 62%)`,
    "--lab-accent-bright": `color-mix(in srgb, ${accent} 68%, white 32%)`,
    "--lab-accent-mid": `color-mix(in srgb, ${accent} 84%, white 16%)`,
    "--lab-accent-strong": `color-mix(in srgb, ${accent} 92%, black 8%)`,
    "--lab-accent-deep": `color-mix(in srgb, ${accent} 72%, black 28%)`,

    /* gradiente principal adaptable */
    "--lab-gradient-start": `color-mix(in srgb, ${accent} 62%, white 38%)`,
    "--lab-gradient-mid": `color-mix(in srgb, ${accent} 88%, white 12%)`,
    "--lab-gradient-end": `color-mix(in srgb, ${accent} 76%, black 24%)`,

    /* bordes y fondos con alpha perceptual */
    "--lab-border-soft": `color-mix(in srgb, ${accent} 18%, rgba(255,255,255,0.16) 82%)`,
    "--lab-border-strong": `color-mix(in srgb, ${accent} 36%, rgba(255,255,255,0.20) 64%)`,
    "--lab-surface-tint": `color-mix(in srgb, ${accent} 10%, transparent)`,
    "--lab-surface-tint-strong": `color-mix(in srgb, ${accent} 16%, transparent)`,
    "--lab-glow": `color-mix(in srgb, ${accent} 24%, transparent)`,
    "--lab-glow-strong": `color-mix(in srgb, ${accent} 38%, transparent)`,

    /* texto/cta */
    "--lab-text-accent": `color-mix(in srgb, ${accent} 88%, white 12%)`,
    "--lab-button-text": `color-mix(in srgb, ${accent} 8%, #041318 92%)`,
    "--lab-badge-text": `color-mix(in srgb, var(--text-soft) 74%, ${accent} 26%)`,
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
    case "docs":
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

function LabCardBackground({ lab, priority = false }) {
  const dark = lab?.background?.dark;
  const light = lab?.background?.light;

  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  return (
    <>
      <picture
        className={`${styles.labBackgroundPicture} ${styles.bgLight}`}
        aria-hidden="true"
      >
        {light?.avif?.srcSet ? (
          <source
            type="image/avif"
            srcSet={light.avif.srcSet}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        ) : null}
        {light?.webp?.srcSet ? (
          <source
            type="image/webp"
            srcSet={light.webp.srcSet}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        ) : null}
        {light?.fallback ? (
          <img
            src={light.fallback}
            alt=""
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
          />
        ) : null}
      </picture>

      <picture
        className={`${styles.labBackgroundPicture} ${styles.bgDark}`}
        aria-hidden="true"
      >
        {dark?.avif?.srcSet ? (
          <source
            type="image/avif"
            srcSet={dark.avif.srcSet}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        ) : null}
        {dark?.webp?.srcSet ? (
          <source
            type="image/webp"
            srcSet={dark.webp.srcSet}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        ) : null}
        {dark?.fallback ? (
          <img
            src={dark.fallback}
            alt=""
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
          />
        ) : null}
      </picture>

      <span className={styles.labBackgroundOverlay} aria-hidden="true" />
    </>
  );
}

function LaboratorySection({
  featuredItems = [],
  statsData = {},
  loading = false,
  error = "",
}) {
  const laboratories = buildLaboratories(featuredItems);
  const stats = buildStats(statsData);
  const scrollerRef = useRef(null);
  const [technologiesExpanded, setTechnologiesExpanded] = useState(false);
  const closeTechnologies = useCallback(() => {
    setTechnologiesExpanded(false);
  }, []);
  const technologiesId = useId();

  useLaboratoryWheel(scrollerRef, laboratories.length);

  const technologies = collectLaboratoryTechnologies(laboratories);
  const extraTechnologies = technologies.slice(FIXED_TECHNOLOGIES.length);
  const extraTechnologiesCount = extraTechnologies.length;
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
            <div
              ref={scrollerRef}
              className={styles.featuredScroller}
              tabIndex={0}
              role="region"
              aria-label="Tarjetas de laboratorios. Usa las flechas izquierda y derecha para desplazarte."
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                event.preventDefault();
                event.currentTarget.scrollBy({
                  left: event.currentTarget.clientWidth * (event.key === "ArrowRight" ? 0.8 : -0.8),
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                });
              }}
            >
              {laboratories.map((lab, index) => {
                const title = lab?.title ?? lab?.titulo ?? "";
                const summary = lab?.summary ?? lab?.resumen ?? "";
                const status = lab?.status ?? lab?.estado ?? "";
                const statusMeta = getStatusMeta(status);

                return (
                  <article
                    key={lab.id ?? index}
                    className={styles.labCard}
                    style={getLabThemeStyle(lab)}
                  >
                    <LabCardBackground lab={lab} priority={index < 3} />

                    <header className={styles.labHeader}>
                      <h3>{title}</h3>

                      <span
                        className={`${styles.status} ${styles[statusMeta.className]}`}
                      >
                        <span className={styles.statusDot} />
                        {statusMeta.label}
                      </span>
                    </header>

                    <div className={styles.labMain}>
                      <aside className={styles.labAside}>
                        <div className={styles.labHex}>
                          <span className={styles.hexOuter} />
                          <span className={styles.hexInner} />
                          <span className={styles.hexLines} />
                          <span className={styles.hexHalo} />
                          <span className={styles.hexShadow} />
                          <span className={styles.hexGlow} />
                          <span className={styles.labHexIcon}>
                            {renderLabGlyph(title)}
                          </span>
                        </div>
                      </aside>

                      <div className={styles.labContent}>
                        <p>{summary}</p>
                      </div>
                    </div>

                    <footer className={styles.labFooter}>
                      <a href={getLabHref(lab)} className={styles.detailButton}>
                        Ver detalles
                      </a>

                      <span className={styles.countBadge}>
                        Proyectos relacionados{" "}
                        <strong className={styles.countValue}>
                          {lab?.projects_count ?? 0}
                        </strong>
                      </span>
                    </footer>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.bottomGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Mi laboratorio en cifras</span>
            </div>

            <div className={styles.statsGrid}>
              {stats.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.statCard} ${
                    styles[
                      `statTone${item.tone.charAt(0).toUpperCase()}${item.tone.slice(1)}`
                    ] || ""
                  }`}
                >
                  <div className={styles.statIcon}>{renderStatIcon(item.icon)}</div>

                  <div className={styles.statContent}>
                    <strong>{getStatDisplayValue(item.value, item.id)}</strong>
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Tecnologías principales</span>
            </div>

            <div className={styles.techGrid}>
              {FIXED_TECHNOLOGIES.map((tech) => (
                <TechnologyTile key={tech.id} tech={tech} />
              ))}

              {extraTechnologiesCount > 0 && (
                <button
                  type="button"
                  className={`${styles.techCard} ${styles.techCardMore}`}
                  
                  aria-expanded={technologiesExpanded}
                  aria-controls={technologiesId}
                  onClick={() => setTechnologiesExpanded((value) => !value)}
                >
                  <div className={styles.techMoreValue}>
                    {technologiesExpanded ? "−" : `+${extraTechnologiesCount}`}
                  </div>
                  <span>{technologiesExpanded ? "Ver menos" : "Ver todas"}</span>
                </button>
              )}

              <TechnologiesDialog
                id={technologiesId}
                open={technologiesExpanded}
                onClose={closeTechnologies}
                technologies={extraTechnologies}
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default LaboratorySection;