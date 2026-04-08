import type { CSSProperties } from "react"

/** 与 dengta-pc `foodSafetyRisk.vue` 内联 getRiskLevelText 一致（表格展示） */
export function getRiskLevelText(level: number | string | null | undefined): string {
  if (level === "-" || level === null || level === undefined) {
    return "-"
  }
  const levelNum = Number(level)
  const levelMap: Record<number, string> = {
    1: "优秀",
    2: "低风险",
    3: "中风险",
    4: "高风险",
  }
  return levelMap[levelNum] || "-"
}

/** 与 dengta-pc `views/dishwasher/utils/index` getRiskLevelStyle 一致 */
export function getRiskLevelStyle(level: number | string | null | undefined): CSSProperties {
  if (level === "-" || level === null || level === undefined) {
    return {}
  }
  const levelNum = Number(level)
  const levelColorMap: Record<number, string> = {
    1: "#1FA180",
    2: "rgba(8,8,10,0.8)",
    3: "#FF8900",
    4: "#E72323",
  }
  const color = levelColorMap[levelNum]
  return color ? { color } : {}
}

export function dirtyGloveStorageBasketRateStyle(
  dirty_glove_stored_days: number | string,
  real_used_days: number | string,
): string {
  if (
    dirty_glove_stored_days !== "-" &&
    real_used_days !== "-" &&
    Number(dirty_glove_stored_days) >= 0 &&
    Number(real_used_days) >= 0
  ) {
    const rate = Number(dirty_glove_stored_days) / Number(real_used_days)
    if (rate > 0.3) return "#E72323"
    if (rate <= 0.3 && rate >= 0.1) return "#FF8900"
    return ""
  }
  return ""
}

export function overcrowdedLayoutBasketCountRateStyle(
  overcrowded_layout_basket_count_rate: number | string,
): string {
  if (overcrowded_layout_basket_count_rate !== "-" && Number(overcrowded_layout_basket_count_rate) >= 0) {
    const rate = Number(overcrowded_layout_basket_count_rate)
    if (rate > 30) return "#E72323"
    if (rate >= 10 && rate <= 30) return "#FF8900"
    return ""
  }
  return ""
}
