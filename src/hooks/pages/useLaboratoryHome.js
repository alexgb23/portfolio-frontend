import useAsyncResource from "../core/useAsyncResource";
import { laboratoryService } from "../../services/api";

export default function useLaboratoryHome() {
  const { data, loading, error } = useAsyncResource(
    laboratoryService.getLaboratoryHome,
    {
      summary: {},
      featured_items: [],
      clusters: [],
      servers: [],
      nodes: [],
      metrics: [],
      home_assistant: [],
      local_ai: [],
      capabilities: [],
    },
    [],
    "Laboratory home"
  );

  return {
    laboratoryHome: data,
    summary: data?.summary ?? {},
    featuredItems: Array.isArray(data?.featured_items) ? data.featured_items : [],
    clusters: Array.isArray(data?.clusters) ? data.clusters : [],
    servers: Array.isArray(data?.servers) ? data.servers : [],
    nodes: Array.isArray(data?.nodes) ? data.nodes : [],
    metrics: Array.isArray(data?.metrics) ? data.metrics : [],
    homeAssistant: Array.isArray(data?.home_assistant) ? data.home_assistant : [],
    localAi: Array.isArray(data?.local_ai) ? data.local_ai : [],
    capabilities: Array.isArray(data?.capabilities) ? data.capabilities : [],
    loading,
    error,
  };
}