import React, { useEffect, useRef } from "react";
import "./CVLayout.css";

const BASE_WIDTH = 840;
const BASE_HEIGHT = 1188;

const CVLayout = ({ sidebar, header, body, footer }) => {
  const wrapperRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const page = pageRef.current;
    if (!wrapper || !page) return;

    let frameId = null;

    const ajustarEscala = () => {
      if (!wrapper || !page) return;

      const rect = wrapper.getBoundingClientRect();
      const styles = window.getComputedStyle(wrapper);

      const paddingX =
        parseFloat(styles.paddingLeft || 0) +
        parseFloat(styles.paddingRight || 0);

      const paddingY =
        parseFloat(styles.paddingTop || 0) +
        parseFloat(styles.paddingBottom || 0);

      const availableWidth = Math.max(rect.width - paddingX, 0);
      const availableHeight = Math.max(rect.height - paddingY, 0);

      if (!availableWidth || !availableHeight) return;

      const scaleX = availableWidth / BASE_WIDTH;
      const scaleY = availableHeight / BASE_HEIGHT;
      const isMobile = window.innerWidth <= 840;

      let scale;

      if (isMobile) {
        scale = Math.min(scaleX, scaleY);
      } else {
        scale = Math.min(scaleX, scaleY, 1.9);
      }

      scale = Math.max(scale, 0.35);

      page.style.setProperty("--cv-scale", String(scale));
      wrapper.style.setProperty("--scaled-width", `${BASE_WIDTH * scale}px`);
      wrapper.style.setProperty("--scaled-height", `${BASE_HEIGHT * scale}px`);
    };

    const scheduleAjuste = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(ajustarEscala);
    };

    const resizeObserver = new ResizeObserver(scheduleAjuste);
    resizeObserver.observe(wrapper);

    window.addEventListener("resize", scheduleAjuste);
    window.addEventListener("orientationchange", scheduleAjuste);

    scheduleAjuste();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleAjuste);
      window.removeEventListener("orientationchange", scheduleAjuste);
    };
  }, []);

  return (
    <div className="cv-layout-wrapper" ref={wrapperRef}>
      <div className="cv-page" ref={pageRef}>
        <aside className="cv-sidebar">{sidebar}</aside>

        <section className="cv-main">
          <header className="cv-header">{header}</header>
          <div className="cv-body">{body}</div>
          <footer className="cv-footer">{footer}</footer>
        </section>
      </div>
    </div>
  );
};

export default CVLayout;
