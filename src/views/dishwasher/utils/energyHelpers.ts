/** 与 dengta-pc `views/dishwasher/utils/index` 一致 */

export function tablewareUnderPlacedRateStyle(underfilled_layout_basket_count_rate: number | string): string {
  if (underfilled_layout_basket_count_rate !== "-" && Number(underfilled_layout_basket_count_rate) >= 0) {
    const n = Number(underfilled_layout_basket_count_rate)
    if (n > 20) return "#E72323"
    if (n >= 10 && n <= 20) return "#FF8900"
    return ""
  }
  return ""
}

export function powerConsumptionAvgStyle(device_type: number, power_consumption_avg: number | string): string {
  const S1 = [11]
  const E60 = [6]
  if (power_consumption_avg !== "-" && Number(power_consumption_avg) >= 0) {
    const v = Number(power_consumption_avg)
    if (S1.includes(device_type)) {
      return v > 1 ? "#E72323" : v <= 0.5 ? "#03875F" : "#08080A"
    }
    if (E60.includes(device_type)) {
      return v > 0.5 ? "#E72323" : v <= 0.4 ? "#03875F" : "#08080A"
    }
    return v > 0.5 ? "#E72323" : v <= 0.3 ? "#03875F" : "#08080A"
  }
  return ""
}
