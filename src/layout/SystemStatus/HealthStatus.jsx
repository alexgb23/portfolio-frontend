// src/components/layout/HealthStatus.jsx

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import styles from "./HealthStatus.module.css";
import { useHealthMetrics } from "../../hooks/usePortfolioData";

function formatMs(ms) {
  if (ms == null || Number.isNaN(Number(ms))) {
    return "—";
  }
  const value = Number(ms);
  if (value < 1000) {
    return `${value.toFixed(0)} ms`;
  }
  return `${(value / 1000).toFixed(1)} s`;
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
  if (!metrics || typeof metrics !== "object") return false;
  return Boolean(
    metrics.service ||
    metrics.status ||
    metrics.timestamp ||
    metrics.request_duration_ms != null ||
    metrics?.database?.status ||
    metrics?.render?.status ||
    metrics?.cloudflare?.api?.status,
  );
}

function HealthStatus() {
  const { metrics, loading, error, responseTime } = useHealthMetrics(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  const hasData = hasMetricsData(metrics);
  const isWaitingForServer = loading || !hasData;

  const status = metrics?.status;
  const isHealthy = status === "healthy";

  const dbLatency = formatMs(metrics?.database?.latency_ms);
  const apiLatency = formatMs(
    metrics?.render?.latency_ms || metrics?.cloudflare?.api?.latency_ms,
  );

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsModalOpen(false);
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
    if (!isModalOpen) return null;

    return createPortal(
      <div
        className={styles.modalBackdrop}
        role="presentation"
        onMouseDown={closeModal}
      >
        <section
          ref={modalRef}
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="health-status-title"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <header className={styles.modalHeader}>
            <div>
              <span className={styles.modalEyebrow}>
                ESTADO DEL LABORATORIO
              </span>
              <h2 id="health-status-title">Estado del sistema</h2>
              <p>Petición total: {formatMs(metrics?.request_duration_ms)}</p>
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
                <div>
                  <h3>API</h3>
                  <span>{metrics?.service || "portfolio-backend"}</span>
                </div>
              </div>
              <dl className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <dt>Estado</dt>
                  <dd>{statusLabel(status)}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt>Latencia API</dt>
                  <dd>{apiLatency}</dd>
                </div>
              </dl>
            </article>

            <article className={styles.modalCard}>
              <div className={styles.modalCardTitle}>
                <div>
                  <h3>Base de datos</h3>
                  <span>{metrics?.database?.name || "PostgreSQL"}</span>
                </div>
              </div>
              <dl className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <dt>Estado</dt>
                  <dd>{statusLabel(metrics?.database?.status)}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt>Latencia</dt>
                  <dd>{dbLatency}</dd>
                </div>
              </dl>
            </article>
          </div>

          <footer className={styles.modalFooter}>
            <span>
              Estado general:{" "}
              <strong>{isHealthy ? "Healthy" : statusLabel(status)}</strong>
            </span>
            <span>Actualización: {metrics?.timestamp || "—"}</span>
          </footer>
        </section>
      </div>,
      document.body,
    );
  };

  return (
    <>
      <div>
        <button
          ref={triggerRef}
          type="button"
          className={styles.healthButton}
          onClick={() => setIsModalOpen(true)}
          aria-label="Abrir estado del laboratorio"
          title="Estado del laboratorio"
        >
          <span
            className={`${styles.statusDot} ${
              isWaitingForServer
                ? styles.statusUnknown
                : isHealthy
                  ? styles.statusOk
                  : styles.statusError
            }`}
          />

          <span className={styles.statusText}>
            {isWaitingForServer
              ? "Iniciando…"
              : isHealthy
                ? "Laboratorio: Healthy"
                : `Laboratorio: ${statusLabel(status)}`}
          </span>

          {!isWaitingForServer && (
            <span className={styles.latency}>
              {apiLatency !== "—" ? apiLatency : dbLatency}
            </span>
          )}
        </button>
      </div>

      {renderModal()}
    </>
  );
}

export default HealthStatus;
