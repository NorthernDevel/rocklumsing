export const useBestUrl = () => {
  const url = useRequestURL() // SSR-safe

  const origin = import.meta.client
    ? window.location.origin
    : `${url.protocol}//${url.host}`

  const fullPath = import.meta.client
    ? window.location.pathname + window.location.search
    : url.pathname + url.search

  const fullUrl = origin + fullPath

  return {
    origin,
    path: fullPath,
    fullUrl,
  }
}
