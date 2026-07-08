import React, { useEffect, useRef } from "react";
import "./CVLayout.css";

const CVLayout = ({ sidebar, header, body, bottom, footer }) => {
  const wrapperRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const baseWidth = 840;
    const baseHeight = 1188;

    const updateScale = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const container = wrapper.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const styles = window.getComputedStyle(container);

      const padX =
        parseFloat(styles.paddingLeft || 0) +
        parseFloat(styles.paddingRight || 0);
      const padY =
        parseFloat(styles.paddingTop || 0) +
        parseFloat(styles.paddingBottom || 0);

      const availableWidth = containerRect.width - padX;
      const availableHeight = containerRect.height - padY;

      const scaleX = availableWidth / baseWidth;
      const scaleY = availableHeight / baseHeight;

      let scale;

      if (window.innerWidth <= 699) {
        scale = Math.min(scaleX, scaleY);
      } else {
        scale = Math.min(scaleX, scaleY, 1.45);
        scale = Math.max(scale, 1);
      }

      wrapper.style.setProperty("--cv-scale", String(scale));
      wrapper.style.width = `${baseWidth * scale}px`;
      wrapper.style.height = `${baseHeight * scale}px`;
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    if (wrapperRef.current?.parentElement) {
      resizeObserver.observe(wrapperRef.current.parentElement);
    }

    window.addEventListener("resize", updateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <div className="cv-layout-wrapper" ref={wrapperRef}>
      <div className="cv-page" ref={pageRef}>
        <aside className="cv-sidebar">{sidebar}</aside>

        <main className="cv-main">
          <div className="cv-header">{header}</div>
          <div className="cv-body">{body}</div>
        </main>

        {bottom ? <section className="cv-bottom">{bottom}</section> : null}
        {footer ? <footer className="cv-footer">{footer}</footer> : null}
      </div>
    </div>
  );
};

export default CVLayout;
