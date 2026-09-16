// src/core/useAsyncResource.js

import { useEffect, useRef, useState } from "react";

function buildHookErrorMessage(label, error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return `${label} error al cargar datos`;
}

function hasMeaningfulData(value) {
  if (value == null) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value !== "object") {
    return value !== "";
  }

  /*
   * Compatibilidad con /health:
   * una respuesta con status/service/timestamp ya es válida aunque
   * todavía no haya arrays o todos los demás campos sean opcionales.
   */
  if (
    value.status ||
    value.service ||
    value.timestamp ||
    value.request_duration_ms != null ||
    value.render?.status ||
    value.database?.status
  ) {
    return true;
  }

  return Object.values(value).some((item) => {
    if (Array.isArray(item)) {
      return item.length > 0;
    }

    if (item && typeof item === "object") {
      return Object.keys(item).length > 0;
    }

    return item != null && item !== "";
  });
}

const resourceCache = new Map();
const pendingRequests = new Map();

const CACHE_TTL = 5 * 60 * 1000;
const STARTUP_RETRY_MS = 3_000;
const MAX_RETRY_DELAY_MS = 45_000;

function getStorageKey(cacheKey, type) {
  return `portfolio:async-resource:${type}:${cacheKey}`;
}

function getSessionResource(cacheKey) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(
      getStorageKey(cacheKey, "session"),
    );

    if (!raw) {
      return null;
    }

    const cached = JSON.parse(raw);

    if (
      !cached ||
      typeof cached !== "object" ||
      !("data" in cached) ||
      !cached.time
    ) {
      return null;
    }

    return cached;
  } catch {
    return null;
  }
}

function setSessionResource(cacheKey, data) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(
      getStorageKey(cacheKey, "session"),
      JSON.stringify({
        data,
        time: Date.now(),
      }),
    );
  } catch {
    // Storage no disponible, lleno o restringido.
  }
}

function getLocalResource(cacheKey) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storageKey = getStorageKey(cacheKey, "local");
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return null;
    }

    const cached = JSON.parse(raw);

    if (
      !cached ||
      typeof cached !== "object" ||
      !("data" in cached) ||
      !cached.time
    ) {
      return null;
    }

    const ageMs = Date.now() - cached.time;

    if (ageMs > CACHE_TTL) {
      window.localStorage.removeItem(storageKey);
      return null;
    }

    return cached;
  } catch {
    return null;
  }
}

function setLocalResource(cacheKey, data) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      getStorageKey(cacheKey, "local"),
      JSON.stringify({
        data,
        time: Date.now(),
      }),
    );
  } catch {
    // Storage no disponible, lleno o restringido.
  }
}

function getCachedEntry(cacheKey, persistCache) {
  const memoryCached = resourceCache.get(cacheKey);

  if (memoryCached) {
    return memoryCached;
  }

  if (!persistCache) {
    return null;
  }

  const localCached = getLocalResource(cacheKey);

  if (localCached) {
    resourceCache.set(cacheKey, localCached);
    return localCached;
  }

  const sessionCached = getSessionResource(cacheKey);

  if (sessionCached) {
    resourceCache.set(cacheKey, sessionCached);
    return sessionCached;
  }

  return null;
}

function setCachedEntry(cacheKey, data, persistCache) {
  const entry = {
    data,
    time: Date.now(),
  };

  resourceCache.set(cacheKey, entry);

  if (!persistCache) {
    return;
  }

  /*
   * Conserva exactamente el comportamiento actual:
   * cache en localStorage y sessionStorage.
   * Por tanto, HealthStatus también podrá recuperar los últimos
   * datos válidos si su hook usa persistCache: true.
   */
  setLocalResource(cacheKey, data);
  setSessionResource(cacheKey, data);
}

function getSharedRequest(cacheKey, fetcher, persistCache) {
  const pending = pendingRequests.get(cacheKey);

  if (pending) {
    return pending;
  }

  const request = Promise.resolve()
    .then(fetcher)
    .then((result) => {
      const data = result ?? null;

      if (hasMeaningfulData(data)) {
        setCachedEntry(cacheKey, data, persistCache);
      }

      return data;
    })
    .finally(() => {
      pendingRequests.delete(cacheKey);
    });

  pendingRequests.set(cacheKey, request);

  return request;
}

export default function useAsyncResource(
  fetcher,
  initialValue,
  deps = [],
  label = "Resource",
  enabled = true,
  options = {},
) {
  const {
    retryOnError = false,
    persistCache = false,
    refreshInterval = 0,
  } = options;

  /*
   * initialValue no se incluye aquí ni en el efecto:
   * si algún hook pasa [] / {} inline, una nueva referencia por render
   * provocaría de nuevo un bucle de actualizaciones.
   */
  const cacheKey = JSON.stringify([label, enabled, persistCache, ...deps]);

  const timerRef = useRef(null);
  const attemptRef = useRef(0);
  const fetcherRef = useRef(fetcher);
  const initialValueRef = useRef(initialValue);

  fetcherRef.current = fetcher;
  initialValueRef.current = initialValue;

  const [state, setState] = useState(() => {
    if (!enabled) {
      return {
        data: initialValue,
        loading: false,
        error: "",
        isRefreshing: false,
        isRetrying: false,
      };
    }

    const cached = getCachedEntry(cacheKey, persistCache);

    if (hasMeaningfulData(cached?.data)) {
      return {
        data: cached.data,
        loading: false,
        error: "",
        isRefreshing: true,
        isRetrying: false,
      };
    }

    return {
      data: initialValue,
      loading: true,
      error: "",
      isRefreshing: false,
      isRetrying: false,
    };
  });

  useEffect(() => {
    let cancelled = false;

    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const schedule = (delay) => {
      clearTimer();

      timerRef.current = window.setTimeout(() => {
        void load();
      }, delay);
    };

    const load = async () => {
      if (cancelled || !enabled) {
        return;
      }

      setState((previous) => {
        const hasPreviousData = hasMeaningfulData(previous.data);

        return {
          ...previous,
          loading: !hasPreviousData,
          isRefreshing: hasPreviousData,
          error: "",
          isRetrying: previous.isRetrying,
        };
      });

      try {
        const result = await getSharedRequest(
          cacheKey,
          fetcherRef.current,
          persistCache,
        );

        if (cancelled) {
          return;
        }

        const data = result ?? initialValueRef.current;

        if (!hasMeaningfulData(data)) {
          throw new Error("La API todavía no ha devuelto datos");
        }

        attemptRef.current = 0;

        setCachedEntry(cacheKey, data, persistCache);

        setState({
          data,
          loading: false,
          error: "",
          isRefreshing: false,
          isRetrying: false,
        });

        if (refreshInterval > 0) {
          schedule(refreshInterval);
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        const isTemporaryFailure = retryOnError;

        setState((previous) => {
          const hasPreviousData = hasMeaningfulData(previous.data);

          return {
            ...previous,
            loading: !hasPreviousData,
            isRefreshing: hasPreviousData,

            /*
             * Render arrancando = error temporal:
             * no llenamos `error` para que las tarjetas no muestren
             * “no se pueden cargar datos”.
             */
            error: isTemporaryFailure
              ? ""
              : buildHookErrorMessage(label, error),

            /*
             * Los componentes pueden usar esto para skeletons o
             * “Conectando con el servidor…”.
             */
            isRetrying: isTemporaryFailure,
          };
        });

        if (retryOnError) {
          attemptRef.current += 1;

          const retryDelay = Math.min(
            STARTUP_RETRY_MS * attemptRef.current,
            MAX_RETRY_DELAY_MS,
          );

          schedule(retryDelay);
        }
      }
    };

    if (!enabled) {
      attemptRef.current = 0;
      clearTimer();

      setState({
        data: initialValueRef.current,
        loading: false,
        error: "",
        isRefreshing: false,
        isRetrying: false,
      });

      return () => {
        cancelled = true;
        clearTimer();
      };
    }

    const cached = getCachedEntry(cacheKey, persistCache);

    if (hasMeaningfulData(cached?.data)) {
      setState({
        data: cached.data,
        loading: false,
        error: "",
        isRefreshing: true,
        isRetrying: false,
      });
    }

    attemptRef.current = 0;
    void load();

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [cacheKey, enabled, persistCache, refreshInterval, retryOnError]);

  return state;
}
