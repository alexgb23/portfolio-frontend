import {
  ArrowRight,
  ExternalLink,
  BadgeCheck,
  BrainCircuit,
  FileText,
  Orbit,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./LaboratoryHero.module.css";

function getCurrentTheme() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") || "dark";
}

function buildVariant(basePath, width, extension) {
  return `${basePath}-${width}.${extension}`;
}

function buildSrcSet(basePath, extension) {
  return [
    `${buildVariant(basePath, 480, extension)} 480w`,
    `${buildVariant(basePath, 768, extension)} 768w`,
    `${buildVariant(basePath, 960, extension)} 960w`,
  ].join(", ");
}

export default function LaboratoryHero() {
  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      setTheme(root.getAttribute("data-theme") || "dark");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  const imageBase = isDark
    ? {
        avif: "/imgFondoLaboratorio/fondoLabDarkAvif",
        webp: "/imgFondoLaboratorio/fondoLabDarkWebp",
      }
    : {
        avif: "/imgFondoLaboratorio/fondoLabLightAvif",
        webp: "/imgFondoLaboratorio/fondoLabLightWebp",
      };

  const imageSources = useMemo(() => {
    return {
      avifSrcSet: buildSrcSet(imageBase.avif, "avif"),
      webpSrcSet: buildSrcSet(imageBase.webp, "webp"),
      fallbackSrc: buildVariant(imageBase.webp, 768, "webp"),
      fallbackSrcSet: buildSrcSet(imageBase.webp, "webp"),
    };
  }, [imageBase.avif, imageBase.webp]);

  return (
    <section className={`section section-spaced ${styles.hero}`}>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>Mi laboratorio de pruebas</span>

            <h1 className={styles.title}>
              Bienvenido a <span>SYSKOVEX</span> Laboratory
            </h1>

            <p className={styles.description}>
              Mi entorno de pruebas y experimentación donde exploro, construyo e
              investigo soluciones en infraestructura, automatización, redes e
              inteligencia artificial.
            </p>

            <div className={styles.actions}>
              <a
                href="https://syskovex.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                <span>Explorar laboratorio completo</span>
                <ArrowRight size={18} />
              </a>

             <a
  href="https://syskovex.com"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.siteLink}
>
  <span>syskovex.com</span>
  <ExternalLink className={styles.siteLinkIcon} />
</a>
            </div>
          </div>

          <div className={styles.visual}>
            <picture>
              <source
                type="image/avif"
                srcSet={imageSources.avifSrcSet}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 960px"
              />

              <source
                type="image/webp"
                srcSet={imageSources.webpSrcSet}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 960px"
              />

              <img
                src={imageSources.fallbackSrc}
                srcSet={imageSources.fallbackSrcSet}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 960px"
                alt="Vista principal del laboratorio SYSKOVEX"
                className={styles.visualImage}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="960"
                height="960"
              />
            </picture>
          </div>

          <aside className={styles.panel}>
            <div className={styles.panelBrand}>
              <span className={styles.panelLogo}>X</span>
              <strong>SYSKOVEX</strong>
            </div>

            <p className={styles.panelText}>
              Un laboratorio personal dedicado a la innovación y al aprendizaje
              continuo.
            </p>

            <ul className={styles.panelList}>
              <li>
                <BadgeCheck size={17} />
                <span>Pruebas reales</span>
              </li>
              <li>
                <BrainCircuit size={17} />
                <span>Investigación aplicada</span>
              </li>
              <li>
                <FileText size={17} />
                <span>Documentación abierta</span>
              </li>
              <li>
                <Orbit size={17} />
                <span>Compartir conocimiento</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}