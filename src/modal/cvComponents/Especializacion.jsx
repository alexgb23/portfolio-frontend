import React from "react";
import styles from "./Especializacion.module.css";
import { FaBoxOpen, FaCode, FaNetworkWired, FaMicrochip } from "react-icons/fa";

const bloques = [
  {
    icon: <FaMicrochip />,
    titulo: "Infraestructura y virtualización",
    texto:
      "Administración de sistemas, virtualización, homelab, servicios, copias de seguridad y despliegues orientados a estabilidad y continuidad.",
    color: styles.blue,
  },
  {
    icon: <FaNetworkWired />,
    titulo: "Redes y conectividad",
    texto:
      "Segmentación por VLAN, firewall pfSense, protocolos de comunicación, servicios internos y resolución de incidencias técnicas.",
    color: styles.green,
  },
  {
    icon: <FaCode />,
    titulo: "Desarrollo web y programación",
    texto:
      "Frontend y backend con enfoque práctico, APIs, arquitectura clara y experiencia en PHP, Python, Java, JavaScript.",
    color: styles.purple,
  },
  {
    icon: <FaBoxOpen />,
    titulo: "Automatización y domótica",
    texto:
      "IoT, Home Assistant, sensores, actuadores, BMS, PLC y automatización aplicada a entornos reales.",
    color: styles.orange,
  },
];

const Especializacion = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.titleIcon}>🧩</span>
        <span>ESPECIALIZACIÓN HÍBRIDA</span>
      </h2>

      <div className={styles.grid}>
        {bloques.map((bloque, index) => (
          <article key={index} className={`${styles.card} ${bloque.color}`}>
            <div className={styles.cardIcon}>{bloque.icon}</div>
            <h3 className={styles.cardTitle}>{bloque.titulo}</h3>
            <p className={styles.cardText}>{bloque.texto}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Especializacion;
