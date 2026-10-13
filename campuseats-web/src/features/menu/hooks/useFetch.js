import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("HTTP " + res.status);
        }
        const json = await res.json();
        if (active) {
          setData(json);
          setIsLoading(false);
        }
      } catch (err) {
        // Fallback resilience for cloud deployment:
        // If external API fails (cold-start, CORS, or sleeping server), fall back gracefully to /menu.json
        if (url !== "/menu.json") {
          console.warn(`[CampusEats] API call to ${url} failed (${err.message}). Falling back to local /menu.json`);
          try {
            const fallbackRes = await fetch("/menu.json");
            if (fallbackRes.ok) {
              const fallbackJson = await fallbackRes.json();
              if (active) {
                setData(fallbackJson);
                setIsLoading(false);
                return;
              }
            }
          } catch (fallbackErr) {
            console.error("[CampusEats] Fallback fetch also failed", fallbackErr);
          }
        }

        if (active) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, [url]);

  return { data, isLoading, error };
}
