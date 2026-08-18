export const normalizeUrl = (url: string): string => {
  const withoutQuery = url.split("?")[0] ?? "";
  return withoutQuery.replace(/^\/+/, "").replace(/\/+$/, "");
};

/**
 * Matches a normalized request path against a route pattern that may contain
 * `:param` segments (e.g. "deposit/cancel/:id"). Returns matched params or null.
 */
export const matchPattern = (
  pattern: string,
  path: string,
): Record<string, string> | null => {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i] ?? "";
    const pathPart = pathParts[i] ?? "";

    if (patternPart.startsWith(":")) {
      params[patternPart.slice(1)] = decodeURIComponent(pathPart);
      continue;
    }

    if (patternPart !== pathPart) return null;
  }

  return params;
};

export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Small randomized latency so the mock layer feels like a real network call. */
export const simulateLatency = () => delay(120 + Math.floor(Math.random() * 180));

export const paginate = <T>(items: T[], page = 1, size = 10): T[] => {
  const start = (page - 1) * size;
  return items.slice(start, start + size);
};
