import { Link } from "react-router";
import { useEffect, useRef } from "react";
import {
  FaCode,
  FaServer,
  FaNetworkWired,
  FaMicrochip,
  FaArrowRight,
} from "react-icons/fa";
import "./AboutPreview.css";

function AboutPreview() {
  const sliderRef = useRef(null);

useEffect(() => {
  const el = sliderRef.current;
  if (!el) return;

  const mediaQuery = window.matchMedia("(max-width: 767px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let frameId = null;
  let paused = false;
  let pauseTimeout = null;

  const tick = () => {
    if (!el || !mediaQuery.matches || reducedMotion.matches) return;

    const maxScroll = el.scrollWidth - el.clientWidth;

    if (!paused && maxScroll > 0) {
      if (el.scrollLeft >= maxScroll - 1) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 0.6;
      }
    }

    frameId = requestAnimationFrame(tick);
  };

  const start = () => {
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(frameId);
    frameId = null;
  };

  const pause = () => {
    paused = true;
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      paused = false;
    }, 1800);
  };

  const handleChange = () => {
    stop();
    if (mediaQuery.matches && !reducedMotion.matches) {
      start();
    } else if (el) {
      el.scrollLeft = 0;
    }
  };

  el.addEventListener("touchstart", pause, { passive: true });
  el.addEventListener("touchmove", pause, { passive: true });

  handleChange();
  mediaQuery.addEventListener("change", handleChange);
  reducedMotion.addEventListener("change", handleChange);

  return () => {
    stop();
    clearTimeout(pauseTimeout);
    el.removeEventListener("touchstart", pause);
    el.removeEventListener("touchmove", pause);
    mediaQuery.removeEventListener("change", handleChange);
    reducedMotion.removeEventListener("change", handleChange);
  };
}, []);

  const title =
    "Soy Alex, Técnico Superior especializado en infraestructura IT, redes, virtualización y automatización de sistemas conectados";

  const description =
    "Trabajo en la intersección entre software, redes, servidores, virtualización, automatización y sistemas conectados. Me interesan los proyectos donde hay que diseñar, integrar y mantener infraestructuras reales con una base técnica sólida.";

  return (
    <section className="section section-spaced section-separated" id="sobre-mi">
      <div className="section-head-centered narrow">
        <span className="section-kicker">Sobre mí</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div
        ref={sliderRef}
        className="expertise-grid grid-4xl about-preview-grid"
      >
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
            Desarrollo aplicaciones web, APIs, herramientas internas y
            soluciones backend/frontend orientadas a necesidades reales.
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
            Diseño entornos con segmentación, VLANs, routing, seguridad
            perimetral y conectividad estable para distintos servicios.
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
            Integro sensores, nodos, automatizaciones y lógica aplicada a
            espacios, dispositivos y procesos conectados.
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
