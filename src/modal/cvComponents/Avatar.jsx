import React from "react";
import styles from "./Avatar.module.css";

const Avatar = () => {
  return (
    <div className={styles.avatarContainer}>
      <picture className={styles.picture}>
        <source
          srcSet="/imagen_portfolio_mia_retocada-480.avif"
          type="image/avif"
        />
        <img
          src="/imagen_portfolio_mia_retocada-480.webp"
          alt="Alexander Gálvez Benavides"
          className={styles.profileImg}
        />
      </picture>
    </div>
  );
};

export default Avatar;
