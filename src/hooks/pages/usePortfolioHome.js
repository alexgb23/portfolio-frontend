// src/hooks/pages/usePortfolioHome.js
import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

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

  return {
    socialLinks: Array.isArray(data?.social_links) ? data.social_links : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    servers: Array.isArray(data?.servers) ? data.servers : [],
    nodes: Array.isArray(data?.nodes) ? data.nodes : [],
    metrics: Array.isArray(data?.metrics) ? data.metrics : [],
    loading,
    error,
  };
}
