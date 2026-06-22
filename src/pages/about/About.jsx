import {
  FaCode,
  FaNetworkWired,
  FaMicrochip,
  FaDatabase,
} from "react-icons/fa";

import usePageTitle from "../../hooks/usePageTitle";
import "./About.css";

function About() {
  usePageTitle("Sobre mí | Alexander Galvez");

  const technologies = [
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
  ];

  const profileData = [
    {
      number: "01",
      title: "Full Stack",
      text: "Desarrollo frontend y backend, aplicaciones web modernas y APIs empresariales.",
      side: "left",
    },
    {
      number: "02",
      title: "Sistemas IT",
      text: "Administración Linux, servidores, servicios y entornos profesionales.",
      side: "right",
    },
    {
      number: "03",
      title: "Bases de Datos",
      text: "Diseño, modelado y optimización SQL, PostgreSQL y sistemas empresariales.",
      side: "left",
    },
    {
      number: "04",
      title: "Redes",
      text: "VLANs, routing, segmentación, seguridad y conectividad profesional.",
      side: "right",
    },
    {
      number: "05",
      title: "Automatización",
      text: "Domótica, inmótica e integración de dispositivos inteligentes.",
      side: "left",
    },
    {
      number: "06",
      title: "Virtualización",
      text: "Proxmox, Docker, laboratorios IT y despliegues escalables.",
      side: "right",
    },
  ];

  const expertise = [
    {
      icon: <FaCode />,
      title: "Desarrollo Full Stack",
      text: "Aplicaciones modernas con React, Laravel, JavaScript, Python y Java.",
      tone: "tone-0",
    },
    {
      icon: <FaDatabase />,
      title: "Bases de Datos",
      text: "Diseño y optimización de bases SQL y PostgreSQL para aplicaciones profesionales.",
      tone: "tone-1",
    },
    {
      icon: <FaNetworkWired />,
      title: "Infraestructura y Redes",
      text: "Servidores Linux, virtualización, redes empresariales y despliegues IT.",
      tone: "tone-2",
    },
    {
      icon: <FaMicrochip />,
      title: "Domótica e Inmótica",
      text: "Automatización de viviendas y edificios inteligentes conectados.",
      tone: "tone-0",
    },
  ];

  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        <div className="about-left">
          <span className="about-kicker">// Sobre mí</span>

          <h1 className="about-title">
            Tecnología, infraestructura y desarrollo en una sola visión
          </h1>

          <p className="about-text">
            Soy <strong>Alexander Galvez</strong>, profesional del sector IT
            especializado en desarrollo de software, sistemas informáticos,
            redes y automatización.
          </p>

          <p className="about-text">
            Mi formación en informática, microinformática y domótica me ha
            permitido comprender la tecnología desde una visión global:
            hardware, servidores, redes, bases de datos y aplicaciones.
          </p>

          <p className="about-text">
            Me gusta crear soluciones completas donde software e infraestructura
            trabajen juntos: desde una aplicación React hasta servidores Linux,
            virtualización y redes profesionales.
          </p>

          <p className="about-text">
            Actualmente sigo ampliando conocimientos en cloud computing,
            automatización e infraestructura IT mediante proyectos reales.
          </p>

          <div className="tech-badges">
            {technologies.map((tech) => (
              <span key={tech} className="badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="about-right">
          <div className="photo-wrapper">
            <div className="photo-container">
              <picture className="about-picture">
                <source
                  type="image/avif"
                  srcSet="/imagen_portfolio_mia_retocada-480.avif 480w, /imagen_portfolio_mia_retocada-768.avif 768w, /imagen_portfolio_mia_retocada-960.avif 960w, /imagen_portfolio_mia_retocada-1280.avif 1280w"
                  sizes="(max-width: 767px) 300px, (max-width: 1279px) 400px, 450px"
                />
                <source
                  type="image/webp"
                  srcSet="/imagen_portfolio_mia_retocada-480.webp 480w, /imagen_portfolio_mia_retocada-768.webp 768w, /imagen_portfolio_mia_retocada-960.webp 960w, /imagen_portfolio_mia_retocada-1280.webp 1280w"
                  sizes="(max-width: 767px) 300px, (max-width: 1279px) 400px, 450px"
                />
                <img
                  src="/imagen_portfolio_mia_retocada-960.avif"
                  alt="Alexander Galvez"
                  className="profile-photo"
                  width="450"
                  height="580"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>

      <section className="technical-section">
        <div className="technical-line"></div>

        <div className="technical-timeline">
          {profileData.map((item) => (
            <article key={item.number} className={`stat-card ${item.side}`}>
              <span className="stat-number">{item.number}</span>

              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="expertise-section">
        <div className="expertise-grid">
          {expertise.map((item) => (
            <article
              key={item.title}
              className={`expertise-card card-hover ${item.tone}`}
            >
              <div className="card-head">
                <div className="expertise-icon card-icon">{item.icon}</div>

                <div className="card-title-wrap">
                  <h2>{item.title}</h2>
                </div>
              </div>

              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default About;
