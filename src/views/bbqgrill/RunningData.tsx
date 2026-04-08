import { useCallback, useEffect, useRef, useState } from "react"
import { Table, AutoComplete, Radio, Pagination, Popover, message } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import * as echarts from "echarts"
import dayjs from "dayjs"
import type { ColumnsType } from "antd/es/table"
import {
  getBbqGrillOverview,
  getBbqGrillTrend,
  getBbqGrillUsageList,
  getBbqGrillStoreList,
} from "@/api/bbqgrill"
import { getDatesBetween } from "@/utils/getDateRangeArray"
import { calculateXAxisInterval } from "@/utils/echarts"
import DateRadio from "@/components/DateRadio"
import styles from "./runningData.module.scss"

const moneyFormat = (val: number | string, decimals = 0) => {
  const num = Number(val)
  if (Number.isNaN(num)) return String(val)
  return num.toLocaleString("zh-CN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

const dateFormatCell = (date: string) => date?.replace(/-/g, ".") ?? "-"

const ABNORMAL_CHOICES = [
  { id: null as number | null, label: "全部" },
  { id: 2, label: "烤串不转" },
  { id: 1, label: "未识别烤串类型" },
  { id: 3, label: "烤串成熟后处理超时" },
] as const

type TrendPayload = {
  labels: string[]
  data: Array<{ label: number; data: number[] }>
}

function parseTime(time: string) {
  if (!time || typeof time !== "string" || time === "-") {
    return { date: "", time: "" }
  }
  const [datePart, timePart] = time.split(" ")
  if (!datePart || !timePart) {
    return { date: "", time: "" }
  }
  const [year, month, day] = datePart.split("-")
  if (!month || !day) {
    return { date: "", time: timePart }
  }
  const formattedMonth = parseInt(month, 10)
  const formattedDay = parseInt(day, 10)
  const formattedDate = `${formattedMonth}月${formattedDay}日`
  return { date: formattedDate, time: timePart }
}

function formatSecondsToMinSec(seconds: number) {
  if (Number.isNaN(seconds) || seconds < 0) {
    return (
      <>
        <span>0</span>
        <span className={styles.unitSm}>秒</span>
      </>
    )
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  if (minutes === 0) {
    return (
      <>
        <span>{remainingSeconds}</span>
        <span className={styles.unitSm}>秒</span>
      </>
    )
  }
  if (remainingSeconds === 0) {
    return (
      <>
        <span>{minutes}</span>
        <span className={styles.unitSm}>分</span>
      </>
    )
  }
  return (
    <>
      <span>{minutes}</span>
      <span className={styles.unitSm}>分</span>
      {remainingSeconds}
      <span className={styles.unitSm}>秒</span>
    </>
  )
}

function buildSeriesValues(data: Array<{ label: number; data: number[] }>, radio: string) {
  const seriesData = data.find((item) => item.label === Number(radio))
  if (!seriesData?.data) return []
  if (radio === "1") {
    return seriesData.data.map((item) => Number((item * 100).toFixed(2)))
  }
  return seriesData.data.map((seconds) => Number((seconds / 60).toFixed(2)))
}

export default function BbqgrillRunningData() {
  const [dateType, setDateType] = useState(2)
  const [reqs, setReqs] = useState({
    start_date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    trend_store_id: "" as string,
    usage_store_id: "" as string,
  })
  const [trendStoreName, setTrendStoreName] = useState("")
  const [usageStoreName, setUsageStoreName] = useState("")
  const [storeOptions, setStoreOptions] = useState<{ value: string; id: string }[]>([])
  const [overviewData, setOverviewData] = useState<any>(null)
  const [trendData, setTrendData] = useState<TrendPayload | null>(null)
  const [usageList, setUsageList] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState({ page_no: 1, page_size: 10, total: 0 })
  const [showChart, setShowChart] = useState(true)
  const [chartRadio, setChartRadio] = useState("1")
  const [abnormalChoiceId, setAbnormalChoiceId] = useState<number | null>(null)
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false)

  const reqsRef = useRef(reqs)
  reqsRef.current = reqs

  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)
  const trendDataRef = useRef<TrendPayload | null>(null)
  const chartRadioRef = useRef(chartRadio)
  trendDataRef.current = trendData
  chartRadioRef.current = chartRadio

  const drawLineChart = useCallback(() => {
    if (!chartRef.current || !trendDataRef.current?.labels?.length) return
    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose()
    }
    const chart = echarts.init(chartRef.current)
    chartInstanceRef.current = chart
    const labels = trendDataRef.current.labels
    const raw = trendDataRef.current.data ?? []
    const seriesValues = buildSeriesValues(raw, chartRadioRef.current)

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
        textStyle: { color: "white", fontSize: 16 },
        formatter: (p: any) => String(p[0]?.value ?? ""),
      },
      grid: { left: "10px", right: "0", bottom: "5%", top: "28px", containLabel: true },
      xAxis: {
        type: "category",
        data: labels,
        axisLine: { lineStyle: { color: "#C0C2CC" } },
        axisLabel: {
          interval: calculateXAxisInterval(labels.length),
          color: "#606266",
          fontSize: 16,
        },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        axisLabel: { show: true, interval: 0, color: "#606266", fontSize: 16 },
      },
      series: [
        {
          data: seriesValues,
          type: "line",
          smooth: true,
          lineStyle: { color: "#3867FF" },
        },
      ],
    })
  }, [])

  const fetchOverview = useCallback(async () => {
    try {
      const res = await getBbqGrillOverview({
        start_date: reqs.start_date,
        end_date: reqs.end_date,
      })
      setOverviewData(res)
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "加载总览失败")
    }
  }, [reqs.end_date, reqs.start_date])

  const fetchTrend = useCallback(async () => {
    try {
      const res: any = await getBbqGrillTrend({
        start_date: reqs.start_date,
        end_date: reqs.end_date,
        type_choice: chartRadioRef.current,
        store_id: reqs.trend_store_id,
      })
      const payload: TrendPayload = {
        labels: res?.labels ?? [],
        data: res?.data ?? [],
      }
      setTrendData(payload)
      trendDataRef.current = payload
      setTimeout(() => drawLineChart(), 0)
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "加载趋势失败")
    }
  }, [drawLineChart, reqs.end_date, reqs.start_date, reqs.trend_store_id])

  const fetchUsageList = useCallback(async (page_no: number) => {
    setTableLoading(true)
    try {
      const res: any = await getBbqGrillUsageList({
        start_date: reqs.start_date,
        end_date: reqs.end_date,
        abnormal_choice: abnormalChoiceId,
        store_id: reqs.usage_store_id,
        page_no,
        page_size: pageInfo.page_size,
      })
      setUsageList(res?.items ?? [])
      setPageInfo((prev) => {
        const next = { ...prev, page_no, total: res?.total ?? 0 }
        return next
      })
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "加载明细失败")
    } finally {
      setTableLoading(false)
    }
  }, [
    abnormalChoiceId,
    pageInfo.page_size,
    reqs.end_date,
    reqs.start_date,
    reqs.usage_store_id,
  ])

  useEffect(() => {
    fetchOverview()
    fetchTrend()
    fetchUsageList(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 与 PC onMounted 一致
  }, [])

  useEffect(() => {
    const onResize = () => chartInstanceRef.current?.resize()
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      chartInstanceRef.current?.dispose()
    }
  }, [])

  const changeDate = (dates: { type: number; start_date: string; end_date: string }) => {
    setDateType(dates.type)
    setReqs((prev) => ({
      ...prev,
      start_date: dates.start_date,
      end_date: dates.end_date,
    }))
    const dateArr = getDatesBetween(dates.start_date, dates.end_date, ".")
    const shouldShow = dates.type !== 1 && dateArr.length >= 7
    setShowChart(shouldShow)
    if (!shouldShow) {
      chartInstanceRef.current?.dispose()
      chartInstanceRef.current = null
    }
    const trendSid = reqsRef.current.trend_store_id
    const usageSid = reqsRef.current.usage_store_id
    setTimeout(() => {
      getBbqGrillOverview({ start_date: dates.start_date, end_date: dates.end_date })
        .then((res: any) => setOverviewData(res))
        .catch((e: any) => message.error(typeof e === "string" ? e : "加载总览失败"))
      if (shouldShow) {
        getBbqGrillTrend({
          start_date: dates.start_date,
          end_date: dates.end_date,
          type_choice: chartRadioRef.current,
          store_id: trendSid,
        })
          .then((res: any) => {
            const payload: TrendPayload = {
              labels: res?.labels ?? [],
              data: res?.data ?? [],
            }
            setTrendData(payload)
            trendDataRef.current = payload
            setTimeout(() => drawLineChart(), 0)
          })
          .catch((e: any) => message.error(typeof e === "string" ? e : "加载趋势失败"))
      }
      getBbqGrillUsageList({
        start_date: dates.start_date,
        end_date: dates.end_date,
        abnormal_choice: abnormalChoiceId,
        store_id: usageSid,
        page_no: 1,
        page_size: pageInfo.page_size,
      })
        .then((res: any) => {
          setUsageList(res?.items ?? [])
          setPageInfo((prev) => ({ ...prev, page_no: 1, total: res?.total ?? 0 }))
        })
        .catch((e: any) => message.error(typeof e === "string" ? e : "加载明细失败"))
    }, 0)
  }

  const onRadioChange = (val: string) => {
    setChartRadio(val)
    chartRadioRef.current = val
    setTimeout(() => drawLineChart(), 0)
  }

  const handleStoreSearch = async (value: string) => {
    if (!value) {
      setStoreOptions([])
      return
    }
    try {
      const res: any = await getBbqGrillStoreList({})
      const list = (res?.list ?? [])
        .filter((item: any) => String(item.name).includes(value))
        .map((item: any) => ({ value: item.name, id: String(item.id) }))
      setStoreOptions(list.length ? list : [{ value: "", id: "" }])
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "搜索失败")
      setStoreOptions([])
    }
  }

  const handleSelectTrend = (_v: string, opt: any) => {
    setTrendStoreName(opt?.value || "")
    setReqs((prev) => ({ ...prev, trend_store_id: opt?.id ?? "" }))
    setTimeout(() => {
      const r = reqsRef.current
      getBbqGrillTrend({
        start_date: r.start_date,
        end_date: r.end_date,
        type_choice: chartRadioRef.current,
        store_id: opt?.id ?? "",
      })
        .then((res: any) => {
          const payload: TrendPayload = {
            labels: res?.labels ?? [],
            data: res?.data ?? [],
          }
          setTrendData(payload)
          trendDataRef.current = payload
          setTimeout(() => drawLineChart(), 0)
        })
        .catch((e: any) => message.error(typeof e === "string" ? e : "加载趋势失败"))
    }, 0)
  }

  const handleSelectUsage = (_v: string, opt: any) => {
    setUsageStoreName(opt?.value || "")
    setReqs((prev) => ({ ...prev, usage_store_id: opt?.id ?? "" }))
    setPageInfo((prev) => ({ ...prev, page_no: 1 }))
    setTimeout(() => {
      const r = reqsRef.current
      getBbqGrillUsageList({
        start_date: r.start_date,
        end_date: r.end_date,
        abnormal_choice: abnormalChoiceId,
        store_id: opt?.id ?? "",
        page_no: 1,
        page_size: pageInfo.page_size,
      })
        .then((res: any) => {
          setUsageList(res?.items ?? [])
          setPageInfo((prev) => ({ ...prev, page_no: 1, total: res?.total ?? 0 }))
        })
        .catch((e: any) => message.error(typeof e === "string" ? e : "加载明细失败"))
    }, 0)
  }

  const onTrendInputChange = (v: string) => {
    setTrendStoreName(v)
    if (!v) {
      setReqs((prev) => ({ ...prev, trend_store_id: "" }))
      setTimeout(() => {
        const r = reqsRef.current
        getBbqGrillTrend({
          start_date: r.start_date,
          end_date: r.end_date,
          type_choice: chartRadioRef.current,
          store_id: "",
        })
          .then((res: any) => {
            const payload: TrendPayload = {
              labels: res?.labels ?? [],
              data: res?.data ?? [],
            }
            setTrendData(payload)
            trendDataRef.current = payload
            setTimeout(() => drawLineChart(), 0)
          })
          .catch((e: any) => message.error(typeof e === "string" ? e : "加载趋势失败"))
      }, 0)
    }
  }

  const onUsageInputChange = (v: string) => {
    setUsageStoreName(v)
    if (!v) {
      setReqs((prev) => ({ ...prev, usage_store_id: "" }))
      setPageInfo((prev) => ({ ...prev, page_no: 1 }))
      setTimeout(() => {
        const r = reqsRef.current
        getBbqGrillUsageList({
          start_date: r.start_date,
          end_date: r.end_date,
          abnormal_choice: abnormalChoiceId,
          store_id: "",
          page_no: 1,
          page_size: pageInfo.page_size,
        })
          .then((res: any) => {
            setUsageList(res?.items ?? [])
            setPageInfo((prev) => ({ ...prev, page_no: 1, total: res?.total ?? 0 }))
          })
          .catch((e: any) => message.error(typeof e === "string" ? e : "加载明细失败"))
      }, 0)
    }
  }

  const changeAbnormalChoice = (id: number | null) => {
    setAbnormalChoiceId(id)
    setFilterPopoverOpen(false)
    setPageInfo((prev) => ({ ...prev, page_no: 1 }))
    setTimeout(() => {
      const r = reqsRef.current
      getBbqGrillUsageList({
        start_date: r.start_date,
        end_date: r.end_date,
        abnormal_choice: id,
        store_id: r.usage_store_id,
        page_no: 1,
        page_size: pageInfo.page_size,
      })
        .then((res: any) => {
          setUsageList(res?.items ?? [])
          setPageInfo((prev) => ({ ...prev, page_no: 1, total: res?.total ?? 0 }))
        })
        .catch((e: any) => message.error(typeof e === "string" ? e : "加载明细失败"))
    }, 0)
  }

  const abnormalHeader = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span className={abnormalChoiceId != null ? styles.headerFilterActive : undefined}>异常类型</span>
      <Popover
        title={null}
        trigger="click"
        open={filterPopoverOpen}
        onOpenChange={setFilterPopoverOpen}
        placement="bottom"
        getPopupContainer={() => document.getElementById("dengta") || document.body}
        content={
          <div className={styles.popoverList}>
            {ABNORMAL_CHOICES.map((item) => (
              <p
                key={item.id === null ? "all" : String(item.id)}
                className={`${styles.popoverItem} ${item.id === abnormalChoiceId ? styles.popoverItemSelected : ""}`}
                onClick={() => changeAbnormalChoice(item.id)}
              >
                {item.label}
              </p>
            ))}
          </div>
        }
      >
        <FilterOutlined
          className={styles.filterIcon}
          style={{ color: abnormalChoiceId != null ? "#3867ff" : "#4c77b8" }}
        />
      </Popover>
    </div>
  )

  const columns: ColumnsType<any> = [
    {
      title: "日期",
      width: 120,
      render: (_, row) => <span>{dateFormatCell(row.date)}</span>,
    },
    {
      title: "门店",
      width: 260,
      render: (_, row) => (
        <>
          <p className={styles.storeName}>{row.store_name}</p>
          <p className={styles.storeAddr}>{row.store_address}</p>
        </>
      ),
    },
    {
      title: abnormalHeader,
      width: 200,
      dataIndex: "abnormal_type_name",
    },
    {
      title: "桌台号",
      width: 80,
      render: (_, row) => (
        <span className={`${styles.dishesCount} ${row.table_number === "-" ? styles.noData : ""}`}>
          {row.table_number}
        </span>
      ),
    },
    {
      title: "串位",
      width: 80,
      render: (_, row) => (
        <span className={`${styles.dishesCount} ${row.grilled_skewer_location === "-" ? styles.noData : ""}`}>
          {row.grilled_skewer_location}
        </span>
      ),
    },
    {
      title: "异常发生 - 异常结束",
      width: 304,
      render: (_, row) => {
        const start = row.abnormal_start_time
        const end = row.abnormal_end_time
        const ps = parseTime(start)
        const pe = parseTime(end)
        if (start !== "-" && end !== "-") {
          return (
            <div>
              {ps.date}
              <span className={styles.dishesCount}>{ps.time}-</span>
              {pe.date}
              <span className={styles.dishesCount}>{pe.time}</span>
            </div>
          )
        }
        if (start === "-") {
          return (
            <div>
              <div className={styles.noData}>-</div>
              {pe.date}
              <span className={styles.dishesCount}>{pe.time}</span>
            </div>
          )
        }
        if (end === "-") {
          return (
            <div>
              {ps.date}
              <span className={styles.dishesCount}>{ps.time}-</span>
              <div className={styles.noData}>-</div>
            </div>
          )
        }
        return <span className={styles.noData}>-</span>
      },
    },
  ]

  return (
    <div className={styles.runningDataContent}>
      <div className={styles.dateRadioWrap}>
        <DateRadio
          dateType={dateType}
          dateRange={[reqs.start_date, reqs.end_date]}
          onChangeDate={changeDate}
        />
      </div>

      <div className={styles.runningDataOverView}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>数据总览</p>
        </div>
        <div className={styles.dataCategory}>
          <div className={styles.data}>
            <div className={styles.title}>烤串数</div>
            <div className={styles.dataNum}>{moneyFormat(overviewData?.grilled_skewer_count ?? 0)}</div>
          </div>
          <div className={styles.data}>
            <div className={styles.title}>图像识别成功率</div>
            <div className={styles.dataNum}>
              {((overviewData?.image_recognition_accuracy ?? 0) * 100).toFixed(1)}%
            </div>
          </div>
          <div className={styles.data}>
            <div className={styles.title}>总耗电量(kW·h)</div>
            <div className={styles.dataNum}>{moneyFormat(overviewData?.total_energy ?? 0, 2)}</div>
          </div>
          <div className={styles.data}>
            <div className={styles.title}>烤串不转处理时长</div>
            <div className={styles.dataNum}>
              {formatSecondsToMinSec(overviewData?.skewer_not_rotate_handle_duration ?? 0)}
            </div>
          </div>
          <div className={styles.data}>
            <div className={styles.title}>烤串成熟后未处理时长</div>
            <div className={styles.dataNum}>
              {formatSecondsToMinSec(overviewData?.skewer_cooked_not_handle_duration ?? 0)}
            </div>
          </div>
        </div>
      </div>

      {showChart && (
        <div className={styles.chartBox}>
          <div className={styles.dataTitleBox}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>数据趋势</p>
          </div>
          <div className={styles.chartRow}>
            <Radio.Group
              className={styles.radioBtnBox}
              value={chartRadio}
              onChange={(e) => onRadioChange(e.target.value)}
            >
              <Radio.Button value="1">图像识别成功率</Radio.Button>
              <Radio.Button value="2">烤串不转处理时长</Radio.Button>
              <Radio.Button value="3">烤串成熟后处理时长</Radio.Button>
            </Radio.Group>
            <div className={styles.filterItem}>
              <span className={styles.filterTitle}>门店</span>
              <AutoComplete
                value={trendStoreName}
                options={storeOptions.map((s) => ({
                  value: s.value,
                  label: s.value || "没有找到相关门店",
                }))}
                onSearch={handleStoreSearch}
                onSelect={handleSelectTrend}
                onChange={onTrendInputChange}
                placeholder="输入门店名称"
                allowClear
                style={{ width: 200 }}
              />
            </div>
          </div>
          <p className={styles.unitTip}>单位({chartRadio === "1" ? "（%）" : "（分钟）"})</p>
          <div ref={chartRef} className={styles.lineChart} />
        </div>
      )}

      <div className={styles.dataTableBox}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>数据明细</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 24 }}>
          <div className={styles.filterItem} style={{ marginLeft: 0 }}>
            <span className={styles.filterTitle}>门店</span>
            <AutoComplete
              value={usageStoreName}
              options={storeOptions.map((s) => ({
                value: s.value,
                label: s.value || "没有找到相关门店",
              }))}
              onSearch={handleStoreSearch}
              onSelect={handleSelectUsage}
              onChange={onUsageInputChange}
              placeholder="输入门店名称"
              allowClear
              style={{ width: 200 }}
            />
          </div>
        </div>
        <Table
          className={styles.tables}
          columns={columns}
          dataSource={usageList}
          loading={tableLoading}
          bordered
          rowKey={(r, i) => `${r.date}-${r.store_id}-${i}`}
          pagination={false}
          scroll={{ x: 1100 }}
        />
        <div className={styles.pageClass}>
          <Pagination
            current={pageInfo.page_no}
            pageSize={pageInfo.page_size}
            total={pageInfo.total}
            showSizeChanger={false}
            showTotal={(t) => `共 ${t} 条`}
            onChange={(page) => fetchUsageList(page)}
          />
        </div>
      </div>
    </div>
  )
}
