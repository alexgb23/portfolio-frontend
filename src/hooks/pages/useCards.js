import { useEffect, useState } from "react";
import { laboratoryService } from "../../services/api";

const initialValue = {
  servers: [],
  nodes: [],
  metrics: [],
};

export default function useLaboratoryData(enabled = true) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadLaboratoryData() {
      setLoading(true);
      setError(null);

      try {
        const [servers, nodes, metrics] = await Promise.all([
          laboratoryService.getServers(),
          laboratoryService.getNodes(),
          laboratoryService.getMetrics(),
        ]);

        if (cancelled) return;

        setData({
          servers: Array.isArray(servers) ? servers : [],
          nodes: Array.isArray(nodes) ? nodes : [],
          metrics: Array.isArray(metrics) ? metrics : [],
        });
      } catch (err) {
        if (cancelled) return;

        setError(err);
        setData(initialValue);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadLaboratoryData();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return {
    servers: data.servers,
    nodes: data.nodes,
    metrics: data.metrics,
    loading,
    error,
  };
}
