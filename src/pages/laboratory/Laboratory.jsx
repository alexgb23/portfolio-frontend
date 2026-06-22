import { Link } from "react-router-dom";
import { FaServer, FaMicrochip, FaArrowRight } from "react-icons/fa";
import usePageTitle from "../../hooks/usePageTitle";

// import "./Laboratory.css";

function Laboratory() {
  usePageTitle("Laboratorio Técnico | Alexander Galvez");

  return (
    <section className="section section-spaced">
      <div className="section-head-centered">
        <span className="section-kicker">Laboratorio</span>

        <h1>Sistemas, infraestructura y automatización</h1>

        <p>
          Entorno técnico donde desarrollo, pruebo y documento soluciones reales
          combinando servidores, redes, hardware y automatización.
        </p>
      </div>

      <div className="laboratory-grid">
        <article className="expertise-card card-hover tone-1">
          <div className="card-head">
            <div className="expertise-icon">
              <FaServer />
            </div>

            <div className="card-title-wrap">
              <h3>Infraestructura IT</h3>
            </div>
          </div>

          <p>
            Servidores, virtualización, servicios, redes y monitorización del
            entorno técnico.
          </p>

          <Link to="/infraestructura" className="inline-link">
            Ver infraestructura
            <FaArrowRight />
          </Link>
        </article>

        <article className="expertise-card card-hover tone-2">
          <div className="card-head">
            <div className="expertise-icon">
              <FaMicrochip />
            </div>

            <div className="card-title-wrap">
              <h3>Automatización e IoT</h3>
            </div>
          </div>

          <p>
            Nodos, sensores, controladores y sistemas inteligentes conectados.
          </p>

          <Link to="/automatizacion" className="inline-link">
            Ver automatización
            <FaArrowRight />
          </Link>
        </article>
      </div>
    </section>
  );
}

export default Laboratory;
