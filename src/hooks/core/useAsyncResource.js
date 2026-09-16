// src/core/useAsyncResource.js

import { useEffect, useRef, useState } from "react";

function buildHookErrorMessage(label, error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return `${label} error al cargar datos`;
}

/*
 * Detecta si la respuesta tiene contenido utilizable.
 * También admite la estructura del endpoint de health:
 * status, service, timestamp, render, database, etc.
 */
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
    // sessionStorage no disponible o lleno.
  }
}

function getLocalResource(cacheKey) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(getStorageKey(cacheKey, "local"));

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
      window.localStorage.removeItem(getStorageKey(cacheKey, "local"));
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
    // localStorage no disponible o lleno.
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

/*
 * Hook genérico para cargar recursos asíncronos.
 *
 * fetcher: función async que devuelve los datos.
 * initialValue: valor inicial, por ejemplo [] o null.
 * deps: valores que realmente deben reiniciar la petición.
 * label: clave/identificador del recurso.
 * enabled: permite activar o desactivar la carga.
 * options:
 *   retryOnError: reintenta cuando Render está arrancando.
 *   persistCache: guarda caché en localStorage/sessionStorage.
 *   refreshInterval: actualiza cada X milisegundos.
 */
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
   * El cacheKey se basa solo en valores serializables/estables.
   * No incluimos initialValue en dependencias: normalmente es [] o {},
   * y se recrea en cada render, causando Maximum update depth exceeded.
   */
  const cacheKey = JSON.stringify([label, enabled, persistCache, ...deps]);

  const timerRef = useRef(null);
  const attemptRef = useRef(0);
  const fetcherRef = useRef(fetcher);
  const initialValueRef = useRef(initialValue);

  /*
   * Conserva el último fetcher e initialValue sin convertirlos
   * en dependencias del effect.
   */
  fetcherRef.current = fetcher;
  initialValueRef.current = initialValue;

  const [state, setState] = useState(() => {
    if (!enabled) {
      return {
        data: initialValue,
        loading: false,
        error: "",
        isRefreshing: false,
      };
    }

    const cached = getCachedEntry(cacheKey, persistCache);

    if (hasMeaningfulData(cached?.data)) {
      return {
        data: cached.data,
        loading: false,
        error: "",
        isRefreshing: true,
      };
    }

    return {
      data: initialValue,
      loading: true,
      error: "",
      isRefreshing: false,
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
        });

        if (refreshInterval > 0) {
          schedule(refreshInterval);
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        setState((previous) => {
          const hasPreviousData = hasMeaningfulData(previous.data);

          return {
            ...previous,
            loading: !hasPreviousData,
            isRefreshing: hasPreviousData,
            error: buildHookErrorMessage(label, error),
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
