import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Activity, Database, Server, Timer, X } from "lucide-react";

import styles from "./HealthStatus.module.css";
import { useHealthMetrics } from "../../hooks/usePortfolioData";

function formatMs(ms) {
  if (ms == null || Number.isNaN(Number(ms))) {
    return "—";
  }

  const value = Number(ms);

  return value < 1000
    ? `${value.toFixed(0)} ms`
    : `${(value / 1000).toFixed(1)} s`;
}

function statusLabel(status) {
  if (status === "healthy") return "Healthy";
  if (status === "available") return "Disponible";
  if (status === "connected") return "Conectado";
  if (status === "unavailable") return "No disponible";
  if (status === "disconnected") return "Desconectado";

  return status || "Sin datos";
}

function hasMetricsData(metrics) {
  if (!metrics || typeof metrics !== "object") {
    return false;
  }

  return Boolean(
    metrics.status ||
    metrics.service ||
    metrics.render?.status ||
    metrics.database?.status ||
    metrics.render?.latency_ms != null,
  );
}

function HealthStatus() {
  const { metrics, loading } = useHealthMetrics(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(14);

  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  const hasData = hasMetricsData(metrics);
  const isWaitingForServer = loading || !hasData;

  const overallStatus = metrics?.status;
  const renderStatus = metrics?.render?.status;
  const databaseStatus = metrics?.database?.status;

  const isHealthy = overallStatus === "healthy";
  const isRenderAvailable = renderStatus === "available";
  const isDatabaseConnected = databaseStatus === "connected";

  const renderLatency = formatMs(metrics?.render?.latency_ms);
  const databaseLatency = formatMs(metrics?.database?.latency_ms);
  const requestDuration = formatMs(metrics?.request_duration_ms);

  useEffect(() => {
    if (!isWaitingForServer) {
      setProgress(100);
      return undefined;
    }

    setProgress(14);

    const intervalId = window.setInterval(() => {
      setProgress((current) => (current >= 88 ? 16 : current + 8));
    }, 700);

    return () => window.clearInterval(intervalId);
  }, [isWaitingForServer]);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);

    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const renderModal = () => {
    if (!isModalOpen) {
      return null;
    }

    return createPortal(
      <div
        className={styles.modalBackdrop}
        role="presentation"
        onMouseDown={closeModal}
      >
        <section
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="health-status-title"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <header className={styles.modalHeader}>
            <div>
              <span className={styles.modalEyebrow}>
                ESTADO DEL LABORATORIO
              </span>

              <h2 id="health-status-title">Servicios del sistema</h2>

              <p>{metrics?.service || "portfolio-backend"}</p>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Cerrar detalles"
            >
              <X size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </header>

          <div className={styles.modalGrid}>
            <article className={styles.modalCard}>
              <div className={styles.modalCardTitle}>
                <Server size={16} aria-hidden="true" />

                <div>
                  <h3>Backend Render</h3>
                  <span>{metrics?.render?.name || "portfolio-backend"}</span>
                </div>
              </div>

              <dl className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <dt>Estado</dt>
                  <dd>{statusLabel(renderStatus)}</dd>
                </div>

                <div className={styles.detailRow}>
                  <dt>Latencia</dt>
                  <dd>{renderLatency}</dd>
                </div>
              </dl>
            </article>

            <article className={styles.modalCard}>
              <div className={styles.modalCardTitle}>
                <Database size={16} aria-hidden="true" />

                <div>
                  <h3>Base de datos</h3>
                  <span>{metrics?.database?.driver || "pgsql"}</span>
                </div>
              </div>

              <dl className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <dt>Estado</dt>
                  <dd>{statusLabel(databaseStatus)}</dd>
                </div>

                <div className={styles.detailRow}>
                  <dt>Latencia</dt>
                  <dd>{databaseLatency}</dd>
                </div>
              </dl>
            </article>

            <article className={styles.modalCard}>
              <div className={styles.modalCardTitle}>
                <Timer size={16} aria-hidden="true" />

                <div>
                  <h3>Petición</h3>
                  <span>Tiempo total de comprobación</span>
                </div>
              </div>

              <dl className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <dt>Duración total</dt>
                  <dd>{requestDuration}</dd>
                </div>

                <div className={styles.detailRow}>
                  <dt>Actualización</dt>
                  <dd>{metrics?.timestamp || "—"}</dd>
                </div>
              </dl>
            </article>
          </div>

          <footer className={styles.modalFooter}>
            <span>
              Estado general:{" "}
              <strong>
                {isHealthy ? "Healthy" : statusLabel(overallStatus)}
              </strong>
            </span>
          </footer>
        </section>
      </div>,
      document.body,
    );
  };

  return (
    <>
      <div className={styles.healthStatusContainer}>
        <button
          ref={triggerRef}
          type="button"
          className={`${styles.healthButton} ${
            isWaitingForServer ? styles.healthButtonWaiting : ""
          }`}
          onClick={() => setIsModalOpen(true)}
          aria-label="Abrir estado del laboratorio"
          title="Ver estado del laboratorio"
        >
          <span
            className={`${styles.statusDot} ${
              isWaitingForServer
                ? styles.statusUnknown
                : isHealthy
                  ? styles.statusOk
                  : styles.statusError
            }`}
            aria-hidden="true"
          />

          <span className={styles.statusCopy}>
            <span className={styles.statusKicker}>
              {isWaitingForServer
                ? "INICIANDO SERVIDOR"
                : isHealthy
                  ? "SERVER ONLINE"
                  : "SERVER OFFLINE"}
            </span>

            <span className={styles.statusDetail}>
              {isWaitingForServer
                ? "Activando servidor; los datos cargarán en breve"
                : `Render: ${
                    isRenderAvailable ? "OK" : statusLabel(renderStatus)
                  } · DB: ${
                    isDatabaseConnected ? "OK" : statusLabel(databaseStatus)
                  } · ${renderLatency}`}
            </span>
          </span>

          <span className={styles.statusIcon} aria-hidden="true">
            {isWaitingForServer ? <Activity size={15} /> : <Server size={15} />}
          </span>

          {isWaitingForServer && (
            <span className={styles.progressTrack} aria-hidden="true">
              <span
                className={styles.progressValue}
                style={{ width: `${progress}%` }}
              />
            </span>
          )}
        </button>
      </div>

      {renderModal()}
    </>
  );
}

export default HealthStatus;
