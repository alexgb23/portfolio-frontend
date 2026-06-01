import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// 1. Instancia centralizada de Axios para reutilizar configuraciones
const apiCliente = axios.create({
  baseURL: API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 🔑 INTERCEPTOR: Agrega automáticamente tu token de administrador si existe
apiCliente.interceptors.request.use((config) => {
  const token = localStorage.getItem("token_portfolio");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función auxiliar para formatear errores (Tu código original)
function buildAxiosErrorMessage(label, error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `${label} HTTP ${error.response.status}`;
    }
    if (error.request) {
      return `${label} sin respuesta del servidor`;
    }
    return `${label} ${error.message}`;
  }
  return `${label} error desconocido`;
}

// 🟢 PETICIONES PÚBLICAS (Tu código original simplificado y optimizado)
export async function getProjects() {
  try {
    const response = await apiCliente.get("/api/projects");
    return response.data;
  } catch (error) {
    throw new Error(buildAxiosErrorMessage("Projects", error), {
      cause: error,
    });
  }
}

export async function getNodes() {
  try {
    const response = await apiCliente.get("/api/nodes");
    return response.data;
  } catch (error) {
    throw new Error(buildAxiosErrorMessage("Nodes", error), { cause: error });
  }
}

export async function getServers() {
  try {
    const response = await apiCliente.get("/api/servers");
    return response.data;
  } catch (error) {
    throw new Error(buildAxiosErrorMessage("Servers", error), { cause: error });
  }
}

export async function getMetrics() {
  try {
    const response = await apiCliente.get("/api/metrics");
    return response.data;
  } catch (error) {
    throw new Error(buildAxiosErrorMessage("Metrics", error), { cause: error });
  }
}

// 🔴 NUEVAS PETICIONES PRIVADAS Y AUTENTICACIÓN

// Añade esto al final de tu api.js junto a tus otras funciones privadas

// Función para comprobar en tiempo real si el token de la sesión sigue activo
export async function chequearAutenticacion() {
  try {
    const response = await apiCliente.get("/api/verify-auth");
    return response.data; // Retorna los datos del usuario si el token es válido
  } catch (error) {
    // Si da error 401, el interceptor de respuesta de Axios lo borrará y te redirigirá a /login automáticamente
    throw new Error(buildAxiosErrorMessage("Auth Verification", error), {
      cause: error,
    });
  }
}

// Función para iniciar sesión y guardar el token
export async function loginAdmin(email, password) {
  try {
    const response = await apiCliente.post("/api/login", { email, password });

    // Guardamos el token en el almacenamiento del navegador
    if (response.data.token) {
      localStorage.setItem("token_portfolio", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error(buildAxiosErrorMessage("Login", error), { cause: error });
  }
}

// Función para crear un nuevo proyecto (Admin)
export async function createProject(projectData) {
  try {
    const response = await apiCliente.post("/api/projects", projectData);
    return response.data;
  } catch (error) {
    throw new Error(buildAxiosErrorMessage("Create Project", error), {
      cause: error,
    });
  }
}
