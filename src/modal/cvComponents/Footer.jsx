import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>❖ SYSKOVEX</div>
      <div className={styles.center}>
        Infrastructure • Development • Automation
      </div>
      <div className={styles.date}>Actualizado: Mayo 2025</div>
    </div>
  );
};

export default Footer;
