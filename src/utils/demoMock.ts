import mockData from "@/mock/data/mock.js"

/** 与 dengta-pc `axios` demo 模式一致：浏览器路径含 `/demo` 时走 `mock/data/mock.js` */
export function isDemoPath(): boolean {
  return typeof window !== "undefined" && window.location.pathname.includes("/demo")
}

function parseRequestData(data: unknown): Record<string, unknown> {
  if (data == null || data === "") return {}
  if (typeof data === "string") {
    try {
      return JSON.parse(data) as Record<string, unknown>
    } catch {
      return {}
    }
  }
  if (typeof data === "object") return data as Record<string, unknown>
  return {}
}

type ApiEnvelope = { success: boolean; content: unknown }

/**
 * 与 dengta-pc `mockData["api" + config.url]` 对齐。
 * axios 的 `config.url` 可能是 `/ec/...` 或已带 `baseURL` 的 `/api/ec/...`，统一成 registry key。
 */
function toMockRegistryKey(urlPath: string): string {
  let p = urlPath.split("?")[0]
  // 合并 baseURL 后可能是 `/api/ec/...`，registry 键为 `api/ec/...`（与 PC `api` + `/ec/...` 一致）
  if (p.startsWith("/api/")) {
    p = p.slice(4)
  }
  if (!p.startsWith("/")) {
    p = `/${p}`
  }
  return `api${p}`
}

/**
 * 与 dengta-pc `mockData["api" + config.url]` 相同：命中则返回 `{ success, content }`（即 axios 的 `res.data`）。
 * 未命中返回 null，与 PC 一样回退到真实请求。
 */
export function getDemoMockBody(
  urlPath: string,
  params: Record<string, unknown> | undefined,
  data: unknown,
): ApiEnvelope | null {
  const key = toMockRegistryKey(urlPath)
  const handler = (mockData as Record<string, unknown>)[key]
  if (typeof handler !== "function") return null
  try {
    const mockResponse = (
      handler as (
        p: Record<string, unknown>,
        d: Record<string, unknown>,
      ) => { data: ApiEnvelope }
    )(params || {}, parseRequestData(data))
    const inner = mockResponse?.data
    if (inner && typeof inner === "object" && "success" in inner) {
      return inner as ApiEnvelope
    }
    return null
  } catch {
    return null
  }
}
