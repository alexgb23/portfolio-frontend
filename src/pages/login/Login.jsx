import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/api";
import usePageTitle from "../../hooks/usePageTitle";

export default function Login() {
  usePageTitle("Acceso administrador | Alexander Galvez");

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
      await loginAdmin(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-page-container">
      <section
        className="admin-card framed-card"
        aria-labelledby="admin-login-title"
      >
        <div className="admin-card-glow" aria-hidden="true"></div>

        <div className="admin-header">
          <div className="admin-login-icon" aria-hidden="true">
            🔐
          </div>

          <span className="admin-kicker">Acceso administrador</span>

          <h1 id="admin-login-title" className="admin-title">
            Panel de control
          </h1>

          <p className="admin-subtitle">
            Accede a tu entorno privado para gestionar contenido, métricas y
            paneles internos.
          </p>
        </div>

        {error && (
          <div className="admin-error-box" role="alert">
            <span className="admin-error-icon" aria-hidden="true">
              ⚠️
            </span>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-input-group">
            <label htmlFor="admin-email" className="admin-label">
              Correo electrónico
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="admin-input"
            />
          </div>

          <div className="admin-input-group">
            <label htmlFor="admin-password" className="admin-label">
              Contraseña
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="admin-input"
            />
          </div>

          <div className="admin-actions">
            <button
              type="submit"
              disabled={loading}
              className="admin-btn-primary"
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>

            <p className="admin-enter-tip">
              También puedes pulsar <kbd>Enter</kbd>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
