import styles from "./LaboratorySection.module.css";
export default function LaboratorySection() {
  return (
    <section className="laboratory-section section">
      <div className="container">
        <div className="section-head-centered">
          <span className="section-kicker">Laboratorio destacado</span>
          <h2>Áreas activas en SYSKOVEX</h2>
          <p>
            Un espacio enfocado en infraestructura, automatización e
            inteligencia aplicada con enfoque práctico y documentación real.
          </p>
        </div>

        <div className="expertise-grid">
          <article className="expertise-card">
            <h3>Infraestructura & Redes</h3>
            <p>
              Entornos de prueba, redes, virtualización, monitorización y
              despliegues controlados.
            </p>
          </article>

          <article className="expertise-card">
            <h3>Automatización & IoT</h3>
            <p>
              Flujos de automatización, integración de servicios y pruebas de
              entornos conectados.
            </p>
          </article>

          <article className="expertise-card">
            <h3>Inteligencia Artificial</h3>
            <p>
              Experimentos con modelos, pipelines, agentes y aplicaciones útiles
              apoyadas por IA.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
