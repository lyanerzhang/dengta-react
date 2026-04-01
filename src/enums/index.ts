export const RISK_LEVEL_ENUM = [
  { label: "高风险", value: 4 },
  { label: "中风险", value: 3 },
  { label: "低风险", value: 2 },
  { label: "优秀", value: 1 },
] as const

export type RiskLevelValue = (typeof RISK_LEVEL_ENUM)[number]["value"]
export type RiskLevelItem = (typeof RISK_LEVEL_ENUM)[number]
