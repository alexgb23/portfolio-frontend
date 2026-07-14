import {
  ArrowRight,
  ExternalLink,
  BadgeCheck,
  BrainCircuit,
  FileText,
  Orbit,
} from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./LaboratoryHero.module.css";

function getCurrentTheme() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") || "dark";
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

  const imageAvif = isDark
    ? "/imgFondoLaboratorio/fondoLabDarkAvif.avif"
    : "/imgFondoLaboratorio/fondoLabLightAvif.avif";

  const imageWebp = isDark
    ? "/imgFondoLaboratorio/fondoLabDarkWebp.webp"
    : "/imgFondoLaboratorio/fondoLabLightWebp.webp";

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
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <div className={styles.visual}>
            <picture>
              <source srcSet={imageAvif} type="image/avif" />
              <img
                src={imageWebp}
                alt="Vista principal del laboratorio SYSKOVEX"
                className={styles.visualImage}
                loading="eager"
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
