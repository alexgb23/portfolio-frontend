import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, getNodes, getServers, getMetrics } from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    projects: [],
    nodes: [],
    servers: [],
    metrics: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 🛡️ CONTROL DE ACCESO FRONTEND: Si no hay token, te expulsa al login
    const token = localStorage.getItem("token_portfolio");
    if (!token) {
      navigate("/login");
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
    localStorage.removeItem("token_portfolio"); // Borra el token
    navigate("/login");
  };

  if (loading) return <p>Cargando panel de control...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Panel de Administración 🔐</h1>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Ejemplo: Tabla para ver Proyectos */}
      <h2>Gestión de Proyectos ({data.projects.length})</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginBottom: "30px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.projects.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>
                <button style={{ marginRight: "10px" }}>Editar ✏️</button>
                <button style={{ backgroundColor: "orange" }}>
                  Eliminar 🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Puedes replicar la misma estructura de tabla para nodes, servers y metrics abajo */}
    </div>
  );
}
