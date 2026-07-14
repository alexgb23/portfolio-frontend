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

  const isMobile = window.innerWidth <= 767;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!isMobile || prefersReducedMotion) return;

  if (!el.dataset.cloned) {
    const children = Array.from(el.children);
    children.forEach((child) => {
      const clone = child.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      el.appendChild(clone);
    });
    el.dataset.cloned = "true";
  }

  let frameId;
  let pausedUntil = 0;

  const pause = () => {
    pausedUntil = Date.now() + 1800;
  };

  const tick = () => {
    if (!el) return;

    const halfWidth = el.scrollWidth / 2;

    if (Date.now() < pausedUntil) {
      frameId = requestAnimationFrame(tick);
      return;
    }

    if (halfWidth > 0) {
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 0.45;
      }
    }

    frameId = requestAnimationFrame(tick);
  };

  el.addEventListener("touchstart", pause, { passive: true });
  el.addEventListener("touchmove", pause, { passive: true });

  frameId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frameId);
    el.removeEventListener("touchstart", pause);
    el.removeEventListener("touchmove", pause);
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
