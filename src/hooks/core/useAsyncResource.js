import { useEffect, useState } from "react";

function buildHookErrorMessage(label, error) {
  if (error instanceof Error) {
    return error.message;
  }

  return `${label} error al cargar datos`;
}

const resourceCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

export default function useAsyncResource(
  fetcher,
  initialValue,
  deps = [],
  label = "Resource",
  enabled = true
) {
  const cacheKey = JSON.stringify([label, enabled, ...deps]);

  const [state, setState] = useState(() => {
    if (!enabled) {
      return {
        data: initialValue,
        loading: false,
        error: "",
      };
    }

    const cached = resourceCache.get(cacheKey);
    const isFresh = cached && Date.now() - cached.time < CACHE_TTL;

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
    if (!enabled) return;

    const cached = resourceCache.get(cacheKey);
    const isFresh = cached && Date.now() - cached.time < CACHE_TTL;

    if (isFresh) {
      setState({
        data: cached.data,
        loading: false,
        error: "",
      });
      return;
    }

    let ignore = false;

    async function load() {
      try {
        setState((prev) => ({
          ...prev,
          loading: true,
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
  }, [cacheKey, enabled]);

  return state;
}