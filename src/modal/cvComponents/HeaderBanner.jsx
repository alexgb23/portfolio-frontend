import React from "react";
import styles from "./HeaderBanner.module.css";

const HeaderBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.leftZone}>
        <h1 className={styles.name}>
          ALEXANDER <br />
          <span>GÁLVEZ BENAVIDES</span>
        </h1>
        <p className={styles.subTitle}>PERFIL TÉCNICO HÍBRIDO</p>
        <p className={styles.tags}>
          SISTEMAS • DESARROLLO • REDES • AUTOMATIZACIÓN • IA
        </p>
      </div>

      <div className={styles.rightZone}>
        <div className={styles.logoRow}>
          <div className={styles.logoMark}>S</div>
          <div className={styles.logoText}>SYSKOVEX</div>
        </div>

        <div className={styles.companyInfo}>
          <span>Infrastructure</span>
          <span>Development</span>
          <span>Automation</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;
