import React, { useEffect, useRef } from "react";
import "./CVLayout.css";

const CVLayout = ({ sidebar, header, body, footer }) => {
  const wrapperRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const baseWidth = 840;

    const ajustarEscala = () => {
      const wrapper = wrapperRef.current;
      const page = pageRef.current;
      if (!wrapper || !page) return;

      const availableWidth = wrapper.clientWidth;
const scale = Math.max(Math.min(availableWidth / baseWidth, 1.65), 0.55);

      page.style.setProperty("--cv-scale", scale);
    };

    ajustarEscala();
    window.addEventListener("resize", ajustarEscala);
    return () => window.removeEventListener("resize", ajustarEscala);
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
