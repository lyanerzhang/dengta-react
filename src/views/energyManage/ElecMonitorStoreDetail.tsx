import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Table, Pagination, Tooltip, message, Spin } from "antd"
import { EnvironmentOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import * as echarts from "echarts"
import dayjs from "dayjs"
import DateRadio from "@/components/DateRadio"
import {
  getDeviceEnergyOverview,
  getDeviceEnergyContrast,
  getDeviceEnergyDetail,
  getDeviceUsageTimeDetail,
} from "@/api/energyManage"
import { getDatesBetween } from "@/utils/getDateRangeArray"
import { downloadFile } from "@/utils/download"
import storeHeadImg from "@/assets/images/store_head.png"
import icTop1 from "@/assets/images/ic_top1.png"
import icTop2 from "@/assets/images/ic_top2.png"
import icTop3 from "@/assets/images/ic_top3.png"
import icDownloadFile from "@/assets/images/ic_download_file.png"
import icInfo from "@/assets/images/ic_info.png"
import icInfoHover from "@/assets/images/ic_info_hover.png"
import styles from "./elecMonitorStoreDetail.module.scss"

const PAGE_SIZE = 10

const moneyFormat = (val: number | string, decimals = 0) => {
  const n = Number(val)
  if (Number.isNaN(n)) return String(val)
  return n.toLocaleString("zh-CN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

type DeviceEnergy = {
  device_id: string | number
  device_name: string
  energy?: number
  checked: boolean
  iconColor: string
  opacity: string
  textColor: string
}

type EnergyDetailRow = {
  date: string
  device_energy_data: (number | string)[]
}

type UsageRowEven = { date: string; use_duration_data: string[] }
type UsageRowOdd = { date: string; use_period_data: string[][] }
type UsageRow = UsageRowEven | UsageRowOdd

function randomDeviceIconColor(device_list: DeviceEnergy[]): DeviceEnergy[] {
  return device_list.map((item, index) => {
    const hue = Math.floor((index * 222.5) % 360)
    const alt = (index + 1) % 3
    const saturation = 70 + alt * 10
    const lightness = 30 + alt * 15
    return {
      ...item,
      checked: index === 0,
      iconColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      opacity: index === 0 ? "1" : "0.3",
      textColor: index === 0 ? "rgba(8, 8, 10, 0.96)" : "rgba(8, 8, 10, 0.45)",
    }
  })
}

function handleEnergyDetailTableData(data: any[]): EnergyDetailRow[] {
  return (data || []).map((row: any) => ({
    date: row.label,
    device_energy_data: row.device_energy_data,
  }))
}

function handleUsePeriodData(data: string[]): string[][] {
  const use_period: string[][] = []
  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      use_period.push(data[i].split(","))
    } else {
      use_period.push([])
    }
  }
  return use_period
}

function handleTimeDetailTableData(data: any[]): UsageRow[] {
  const table_data: UsageRow[] = []
  for (let i = 0; i < data.length; i++) {
    table_data.push(
      {
        date: data[i].label,
        use_duration_data: data[i].use_duration_data,
      },
      {
        date: data[i].label,
        use_period_data: handleUsePeriodData(data[i].use_period_data),
      },
    )
  }
  return table_data
}

function calculateXAxisInterval(dataLength: number): number {
  if (dataLength <= 10) return 0
  if (dataLength <= 30) return Math.ceil(dataLength / 20)
  return Math.ceil(dataLength / 5)
}

function DurationCell({ value, strong }: { value: string; strong?: boolean }) {
  if (!value || Number(value) === 0) {
    return <span className={styles.empty}>{value}</span>
  }
  const m = value.match(/(\d+)小时(\d+)分钟/)
  if (m) {
    return (
      <span>
        <span className={styles.numberStyle}>{m[1]}</span>小时
        <span className={styles.numberStyle}>{m[2]}</span>分钟
      </span>
    )
  }
  const hourOnly = value.match(/(\d+)小时/)
  if (hourOnly) {
    return (
      <span>
        <span className={styles.numberStyle}>{hourOnly[1]}</span>小时
      </span>
    )
  }
  const minuteOnly = value.match(/(\d+)分钟/)
  if (minuteOnly) {
    return (
      <span>
        <span className={styles.numberStyle}>{minuteOnly[1]}</span>分钟
      </span>
    )
  }
  return <span className={strong ? styles.numberStyle : undefined}>{value}</span>
}

export default function ElecMonitorStoreDetail() {
  const [searchParams] = useSearchParams()
  const store_id = searchParams.get("store_id") || ""
  const store_name_q = searchParams.get("store_name") || ""
  const store_addr_q = searchParams.get("store_addr") || ""

  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD")
  const weekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD")

  const [startDate, setStartDate] = useState(weekAgo)
  const [endDate, setEndDate] = useState(yesterday)
  const [dateType, setDateType] = useState(2)

  const [tipIcon, setTipIcon] = useState(icInfo)
  const [hoveredDeviceId, setHoveredDeviceId] = useState<string | number | null>(null)

  const [overviewData, setOverviewData] = useState({ total: 0, average: 0 })
  const [allEnergy, setAllEnergy] = useState<DeviceEnergy[]>([])

  const [showChart, setShowChart] = useState(true)
  const [chartLabels, setChartLabels] = useState<string[]>([])
  const [contrastRows, setContrastRows] = useState<any[]>([])
  const [energyContrastLoading, setEnergyContrastLoading] = useState(false)

  const [energyDetail, setEnergyDetail] = useState({
    table_data: [] as EnergyDetailRow[],
    table_titles: [] as string[],
    total: 0,
    page_no: 1,
    page_size: PAGE_SIZE,
  })

  const [useTimeDetail, setUseTimeDetail] = useState({
    table_data: [] as UsageRow[],
    table_titles: [] as string[],
    total: 0,
    page_no: 1,
    page_size: PAGE_SIZE,
  })

  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  const topIcons = useMemo(() => [icTop1, icTop2, icTop3], [])

  const fetchContrastWithDevices = useCallback(
    async (devices: DeviceEnergy[]) => {
      const device_id_list = devices.filter((d) => d.checked).map((d) => d.device_id)
      if (!device_id_list.length) {
        setChartLabels([])
        setContrastRows([])
        return
      }
      setEnergyContrastLoading(true)
      try {
        const res: any = await getDeviceEnergyContrast({
          store_id,
          device_id_list,
          time_type: startDate === endDate ? 2 : 1,
          start_date: startDate,
          end_date: endDate,
        })
        setChartLabels(res?.labels || [])
        setContrastRows(res?.data || [])
      } catch (e: any) {
        message.error(typeof e === "string" ? e : "加载对比数据失败")
      } finally {
        setEnergyContrastLoading(false)
      }
    },
    [store_id, startDate, endDate],
  )

  const refreshEnergyDetail = useCallback(
    async (page_no: number, page_size: number) => {
      try {
        const res: any = await getDeviceEnergyDetail({
          store_id,
          start_date: startDate,
          end_date: endDate,
          page_no,
          page_size,
        })
        setEnergyDetail({
          page_no,
          page_size,
          total: res?.total_num ?? 0,
          table_titles: res?.labels ?? [],
          table_data: handleEnergyDetailTableData(res?.data || []),
        })
      } catch (e: any) {
        message.error(typeof e === "string" ? e : "加载用电量明细失败")
      }
    },
    [store_id, startDate, endDate],
  )

  const refreshUsageTimeDetail = useCallback(
    async (page_no: number, page_size: number) => {
      try {
        const res: any = await getDeviceUsageTimeDetail({
          store_id,
          start_date: startDate,
          end_date: endDate,
          page_no,
          page_size,
        })
        setUseTimeDetail({
          page_no,
          page_size,
          total: res?.total_num ?? 0,
          table_titles: res?.labels ?? [],
          table_data: handleTimeDetailTableData(res?.data || []),
        })
      } catch (e: any) {
        message.error(typeof e === "string" ? e : "加载使用时段明细失败")
      }
    },
    [store_id, startDate, endDate],
  )

  /** 日期或门店变化：总览 + 对比（按区间）+ 两表回到第 1 页 */
  useEffect(() => {
    if (!store_id) {
      message.warning("缺少门店参数")
      return
    }
    let cancelled = false
    ;(async () => {
      const res: any = await getDeviceEnergyOverview({
        store_id,
        start_date: startDate,
        end_date: endDate,
      })
      if (cancelled) return
      setOverviewData({ total: res?.total ?? 0, average: res?.average ?? 0 })
      const devices = randomDeviceIconColor(res?.top_energy || [])
      setAllEnergy(devices)

      const dateArr = getDatesBetween(startDate, endDate, ".")
      if (dateArr.length >= 2 && dateArr.length <= 6) {
        setShowChart(false)
        setChartLabels([])
        setContrastRows([])
      } else {
        setShowChart(true)
        await fetchContrastWithDevices(devices)
      }
      if (cancelled) return
      await refreshEnergyDetail(1, PAGE_SIZE)
      if (cancelled) return
      await refreshUsageTimeDetail(1, PAGE_SIZE)
    })()
    return () => {
      cancelled = true
    }
  }, [store_id, startDate, endDate, fetchContrastWithDevices, refreshEnergyDetail, refreshUsageTimeDetail])

  const changeDate = (dates: { type: number; start_date: string; end_date: string }) => {
    setDateType(dates.type)
    setStartDate(dates.start_date)
    setEndDate(dates.end_date)
  }

  const handleDeviceClick = (item: DeviceEnergy) => {
    const checkedCount = allEnergy.filter((d) => d.checked).length
    if (checkedCount <= 1 && item.checked) {
      message.error("最少选择1种")
      return
    }
    if (checkedCount >= 5 && !item.checked) {
      message.error("最多可选5种")
      return
    }

    const next = allEnergy.map((d) => {
      if (d.device_id !== item.device_id) return d
      if (d.checked) {
        return { ...d, checked: false, opacity: "0.3", textColor: "rgba(8, 8, 10, 0.45)" }
      }
      return { ...d, checked: true, opacity: "1", textColor: "rgba(8, 8, 10, 0.96)" }
    })
    setAllEnergy(next)
    if (showChart) {
      void fetchContrastWithDevices(next)
    }
  }

  const chartSeries = useMemo(() => {
    return contrastRows.map((item: any) => {
      const checkedDevice = allEnergy.find((e) => e.device_id === item.device_id)
      const color = checkedDevice?.iconColor ?? "#3867ff"
      return {
        type: "line" as const,
        data: item.device_energy_data,
        smooth: true,
        lineStyle: { color },
        itemStyle: { color },
      }
    })
  }, [contrastRows, allEnergy])

  useEffect(() => {
    if (!showChart || !allEnergy.length || !chartRef.current) {
      chartInstanceRef.current?.dispose()
      chartInstanceRef.current = null
      return
    }
    const el = chartRef.current
    chartInstanceRef.current?.dispose()
    const chart = echarts.init(el)
    chartInstanceRef.current = chart

    chart.setOption({
      tooltip: {
        padding: [1, 12],
        trigger: "axis",
        axisPointer: {
          label: {
            show: true,
            color: "#4C77B8",
            fontSize: 16,
            backgroundColor: "#fff",
            padding: [5, 0],
          },
          type: "line",
          lineStyle: { color: "#B7C9E3", width: 1, type: "dotted" },
        },
        backgroundColor: "rgba(0, 0, 0, 0.70)",
        textStyle: { color: "#fff", fontSize: 16 },
        formatter(params: any) {
          if (!Array.isArray(params)) return ""
          return params
            .map(
              (p: any) =>
                `<div style="display: flex; align-items: center;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${p.color}; margin-right: 8px;"></span>
              <span>${p.value}</span>
            </div>`,
            )
            .join("")
        },
      },
      grid: {
        left: "0",
        right: "0",
        bottom: "5%",
        top: "8px",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: chartLabels,
        axisLine: { lineStyle: { color: "rgba(0, 0, 0, 0.15)" } },
        axisLabel: {
          interval: calculateXAxisInterval(chartLabels.length),
          color: "#606266",
          fontSize: 16,
          fontWeight: 400,
        },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          show: true,
          interval: 0,
          color: "#606266",
          fontSize: 16,
        },
      },
      series: chartSeries,
    })

    const onResize = () => chart.resize()
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [showChart, allEnergy.length, chartLabels, chartSeries])

  useEffect(() => {
    return () => {
      chartInstanceRef.current?.dispose()
      chartInstanceRef.current = null
    }
  }, [])

  const exportDeviceEnergyDetail = () => {
    downloadFile(
      "get",
      "/api/ec/iotdm/energy/download/device_energy_detail",
      {
        store_id,
        start_date: startDate,
        end_date: endDate,
      },
      `${store_name_q || "门店"}用电量数据明细.xlsx`,
    ).catch((err: any) => {
      message.error(typeof err === "string" ? err : "导出失败")
    })
  }

  const exportDeviceUsageTimeDetail = () => {
    downloadFile(
      "get",
      "/api/ec/iotdm/energy/download/device_use_detail",
      {
        store_id,
        start_date: startDate,
        end_date: endDate,
      },
      `${store_name_q || "门店"}使用时段数据明细.xlsx`,
    ).catch((err: any) => {
      message.error(typeof err === "string" ? err : "导出失败")
    })
  }

  const energyColumns: ColumnsType<EnergyDetailRow> = useMemo(() => {
    const titles = energyDetail.table_titles
    const cols: ColumnsType<EnergyDetailRow> = [
      {
        title: "日期",
        dataIndex: "date",
        width: 100,
        fixed: "left",
        className: "dateCell",
      },
    ]
    titles.forEach((title, index) => {
      cols.push({
        title,
        minWidth: 80,
        className: index === 0 ? "bgCell" : "cellClass",
        fixed: titles.length > 2 && index === 0 ? "left" : undefined,
        render: (_, row) => {
          const v = row.device_energy_data[index]
          const isTotal = index === 0
          const empty = Number(v) === 0
          return (
            <p className={`${isTotal ? styles.totalNumCell : styles.chargeNumCell} ${empty ? styles.empty : ""}`}>
              {v}
            </p>
          )
        },
      })
    })
    return cols
  }, [energyDetail.table_titles])

  const usageColumns: ColumnsType<UsageRow> = useMemo(() => {
    const titles = useTimeDetail.table_titles
    const cols: ColumnsType<UsageRow> = [
      {
        title: "日期",
        dataIndex: "date",
        width: 100,
        fixed: "left",
        className: "dateCell",
        onCell: (_, rowIndex = 0) => {
          if (rowIndex % 2 === 0) return { rowSpan: 2 }
          return { rowSpan: 0 }
        },
      },
    ]
    titles.forEach((title, index) => {
      cols.push({
        title,
        minWidth: index === 0 ? 100 : 132,
        fixed: titles.length > 2 && index === 0 ? "left" : undefined,
        onCell: (_, rowIndex = 0) => {
          if (rowIndex % 2 === 0 && index !== 0) {
            return { className: "usageCellClass bgCellClass" }
          }
          return { className: "usageCellClass" }
        },
        render: (_, row, rowIndex = 0) => {
          if (rowIndex % 2 === 0) {
            const r = row as UsageRowEven
            return <DurationCell value={r.use_duration_data[index]} strong={index > 0} />
          }
          const r = row as UsageRowOdd
          const periods = r.use_period_data[index]
          if (!periods?.length) {
            return <span style={{ color: "#909399" }}>-</span>
          }
          return (
            <div style={periods.length > 3 ? { paddingTop: 8 } : undefined}>
              {periods.slice(0, 3).map((p, i) => (
                <p key={i} className={index > 0 ? styles.numberStyle : undefined}>
                  {p}
                </p>
              ))}
              {periods.length > 3 && (
                <Tooltip
                  placement="bottomLeft"
                  title={
                    <div>
                      {periods.map((p, i) => (
                        <p key={i} className={styles.tooltipPeriod}>
                          {p}
                        </p>
                      ))}
                    </div>
                  }
                >
                  <span className={styles.moreFilled}>...</span>
                </Tooltip>
              )}
            </div>
          )
        },
      })
    })
    return cols
  }, [useTimeDetail.table_titles])

  const topThree = allEnergy.slice(0, 3)

  const deviceOpacity = (d: DeviceEnergy) => {
    if (d.checked) return "1"
    if (hoveredDeviceId === d.device_id) return "1"
    return "0.3"
  }

  const deviceTextColor = (d: DeviceEnergy) => {
    if (d.checked) return "rgba(8, 8, 10, 0.96)"
    if (hoveredDeviceId === d.device_id) return "rgba(56, 103, 255, 1)"
    return "rgba(8, 8, 10, 0.45)"
  }

  return (
    <div className={styles.elecMonitorStoreDetail}>
      <div className={styles.storeHeadImg} style={{ backgroundImage: `url(${storeHeadImg})` }} />
      <div className={styles.storeInfo}>
        <span className={styles.storeName}>{store_name_q || "-"}</span>
        <span className={styles.storeAddr}>
          <EnvironmentOutlined style={{ fontSize: 17, transform: "translateY(2px)", color: "#909399" }} />
          {store_addr_q || "-"}
        </span>
      </div>
      <div className={styles.dateRadioBox}>
        <DateRadio
          dateType={dateType}
          dateRange={[startDate, endDate]}
          onChangeDate={changeDate}
        />
      </div>

      <div className={styles.innerPad}>
        <div className={styles.elecMonitorOverView}>
          <div className={styles.dataTitleBox}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>
              数据总览
              <Tooltip
                title={
                  <>
                    仅统计在所选时间范围内所有被监测设备的
                    <br />
                    用电数据（不包含未被监测或离线设备）
                  </>
                }
              >
                <img
                  src={tipIcon}
                  alt=""
                  className={styles.tipIcon}
                  onMouseEnter={() => setTipIcon(icInfoHover)}
                  onMouseLeave={() => setTipIcon(icInfo)}
                />
              </Tooltip>
            </p>
          </div>
          <p className={styles.unitTip}>单位（kW·h）</p>
          <div className={styles.dataCategory}>
            <div className={styles.data}>
              <div className={styles.title}>总耗电量</div>
              <div className={styles.dataNum}>{moneyFormat(overviewData.total || 0, 2)}</div>
            </div>
            <div className={styles.data} style={!allEnergy.length ? { borderRight: "none" } : undefined}>
              <div className={styles.title}>日均耗电量</div>
              <div className={styles.dataNum}>{moneyFormat(overviewData.average || 0, 2)}</div>
            </div>
            {topThree.map((item, index) => (
              <div
                key={item.device_id}
                className={styles.data}
                style={
                  index === 2 || index === allEnergy.length - 1 ? { borderRight: "none" } : undefined
                }
              >
                <div className={styles.title}>
                  {item.device_name}
                  <img src={topIcons[index]} alt="" className={styles.topIcon} />
                </div>
                <div className={styles.dataNum}>{moneyFormat(item.energy || 0, 2)}</div>
              </div>
            ))}
          </div>
        </div>

        {showChart && !!allEnergy.length && (
          <div className={styles.elecMonitorOverView}>
            <div className={styles.dataTitleBox}>
              <div className={styles.sideBar} />
              <p className={styles.dataTitle}>用电对比</p>
            </div>
            <div className={styles.deviceFilterWrap}>
              {allEnergy.map((item) => (
                <div
                  key={item.device_id}
                  className={`${styles.filterItem} ${item.checked ? styles.filterItemActive : ""}`}
                  style={{ color: deviceTextColor(item) }}
                  onMouseEnter={() => setHoveredDeviceId(item.device_id)}
                  onMouseLeave={() => setHoveredDeviceId(null)}
                  onClick={() => handleDeviceClick(item)}
                >
                  <span
                    className={styles.filterIcon}
                    style={{ backgroundColor: item.iconColor, opacity: deviceOpacity(item) }}
                  />
                  {item.device_name}
                </div>
              ))}
            </div>
            <p className={styles.unitTip} style={{ marginTop: 16 }}>
              单位（kW·h）
            </p>
            <Spin spinning={energyContrastLoading}>
              <div className={styles.chartBox}>
                <div ref={chartRef} className={styles.lineChart} />
              </div>
            </Spin>
          </div>
        )}

        {!!energyDetail.total && (
          <div className={styles.elecMonitorOverView}>
            <div className={`${styles.dataTitleBox} ${styles.titleRowBetween}`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.sideBar} />
                <p className={styles.dataTitle}>用电量数据明细</p>
              </div>
              <span className={styles.exportOpt} onClick={exportDeviceEnergyDetail}>
                <img src={icDownloadFile} alt="" className={styles.exportIcon} />
                导出数据
              </span>
            </div>
            <p className={styles.unitTip}>单位（kW·h）</p>
            <Table<EnergyDetailRow>
              className={styles.tables}
              columns={energyColumns}
              dataSource={energyDetail.table_data}
              bordered
              pagination={false}
              rowKey={(_, i) => `e-${i}`}
              scroll={{ x: Math.max(400, 100 + energyDetail.table_titles.length * 90) }}
            />
            <div className={styles.pageClass}>
              <Pagination
                current={energyDetail.page_no}
                pageSize={energyDetail.page_size}
                total={energyDetail.total}
                showSizeChanger={false}
                showTotal={(t) => `共 ${t} 条`}
                onChange={(page) => refreshEnergyDetail(page, energyDetail.page_size)}
              />
            </div>
          </div>
        )}

        {!!useTimeDetail.total && (
          <div className={styles.elecMonitorOverView}>
            <div className={`${styles.dataTitleBox} ${styles.titleRowBetween}`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.sideBar} />
                <p className={styles.dataTitle}>使用时段数据明细</p>
              </div>
              <span className={styles.exportOpt} onClick={exportDeviceUsageTimeDetail}>
                <img src={icDownloadFile} alt="" className={styles.exportIcon} />
                导出数据
              </span>
            </div>
            <Table<UsageRow>
              className={`${styles.tables} ${styles.usageTables}`}
              columns={usageColumns}
              dataSource={useTimeDetail.table_data}
              bordered
              pagination={false}
              rowKey={(_, i) => `u-${i}`}
              scroll={{ x: Math.max(400, 100 + useTimeDetail.table_titles.length * 130) }}
            />
            <div className={styles.pageClass}>
              <Pagination
                current={useTimeDetail.page_no}
                pageSize={useTimeDetail.page_size}
                total={useTimeDetail.total}
                showSizeChanger={false}
                showTotal={(t) => `共 ${t} 条`}
                onChange={(page) => refreshUsageTimeDetail(page, useTimeDetail.page_size)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
