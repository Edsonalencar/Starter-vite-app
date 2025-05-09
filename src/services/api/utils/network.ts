export function isOnline(): boolean {
  return navigator.onLine;
}

export function formatUrlWithParams(
  baseUrl: string,
  path: string,
  params?: Record<string, string | number>
): string {
  const url = new URL(`${baseUrl}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
}
