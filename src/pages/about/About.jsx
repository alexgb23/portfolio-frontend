import {
  FaCode,
  FaServer,
  FaNetworkWired,
  FaMicrochip,
  FaDatabase,
} from "react-icons/fa";

import "./About.css";

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* LADO IZQUIERDO: TEXTO */}
        <div className="about-left">
          {/* Este nuevo div se encarga de alinear el texto con el contenedor global */}
          <div className="about-left-content">
            <span className="about-kicker">// Sobre mí</span>
            <h2 className="about-title">
              Donde el software se conecta con el mundo real
            </h2>

            <p className="about-text">
              Soy un{" "}
              <strong>Desarrollador Fullstack e Informático de Sistemas</strong>{" "}
              especializado en construir soluciones robustas de extremo a
              extremo. Mi fuerte es entender cómo respira el software dentro de
              la infraestructura y el hardware. Desde bases de datos
              relacionales hasta redes y automatización domótica, diseño
              sistemas integrales, rápidos y estables.
            </p>

            <div className="tech-badges">
              {[
                "Laravel",
                "Python",
                "Java",
                "JavaScript",
                "React",
                "PostgreSQL",
                "Redes",
                "Domótica",
              ].map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="skills-grid">
              <div className="skill-item">
                <FaCode className="skill-icon" />
                <div>
                  <h3>Fullstack Dev</h3>
                  <p>React, Laravel, Python, Java y JS Vanilla.</p>
                </div>
              </div>

              <div className="skill-item">
                <FaDatabase className="skill-icon" />
                <div>
                  <h3>Datos Robustos</h3>
                  <p>Diseño y optimización en SQL y PostgreSQL.</p>
                </div>
              </div>

              <div className="skill-item">
                <FaNetworkWired className="skill-icon" />
                <div>
                  <h3>Sistemas y Redes</h3>
                  <p>Certificado en microinformática y routing.</p>
                </div>
              </div>

              <div className="skill-item">
                <FaMicrochip className="skill-icon" />
                <div>
                  <h3>Domótica / Inmótica</h3>
                  <p>Automatización y control de espacios reales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: FOTO (Ocupa el 100% del borde derecho) */}
        <div className="about-right">
          <div className="bg-glow"></div>
          <div className="photo-wrapper">
            <div className="photo-border"></div>
            <div className="photo-container">
              <img
                src="/imagen_portfolio_mia_retocada.webp"
                alt="Tu Nombre"
                className="profile-photo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
