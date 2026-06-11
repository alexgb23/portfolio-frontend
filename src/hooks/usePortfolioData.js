// src/hooks/usePortfolioData.js
import { useEffect, useState } from "react";
import { getProjects, getNodes, getServers, getMetrics } from "../services/api";

function useAsyncResource(fetcher, initialValue = [], deps = []) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const result = await fetcher();

        if (!ignore) {
          setData(
            Array.isArray(initialValue)
              ? (result ?? [])
              : (result ?? initialValue),
          );
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Error al cargar datos");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, deps);

  return { data, loading, error };
}

export function useProjects() {
  const { data, loading, error } = useAsyncResource(getProjects, [], []);
  return { projects: data, loading, error };
}

export function useNodes() {
  const { data, loading, error } = useAsyncResource(getNodes, [], []);
  return { nodes: data, loading, error };
}

export function useServers() {
  const { data, loading, error } = useAsyncResource(getServers, [], []);
  return { servers: data, loading, error };
}

export function useMetrics() {
  const { data, loading, error } = useAsyncResource(getMetrics, [], []);
  return { metrics: data, loading, error };
}

export function useInfrastructureData() {
  const [servers, setServers] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadInfrastructure() {
      try {
        setLoading(true);
        setError("");

        const [serversData, metricsData] = await Promise.all([
          getServers(),
          getMetrics(),
        ]);

        if (!ignore) {
          setServers(serversData ?? []);
          setMetrics(metricsData ?? []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Error al cargar infraestructura");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadInfrastructure();

    return () => {
      ignore = true;
    };
  }, []);

  return { servers, metrics, loading, error };
}

export function useHomeData() {
  const [projects, setProjects] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [servers, setServers] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadHome() {
      try {
        setLoading(true);
        setError("");

        const [projectsData, nodesData, serversData, metricsData] =
          await Promise.all([
            getProjects(),
            getNodes(),
            getServers(),
            getMetrics(),
          ]);

        if (!ignore) {
          setProjects(projectsData ?? []);
          setNodes(nodesData ?? []);
          setServers(serversData ?? []);
          setMetrics(metricsData ?? []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Error al cargar la portada");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadHome();

    return () => {
      ignore = true;
    };
  }, []);

  return { projects, nodes, servers, metrics, loading, error };
}
