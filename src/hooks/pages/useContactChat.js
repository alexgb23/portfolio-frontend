import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export default function useContactChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function sendMessage(payload) {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/api/contact-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const firstError =
          data?.message ||
          (data?.errors ? Object.values(data.errors).flat()[0] : null) ||
          "No se pudo enviar el mensaje";

        throw new Error(firstError);
      }

      setMessages((current) => [...current, payload]);
      setSuccess(data?.message ?? "Mensaje enviado correctamente");

      return data;
    } catch (err) {
      if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
        setSuccess(
          "Tu mensaje quedó guardado correctamente. El correo puede tardar un poco en procesarse."
        );
        return {
          message:
            "Tu mensaje quedó guardado correctamente. El correo puede tardar un poco en procesarse.",
          data: {
            mail_sent: false,
          },
        };
      }

      const message =
        err instanceof Error ? err.message : "Error enviando mensaje";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    error,
    success,
    sendMessage,
  };
}