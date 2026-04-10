import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tooltip, Spin, message } from "antd"
import {
  WarningOutlined,
  ArrowRightOutlined,
  LockOutlined,
  FrownOutlined,
  SmileOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs"
import ReactEcharts from "echarts-for-react"
import {
  getUsageOverview,
  getBoardStoreFoodSafetyRisk,
  getBoardStoreEnergyOverview,
} from "@/api/dishwasher"
import { useAppSelector } from "@/store"
import { formatDateToChinese } from "@/utils/timeFormat"
import DateRadio from "@/components/DateRadio"
import styles from "./dishwasherDataBoard.module.scss"

const moneyFormat = (val: number | string, decimals: number) => {
  const num = Number(val)
  if (Number.isNaN(num)) return String(val)
  return num.toLocaleString("zh-CN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function monthRange() {
  const today = dayjs()
  const firstDay = today.startOf("month")
  const endDate = today.date() === 1 ? firstDay : today.subtract(1, "day")
  return {
    start_date: firstDay.format("YYYY-MM-DD"),
    end_date: endDate.format("YYYY-MM-DD"),
  }
}

function calculateXAxisInterval(dataLength: number): number {
  if (dataLength <= 10) return 0
  if (dataLength <= 30) return Math.ceil(dataLength / 20)
  return Math.ceil(dataLength / 5)
}

type StoreRow = { store_id?: string; store_name: string }

function IntelWashTooltip({ className }: { className?: string }) {
  return (
    <Tooltip
      placement="bottom"
      color="#303133"
      title={<span style={{ fontSize: 12 }}>X3 Pro/Ultra版</span>}
    >
      <WarningOutlined className={className} />
    </Tooltip>
  )
}

export default function DishwasherDataBoard() {
  const navigate = useNavigate()
  const isIntelligentWashUser = useAppSelector((s) => s.app.isIntelligentWashUser === true)

  const [monthReqs] = useState(monthRange)
  const [loading, setLoading] = useState(false)

  const [overviewData, setOverviewData] = useState<any>(null)
  const [foodSafetyRiskData, setFoodSafetyRiskData] = useState<any>(null)
  const [energyOverviewData, setEnergyOverviewData] = useState<any>(null)
  const [energyOverviewParams, setEnergyOverviewParams] = useState(() => ({
    start_date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  }))
  const [energyDateType, setEnergyDateType] = useState(2)

  const highFreq = foodSafetyRiskData?.food_safety_high_frequent_item
  const operateQ = foodSafetyRiskData?.operate_qualified

  const loadUsage = useCallback(async () => {
    const res = await getUsageOverview({
      start_date: monthReqs.start_date,
      end_date: monthReqs.end_date,
    })
    setOverviewData(res)
  }, [monthReqs.end_date, monthReqs.start_date])

  const loadFoodSafety = useCallback(async () => {
    const res = await getBoardStoreFoodSafetyRisk({
      start_date: monthReqs.start_date,
      end_date: monthReqs.end_date,
    })
    setFoodSafetyRiskData(res)
  }, [monthReqs.end_date, monthReqs.start_date])

  const loadAll = useCallback(async () => {
    setLoading(true)
    try {
      const energyP = {
        start_date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
        end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
      }
      await Promise.all([
        loadUsage(),
        loadFoodSafety(),
        getBoardStoreEnergyOverview(energyP).then((res: any) => setEnergyOverviewData(res)),
      ])
    } catch (err: any) {
      message.error(typeof err === "string" ? err : "数据加载失败")
    } finally {
      setLoading(false)
    }
  }, [loadFoodSafety, loadUsage])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const pieOption = useMemo(() => {
    const res = foodSafetyRiskData
    if (!res) return null
    const n = (v: unknown) => Number(v) || 0
    // 与 dengta-pc 一致：先按非 0 过滤；若全部为 0 则 data 为 []，仍渲染饼图容器，
    // ECharts 会显示与 PC 相同的空数据环状占位，而不是「暂无数据」文案。
    // mock/接口可能返回字符串，统一为 number 避免饼图标签渲染异常
    const list = [
      { value: n(res.good_store_count), name: "优秀门店", itemStyle: { color: "#6BC22C" } },
      { value: n(res.low_risk_store_count), name: "低风险门店", itemStyle: { color: "#017AFF" } },
      { value: n(res.middle_risk_store_count), name: "中风险门店", itemStyle: { color: "#FF9C0F" } },
      { value: n(res.high_risk_store_count), name: "高风险门店", itemStyle: { color: "#FE322C" } },
    ].filter((item) => item.value)
    const data = list
    return {
      responsive: true,
      minAngle: 1,
      backgroundColor: "#F7F8FA",
      tooltip: { trigger: "item" as const },
      legend: { show: false },
      series: [
        {
          type: "pie" as const,
          emphasis: {
            scale: false,
            focus: "none" as const,
            itemStyle: {
              shadowBlur: 0,
              borderWidth: 3,
              borderColor: "#F7F8FA",
            },
          },
          radius: ["35%", "70%"],
          center: ["50%", "50%"],
          itemStyle: {
            borderWidth: 3,
            borderColor: "#F7F8FA",
          },
          label: {
            show: true,
            formatter: (params: any) => {
              return `{name|${params.name}}\n{value|${params.value} 家}`
            },
            rich: {
              name: {
                fontSize: 15,
                color: "#08080A",
                align: "left",
                lineHeight: 18,
              },
              value: {
                fontSize: 15,
                color: "#909399",
                align: "right",
                lineHeight: 18,
              },
            },
          },
          labelLine: {
            show: true,
            length: 0,
            length2: 90,
            smooth: 1,
            lineStyle: { width: 1 },
          },
          data,
        },
      ],
    }
  }, [foodSafetyRiskData])

  const lineOption = useMemo(() => {
    const list = energyOverviewData?.list
    if (!list?.length) return null
    return {
      tooltip: {
        padding: [1, 10],
        trigger: "axis" as const,
        axisPointer: {
          label: {
            show: true,
            color: "#4C77B8",
            fontSize: 16,
            backgroundColor: "#fff",
            padding: [5, 0],
          },
          type: "line" as const,
          lineStyle: {
            color: "rgba(56, 103, 255, 0.30)",
            width: 1,
            type: "solid" as const,
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.70)",
        textStyle: {
          color: "white",
          fontSize: "16px",
        },
        position: (point: number[], _params: unknown, dom: HTMLElement) => {
          const tooltipWidth = dom.offsetWidth
          const tooltipHeight = dom.offsetHeight
          const x = point[0] - tooltipWidth / 2
          const y = point[1] - tooltipHeight - 10
          return [x, y]
        },
        formatter: (params: any) => String(params[0].value),
      },
      grid: {
        left: "10px",
        right: "0",
        bottom: "5%",
        top: "28px",
        containLabel: true,
      },
      xAxis: {
        type: "category" as const,
        data: list.map((item: any) => {
          const d = dayjs(item.event_date)
          return d.isValid() ? d.format("MM.DD") : String(item.event_date ?? "")
        }),
        axisLine: {
          lineStyle: { color: "#C0C2CC" },
        },
        axisLabel: {
          interval: calculateXAxisInterval(list.length),
          textStyle: {
            color: "#606266",
            fontSize: 16,
          },
        },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value" as const,
        axisLabel: {
          show: true,
          interval: 0,
          textStyle: {
            color: "#606266",
            fontSize: 16,
          },
        },
      },
      series: [
        {
          data: list.map((item: any) => item.power_consumption),
          type: "line" as const,
          smooth: true,
          lineStyle: { color: "#3867FF" },
        },
      ],
    }
  }, [energyOverviewData])

  const changeEnergyDate = async (dates: { type: number; start_date: string; end_date: string }) => {
    setEnergyDateType(dates.type)
    const next = { start_date: dates.start_date, end_date: dates.end_date }
    setEnergyOverviewParams(next)
    try {
      const res = await getBoardStoreEnergyOverview(next)
      setEnergyOverviewData(res)
    } catch (err: any) {
      message.error(typeof err === "string" ? err : "能耗数据加载失败")
    }
  }

  const toSafetyRisk = (riskLevel: number) => {
    const q = new URLSearchParams({
      riskLevel: JSON.stringify([riskLevel]),
      start_date: monthReqs.start_date,
      end_date: monthReqs.end_date,
      dateType: "9",
    })
    navigate(`/userData/foodSafetyRisk?${q.toString()}`)
  }

  const toEnergyConsum = (abnormalChoices: number) => {
    const q = new URLSearchParams({
      abnormalChoices: JSON.stringify([abnormalChoices]),
      start_date: energyOverviewParams.start_date,
      end_date: energyOverviewParams.end_date,
      dateType: String(energyDateType),
    })
    navigate(`/userData/energyConsumption?${q.toString()}`)
  }

  const renderFoodSafetyStores = (items: StoreRow[] | undefined, riskLevel: number) => {
    if (!items?.length) {
      return <div className={styles.noStore}>暂无</div>
    }
    return (
      <>
        {items.map((item, index) => (
          <div key={item.store_id || `${item.store_name}-${index}`} className={styles.storeRow}>
            <Tooltip title={item.store_name} placement="bottom">
              <div className={styles.storeNameEllipsis}>{item.store_name}</div>
            </Tooltip>
          </div>
        ))}
        <button type="button" className={styles.detailOpt} onClick={() => toSafetyRisk(riskLevel)}>
          详情
        </button>
      </>
    )
  }

  return (
    <div className={styles.page}>
      <Spin spinning={loading}>
        {/* 本月数据 */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.titleRow}>
              <div className={styles.sideBar} />
              <h2 className={styles.cardTitle}>本月数据</h2>
            </div>
            <span className={styles.updateText}>
              {formatDateToChinese(overviewData?.update_date || "")} 更新
            </span>
          </div>
          <div className={styles.dataCategory}>
            <div className={styles.dataCol}>
              <div className={styles.dataTitle}>洗碗机合作门店数</div>
              <div
                className={`${styles.dataNum} ${
                  overviewData?.cooperating_store_count ? "" : styles.dataNumGrey
                }`}
              >
                {moneyFormat(overviewData?.cooperating_store_count || 0, 0)}
              </div>
            </div>
            <div className={styles.dataCol}>
              {isIntelligentWashUser ? (
                <div className={styles.dataTitle}>
                  智洗门店数
                  <IntelWashTooltip className={styles.lockIcon} />
                </div>
              ) : (
                <div className={styles.dataTitle}>
                  智洗门店：未开通
                  <div className={styles.intellWashTip}>
                    了解智洗 <ArrowRightOutlined style={{ fontSize: 12 }} />
                  </div>
                </div>
              )}
              {isIntelligentWashUser ? (
                <div
                  className={`${styles.dataNum} ${
                    overviewData?.intelligent_wash_store_count ? "" : styles.dataNumGrey
                  }`}
                >
                  {moneyFormat(overviewData?.intelligent_wash_store_count || 0, 0)}
                </div>
              ) : null}
            </div>
            <div className={styles.dataCol}>
              <div className={styles.dataTitle}>洗碗机合作设备数</div>
              <div
                className={`${styles.dataNum} ${
                  overviewData?.cooperating_device_count ? "" : styles.dataNumGrey
                }`}
              >
                {moneyFormat(overviewData?.cooperating_device_count || 0, 0)}
              </div>
            </div>
            <div className={styles.dataCol}>
              <div className={styles.dataTitle}>未联网设备数</div>
              <div
                className={`${styles.dataNum} ${overviewData?.unconnected_device_count ? "" : styles.dataNumGrey}`}
              >
                {moneyFormat(overviewData?.unconnected_device_count || 0, 0)}
              </div>
            </div>
          </div>
        </section>

        {/* 门店食安风险 */}
        <section className={`${styles.card} ${styles.mt20}`}>
          <div className={styles.titleRow} style={{ marginBottom: 20 }}>
            <div className={styles.sideBar} />
            <h2 className={styles.cardTitle}>门店食安风险</h2>
          </div>
          <div className={styles.dataChartWrap}>
            <div className={styles.dataContent}>
              <div className={styles.pieArea}>
                {pieOption ? (
                  <ReactEcharts
                    className={styles.pieChart}
                    option={pieOption}
                    notMerge
                    lazyUpdate
                    style={{ height: 184, width: "100%", minWidth: 522 }}
                  />
                ) : (
                  <div className={styles.chartPlaceholder}>暂无数据</div>
                )}
              </div>
              <div className={styles.dataSituation}>
                <div className={styles.dataSituationItem}>
                  <div style={{ borderRight: "1px dotted #DCDFE6" }}>
                    <p className={styles.situationTitle}>
                      <FrownOutlined className={styles.riskIconEmoji} />
                      食安风险高频问题
                    </p>
                    <p className={styles.situationLine}>
                      <span>洗涤温度未达标</span>
                      <span>
                        <span className={styles.dataNumSmall}>{highFreq?.water_temperature_low_store_count ?? 0}</span>家
                      </span>
                    </p>
                    <p className={styles.situationLine}>
                      <span>中途揭盖率高</span>
                      <span>
                        <span className={styles.dataNumSmall}>
                          {highFreq?.high_halfway_uncover_rate_store_count ?? 0}
                        </span>
                        家
                      </span>
                    </p>
                    <p className={styles.situationLine}>
                      <span>未规范换水</span>
                      <span>
                        <span className={styles.dataNumSmall}>{highFreq?.not_change_water_store_count ?? 0}</span>家
                      </span>
                    </p>
                    <p className={styles.situationLine}>
                      <span className={!isIntelligentWashUser ? styles.muted : undefined}>
                        脏手套收纳
                        {isIntelligentWashUser ? <IntelWashTooltip className={styles.lockIcon} /> : null}
                      </span>
                      {isIntelligentWashUser ? (
                        <span>
                          <span className={styles.dataNumSmall}>
                            {highFreq?.dirty_glove_stored_store_count ?? 0}
                          </span>
                          家
                        </span>
                      ) : (
                        <LockOutlined className={styles.lockInline} />
                      )}
                    </p>
                    <p className={styles.situationLine}>
                      <span className={!isIntelligentWashUser ? styles.muted : undefined}>
                        摆筐过密
                        {isIntelligentWashUser ? <IntelWashTooltip className={styles.lockIcon} /> : null}
                      </span>
                      {isIntelligentWashUser ? (
                        <span>
                          <span className={styles.dataNumSmall}>
                            {highFreq?.overcrowded_layout_basket_store_count ?? 0}
                          </span>
                          家
                        </span>
                      ) : (
                        <LockOutlined className={styles.lockInline} />
                      )}
                    </p>
                  </div>
                </div>
                <div className={styles.dataSituationItem}>
                  <div>
                    <p className={styles.situationTitle}>
                      <SmileOutlined className={styles.riskIconEmoji} />
                      操作达标情况
                    </p>
                    <p className={styles.situationLine}>
                      <span>洗涤温度达标</span>
                      <span>
                        <span className={styles.dataNumSmall}>
                          {operateQ?.water_temperature_qualified_store_count ?? 0}
                        </span>
                        家
                      </span>
                    </p>
                    <p className={styles.situationLine}>
                      <span>无中途揭盖</span>
                      <span>
                        <span className={styles.dataNumSmall}>{operateQ?.not_uncover_rate_store_count ?? 0}</span>家
                      </span>
                    </p>
                    <p className={styles.situationLine}>
                      <span>规范换水</span>
                      <span>
                        <span className={styles.dataNumSmall}>{operateQ?.change_water_store_count ?? 0}</span>家
                      </span>
                    </p>
                    <p className={styles.situationLine}>
                      <span className={!isIntelligentWashUser ? styles.muted : undefined}>
                        规范收纳
                        {isIntelligentWashUser ? <IntelWashTooltip className={styles.lockIcon} /> : null}
                      </span>
                      {isIntelligentWashUser ? (
                        <span>
                          <span className={styles.dataNumSmall}>
                            {operateQ?.dirty_glove_stored_qualified_store_count ?? 0}
                          </span>
                          家
                        </span>
                      ) : (
                        <LockOutlined className={styles.lockInline} />
                      )}
                    </p>
                    <p className={styles.situationLine}>
                      <span className={!isIntelligentWashUser ? styles.muted : undefined}>
                        规范摆筐
                        {isIntelligentWashUser ? <IntelWashTooltip className={styles.lockIcon} /> : null}
                      </span>
                      {isIntelligentWashUser ? (
                        <span>
                          <span className={styles.dataNumSmall}>
                            {operateQ?.layout_basket_qualified_store_count ?? 0}
                          </span>
                          家
                        </span>
                      ) : (
                        <LockOutlined className={styles.lockInline} />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.dataIndicators}>
              <div className={`${styles.indicatorBox} ${styles.indicatorRisk}`}>
                <p className={styles.indicatorTitle}>高风险门店</p>
                <div className={styles.indicatorContent}>
                  {renderFoodSafetyStores(foodSafetyRiskData?.high_risk_store_list, 4)}
                </div>
              </div>
              <div className={`${styles.indicatorBox} ${styles.indicatorGood}`}>
                <p className={styles.indicatorTitle}>优秀门店</p>
                <div className={styles.indicatorContent}>
                  {renderFoodSafetyStores(foodSafetyRiskData?.good_store_list, 1)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 设备耗能 */}
        <section className={`${styles.card} ${styles.mt20}`}>
          <div className={styles.titleRow} style={{ marginBottom: 12 }}>
            <div className={styles.sideBar} />
            <h2 className={styles.cardTitle}>设备耗能</h2>
          </div>
          <div className={styles.dataChartWrap}>
            <div className={styles.dataContent}>
              <DateRadio
                dateType={energyDateType}
                dateRange={[energyOverviewParams.start_date, energyOverviewParams.end_date]}
                onChangeDate={changeEnergyDate}
              />
              <p className={styles.lineChartTitle}>总耗电量(kW·h)</p>
              {lineOption ? (
                <div className={styles.lineChart}>
                  <ReactEcharts option={lineOption} style={{ height: 330 }} notMerge lazyUpdate />
                </div>
              ) : (
                <div className={styles.chartPlaceholder} style={{ height: 330 }}>
                  暂无图表数据
                </div>
              )}
            </div>
            <div className={styles.dataIndicators}>
              <div className={`${styles.indicatorBox} ${styles.indicatorRisk}`}>
                <p className={styles.indicatorTitle}>高耗能门店</p>
                <div className={styles.indicatorContent}>
                  {energyOverviewData?.high_power_store_list?.length ? (
                    <>
                      {energyOverviewData.high_power_store_list.map((item: StoreRow, index: number) => (
                        <div key={item.store_id || `h-${index}`} className={styles.storeRow}>
                          <Tooltip title={item.store_name} placement="bottom">
                            <div className={styles.storeNameEllipsis}>{item.store_name}</div>
                          </Tooltip>
                        </div>
                      ))}
                      <button type="button" className={styles.detailOpt} onClick={() => toEnergyConsum(2)}>
                        详情
                      </button>
                    </>
                  ) : (
                    <div className={styles.noStore}>暂无</div>
                  )}
                </div>
              </div>
              <div className={`${styles.indicatorBox} ${styles.indicatorGood}`}>
                <p className={styles.indicatorTitle}>低耗能门店</p>
                <div className={styles.indicatorContent}>
                  {energyOverviewData?.low_power_store_list?.length ? (
                    <>
                      {energyOverviewData.low_power_store_list.map((item: StoreRow, index: number) => (
                        <div key={item.store_id || `l-${index}`} className={styles.storeRow}>
                          <Tooltip title={item.store_name} placement="bottom">
                            <div className={styles.storeNameEllipsis}>{item.store_name}</div>
                          </Tooltip>
                        </div>
                      ))}
                      <button type="button" className={styles.detailOpt} onClick={() => toEnergyConsum(11)}>
                        详情
                      </button>
                    </>
                  ) : (
                    <div className={styles.noStore}>暂无</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Spin>
    </div>
  )
}
