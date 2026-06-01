import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/api"; // Tu servicio de Axios configurado

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Llamada a tu función del servicio de API
      await loginAdmin(email, password);

      // Si el login es correcto, redirige al Dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      // Captura el mensaje formateado por tu buildAxiosErrorMessage
      setError(err.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>🔐</div>
          <h2 style={styles.title}>Panel de Control</h2>
          <p style={styles.subtitle}>
            Ingresa tus credenciales de administrador
          </p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#4b5563" : "#3b82f6",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Verificando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

// 🎨 Estilos con diseño profesional e interfaz limpia
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0f172a", // Fondo oscuro moderno
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "20px",
  },
  card: {
    backgroundColor: "#1e293b", // Fondo de la tarjeta
    borderRadius: "16px",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "420px",
    padding: "40px 32px",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  iconContainer: {
    fontSize: "40px",
    marginBottom: "12px",
  },
  title: {
    color: "#f8fafc",
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "14px",
    margin: 0,
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "24px",
  },
  errorIcon: {
    marginRight: "12px",
    fontSize: "16px",
  },
  errorText: {
    color: "#ef4444",
    fontSize: "13px",
    margin: 0,
    fontWeight: "500",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "#cbd5e1",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#f8fafc",
    fontSize: "15px",
    padding: "12px 16px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    width: "100%",
  },
  button: {
    border: "none",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    padding: "14px",
    marginTop: "10px",
    transition: "background-color 0.2s",
  },
};
