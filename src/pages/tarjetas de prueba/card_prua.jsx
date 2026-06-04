import { FaGithub, FaLinkedin, FaGlobe, FaFacebook, FaInstagram } from "react-icons/fa";
import "./card_prua.css";

function CardItem({ icon, label, title, text, className }) {
  return (
    <article className="vx9-card-shell">
      <div className={`vx9-glass-card ${className}`}>
        <div className="vx9-face vx9-front">
          <div className="vx9-shine"></div>

          <div className="vx9-icon">{icon}</div>

          <div className="vx9-content">
            <span className="vx9-label">{label}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>

        <div className="vx9-shadow"></div>
      </div>
    </article>
  );
}

function Contact() {
  return (
    <div className="vx9-krypton-holo-wrapper">
      <section className="vx9-social-cards">
        <CardItem
          className="vx9-card-1"
          icon={<FaLinkedin />}
          label="LinkedIn"
          title="Alex Fernández"
          text="Perfil Profesional"
        />

        <CardItem
          className="vx9-card-2"
          icon={<FaGithub />}
          label="GitHub"
          title="AlexDev"
          text="Repositorios y Proyectos"
        />

        <CardItem
          className="vx9-card-3"
          icon={<FaGlobe />}
          label="Cubalinks"
          title="Empresa"
          text="Sistemas • Domótica • Web"
        />

        <CardItem
          className="vx9-card-4"
          icon={<FaInstagram />}
          label="Instagram"
          title="Alefgb"
          text="Perfil Personal"
        />

        <CardItem
          className="vx9-card-5"
          icon={<FaFacebook />}
          label="Facebook"
          title="Alexander Galvez"
          text="Perfil Personal"
        />

        <CardItem
          className="vx9-card-6"
          icon={<FaFacebook />}
          label="Facebook"
          title="Alexander Galvez"
          text="Perfil Personal"
        />

        <CardItem
          className="vx9-card-7"
          icon={<FaInstagram />}
          label="Instagram"
          title="Alefgb"
          text="Perfil Personal"
        />
      </section>
    </div>
  );
}

export default Contact;