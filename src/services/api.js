import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:8000"
}/api`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

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

async function getRequest(url, label) {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw new Error(buildAxiosErrorMessage(label, error), {
      cause: error,
    });
  }
}

async function postRequest(url, data, label) {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(buildAxiosErrorMessage(label, error), {
      cause: error,
    });
  }
}

export const portfolioService = {
  getHomeData: () => getRequest("/portfolio-home", "Portfolio Home"),
  getProjects: () => getRequest("/projects", "Projects"),
  getProjectDetail: (id) => getRequest(`/projects/${id}`, "Project Detail"),
};

export const laboratoryService = {
  getLaboratoryList: () => getRequest("/laboratorio", "Laboratory List"),
  getLaboratoryDetail: (id) =>
    getRequest(`/laboratorio/${id}`, "Laboratory Detail"),
  getLaboratoryHome: () => getRequest("/laboratorio/home", "Laboratory Home"),
};

export { apiClient, getRequest, postRequest };
