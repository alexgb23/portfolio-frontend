import { Link } from "react-router-dom";
import {
  FaCode,
  FaServer,
  FaNetworkWired,
  FaMicrochip,
  FaArrowRight,
} from "react-icons/fa";
import "../sectionsGlobals.css";

function AboutPreview() {
  return (
    <section className="section section-spaced section-separated" id="sobre-mi">
      <div className="section-head-centered narrow">
        <span className="section-kicker">Perfil técnico</span>

        <h2>Desarrollo, infraestructura y automatización en una sola visión</h2>
        <p>
          Mi trabajo une software, redes, servidores, electrónica aplicada y
          visualización de datos. Me interesan los proyectos donde hay que
          integrar sistemas reales y hacerlos útiles, mantenibles y estables.
        </p>
      </div>

      <div className="expertise-grid">
        <article className="expertise-card card-hover tone-0">
          <div className="card-head">
            <div className="expertise-icon">
              <FaCode />
            </div>

            <div className="card-title-wrap">
              <h3>Desarrollo</h3>
            </div>
          </div>

          <p>
            Laravel, JavaScript, React, APIs y lógica backend conectada a
            frontend útil.
          </p>
        </article>

        <article className="expertise-card card-hover tone-1">
          <div className="card-head">
            <div className="expertise-icon">
              <FaServer />
            </div>

            <div className="card-title-wrap">
              <h3>Infraestructura</h3>
            </div>
          </div>

          <p>
            Servidores, virtualización, servicios técnicos, monitorización y
            laboratorio propio.
          </p>
        </article>

        <article className="expertise-card card-hover tone-2">
          <div className="card-head">
            <div className="expertise-icon">
              <FaNetworkWired />
            </div>

            <div className="card-title-wrap">
              <h3>Redes</h3>
            </div>
          </div>

          <p>
            Conectividad, servicios perimetrales, segmentación, routing y visión
            de sistemas.
          </p>
        </article>

        <article className="expertise-card card-hover tone-0">
          <div className="card-head">
            <div className="expertise-icon">
              <FaMicrochip />
            </div>

            <div className="card-title-wrap">
              <h3>Domótica e inmótica</h3>
            </div>
          </div>

          <p>
            Sensores, nodos, integración de hardware y automatización aplicada a
            espacios reales.
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
