import {
  FaCode,
  FaNetworkWired,
  FaMicrochip,
  FaDatabase,
} from "react-icons/fa";

import "./About.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* IZQUIERDA */}
        <div className="about-left">
          <div className="about-left-content">
            <span className="about-kicker">// Sobre mí</span>

            <h2 className="about-title">
              Tecnología, infraestructura y desarrollo en una sola visión
            </h2>

            <p className="about-text">
              Soy <strong>Alexander Galvez</strong>, profesional del sector IT
              especializado en desarrollo de software, sistemas informáticos,
              redes y automatización. Mi objetivo es crear soluciones
              tecnológicas completas que sean escalables, seguras y eficientes.
            </p>

            <p className="about-text">
              Mi formación en informática, microinformática y domótica me ha
              permitido desarrollar una visión global de la tecnología,
              entendiendo cómo interactúan el hardware, las redes, los
              servidores, las bases de datos y las aplicaciones.
            </p>

            <p className="about-text">
              Disfruto trabajando tanto en desarrollo Full Stack como en
              administración de infraestructuras. Me gusta diseñar sistemas
              donde cada componente encaje perfectamente: desde una interfaz
              moderna desarrollada en React hasta servidores Linux,
              virtualización y redes profesionales.
            </p>

            <p className="about-text">
              Actualmente continúo ampliando mis conocimientos en desarrollo
              web, cloud computing, automatización e infraestructura IT,
              manteniendo siempre una filosofía basada en aprendizaje continuo y
              resolución de problemas reales mediante tecnología.
            </p>

            {/* TECNOLOGÍAS */}

            <div className="tech-badges">
              {[
                "React",
                "Laravel",
                "JavaScript",
                "Python",
                "Java",
                "PostgreSQL",
                "Linux",
                "Docker",
                "Proxmox",
                "Redes",
                "Domótica",
                "Virtualización",
              ].map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>

            {/* PERFIL TECNICO */}

            <div className="about-stats">
              <div className="stat-card left">
                <span className="stat-number">01</span>

                <div>
                  <h3>Full Stack</h3>

                  <p>
                    Desarrollo frontend y backend, aplicaciones web y APIs
                    empresariales.
                  </p>
                </div>
              </div>

              <div className="stat-card right">
                <span className="stat-number">02</span>

                <div>
                  <h3>Sistemas IT</h3>

                  <p>
                    Administración Linux, servidores, servicios y entornos
                    profesionales.
                  </p>
                </div>
              </div>

              <div className="stat-card left">
                <span className="stat-number">03</span>

                <div>
                  <h3>Bases de Datos</h3>

                  <p>Diseño, modelado y optimización SQL y PostgreSQL.</p>
                </div>
              </div>

              <div className="stat-card right">
                <span className="stat-number">04</span>

                <div>
                  <h3>Redes</h3>

                  <p>
                    VLANs, routing, infraestructura y conectividad empresarial.
                  </p>
                </div>
              </div>

              <div className="stat-card left">
                <span className="stat-number">05</span>

                <div>
                  <h3>Automatización</h3>

                  <p>
                    Domótica, inmótica e integración de sistemas inteligentes.
                  </p>
                </div>
              </div>

              <div className="stat-card right">
                <span className="stat-number">06</span>

                <div>
                  <h3>Virtualización</h3>

                  <p>Proxmox, Docker, laboratorios y despliegues IT.</p>
                </div>
              </div>
            </div>

            {/* ESPECIALIDADES */}

            <div className="skills-grid">
              <div className="skill-item">
                <FaCode className="skill-icon" />

                <div>
                  <h3>Desarrollo Full Stack</h3>

                  <p>
                    Desarrollo de aplicaciones modernas utilizando React,
                    Laravel, JavaScript, Python y Java.
                  </p>
                </div>
              </div>

              <div className="skill-item">
                <FaDatabase className="skill-icon" />

                <div>
                  <h3>Bases de Datos</h3>

                  <p>
                    Diseño, modelado y optimización de bases de datos SQL y
                    PostgreSQL para aplicaciones empresariales.
                  </p>
                </div>
              </div>

              <div className="skill-item">
                <FaNetworkWired className="skill-icon" />

                <div>
                  <h3>Sistemas e Infraestructura</h3>

                  <p>
                    Linux, virtualización, redes, servidores y despliegue de
                    servicios profesionales.
                  </p>
                </div>
              </div>

              <div className="skill-item">
                <FaMicrochip className="skill-icon" />

                <div>
                  <h3>Domótica e Inmótica</h3>

                  <p>
                    Automatización de viviendas y edificios inteligentes,
                    integración de dispositivos y control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DERECHA FOTO */}

        <div className="about-right">
          <div className="photo-wrapper">
            <div className="photo-container">
              <img
                src="/imagen_portfolio_mia_retocada.webp"
                alt="Alexander Galvez"
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
