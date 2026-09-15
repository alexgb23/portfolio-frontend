import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

/*
 * Render puede tardar al despertar si el backend está suspendido.
 * Damos hasta 75 segundos al POST antes de considerarlo fallido.
 */
const REQUEST_TIMEOUT_MS = 75_000;

function createTimeoutSignal(timeoutMs) {
  const controller = new AbortController();

  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return {
    signal: controller.signal,
    clear: () => window.clearTimeout(timeoutId),
  };
}

function getErrorMessage(data, fallback) {
  return (
    data?.message ||
    (data?.errors ? Object.values(data.errors).flat()[0] : null) ||
    fallback
  );
}

export default function useContactChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [elapsed, setElapsed] = useState(0);

  const successTimeoutRef = useRef(null);
  const loadingIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }

      if (loadingIntervalRef.current) {
        window.clearInterval(loadingIntervalRef.current);
      }
    };
  }, []);

  function stopElapsedTimer() {
    if (loadingIntervalRef.current) {
      window.clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    }
  }

  function startElapsedTimer() {
    stopElapsedTimer();
    setElapsed(0);

    loadingIntervalRef.current = window.setInterval(() => {
      setElapsed((current) => current + 100);
    }, 100);
  }

  async function sendMessage(payload) {
    if (loading) {
      return null;
    }

    const timeout = createTimeoutSignal(REQUEST_TIMEOUT_MS);

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      startElapsedTimer();

      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }

      const response = await fetch(`${API_URL}/api/contact-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: timeout.signal,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, "No se pudo enviar el mensaje"));
      }

      setMessages((current) => [...current, payload]);

      setSuccess(
        data?.message ??
          "Mensaje enviado correctamente. Te responderé lo antes posible.",
      );

      successTimeoutRef.current = window.setTimeout(() => {
        setSuccess("");
        successTimeoutRef.current = null;
      }, 5_000);

      return data;
    } catch (err) {
      const isTimeout =
        err instanceof DOMException && err.name === "AbortError";

      const message = isTimeout
        ? "El servidor está tardando en iniciar. Espera unos segundos y vuelve a enviar el mensaje."
        : err instanceof Error
          ? err.message
          : "Error enviando el mensaje";

      setError(message);
      throw new Error(message);
    } finally {
      timeout.clear();
      stopElapsedTimer();
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    error,
    success,
    elapsed,
    sendMessage,
  };
}
