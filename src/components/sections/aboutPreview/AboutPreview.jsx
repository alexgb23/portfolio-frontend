import { Link } from "react-router";
import {
  FaCode,
  FaServer,
  FaNetworkWired,
  FaMicrochip,
  FaArrowRight,
} from "react-icons/fa";

function AboutPreview() {
  const title =
    "Perfil técnico orientado a sistemas, infraestructura, automatización y software";

  const description =
    "Trabajo en la intersección entre software, redes, servidores, virtualización, automatización y sistemas conectados. Me interesan los proyectos donde hay que diseñar, integrar y mantener infraestructuras reales con una base técnica sólida.";

  return (
    <section className="section section-spaced section-separated" id="sobre-mi">
      <div className="section-head-centered narrow">
        <span className="section-kicker">Sobre mí</span>

        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="expertise-grid">
        <article className="expertise-card expertise-card-hover tone-0">
          <div className="card-head">
            <div className="expertise-icon">
              <FaCode />
            </div>

            <div className="card-title-wrap">
              <h3>Software y desarrollo</h3>
            </div>
          </div>

          <p>
            Desarrollo aplicaciones web, APIs, herramientas internas y soluciones
            backend/frontend orientadas a necesidades reales.
          </p>
        </article>

        <article className="expertise-card expertise-card-hover tone-1">
          <div className="card-head">
            <div className="expertise-icon">
              <FaServer />
            </div>

            <div className="card-title-wrap">
              <h3>Infraestructura y virtualización</h3>
            </div>
          </div>

          <p>
            Trabajo con servidores Linux, servicios técnicos, virtualización,
            laboratorio propio, despliegues y arquitectura de sistemas.
          </p>
        </article>

        <article className="expertise-card expertise-card-hover tone-2">
          <div className="card-head">
            <div className="expertise-icon">
              <FaNetworkWired />
            </div>

            <div className="card-title-wrap">
              <h3>Redes y conectividad</h3>
            </div>
          </div>

          <p>
            Diseño entornos con segmentación, VLANs, routing, seguridad perimetral
            y conectividad estable para distintos servicios.
          </p>
        </article>

        <article className="expertise-card expertise-card-hover tone-3">
          <div className="card-head">
            <div className="expertise-icon">
              <FaMicrochip />
            </div>

            <div className="card-title-wrap">
              <h3>Automatización, IoT y domótica</h3>
            </div>
          </div>

          <p>
            Integro sensores, nodos, automatizaciones y lógica aplicada a espacios,
            dispositivos y procesos conectados.
          </p>
        </article>
      </div>

      <div className="section-more">
        <Link to="/sobre-mi" className="inline-link">
          <span>Ver perfil completo</span>
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default AboutPreview;