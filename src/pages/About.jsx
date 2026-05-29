import {
  FaCode,
  FaServer,
  FaNetworkWired,
  FaMicrochip,
  FaDatabase,
  FaShieldAlt,
} from 'react-icons/fa'

function About() {
  return (
    <section className="section section-spaced">
      <div className="section-head-centered narrow">
        <span className="section-kicker">Sobre mí</span>
        <h1>Perfil técnico orientado a sistemas reales</h1>
        <p>
          Trabajo en el punto donde se cruzan desarrollo, infraestructura,
          conectividad y automatización. Me interesan los proyectos que exigen
          unir software, hardware y operación estable en entornos reales.
        </p>
      </div>

      <div className="expertise-grid">
        <article className="expertise-card">
          <div className="expertise-icon">
            <FaCode />
          </div>
          <h3>Desarrollo</h3>
          <p>
            Desarrollo frontend y backend con enfoque práctico, integrando
            interfaces, APIs, lógica de negocio y herramientas de control.
          </p>
        </article>

        <article className="expertise-card">
          <div className="expertise-icon">
            <FaServer />
          </div>
          <h3>Infraestructura</h3>
          <p>
            Servidores, virtualización, despliegue de servicios, laboratorios
            propios y supervisión técnica.
          </p>
        </article>

        <article className="expertise-card">
          <div className="expertise-icon">
            <FaNetworkWired />
          </div>
          <h3>Redes</h3>
          <p>
            Segmentación, routing, servicios perimetrales, conectividad y diseño
            de red con visión integral.
          </p>
        </article>

        <article className="expertise-card">
          <div className="expertise-icon">
            <FaMicrochip />
          </div>
          <h3>Automatización</h3>
          <p>
            Sensores, nodos, controladores y automatismos aplicados a vivienda,
            supervisión y espacios técnicos.
          </p>
        </article>

        <article className="expertise-card">
          <div className="expertise-icon">
            <FaDatabase />
          </div>
          <h3>Datos y monitorización</h3>
          <p>
            Métricas, paneles, lectura operativa y visualización de información
            útil para diagnóstico y seguimiento.
          </p>
        </article>

        <article className="expertise-card">
          <div className="expertise-icon">
            <FaShieldAlt />
          </div>
          <h3>Estabilidad y mantenimiento</h3>
          <p>
            Busco soluciones mantenibles, entendibles y robustas, no solo
            interfaces vistosas.
          </p>
        </article>
      </div>
    </section>
  )
}

export default About