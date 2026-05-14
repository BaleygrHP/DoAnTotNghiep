const FALLBACK_ERROR_CODES = new Set(['ERR_NETWORK', 'ECONNABORTED']);

export function shouldUseWebMock(error) {
  if (!error) {
    return true;
  }

  if (FALLBACK_ERROR_CODES.has(error.code)) {
    return true;
  }

  if (!error.response) {
    return true;
  }

  return error.response.status >= 500;
}

export async function withWebFallback(request, fallback, label = 'web api') {
  try {
    return await request();
  } catch (error) {
    if (!shouldUseWebMock(error)) {
      throw error;
    }

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[web-mock] Fallback enabled for ${label}`, error);
    }

    return typeof fallback === 'function' ? fallback(error) : fallback;
  }
}
