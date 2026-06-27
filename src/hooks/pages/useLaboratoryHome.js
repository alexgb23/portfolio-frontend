import useAsyncResource from "../core/useAsyncResource";
import { laboratoryService } from "../../services/api";

const initialValue = {
  summary: {},
  featured_items: [],
  clusters: [],
  servers: [],
  nodes: [],
  metrics: [],
  home_assistant: [],
  local_ai: [],
  capabilities: [],
};

export default function useLaboratoryHome(enabled = true) {
  const { data, loading, error } = useAsyncResource(
    laboratoryService.getLaboratoryHome,
    initialValue,
    [],
    "Laboratory home",
    enabled
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