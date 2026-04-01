import { useEffect, useState, useRef, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { Table, Radio, Tooltip, message } from "antd"
import { ReloadOutlined, EnvironmentOutlined } from "@ant-design/icons"
import * as echarts from "echarts"
import dayjs from "dayjs"
import { getDeviceDetailOverview, getDeviceRealtimeInfo, getDdetailUsageList } from "@/api/dishwasher"
import { getDatesBetween } from "@/utils/getDateRangeArray"
import { formatCurrentDateTime } from "@/utils/timeFormat"
import { calculateXAxisInterval } from "@/utils/echarts"
import DateRadio from "@/components/DateRadio"
import storeHeadImg from "@/assets/images/store_head.png"
import type { ColumnsType } from "antd/es/table"
import styles from "./storeDetail.module.scss"

const moneyFormat = (val: number | string, decimals: number) => {
  const num = Number(val)
  if (isNaN(num)) return val
  return num.toLocaleString("zh-CN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

const dateFormat = (date: string, sep: string) => {
  if (!date) return "-"
  return date.replace(/-/g, sep)
}

const Y_AXIS_UNIT: Record<string, string> = { "2": "%", "4": "kWh", "5": "℃", "6": "℃" }
const Y_AXIS_MARK: Record<string, number> = { "2": 5, "4": 0.3, "5": 50, "6": 80 }

export default function StoreDetail() {
  const [searchParams] = useSearchParams()
  const orderNumber = searchParams.get("order_number") || ""
  const initialDateType = searchParams.get("dateType") ? Number(searchParams.get("dateType")) : 2

  const [dateType] = useState(initialDateType)
  const [params, setParams] = useState({
    order_number: orderNumber,
    start_date: searchParams.get("start_date") || dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    end_date: searchParams.get("end_date") || dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  })
  const [overviewData, setOverviewData] = useState<any>(null)
  const [realTimeData, setRealTimeData] = useState<any>(null)
  const [resData, setResData] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [chartRadio, setChartRadio] = useState("1")
  const [showChart, setShowChart] = useState(initialDateType !== 1)
  const [updateTime, setUpdateTime] = useState("")
  const [chartDates, setChartDates] = useState<string[]>(() => {
    if (initialDateType === 1) return []
    const startDate = searchParams.get("start_date") || dayjs().subtract(7, "day").format("YYYY-MM-DD")
    const endDate = searchParams.get("end_date") || dayjs().subtract(1, "day").format("YYYY-MM-DD")
    return getDatesBetween(startDate, endDate, ".").map((d) => d.slice(-5))
  })

  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)
  const resDataRef = useRef(resData)
  const chartRadioRef = useRef(chartRadio)
  const chartDatesRef = useRef(chartDates)
  resDataRef.current = resData
  chartRadioRef.current = chartRadio
  chartDatesRef.current = chartDates

  const drawLineChart = useCallback((data: number[]) => {
    if (!chartRef.current) return
    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose()
    }
    const chart = echarts.init(chartRef.current)
    chartInstanceRef.current = chart
    const radio = chartRadioRef.current

    chart.setOption({
      tooltip: {
        padding: [1, 10],
        trigger: "axis",
        axisPointer: {
          label: { show: true, color: "#4C77B8", fontSize: 16, backgroundColor: "#fff", padding: [5, 0] },
          type: "line",
          lineStyle: { color: "rgba(56, 103, 255, 0.30)", width: 1, type: "solid" },
        },
        backgroundColor: "rgba(0, 0, 0, 0.70)",
        textStyle: { color: "white" },
        formatter: (p: any) => String(p[0].value),
      },
      grid: { left: "10px", right: "0", bottom: "5%", top: "48px", containLabel: true },
      xAxis: {
        type: "category",
        data: chartDatesRef.current,
        axisLine: { lineStyle: { color: "#C0C2CC" } },
        axisLabel: {
          interval: calculateXAxisInterval(chartDatesRef.current.length),
          color: "#606266",
          fontSize: 16,
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
          formatter: (value: number) => `${value}${Y_AXIS_UNIT[radio] || ""}`,
        },
      },
      series: [
        {
          data,
          type: "line",
          smooth: true,
          lineStyle: { color: "#3867FF" },
          markLine: data.some((v) => v > 0)
            ? {
                silent: true,
                symbol: ["none", "none"],
                label: {
                  show: true,
                  position: "start",
                  fontSize: 16,
                  color: ["2", "4", "5", "6"].includes(radio) ? "#E72323" : "transparent",
                  backgroundColor: "#fff",
                  formatter: (p: any) => `${p.value}${Y_AXIS_UNIT[radio] || ""}`,
                  offset: [-3, 0],
                },
                data: [
                  {
                    yAxis: Y_AXIS_MARK[radio] || 0,
                    lineStyle: {
                      color: ["2", "4", "5", "6"].includes(radio) ? "#E72323" : "transparent",
                      type: "dotted",
                      width: 1.2,
                    },
                  },
                ],
              }
            : undefined,
        },
      ],
    })
  }, [])

  const handleChartData = useCallback(
    (raw?: any[]) => {
      const source = raw || resDataRef.current
      const radio = chartRadioRef.current
      const mapping: Record<string, string> = {
        "1": "wash_count",
        "2": "halfway_uncover_rate",
        "3": "change_water_count",
        "4": "avg_power_consumption",
        "5": "avg_cleanse_temperature",
        "6": "avg_rinse_temperature",
      }
      const key = mapping[radio] || "wash_count"
      const data = source.map((item: any) => (item[key] !== "-" ? item[key] : 0))
      drawLineChart(data)
    },
    [drawLineChart]
  )

  const fetchOverview = useCallback(async (p: typeof params) => {
    try {
      const res = await getDeviceDetailOverview(p)
      setOverviewData(res)
    } catch (err: any) {
      message.error(typeof err === "string" ? err : "获取概览失败")
    }
  }, [])

  const fetchRealtimeInfo = useCallback(async (orderNum: string) => {
    try {
      const res = await getDeviceRealtimeInfo({ order_number: orderNum })
      setRealTimeData(res)
    } catch (err: any) {
      message.error(typeof err === "string" ? err : "获取实时数据失败")
    } finally {
      setUpdateTime(formatCurrentDateTime())
    }
  }, [])

  const fetchDetailList = useCallback(
    async (p: typeof params, shouldChart: boolean) => {
      setTableLoading(true)
      try {
        const res: any = await getDdetailUsageList(p)
        const items = res?.items || []
        setResData(items)
        resDataRef.current = items
        const sorted = items
          .map((item: any) => ({
            ...item,
            event_date: item.event_date.replace(/-/g, "/"),
            change_water_time_points: item.change_water_time_points === "-" ? [] : item.change_water_time_points,
          }))
          .sort((a: any, b: any) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())
        setTableData(sorted)
        if (shouldChart) {
          setTimeout(() => handleChartData(items), 100)
        }
      } catch (err: any) {
        message.error(typeof err === "string" ? err : "获取明细失败")
      } finally {
        setTableLoading(false)
      }
    },
    [handleChartData]
  )

  useEffect(() => {
    fetchOverview(params)
    fetchRealtimeInfo(params.order_number)
    fetchDetailList(params, showChart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleResize = () => chartInstanceRef.current?.resize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      chartInstanceRef.current?.dispose()
    }
  }, [])

  const changeDate = (dates: { type: number; start_date: string; end_date: string }) => {
    const newParams = { ...params, start_date: dates.start_date, end_date: dates.end_date }
    setParams(newParams)
    const dateArr = getDatesBetween(dates.start_date, dates.end_date, ".")
    const shouldShow = dates.type !== 1 && dateArr.length >= 7
    setShowChart(shouldShow)
    if (shouldShow) {
      const mapped = dateArr.map((d) => d.slice(-5))
      setChartDates(mapped)
      chartDatesRef.current = mapped
    }
    fetchRealtimeInfo(newParams.order_number)
    fetchOverview(newParams)
    fetchDetailList(newParams, shouldShow)
  }

  const refreshData = async () => {
    await fetchRealtimeInfo(params.order_number)
    message.success("刷新成功")
  }

  const onRadioChange = (val: string) => {
    setChartRadio(val)
    chartRadioRef.current = val
    setTimeout(() => handleChartData(), 50)
  }

  const detailColumns: ColumnsType<any> = [
    {
      title: "日期",
      dataIndex: "event_date",
      width: 120,
      render: (v: string) => dateFormat(v, "."),
    },
    {
      title: "洗涤筐数",
      dataIndex: "wash_count",
      width: 96,
      render: (v: any) => (
        <>
          <span className={`${styles.numVal} ${v === "-" ? styles.noData : ""}`}>{v}</span>
          {v !== "-" && <span className={styles.ft16}> 筐</span>}
        </>
      ),
    },
    {
      title: "平均主洗温度",
      dataIndex: "avg_cleanse_temperature",
      width: 128,
      render: (v: any) => (
        <span className={`${styles.numVal} ${v !== "-" && v < 50 ? styles.red : ""} ${v === "-" ? styles.noData : ""}`}>
          {v !== "-" ? `${v}℃` : "-"}
        </span>
      ),
    },
    {
      title: "平均漂洗温度",
      dataIndex: "avg_rinse_temperature",
      width: 128,
      render: (v: any) => (
        <span className={`${styles.numVal} ${v !== "-" && v < 80 ? styles.red : ""} ${v === "-" ? styles.noData : ""}`}>
          {v !== "-" ? `${v}℃` : "-"}
        </span>
      ),
    },
    {
      title: "总耗电 (kW·h)",
      dataIndex: "power_consumption",
      width: 138,
      render: (v: any) => <span className={`${styles.numVal} ${v === "-" ? styles.noData : ""}`}>{v}</span>,
    },
    {
      title: "筐均耗电 (kW·h)",
      dataIndex: "avg_power_consumption",
      width: 154,
      render: (v: any) => (
        <span className={`${styles.numVal} ${v !== "-" && v > 0.3 ? styles.red : ""} ${v === "-" ? styles.noData : ""}`}>
          {v}
        </span>
      ),
    },
    {
      title: "中途揭盖",
      dataIndex: "halfway_uncover",
      width: 96,
      render: (v: any) => (
        <>
          <span className={`${styles.numVal} ${v !== "-" && v > 0 ? styles.red : ""} ${v === "-" ? styles.noData : ""}`}>
            {v}
          </span>
          {v !== "-" && <span className={`${styles.ft16} ${v > 0 ? styles.red : ""}`}> 筐</span>}
        </>
      ),
    },
    {
      title: "是否换水",
      dataIndex: "is_change_water",
      width: 96,
      render: (v: any) => (
        <span className={`${v === "-" ? styles.noData : ""} ${v === "否" ? styles.red : ""}`}>{v}</span>
      ),
    },
    {
      title: "换水时间",
      dataIndex: "change_water_time_points",
      width: 94,
      render: (arr: string[]) =>
        arr?.length ? (
          <div>
            {arr.slice(0, 3).map((t: string, i: number) => (
              <p key={i} className={styles.numVal}>{t}</p>
            ))}
            {arr.length > 3 && (
              <Tooltip
                title={arr.map((t: string, i: number) => <p key={i}>{t}</p>)}
              >
                <span className={styles.moreFilled}>...</span>
              </Tooltip>
            )}
          </div>
        ) : (
          <span className={styles.noData}>-</span>
        ),
    },
  ]

  return (
    <div className={styles.storeDetailContent}>
      <div className={styles.storeHeadImg} style={{ backgroundImage: `url(${storeHeadImg})` }} />
      <div className={styles.storeInfo}>
        <span className={styles.storeNameHeader}>{overviewData?.store_name || "-"}</span>
        <span className={styles.storeAddrHeader}>
          <EnvironmentOutlined style={{ fontSize: 17, color: "#909399", marginRight: 4 }} />
          {overviewData?.store_addr || "-"}
        </span>
      </div>

      {/* 今日最近一筐洗涤数据 */}
      <div className={styles.onTimeData} style={{ marginTop: 12 }}>
        <div className={styles.dataTitleBox}>
          <div className={styles.flexCenter}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>今日最近一筐洗涤数据</p>
          </div>
          <div className={styles.flexCenter}>
            <span className={styles.updateText}>更新时间：{updateTime}</span>
            <span className={styles.refreshText} onClick={refreshData}>
              刷新 <ReloadOutlined style={{ fontSize: 18, marginLeft: 4 }} />
            </span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className={styles.dataOneItem}>
            <p className={styles.itemTitle}>设备型号</p>
            <p className={styles.deviceName}>{realTimeData?.order_device_name}</p>
          </div>
          <div className={styles.dataOneItem}>
            <p className={styles.itemTitle}>主洗温度</p>
            <p className={`${styles.dataNum} ${realTimeData?.cleanse_temperature != null && realTimeData?.cleanse_temperature !== "-" && realTimeData?.cleanse_temperature < 50 ? styles.dataNumWarn : ""}`}>
              {realTimeData?.cleanse_temperature == null || realTimeData?.cleanse_temperature === "-" ? "-" : `${realTimeData.cleanse_temperature}℃`}
            </p>
          </div>
          <div className={styles.dataOneItem} style={{ border: "none" }}>
            <p className={styles.itemTitle}>漂洗温度</p>
            <p className={`${styles.dataNum} ${realTimeData?.rinse_water_high_temperature != null && realTimeData?.rinse_water_high_temperature !== "-" && realTimeData?.rinse_water_high_temperature < 80 ? styles.dataNumWarn : ""}`}>
              {realTimeData?.rinse_water_high_temperature == null || realTimeData?.rinse_water_high_temperature === "-" ? "-" : `${realTimeData.rinse_water_high_temperature}℃`}
            </p>
          </div>
        </div>
      </div>

      {/* 日期选择 */}
      <div className={styles.dateRadioBox}>
        <DateRadio dateType={dateType} dateRange={[params.start_date, params.end_date]} onChangeDate={changeDate} />
      </div>

      <div style={{ padding: "0 8px" }}>
        {/* 数据总览 */}
        <div className={styles.onTimeData} style={{ marginTop: 8 }}>
          <div className={styles.flexCenter}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>数据总览</p>
          </div>
          <div style={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
            {[
              { title: "统计总天数", value: moneyFormat(overviewData?.total_stat_days || 0, 0) },
              { title: "使用天数", value: moneyFormat(overviewData?.real_used_days || 0, 0) },
              { title: "总洗涤筐数", value: moneyFormat(overviewData?.total_basket_count || 0, 0) },
              { title: "总耗电 (kW·h)", value: moneyFormat(overviewData?.total_power_consumption_sum || 0, 2) },
              { title: "日均洗涤筐数", value: moneyFormat(overviewData?.avg_basket_count || 0, 2) },
              { title: "筐均耗电 (kW·h)", value: moneyFormat(overviewData?.power_consumption_avg || 0, 2), warn: (overviewData?.power_consumption_avg || 0) > 0.3 },
              { title: "日均洗涤时长 (小时)", value: overviewData?.avg_used_duration || 0 },
              { title: "平均主洗温度", value: overviewData?.cleanse_water_temperature_avg !== "-" ? `${overviewData?.cleanse_water_temperature_avg}℃` : "-", warn: overviewData?.cleanse_water_temperature_avg !== "-" && (overviewData?.cleanse_water_temperature_avg || 0) < 50 },
              { title: "平均漂洗温度", value: overviewData?.rinse_water_temperature_avg !== "-" ? `${overviewData?.rinse_water_temperature_avg}℃` : "-", warn: overviewData?.rinse_water_temperature_avg !== "-" && (overviewData?.rinse_water_temperature_avg || 0) < 80 },
              { title: "中途揭盖率", value: `${overviewData?.halfway_uncover_rate || 0}%`, warn: (overviewData?.halfway_uncover_rate || 0) > 5 },
              { title: "未规范换水天数", value: moneyFormat(overviewData?.not_change_water_days || 0, 0), warn: (overviewData?.not_change_water_days || 0) > 1, noBorder: true },
            ].map((item, idx) => (
              <div key={idx} className={styles.dataOneItem} style={item.noBorder ? { border: "none" } : {}}>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={`${styles.dataNum} ${item.warn ? styles.dataNumWarn : ""}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 数据趋势 */}
        {showChart && (
          <div className={styles.chartBox}>
            <div className={styles.flexCenter}>
              <div className={styles.sideBar} />
              <p className={styles.dataTitle}>数据趋势</p>
            </div>
            <Radio.Group
              value={chartRadio}
              onChange={(e) => onRadioChange(e.target.value)}
              optionType="button"
              className={styles.radioBtnBox}
              style={{ marginTop: 20 }}
            >
              <Radio.Button value="1">洗涤筐数</Radio.Button>
              <Radio.Button value="5">主洗温度</Radio.Button>
              <Radio.Button value="6">漂洗温度</Radio.Button>
              <Radio.Button value="2">中途揭盖率</Radio.Button>
              <Radio.Button value="3">换水次数</Radio.Button>
              <Radio.Button value="4">筐均耗电量</Radio.Button>
            </Radio.Group>
            <div ref={chartRef} className={styles.lineChart} />
          </div>
        )}

        {/* 数据明细 */}
        <div className={styles.dataTableBox}>
          <div className={styles.flexCenter}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>数据明细</p>
          </div>
          <Table
            columns={detailColumns}
            dataSource={tableData}
            loading={tableLoading}
            rowKey={(r) => r.event_date || Math.random().toString()}
            bordered
            pagination={false}
            className={styles.tables}
            style={{ marginTop: 20 }}
          />
        </div>
      </div>
    </div>
  )
}
