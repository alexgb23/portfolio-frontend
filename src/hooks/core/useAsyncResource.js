// src/hooks/core/useAsyncResource.js
import { useEffect, useState } from "react";

function buildHookErrorMessage(label, error) {
  if (error instanceof Error) {
    return error.message;
  }

  return `${label} error al cargar datos`;
}

// Caché en memoria por clave (label + deps)
const resourceCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export default function useAsyncResource(
  fetcher,
  initialValue,
  deps = [],
  label = "Resource",
) {
  const cacheKey = JSON.stringify([label, ...deps]);

  const [state, setState] = useState(() => {
    const cached = resourceCache.get(cacheKey);
    const isFresh =
      cached && Date.now() - cached.time < CACHE_TTL;

    if (isFresh) {
      return {
        data: cached.data,
        loading: false,
        error: "",
      };
    }

    return {
      data: initialValue,
      loading: true,
      error: "",
    };
  });

  useEffect(() => {
    const cached = resourceCache.get(cacheKey);
    const isFresh =
      cached && Date.now() - cached.time < CACHE_TTL;

    if (isFresh) return;

    let ignore = false;

    async function load() {
      try {
        setState((prev) => ({
          ...prev,
          loading: !cached,
          error: "",
        }));

        const result = await fetcher();

        if (ignore) return;

        const data = result ?? initialValue;

        resourceCache.set(cacheKey, {
          data,
          time: Date.now(),
        });

        setState({
          data,
          loading: false,
          error: "",
        });
      } catch (err) {
        if (ignore) return;

        setState((prev) => ({
          ...prev,
          loading: false,
          error: buildHookErrorMessage(label, err),
        }));
      }
    }

    load();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  return state;
}