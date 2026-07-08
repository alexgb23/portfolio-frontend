import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <div className={styles.logoMark}>
          <img
            src="/logoSyskovex.png"
            alt="Logo Syskovex"
            className={styles.logoImg}
          />
        </div>
        <span className={styles.logo}>YSKOVEX</span>
      </div>

      <div className={styles.center}>
        Infrastructure • Development • Automation
      </div>

      <div className={styles.date}>Actualizado: Julio 2026</div>
    </footer>
  );
};

export default Footer;
