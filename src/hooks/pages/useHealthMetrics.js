// src/hooks/useHealthMetrics.js

import useAsyncResource from "../core/useAsyncResource";
import { healthService } from "../../services/api";

const initialValue = {
  status: "loading",
  service: "portfolio-backend",
  timestamp: null,
  runtime: {},
  database: {
    status: "unknown",
    driver: null,
    latency_ms: null,
  },
  cloudflare: {
    proxy_detected: false,
    ray_id: null,
    colo: null,
    api: {
      status: "unknown",
      latency_ms: null,
    },
  },
  render: {
    status: "unknown",
    latency_ms: null,
  },
  request_duration_ms: null,
};

function hasMeaningfulHealthData(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (value.status) return true;
  if (value.service) return true;
  if (value.timestamp) return true;
  if (value.request_duration_ms != null) return true;

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Object.values(value).some((v) => {
    if (Array.isArray(v)) return v.length > 0;
    if (v && typeof v === "object") {
      if (v.status || v.service || v.timestamp) return true;
      return Object.keys(v).length > 0;
    }
    return v != null && v !== "";
  });
}

export default function useHealthMetrics(enabled = true) {
  const { data, loading, error, isRefreshing, responseTime } = useAsyncResource(
    healthService.getMetrics,
    initialValue,
    [],
    "Health Metrics",
    enabled,
    {
      retryOnError: true,
      persistCache: true,
      refreshInterval: 60_000,
    },
  );

  const hasData = data && hasMeaningfulHealthData(data);

  return {
    metrics: hasData ? data : initialValue,
    loading: !hasData && loading,
    error,
    isRefreshing,
    responseTime,
  };
}
