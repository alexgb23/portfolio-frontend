import { useEffect, useRef } from "react";
import styles from "./ProjectTimeline.module.css";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function formatTimelineDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getTimelineSection(project) {
  return asArray(project?.secciones).find(
    (section) => section?.clave === "project_timeline",
  );
}

function getTimelineItems(project) {
  const section = getTimelineSection(project);

  return asArray(section?.metadata?.timeline);
}

function getItemTone(index, total) {
  if (index === total - 1) return "green";
  if (index >= total - 2) return "teal";
  return "blue";
}

function ProjectTimeline({ project }) {
  const viewportRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    const handleWheel = (event) => {
      const canScrollHorizontally =
        viewport.scrollWidth > viewport.clientWidth;

      if (!canScrollHorizontally) {
        return;
      }

      const isVerticalWheel =
        Math.abs(event.deltaY) > Math.abs(event.deltaX);

      if (!isVerticalWheel) {
        return;
      }

      const goingLeft = event.deltaY < 0;
      const goingRight = event.deltaY > 0;

      const isAtStart = viewport.scrollLeft <= 0;
      const isAtEnd =
        viewport.scrollLeft + viewport.clientWidth >=
        viewport.scrollWidth - 1;

      if ((goingLeft && !isAtStart) || (goingRight && !isAtEnd)) {
        event.preventDefault();
        viewport.scrollLeft += event.deltaY;
      }
    };

    viewport.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (!project) return null;

  const section = getTimelineSection(project);
  const items = getTimelineItems(project);

  if (!section || items.length === 0) return null;

  return (
    <section
      className={styles.section}
      id="timeline"
      aria-label={section.titulo || "Timeline del desarrollo"}
    >
      <h2 className={styles.heading}>
        {section.titulo || "Timeline del desarrollo"}
      </h2>

      <div ref={viewportRef} className={styles.viewport}>
        <div className={styles.track}>
          <div className={styles.railBase} aria-hidden="true" />
          <div className={styles.railArrow} aria-hidden="true" />

          {items.map((item, index) => {
            const tone = getItemTone(index, items.length);

            return (
              <article
                key={`${item?.date || "timeline"}-${index}`}
                className={styles.item}
              >
                <div className={styles.dateWrap}>
                  <p className={styles.date}>
                    {formatTimelineDate(item?.date)}
                  </p>
                </div>

                <div className={styles.railSlot} aria-hidden="true">
                  <span
                    className={`${styles.pulse} ${styles[`pulse${tone}`]}`}
                  />
                  <span
                    className={`${styles.dot} ${styles[`dot${tone}`]}`}
                  />
                </div>

                <h3 className={`${styles.title} ${styles[`title${tone}`]}`}>
                  {item?.title}
                </h3>

                <p className={styles.description}>{item?.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectTimeline;
