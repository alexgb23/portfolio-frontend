import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

// 1. Ajustamos el valor inicial reflejando fielmente la nueva estructura del JSON de tu API
const initialValue = {
  social_links: [],
  projects: [],
  servers: [],
  nodes: [],
  metrics: [],
};

export default function usePortfolioHome(enabled = true) {
  const { data, loading, error } = useAsyncResource(
    portfolioService.getHomeData,
    initialValue,
    [],
    "Home",
    enabled,
  );

  // 2. Extraemos y validamos los arreglos reales para entregárselos limpios a Home.jsx
  return {
    homeData: data,

    // Al no venir el objeto profile desde este endpoint, devolvemos null de forma segura
    profile: null,

    // Extraemos las colecciones verificando que sean arrays válidos
    socialLinks: Array.isArray(data?.social_links) ? data.social_links : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    servers: Array.isArray(data?.servers) ? data.servers : [],
    nodes: Array.isArray(data?.nodes) ? data.nodes : [],
    metrics: Array.isArray(data?.metrics) ? data.metrics : [],

    // Mantenemos los fallbacks vacíos por compatibilidad arquitectónica
    skills: [],
    highlights: [],
    expertise: [],

    loading,
    error,
  };
}
