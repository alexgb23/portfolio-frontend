import { Globe, ArrowUpRight } from "lucide-react";
import styles from "./LaboratoryFooter.module.css";

export default function LaboratoryFooter() {
  return (
    <section className={styles.footer}>
      <div className="container_footer">

        <div className={styles.card}>

          {/* Fondo */}
          <div className={styles.background}>
            <div className={styles.gradient}></div>
            <div className={styles.grid}></div>
            <div className={styles.circuit}></div>
            <div className={styles.particles}></div>
            <div className={styles.glow}></div>
          </div>

          {/* Contenido */}
          <div className={styles.content}>

            {/* Lado izquierdo */}
            <div className={styles.left}>

              <h2>
                ¿Quieres ver todo lo que estoy construyendo?
              </h2>

              <p>
                En SYSKOVEX.com encontrarás documentación completa,
                tutoriales, diagramas, código abierto y mucho más
                sobre mis proyectos e investigaciones.
              </p>

            </div>

            {/* Botón */}
            <a
              href="https://syskovex.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <div className={styles.iconWrapper}>
                <div className={styles.iconCircle}>
                  <Globe size={28} strokeWidth={2} />
                </div>
              </div>

              <div className={styles.ctaText}>
                <span className={styles.title}>
                  Explorar SYSKOVEX.com
                </span>

                <span className={styles.subtitle}>
                  Laboratorio completo, documentación y recursos
                </span>
              </div>

              <ArrowUpRight
                size={22}
                className={styles.arrow}
              />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}