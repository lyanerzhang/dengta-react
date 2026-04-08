import { useCallback, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Table, Radio, message } from "antd"
import { EnvironmentOutlined } from "@ant-design/icons"
import * as echarts from "echarts"
import dayjs from "dayjs"
import type { ColumnsType } from "antd/es/table"
import {
  getStoreCombiovenRunningOverview,
  getStoreCombiovenRunningDetail,
  getStoreCombiovenRunningTrend,
  getStoreCombiovenRunningAbnormalDetail,
} from "@/api/steamOven"
import { getDatesBetween } from "@/utils/getDateRangeArray"
import { calculateXAxisInterval } from "@/utils/echarts"
import DateRadio from "@/components/DateRadio"
import storeHeadImg from "@/assets/images/store_head.png"
import AbnormalCountDisplay from "./AbnormalCountDisplay"
import AbnormalDetailModal, { type AbnormalDetailData } from "./AbnormalDetailModal"
import styles from "./storeDetail.module.scss"

const moneyFormat = (val: number | string, decimals = 0) => {
  const num = Number(val)
  if (Number.isNaN(num)) return String(val)
  return num.toLocaleString("zh-CN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

const dateFormatCell = (date: string) => date?.replace(/-/g, ".") ?? "-"

const TABLE_CLEAN_STATE: Record<number, string> = {
  0: "无",
  1: "清洁成功",
  2: "清洁中断",
  3: "未清洁",
}

const TREND_UNIT: Record<string, string> = {
  "1": "次",
  "2": "小时",
  "3": "kW·h",
}

type TrendSeries = { label: number; data: number[] }

export default function SteamOvenStoreDetail() {
  const [searchParams] = useSearchParams()
  const storeName = searchParams.get("storeName") || "-"
  const storeAddr = searchParams.get("storeAddr") || "-"
  const deviceId = searchParams.get("deviceId") || ""

  const [dateType, setDateType] = useState(2)
  const [reqs, setReqs] = useState({
    start_date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  })
  const [overviewData, setOverviewData] = useState<any>(null)
  const [dataList, setDataList] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [showChart, setShowChart] = useState(true)
  const [chartRadio, setChartRadio] = useState("1")
  const [trendLabels, setTrendLabels] = useState<string[]>([])
  const [trendSeries, setTrendSeries] = useState<TrendSeries[]>([])

  const [detailOpen, setDetailOpen] = useState(false)
  const [detailData, setDetailData] = useState<AbnormalDetailData | null>(null)
  const [cleaningStateForDetail, setCleaningStateForDetail] = useState(0)

  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)
  const trendLabelsRef = useRef<string[]>([])
  const trendSeriesRef = useRef<TrendSeries[]>([])
  const chartRadioRef = useRef(chartRadio)
  trendLabelsRef.current = trendLabels
  trendSeriesRef.current = trendSeries
  chartRadioRef.current = chartRadio

  const handleChartSeries = useCallback((data: TrendSeries[]) => {
    const r = chartRadioRef.current
    const found = data.find((item) => item.label === Number(r))
    return found?.data ?? []
  }, [])

  const drawLineChart = useCallback(() => {
    if (!chartRef.current) return
    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose()
    }
    const chart = echarts.init(chartRef.current)
    chartInstanceRef.current = chart
    const labels = trendLabelsRef.current
    const seriesData = handleChartSeries(trendSeriesRef.current)

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
          data: seriesData,
          type: "line",
          smooth: true,
          lineStyle: { color: "#3867FF" },
        },
      ],
    })
  }, [handleChartSeries])

  const fetchOverview = useCallback(async () => {
    if (!deviceId) return
    try {
      const res = await getStoreCombiovenRunningOverview({
        device_id: deviceId,
        start_date: reqs.start_date,
        end_date: reqs.end_date,
      })
      setOverviewData(res)
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "加载总览失败")
    }
  }, [deviceId, reqs.end_date, reqs.start_date])

  const fetchTable = useCallback(async () => {
    if (!deviceId) return
    setTableLoading(true)
    try {
      const res: any = await getStoreCombiovenRunningDetail({
        device_id: deviceId,
        start_date: reqs.start_date,
        end_date: reqs.end_date,
      })
      setDataList(res?.items ?? [])
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "加载明细失败")
    } finally {
      setTableLoading(false)
    }
  }, [deviceId, reqs.end_date, reqs.start_date])

  const fetchTrend = useCallback(async () => {
    if (!deviceId) return
    try {
      const res: any = await getStoreCombiovenRunningTrend({
        device_id: deviceId,
        start_date: reqs.start_date,
        end_date: reqs.end_date,
      })
      const labels = res?.labels ?? []
      const series = res?.data ?? []
      setTrendLabels(labels)
      setTrendSeries(series)
      trendLabelsRef.current = labels
      trendSeriesRef.current = series
      setTimeout(() => drawLineChart(), 0)
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "加载趋势失败")
    }
  }, [deviceId, drawLineChart, reqs.end_date, reqs.start_date])

  useEffect(() => {
    if (!deviceId) {
      message.warning("缺少设备信息")
      return
    }
    fetchOverview()
    fetchTable()
    const dateArr = getDatesBetween(reqs.start_date, reqs.end_date, ".")
    const shouldShow = dateType !== 1 && dateArr.length >= 7
    setShowChart(shouldShow)
    if (shouldShow) {
      fetchTrend()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 与 PC 一致：进入页时拉取
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
    setDateType(dates.type)
    setReqs({ start_date: dates.start_date, end_date: dates.end_date })
    const dateArr = getDatesBetween(dates.start_date, dates.end_date, ".")
    const shouldShow = dates.type !== 1 && dateArr.length >= 7
    setShowChart(shouldShow)
    if (!deviceId) return
    getStoreCombiovenRunningOverview({
      device_id: deviceId,
      start_date: dates.start_date,
      end_date: dates.end_date,
    })
      .then((res: any) => setOverviewData(res))
      .catch((e: any) => message.error(typeof e === "string" ? e : "加载总览失败"))
    getStoreCombiovenRunningDetail({
      device_id: deviceId,
      start_date: dates.start_date,
      end_date: dates.end_date,
    })
      .then((res: any) => setDataList(res?.items ?? []))
      .catch((e: any) => message.error(typeof e === "string" ? e : "加载明细失败"))
    if (shouldShow) {
      getStoreCombiovenRunningTrend({
        device_id: deviceId,
        start_date: dates.start_date,
        end_date: dates.end_date,
      })
        .then((res: any) => {
          const labels = res?.labels ?? []
          const series = res?.data ?? []
          setTrendLabels(labels)
          setTrendSeries(series)
          trendLabelsRef.current = labels
          trendSeriesRef.current = series
          setTimeout(() => drawLineChart(), 0)
        })
        .catch((e: any) => message.error(typeof e === "string" ? e : "加载趋势失败"))
    } else {
      chartInstanceRef.current?.dispose()
      chartInstanceRef.current = null
    }
  }

  const onRadioChange = (val: string) => {
    setChartRadio(val)
    chartRadioRef.current = val
    setTimeout(() => drawLineChart(), 0)
  }

  const lookDetail = (date: string, non_standard_cleaning_state: number) => {
    getStoreCombiovenRunningAbnormalDetail({ device_id: deviceId, date })
      .then((res: any) => {
        setCleaningStateForDetail(non_standard_cleaning_state)
        setDetailData(res ?? null)
        setDetailOpen(true)
      })
      .catch((e: any) => message.error(typeof e === "string" ? e : "加载详情失败"))
  }

  const columns: ColumnsType<any> = [
    {
      title: "日期",
      width: 120,
      render: (_, row) => <span>{dateFormatCell(row.date)}</span>,
    },
    {
      title: "烹饪时长",
      width: 128,
      render: (_, row) => (
        <>
          <span className={`${styles.dinNumber} ${row.cooking_duration === "-" ? styles.noData : ""}`}>
            {row.cooking_duration}
          </span>
          {row.cooking_duration !== "-" && <span className={styles.ft16}> 小时</span>}
        </>
      ),
    },
    {
      title: "总耗电(kW·h)",
      width: 138,
      render: (_, row) => (
        <span className={`${styles.dinNumber} ${row.energy_consumption === "-" ? styles.noData : ""}`}>
          {row.energy_consumption !== "-" ? moneyFormat(row.energy_consumption, 2) : "-"}
        </span>
      ),
    },
    {
      title: "空载加热超时",
      width: 128,
      render: (_, row) => <AbnormalCountDisplay count={row.no_load_heating_timeout_cnt} />,
    },
    {
      title: "烹饪中途开门超时",
      width: 160,
      render: (_, row) => <AbnormalCountDisplay count={row.cooking_door_open_timeout_cnt} />,
    },
    {
      title: "修改门店菜单",
      width: 128,
      render: (_, row) => (
        <>
          {row.menu_modification_cnt !== "-" ? (
            <span className={row.menu_modification_cnt > 0 ? styles.red : ""}>
              {row.menu_modification_cnt > 0 ? "有修改" : "无修改"}
            </span>
          ) : (
            <span className={styles.noData}>{row.menu_modification_cnt}</span>
          )}
        </>
      ),
    },
    {
      title: "清洁情况",
      width: 128,
      render: (_, row) => (
        <>
          {row.non_standard_cleaning_state !== "-" ? (
            <span
              className={[2, 3].includes(row.non_standard_cleaning_state) ? styles.red : ""}
            >
              {TABLE_CLEAN_STATE[row.non_standard_cleaning_state] ?? "-"}
            </span>
          ) : (
            <span className={styles.noData}>{row.non_standard_cleaning_state}</span>
          )}
        </>
      ),
    },
    {
      title: "详情",
      width: 114,
      render: (_, row) =>
        row.has_data ? (
          <span
            className={styles.optionDetail}
            onClick={() => lookDetail(row.date, row.non_standard_cleaning_state)}
          >
            查看详情
          </span>
        ) : null,
    },
  ]

  return (
    <div className={styles.storeDetailContent}>
      <div className={styles.storeHeadImg} style={{ backgroundImage: `url(${storeHeadImg})` }} />
      <div className={styles.storeInfo}>
        <span className={styles.storeNameHeader}>{storeName}</span>
        <span className={styles.storeAddrHeader}>
          <EnvironmentOutlined style={{ fontSize: 17, color: "#909399" }} />
          {storeAddr}
        </span>
      </div>

      <div className={styles.dateRadioBox}>
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
          {[
            { title: "使用天数", key: "used_days", decimals: 0 },
            { title: "日均烹饪时长（小时）", key: "cooking_duration", decimals: 2 },
            { title: "日均耗电量（kW·h）", key: "energy_consumption", decimals: 2 },
            { title: "空载加热次数", key: "no_load_heating_timeout_cnt", decimals: 0 },
            { title: "烹饪中途开门超时次数", key: "cooking_door_open_timeout_cnt", decimals: 0 },
            { title: "修改门店菜单次数", key: "menu_modification_cnt", decimals: 0 },
            { title: "未规范清洁天数", key: "non_standard_cleaning_cnt", decimals: 0 },
          ].map(({ title, key, decimals }) => (
            <div key={key} className={styles.data}>
              <div className={styles.title}>{title}</div>
              <div className={styles.dataNum}>{moneyFormat(overviewData?.[key] ?? 0, decimals)}</div>
            </div>
          ))}
        </div>
      </div>

      {showChart && (
        <div className={styles.chartBox}>
          <div className={styles.dataTitleBox}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>数据趋势</p>
          </div>
          <Radio.Group
            className={styles.radioBtnBox}
            value={chartRadio}
            onChange={(e) => onRadioChange(e.target.value)}
          >
            <Radio.Button value="1">全部异常</Radio.Button>
            <Radio.Button value="2">烹饪时长</Radio.Button>
            <Radio.Button value="3">耗电量</Radio.Button>
          </Radio.Group>
          <p className={styles.unitTip}>单位({TREND_UNIT[chartRadio]})</p>
          <div ref={chartRef} className={styles.lineChart} />
        </div>
      )}

      <div className={styles.dataTableBox}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>数据明细</p>
        </div>
        <Table
          className={styles.tables}
          columns={columns}
          dataSource={dataList}
          loading={tableLoading}
          bordered
          rowKey={(r, i) => `${r.date}-${i}`}
          pagination={false}
          scroll={{ x: 1100 }}
        />
      </div>

      <AbnormalDetailModal
        open={detailOpen}
        cleaningState={cleaningStateForDetail}
        data={detailData}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  )
}
