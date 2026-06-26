import { useState } from "react";

export default function useContactChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(payload) {
    try {
      setLoading(true);
      setError("");

      setMessages((current) => [...current, payload]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat error");
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
}
