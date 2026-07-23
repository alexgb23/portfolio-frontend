import {
  Activity,
  Cloud,
  Database,
  FileJson,
  FileText,
  Globe,
  Mail,
  MonitorSmartphone,
  Package,
  Server,
  Shield,
} from "lucide-react";
import styles from "./ProjectOverview.module.css";

const iconMap = {
  react: MonitorSmartphone,
  laravel: Server,
  shield: Shield,
  "file-text": FileText,
  "file-json": FileJson,
  activity: Activity,
  docker: Package,
  cloud: Cloud,
  database: Database,
  mail: Mail,
};

function ProjectOverview({ project }) {
  const section =
    project?.secciones?.find((item) => item?.clave === "project_overview") ||
    project?.secciones?.find((item) => item?.clave === "resumen") ||
    null;

  if (!section) return null;

  const metadata =
    section?.metadata &&
    typeof section.metadata === "object" &&
    !Array.isArray(section.metadata)
      ? section.metadata
      : {};

  const highlights =
    section?.items &&
    typeof section.items === "object" &&
    !Array.isArray(section.items)
      ? Object.values(section.items)
          .map((item) => String(item).trim())
          .filter(Boolean)
      : [];

  const services = [1, 2, 3, 4]
    .map((index) => ({
      title: metadata[`service_${index}_title`],
      subtitle: metadata[`service_${index}_subtitle`],
      icon: metadata[`service_${index}_icon`],
      iconUrl: metadata[`service_${index}_icon_url`],
    }))
    .filter((item) => item.title);

  const infra = [1, 2, 3, 4]
    .map((index) => ({
      title: metadata[`infra_${index}_title`],
      subtitle: metadata[`infra_${index}_subtitle`],
      icon: metadata[`infra_${index}_icon`],
      iconUrl: metadata[`infra_${index}_icon_url`],
    }))
    .filter((item) => item.title);

  const stack = [1, 2, 3]
    .map((index) => ({
      title: metadata[`stack_${index}_title`],
      subtitle: metadata[`stack_${index}_subtitle`],
      icon: metadata[`stack_${index}_icon`],
      iconUrl: metadata[`stack_${index}_icon_url`],
    }))
    .filter((item) => item.title);

  const client = {
    label: metadata.client_label || "Cliente",
    title: metadata.client_title || "Frontend",
    subtitle: metadata.client_subtitle || "Aplicación",
    icon: metadata.client_icon || "react",
    iconUrl: metadata.client_icon_url || null,
  };

  const gateway = {
    label: metadata.gateway_title || "API Gateway",
    title: metadata.gateway_name || "Gateway",
    subtitle: metadata.gateway_subtitle || "Entrada principal",
    icon: metadata.gateway_icon || "cloud",
    iconUrl: metadata.gateway_icon_url || null,
  };

  const balancer = {
    label: metadata.balancer_title || "Load Balancer",
    title: metadata.balancer_name || "Deploy",
    subtitle: metadata.balancer_subtitle || "Balanceo",
    icon: metadata.balancer_icon || "cloud",
    iconUrl: metadata.balancer_icon_url || null,
  };

  const hasArchitecture =
    metadata.diagram_title ||
    client.title ||
    gateway.title ||
    balancer.title ||
    services.length > 0 ||
    infra.length > 0 ||
    stack.length > 0;

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <article className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <span className={styles.eyebrow}>Resumen técnico</span>
            <h2>{section?.titulo || "Descripción general"}</h2>
          </div>

          <div className={styles.infoScroll}>
            {section?.contenido ? (
              <p className={styles.description}>{section.contenido}</p>
            ) : null}

            {highlights.length > 0 ? (
              <ul className={styles.featureList}>
                {highlights.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>

        {hasArchitecture ? (
          <article className={styles.diagramCard}>
            <div className={styles.cardHeader}>
              <span className={styles.eyebrow}>Arquitectura</span>
              <h2>{metadata.diagram_title || "Vista General del Sistema"}</h2>
            </div>

            <div className={styles.diagram}>
              <div className={styles.rowTop}>
                <NodeCard
                  label={client.label}
                  title={client.title}
                  subtitle={client.subtitle}
                  icon={client.icon}
                  iconUrl={client.iconUrl}
                />

                <div className={styles.connector} />

                <NodeCard
                  label={gateway.label}
                  title={gateway.title}
                  subtitle={gateway.subtitle}
                  icon={gateway.icon}
                  iconUrl={gateway.iconUrl}
                />

                <div className={styles.connector} />

                <NodeCard
                  label={balancer.label}
                  title={balancer.title}
                  subtitle={balancer.subtitle}
                  icon={balancer.icon}
                  iconUrl={balancer.iconUrl}
                />

                {services.length > 0 ? (
                  <>
                    <div className={styles.connector} />

                    <div className={styles.nodeGroup}>
                      <span className={styles.nodeGroupTitle}>
                        Microservicios
                      </span>

                      <div className={styles.nodeMiniGrid}>
                        {services.map((service, index) => (
                          <MiniNode
                            key={`${service.title}-${index}`}
                            title={service.title}
                            subtitle={service.subtitle}
                            icon={service.icon}
                            iconUrl={service.iconUrl}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              {infra.length > 0 ? (
                <div className={styles.rowBottom}>
                  <div className={styles.bottomPanel}>
                    <span className={styles.bottomPanelTitle}>
                      Infraestructura
                    </span>

                    <div className={styles.bottomGrid}>
                      {infra.map((item, index) => (
                        <MiniNode
                          key={`${item.title}-${index}`}
                          title={item.title}
                          subtitle={item.subtitle}
                          icon={item.icon}
                          iconUrl={item.iconUrl}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {stack.length > 0 ? (
                <div className={styles.rowBottom}>
                  <div className={styles.bottomPanel}>
                    <span className={styles.bottomPanelTitle}>
                      {metadata.stack_title || "Infraestructura base"}
                    </span>

                    <div className={styles.bottomGrid}>
                      {stack.map((item, index) => (
                        <MiniNode
                          key={`${item.title}-${index}`}
                          title={item.title}
                          subtitle={item.subtitle}
                          icon={item.icon}
                          iconUrl={item.iconUrl}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}

function BrandIcon({ icon, iconUrl, alt, size = 24 }) {
  const Icon = iconMap[icon] || Globe;

  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={(event) => {
          event.currentTarget.style.display = "none";
          const next = event.currentTarget.nextElementSibling;
          if (next) next.style.display = "grid";
        }}
      />
    );
  }

  return <Icon size={size} strokeWidth={1.8} />;
}

function NodeCard({ label, title, subtitle, icon, iconUrl }) {
  const FallbackIcon = iconMap[icon] || Globe;

  return (
    <div className={styles.node}>
      <span className={styles.nodeTitle}>{label}</span>

      <div className={styles.nodeIcon}>
        {iconUrl ? (
          <>
            <BrandIcon icon={icon} iconUrl={iconUrl} alt={title} size={24} />
            <span
              className={styles.iconFallback}
              style={{ display: "none" }}
              aria-hidden="true"
            >
              <FallbackIcon size={24} strokeWidth={1.8} />
            </span>
          </>
        ) : (
          <FallbackIcon size={24} strokeWidth={1.8} />
        )}
      </div>

      <strong>{title}</strong>
      <small>{subtitle}</small>
    </div>
  );
}

function MiniNode({ title, subtitle, icon, iconUrl }) {
  const FallbackIcon = iconMap[icon] || Globe;

  return (
    <div className={styles.miniNode}>
      <div className={styles.miniNodeIcon}>
        {iconUrl ? (
          <>
            <BrandIcon icon={icon} iconUrl={iconUrl} alt={title} size={20} />
            <span
              className={styles.iconFallback}
              style={{ display: "none" }}
              aria-hidden="true"
            >
              <FallbackIcon size={18} strokeWidth={1.8} />
            </span>
          </>
        ) : (
          <FallbackIcon size={18} strokeWidth={1.8} />
        )}
      </div>

      <strong>{title}</strong>
      <small>{subtitle}</small>
    </div>
  );
}

export default ProjectOverview;
