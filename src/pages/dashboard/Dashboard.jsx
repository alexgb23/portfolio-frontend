import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProjects,
  getNodes,
  getServers,
  getMetrics,
} from "../../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState({
    projects: [],
    nodes: [],
    servers: [],
    metrics: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();

  useEffect(() => {
    // 🛡️ CONTROL DE ACCESO: Si no hay token, te expulsa al login de admin
    const token = localStorage.getItem("token_portfolio");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    async function fetchAllData() {
      try {
        const [projects, nodes, servers, metrics] = await Promise.all([
          getProjects(),
          getNodes(),
          getServers(),
          getMetrics(),
        ]);
        setData({ projects, nodes, servers, metrics });
      } catch (err) {
        console.error("Error al cargar el panel:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token_portfolio");
    navigate("/admin-login");
  };

  if (loading) {
    return (
      <div className="admin-page-container">
        <p style={{ color: "var(--text-sub)" }}>Cargando panel de control...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page-container">
      {/* BARRA SUPERIOR */}
      <header className="dashboard-header">
        <div>
          <h1 className="admin-title" style={{ fontSize: "2rem" }}>
            Panel de Administración 🔐
          </h1>
          <p className="admin-subtitle">
            Gestiona las bases de datos de tu portafolio en tiempo real
          </p>
        </div>
        <button onClick={handleLogout} className="dashboard-logout-btn">
          Cerrar Sesión 🚪
        </button>
      </header>

      {/* BOTONES DE PESTAÑAS (TABS) */}
      <div className="dashboard-tabs">
        <button
          onClick={() => setActiveTab("projects")}
          className={`dashboard-tab-btn ${activeTab === "projects" ? "active" : ""}`}
        >
          📁 Proyectos ({data.projects.length})
        </button>
        <button
          onClick={() => setActiveTab("nodes")}
          className={`dashboard-tab-btn ${activeTab === "nodes" ? "active" : ""}`}
        >
          🌐 Nodos ({data.nodes.length})
        </button>
        <button
          onClick={() => setActiveTab("servers")}
          className={`dashboard-tab-btn ${activeTab === "servers" ? "active" : ""}`}
        >
          🖥️ Servidores ({data.servers.length})
        </button>
        <button
          onClick={() => setActiveTab("metrics")}
          className={`dashboard-tab-btn ${activeTab === "metrics" ? "active" : ""}`}
        >
          📊 Métricas ({data.metrics.length})
        </button>
      </div>

      {/* PANEL DE TABLAS */}
      <div className="dashboard-panel-card">
        <div className="dashboard-table-wrapper">
          {/* TABLA DE PROYECTOS */}
          {activeTab === "projects" && (
            <div>
              <div className="dashboard-table-title-area">
                <h2 className="admin-title" style={{ fontSize: "1.25rem" }}>
                  Base de Datos: Proyectos
                </h2>
                <button className="admin-btn-add">+ Añadir Proyecto</button>
              </div>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th style={{ textAlign: "right" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td
                        style={{ fontWeight: "600", color: "var(--text-main)" }}
                      >
                        {p.title}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button className="admin-btn-edit">Editar ✏️</button>
                        <button className="admin-btn-delete">
                          Eliminar 🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TABLA DE NODOS */}
          {activeTab === "nodes" && (
            <div>
              <div className="dashboard-table-title-area">
                <h2 className="admin-title" style={{ fontSize: "1.25rem" }}>
                  Base de Datos: Nodos
                </h2>
                <button className="admin-btn-add">+ Añadir Nodo</button>
              </div>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del Nodo</th>
                    <th style={{ textAlign: "right" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.nodes.map((n) => (
                    <tr key={n.id}>
                      <td>{n.id}</td>
                      <td>{n.name || "Nodo Activo"}</td>
                      <td style={{ textAlign: "right" }}>
                        <button className="admin-btn-edit">Editar ✏️</button>
                        <button className="admin-btn-delete">
                          Eliminar 🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TABLA DE SERVIDORES */}
          {activeTab === "servers" && (
            <div>
              <div className="dashboard-table-title-area">
                <h2 className="admin-title" style={{ fontSize: "1.25rem" }}>
                  Base de Datos: Servidores
                </h2>
                <button className="admin-btn-add">+ Añadir Servidor</button>
              </div>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Host / IP</th>
                    <th style={{ textAlign: "right" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.servers.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>{s.host || s.ip || "Servidor VPS"}</td>
                      <td style={{ textAlign: "right" }}>
                        <button className="admin-btn-edit">Editar ✏️</button>
                        <button className="admin-btn-delete">
                          Eliminar 🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TABLA DE MÉTRICAS */}
          {activeTab === "metrics" && (
            <div>
              <div className="dashboard-table-title-area">
                <h2 className="admin-title" style={{ fontSize: "1.25rem" }}>
                  Base de Datos: Métricas
                </h2>
                <button className="admin-btn-add">+ Registrar Métrica</button>
              </div>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Uso CPU / Tipo</th>
                    <th style={{ textAlign: "right" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.metrics.map((m) => (
                    <tr key={m.id}>
                      <td>{m.id}</td>
                      <td>{m.label || m.cpu || "Métrica de Rendimiento"}</td>
                      <td style={{ textAlign: "right" }}>
                        <button className="admin-btn-edit">Editar ✏️</button>
                        <button className="admin-btn-delete">
                          Eliminar 🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
