import useAsyncResource from "../core/useAsyncResource";
import { portfolioService } from "../../services/api";

const initialValue = {
  social_links: [],
  projects: [],
  laboratory_summary: {
    servers_count: 0,
    nodes_count: 0,
    metrics_count: 0,
  },
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
    laboratorySummary:
      data?.laboratory_summary && typeof data.laboratory_summary === "object"
        ? {
            servers_count: Number(data.laboratory_summary.servers_count) || 0,
            nodes_count: Number(data.laboratory_summary.nodes_count) || 0,
            metrics_count: Number(data.laboratory_summary.metrics_count) || 0,
          }
        : {
            servers_count: 0,
            nodes_count: 0,
            metrics_count: 0,
          },
    loading,
    error,
  };
}
