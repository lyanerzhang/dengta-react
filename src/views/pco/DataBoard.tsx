import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Table,
  Select,
  Button,
  AutoComplete,
  Pagination,
  Modal,
  Image,
  message,
} from "antd"
import { CheckOutlined, ClockCircleOutlined, ApiOutlined, WarningOutlined } from "@ant-design/icons"
import * as echarts from "echarts"
import dayjs from "dayjs"
import type { EChartsOption } from "echarts"
import type { ColumnsType } from "antd/es/table"
import CurrentDateRadio from "@/components/DateRadio/CurrentDateRadio"
import {
  getPcoServiceOverviewStats,
  getPcoIntelligentMonitorStats,
  getPcoIntelligentMonitorEventList,
  getPcoLighthouseStoreInfo,
  getPcoLighthouseEnum,
} from "@/api/pco"
import { getCityList } from "@/api/mdc"
import { useAppStore } from "@/store"
import PcoTipPopup from "./PcoTipPopup"
import styles from "./pcoDataBoard.module.scss"

const imgToken = typeof localStorage !== "undefined" ? localStorage.getItem("imgToken") : ""

/** 与 dengta-pc `formatPercent` 一致，接口可能返回 string 或 number */
function formatPercent(value: string | number | undefined | null) {
  if (value === undefined || value === null || value === "") return 0
  const num = parseFloat(String(value).replace("%", ""))
  return Number.isNaN(num) ? 0 : num
}

function filterParams(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([k, v]) =>
        k !== "total" &&
        v !== "" &&
        v !== null &&
        v !== undefined,
    ),
  )
}

function hasPositiveCount(v: unknown) {
  if (v === null || v === undefined || v === "") return false
  const n = Number(v)
  return !Number.isNaN(n) && n > 0
}

export default function DataBoard() {
  const hasPco = useAppStore((s) => Boolean(s.menuPermission?.PCO))

  const [serviceOverViewStats, setServiceOverViewStats] = useState<any>({})
  const [form, setForm] = useState({
    store_id: "",
    city_id: "",
    start_date: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  })
  const [dateType1, setDateType1] = useState(3)
  const [dateType2, setDateType2] = useState(3)
  const [storeName, setStoreName] = useState("")
  const [storeName1, setStoreName1] = useState("")
  const [storeOptions, setStoreOptions] = useState<{ value: string; id: string }[]>([])
  const [cityList, setCityList] = useState<{ value: string; label: string }[]>([])
  const [pestType, setPestType] = useState<any[]>([])
  const [disposeStatus, setDisposeStatus] = useState<any[]>([])
  const [recognitionMode, setRecognitionMode] = useState<any[]>([])
  const [form1, setForm1] = useState({
    pest_category_id: "",
    processing_status: "",
    detection_method_id: "",
    start_date: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    page_no: 1,
    page_size: 10,
    total: 0,
    store_id: "",
  })
  const [tableList, setTableList] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [imgDialogUrls, setImgDialogUrls] = useState<string[]>([])
  const [barWidth, setBarWidth] = useState("732px")
  const [monitorRows, setMonitorRows] = useState<any[]>([])
  const formRef = useRef(form)
  const form1Ref = useRef(form1)
  const storeNameRef = useRef(storeName)
  const storeName1Ref = useRef(storeName1)
  formRef.current = form
  form1Ref.current = form1
  storeNameRef.current = storeName
  storeName1Ref.current = storeName1

  const pieChartRef = useRef<HTMLDivElement>(null)
  const barChartRef = useRef<HTMLDivElement>(null)
  const pieInstance = useRef<echarts.ECharts | null>(null)
  const barInstance = useRef<echarts.ECharts | null>(null)

  /** 无数据时仍展示与 PC 一致的四类占位饼图，避免左侧空白 */
  const pieOption: EChartsOption = useMemo(() => {
    const res = serviceOverViewStats ?? {}
    const defs = [
      { key: "emergency_service_count", name: "紧急服务", solid: "#FE322C", ph: "rgba(254, 50, 44, 0.22)" },
      { key: "lighthouse_cloud_service_count", name: "灯塔云服务", solid: "#017AFF", ph: "rgba(1, 122, 255, 0.22)" },
      { key: "routine_service_count", name: "常规服务", solid: "#4CDA63", ph: "rgba(76, 218, 99, 0.22)" },
      { key: "survey_service_count", name: "勘查服务", solid: "#FF9C0F", ph: "rgba(255, 156, 15, 0.22)" },
    ]
    const list = defs
      .map((d) => ({
        value: res[d.key],
        name: d.name,
        itemStyle: { color: d.solid },
      }))
      .filter((item) => hasPositiveCount(item.value))

    const isPlaceholder = !Object.keys(res).length || !list.length
    const data = isPlaceholder
      ? defs.map((d) => ({
          value: 1,
          name: d.name,
          itemStyle: { color: d.ph },
        }))
      : list

    return {
      responsive: true,
      minAngle: isPlaceholder ? 0 : 1,
      backgroundColor: "#FAFBFD",
      tooltip: {
        trigger: "item",
        formatter: isPlaceholder ? () => "暂无数据" : (p: any) => `${p.name}: ${p.value} 次`,
      },
      legend: { show: false },
      series: [
        {
          type: "pie",
          silent: isPlaceholder,
          emphasis: {
            scale: false,
            focus: "none",
            itemStyle: { shadowBlur: 0, borderWidth: 3, borderColor: "#FAFBFD" },
          },
          radius: ["35%", "70%"],
          center: ["50%", "50%"],
          itemStyle: { borderWidth: 3, borderColor: "#FAFBFD" },
          label: {
            show: true,
            formatter: (params: any) => {
              const name = params.name
              const val = isPlaceholder ? "0" : String(params.value)
              return `{name|${name}}\n{value|${val} 次}`
            },
            rich: {
              name: { fontSize: 15, color: "#08080A", align: "left", lineHeight: 18 },
              value: { fontSize: 15, color: "#909399", align: "right", lineHeight: 18 },
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
    } as EChartsOption
  }, [serviceOverViewStats])

  useEffect(() => {
    const n = monitorRows.length
    if (n > 10 && n < 40) setBarWidth("65vw")
    else if (n >= 40 && n < 70) setBarWidth("85vw")
    else if (n >= 70 && n < 100) setBarWidth("95vw")
    else setBarWidth("732px")
  }, [monitorRows.length])

  const barOption: EChartsOption | null = useMemo(() => {
    if (!monitorRows?.length) return null
    const barXData = monitorRows.map((item: any) => dayjs(item.occurrence_date).format("MM.DD"))
    const bar1Data = monitorRows.map((item: any) => item.mouse_count)
    const bar2Data = monitorRows.map((item: any) => item.cockroach_count)
    const bar3Data = monitorRows.map((item: any) => item.winged_insect_count)
    const bar4Data = bar1Data.map((_: any, i: number) =>
      !bar1Data[i] && !bar2Data[i] && !bar3Data[i] ? 0 : "",
    )

    return {
      color: ["#FE322C", "#FF9C0F", "#5755D5"],
      grid: { left: "20px", right: "20px", bottom: "10%", top: "15%", containLabel: true },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: "#000000B3",
        borderColor: "#000000B3",
        borderWidth: 1,
        textStyle: { color: "#FFFFFF" },
        formatter: (params: any) => {
          const arr = Array.isArray(params) ? params : [params]
          let str = `${arr[0]?.axisValue ?? ""}<br/>`
          arr.forEach((item: any) => {
            if (item.value !== "" && item.value !== undefined && item.value !== null) {
              str += `${item.seriesName}${item.value}次<br/>`
            }
          })
          return str
        },
      },
      legend: {
        data: ["鼠类", "蟑螂", "飞虫"],
        bottom: 0,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: { color: "#606266", fontSize: 14 },
      },
      xAxis: [
        {
          type: "category",
          data: barXData,
          axisLine: { lineStyle: { color: "#C0C2CC" } },
          axisTick: { show: false },
          axisLabel: { color: "#606266", fontSize: 16 },
        },
      ],
      yAxis: [
        {
          type: "value",
          minInterval: 1,
          max: (value: { max: number }) =>
            value.max > 10 ? value.max : value.max === 0 ? 10 : value.max * 2,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: "#E4E7ED" } },
          axisLabel: { color: "#606266", fontSize: 16 },
        },
      ],
      series: [
        {
          name: "鼠类",
          type: "bar",
          stack: "total",
          barMaxWidth: 24,
          label: {
            show: true,
            position: "inside",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 500,
            formatter: (p: any) => (p.value > 0 ? String(p.value) : ""),
          },
          data: bar1Data,
        },
        {
          name: "蟑螂",
          type: "bar",
          stack: "total",
          barMaxWidth: 24,
          label: {
            show: true,
            position: "inside",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 500,
            formatter: (p: any) => (p.value > 0 ? String(p.value) : ""),
          },
          data: bar2Data,
        },
        {
          name: "飞虫",
          type: "bar",
          stack: "total",
          barMaxWidth: 24,
          label: {
            show: true,
            position: "inside",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 500,
            formatter: (p: any) => (p.value > 0 ? String(p.value) : ""),
          },
          data: bar3Data,
        },
        {
          name: "",
          type: "bar",
          stack: "total",
          label: {
            show: true,
            position: "top",
            color: "#C0C2CC",
            fontSize: 12,
            fontWeight: 500,
            formatter: (p: any) => (p.value === 0 ? "0" : ""),
          },
          data: bar4Data,
        },
      ],
    } as EChartsOption
  }, [monitorRows])

  useEffect(() => {
    if (!pieChartRef.current) return
    pieInstance.current?.dispose()
    const chart = echarts.init(pieChartRef.current)
    pieInstance.current = chart
    chart.setOption(pieOption)
    return () => {
      chart.dispose()
      pieInstance.current = null
    }
  }, [pieOption])

  useEffect(() => {
    if (!barChartRef.current) return
    if (!barOption) {
      barInstance.current?.dispose()
      barInstance.current = null
      return
    }
    barInstance.current?.dispose()
    const chart = echarts.init(barChartRef.current)
    barInstance.current = chart
    chart.setOption(barOption)
    return () => {
      chart.dispose()
      barInstance.current = null
    }
  }, [barOption])

  useEffect(() => {
    const onResize = () => {
      pieInstance.current?.resize()
      barInstance.current?.resize()
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const loadOverview = useCallback(() => {
    getPcoServiceOverviewStats()
      .then((res: any) => setServiceOverViewStats(res ?? {}))
      .catch((err: any) => message.error(typeof err === "string" ? err : "请求失败"))
  }, [])

  const loadMonitorStats = useCallback(() => {
    const payload = filterParams({ ...formRef.current })
    if (!storeNameRef.current) {
      delete (payload as Record<string, unknown>).store_id
    }
    getPcoIntelligentMonitorStats(payload)
      .then((res: any) => {
        setMonitorRows(Array.isArray(res) ? res : [])
      })
      .catch((err: any) => {
        message.error(typeof err === "string" ? err : "请求失败")
        setMonitorRows([])
      })
  }, [])

  const loadEventList = useCallback(() => {
    setTableLoading(true)
    const { total, ...rest } = form1Ref.current
    const payload = filterParams(rest)
    getPcoIntelligentMonitorEventList(payload)
      .then((res: any) => {
        const list = (res?.item_list ?? []).map((item: any) => ({
          ...item,
          image_url: (item.image_url ?? []).map((u: string) =>
            u.includes("&it=") ? u : `${u}${u.includes("?") ? "&" : "?"}it=${imgToken || ""}`,
          ),
        }))
        setTableList(list)
        setForm1((prev) => {
          const next = { ...prev, total: res?.total ?? 0 }
          form1Ref.current = next
          return next
        })
      })
      .catch((err: any) => {
        message.error(typeof err === "string" ? err : "请求失败")
        setTableList([])
        setForm1((prev) => {
          const next = { ...prev, total: 0 }
          form1Ref.current = next
          return next
        })
      })
      .finally(() => setTableLoading(false))
  }, [])

  useEffect(() => {
    loadOverview()
    loadMonitorStats()
    loadEventList()
    getCityList()
      .then((res: any) => {
        const list = res?.code_list ?? res?.city_list ?? []
        setCityList(
          list.map((item: any) => ({
            value: item.id,
            label: item.name,
          })),
        )
      })
      .catch((e: any) => message.error(typeof e === "string" ? e : "获取城市失败"))
    getPcoLighthouseEnum({})
      .then((res: any) => {
        setPestType(res.pest_type ?? [])
        setRecognitionMode(res.recognition_mode ?? [])
        setDisposeStatus(res.dispose_status ?? [])
      })
      .catch((e: any) => message.error(typeof e === "string" ? e : "获取枚举失败"))
  }, [])

  const handleStoreSearch = async (value: string) => {
    if (!value) {
      setStoreOptions([])
      return
    }
    try {
      const res: any = await getPcoLighthouseStoreInfo({
        name_keyword: value,
        page_no: 1,
        page_size: 50,
      })
      const list = (res?.store_list ?? []).map((item: any) => ({ value: item.name, id: item.id }))
      setStoreOptions(list.length ? list : [{ value: "", id: "" }])
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "搜索失败")
      setStoreOptions([])
    }
  }

  const changeDate1 = (dates: { type: number; start_date: string; end_date: string }) => {
    setDateType1(dates.type)
    setForm((prev) => {
      const next = { ...prev, start_date: dates.start_date, end_date: dates.end_date }
      formRef.current = next
      return next
    })
    setTimeout(() => loadMonitorStats(), 0)
  }

  const changeDate2 = (dates: { type: number; start_date: string; end_date: string }) => {
    setDateType2(dates.type)
    setForm1((prev) => {
      const next = { ...prev, start_date: dates.start_date, end_date: dates.end_date }
      form1Ref.current = next
      return next
    })
    setTimeout(() => loadEventList(), 0)
  }

  const resetMonitor = () => {
    setDateType1(3)
    setStoreName("")
    storeNameRef.current = ""
    const next = {
      store_id: "",
      city_id: "",
      start_date: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
      end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    }
    setForm(next)
    formRef.current = next
    setTimeout(() => loadMonitorStats(), 0)
  }

  const resetEvents = () => {
    setDateType2(3)
    setStoreName1("")
    storeName1Ref.current = ""
    setForm1((prev) => {
      const next = {
        ...prev,
        pest_category_id: "",
        processing_status: "",
        detection_method_id: "",
        store_id: "",
        page_no: 1,
        start_date: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
        end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
      }
      form1Ref.current = next
      return next
    })
    setTimeout(() => loadEventList(), 0)
  }

  const searchEvents = () => {
    setForm1((prev) => {
      const next = { ...prev, page_no: 1 }
      form1Ref.current = next
      return next
    })
    setTimeout(() => loadEventList(), 0)
  }

  const columns: ColumnsType<any> = [
    {
      title: "门店名称",
      width: 200,
      render: (_, row) => <p className={styles.storeName}>{row.ecmall_store_name}</p>,
    },
    {
      title: "发生日期",
      width: 160,
      render: (_, row) => <p>{dayjs(row.occurrence_date).format("YYYY年MM月DD日")}</p>,
    },
    { title: "虫害类别", dataIndex: "pest_category_name", width: 100 },
    {
      title: "识别方式",
      width: 160,
      render: (_, row) => (
        <span className={styles.flexCenter}>
          <span style={{ marginRight: 6 }}>{row.detection_method_name}</span>
          {row.detection_method_id === 2 && <ApiOutlined style={{ fontSize: 18, color: "#3867FF" }} />}
          {row.detection_method_id === 3 && <WarningOutlined style={{ fontSize: 18, color: "#FF8900" }} />}
        </span>
      ),
    },
    { title: "发生位置", dataIndex: "occurrence_location", width: 200 },
    {
      title: "处理状态",
      width: 120,
      render: (_, row) =>
        row.processing_status === 2 ? (
          <div className={styles.flexCenter}>
            <CheckOutlined style={{ color: "#03875F", fontSize: 18 }} />
            <span style={{ color: "#03875F", fontSize: 16, marginLeft: 6 }}>{row.processing_status_name}</span>
          </div>
        ) : (
          <div className={styles.flexCenter}>
            <ClockCircleOutlined style={{ color: "rgba(8,8,10,0.8)", fontSize: 18 }} />
            <span style={{ color: "rgba(8,8,10,0.8)", fontSize: 16, marginLeft: 6 }}>
              {row.processing_status_name}
            </span>
          </div>
        ),
    },
    {
      title: "查看详情",
      width: 100,
      render: (_, row) => (
        <span className={styles.color3867} onClick={() => setImgDialogUrls(row.image_url ?? [])}>
          详情
        </span>
      ),
    },
  ]

  const s = serviceOverViewStats

  return (
    <div className={styles.dataBoard}>
      <div className={styles.dataTemplate}>
        <div className={styles.dataTemplateTitle}>
          <div className={styles.dataTitleBox}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>本月数据</p>
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {hasPco && <PcoTipPopup />}
            {s.update_date && (
              <div className={styles.dataTemplateTime}>
                {dayjs(s.update_date).format("YYYY年MM月DD日")} 更新
              </div>
            )}
          </span>
        </div>
        <div className={styles.dataCategoryWrap}>
          <div className={styles.dataCard}>
            <div className={styles.title}>服务门店总数</div>
            <div className={styles.dataNum}>{s.total_served_store_count ?? "-"}</div>
            {s.served_stores_growth_rate && (
              <div className={styles.dataPercent}>
                <span>较上月</span>
                <span
                  className={`${styles.fontDin} ${styles.font18} ${styles.ml4} ${
                    formatPercent(s.served_stores_growth_rate) > 0 ? styles.dataNumSuccess : styles.dataNumWarn
                  }`}
                >
                  {s.served_stores_growth_rate}
                </span>
                <span
                  className={`${styles.font18} ${
                    formatPercent(s.served_stores_growth_rate) > 0 ? styles.dataNumSuccess : styles.dataNumWarn
                  }`}
                >
                  {formatPercent(s.served_stores_growth_rate) > 0 ? "↑" : "↓"}
                </span>
              </div>
            )}
          </div>
          <div className={styles.dataCard}>
            <div className={styles.title}>本月服务次数</div>
            <div className={styles.dataNum}>{s.service_count ?? "-"}</div>
            {s.service_count_growth_rate && (
              <div className={styles.dataPercent}>
                <span>较上月</span>
                <span
                  className={`${styles.fontDin} ${styles.font18} ${styles.ml4} ${
                    formatPercent(s.service_count_growth_rate) > 0 ? styles.dataNumSuccess : styles.dataNumWarn
                  }`}
                >
                  {s.service_count_growth_rate}
                </span>
                <span
                  className={`${styles.font18} ${
                    formatPercent(s.service_count_growth_rate) > 0 ? styles.dataNumSuccess : styles.dataNumWarn
                  }`}
                >
                  {formatPercent(s.service_count_growth_rate) > 0 ? "↑" : "↓"}
                </span>
              </div>
            )}
          </div>
          <div className={styles.dataCard}>
            <div className={styles.title}>虫害事件数</div>
            <div className={styles.dataNum}>{s.pest_incident_count ?? "-"}</div>
            {s.pest_incident_decline_rate && (
              <div className={styles.dataPercent}>
                <span>较上月</span>
                <span
                  className={`${styles.fontDin} ${styles.font18} ${styles.ml4} ${
                    formatPercent(s.pest_incident_decline_rate) > 0 ? styles.dataNumSuccess : styles.dataNumWarn
                  }`}
                >
                  {String(s.pest_incident_decline_rate).replace("-", "")}
                </span>
                <span
                  className={`${styles.font18} ${
                    formatPercent(s.pest_incident_decline_rate) > 0 ? styles.dataNumSuccess : styles.dataNumWarn
                  }`}
                >
                  {formatPercent(s.pest_incident_decline_rate) > 0 ? "↑" : "↓"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.dataTemplate}>
        <div className={styles.dataTemplateTitle}>
          <div className={styles.dataTitleBox}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>服务数据总览</p>
          </div>
        </div>
        <div className={styles.dataCategory}>
          <div className={styles.dataPie}>
            <div ref={pieChartRef} className={styles.dataPieChart} />
          </div>
          <div className={styles.dataPieIndicators}>
            <p className={styles.dataPieIndicatorsTitle}>服务指标</p>
            <div className={styles.dataPieIndicatorsItem}>
              <p>合作门店数量</p>
              <p className={`${styles.fontDin} ${styles.font20}`}>{s.partnered_stores_count ?? "-"}</p>
            </div>
            <div className={styles.dataPieIndicatorsItem}>
              <p>紧急服务24小时到店率</p>
              <p
                className={`${styles.fontDin} ${styles.font20} ${
                  formatPercent(s.emergency_24h_arrival_rate) >= 90 ? styles.dataNumSuccess : ""
                }`}
              >
                {formatPercent(s.emergency_24h_arrival_rate)}%
              </p>
            </div>
            <div className={styles.dataPieIndicatorsItem}>
              <p>新店结构勘查准时率</p>
              <p
                className={`${styles.fontDin} ${styles.font20} ${
                  formatPercent(s.new_store_survey_ontime_rate) >= 90 ? styles.dataNumSuccess : ""
                }`}
              >
                {formatPercent(s.new_store_survey_ontime_rate)}%
              </p>
            </div>
            <div className={styles.dataPieIndicatorsItem}>
              <p>常规服务准时率</p>
              <p
                className={`${styles.fontDin} ${styles.font20} ${
                  formatPercent(s.routine_service_ontime_rate) >= 90 ? styles.dataNumSuccess : ""
                }`}
              >
                {formatPercent(s.routine_service_ontime_rate)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dataTemplate}>
        <div className={styles.dataTemplateTitle}>
          <div className={styles.dataTitleBox}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>智能虫害监测</p>
          </div>
        </div>
        <div className={styles.filterRow}>
          <div className={styles.mt24}>
            <CurrentDateRadio
              dateType={dateType1}
              dateRange={[form.start_date, form.end_date]}
              isCurrentDay={1}
              onChangeDate={changeDate1}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>门店</span>
            <AutoComplete
              value={storeName}
              options={storeOptions.map((o) => ({ value: o.value, label: o.value || "没有找到相关门店" }))}
              onSearch={handleStoreSearch}
              onSelect={(_v, opt: any) => {
                setStoreName(opt?.value || "")
                storeNameRef.current = opt?.value || ""
                setForm((prev) => {
                  const next = { ...prev, store_id: opt?.id ?? "" }
                  formRef.current = next
                  return next
                })
              }}
              onChange={(v) => {
                setStoreName(v)
                storeNameRef.current = v
                if (!v) {
                  setForm((prev) => {
                    const next = { ...prev, store_id: "" }
                    formRef.current = next
                    return next
                  })
                }
              }}
              placeholder="请输入门店名称"
              allowClear
              style={{ width: 200 }}
            />
          </div>
          <div className={styles.filterItem} style={{ marginRight: 20 }}>
            <span className={styles.filterTitle}>城市</span>
            <Select
              value={form.city_id || undefined}
              onChange={(v) => {
                setForm((prev) => {
                  const next = { ...prev, city_id: v ?? "" }
                  formRef.current = next
                  return next
                })
              }}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="全部"
              style={{ width: 100 }}
              options={cityList}
            />
          </div>
          <Button type="primary" shape="round" className={styles.searchBtn} onClick={loadMonitorStats}>
            查询
          </Button>
          <Button shape="round" className={styles.resetBtn} onClick={resetMonitor}>
            重置
          </Button>
        </div>
        <div className={styles.dataCategory}>
          <div className={styles.dataBar}>
            <div ref={barChartRef} className={styles.dataBarChart} style={{ width: barWidth }} />
          </div>
          <div className={styles.dataPieIndicators}>
            <p className={styles.dataPieIndicatorsTitle}>虫害事件服务标准</p>
            <div className={styles.flexCenter} style={{ marginTop: 8 }}>
              <p className={styles.color0808}>鼠类捕获：</p>
              <p className={styles.color606}>发现立即响应</p>
            </div>
            <div className={styles.flexCenter} style={{ marginTop: 8 }}>
              <p className={styles.color0808}>蟑螂发现：</p>
              <p className={styles.color606}>≥3只触发服务</p>
            </div>
            <div className={styles.flexCenter} style={{ marginTop: 8 }}>
              <p className={styles.color0808}>飞虫密度：</p>
              <p className={styles.color606}>粘板覆盖率&gt;30%</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dataTemplate}>
        <div className={styles.dataTemplateTitle}>
          <div className={styles.dataTitleBox}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>虫害事件</p>
          </div>
        </div>
        <div className={styles.filterRow}>
          <div className={styles.mt24}>
            <CurrentDateRadio
              dateType={dateType2}
              dateRange={[form1.start_date, form1.end_date]}
              isCurrentDay={1}
              onChangeDate={changeDate2}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>虫害</span>
            <Select
              value={form1.pest_category_id || undefined}
              onChange={(v) => {
                setForm1((prev) => {
                  const next = { ...prev, pest_category_id: v ?? "" }
                  form1Ref.current = next
                  return next
                })
              }}
              allowClear
              placeholder="全部"
              style={{ width: 100 }}
              options={pestType.map((x: any) => ({ label: x.text, value: x.value }))}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>处理状态</span>
            <Select
              value={form1.processing_status || undefined}
              onChange={(v) => {
                setForm1((prev) => {
                  const next = { ...prev, processing_status: v ?? "" }
                  form1Ref.current = next
                  return next
                })
              }}
              allowClear
              placeholder="全部"
              style={{ width: 100 }}
              options={disposeStatus.map((x: any) => ({ label: x.text, value: x.value }))}
            />
          </div>
          <div className={styles.filterItem} style={{ marginRight: 20 }}>
            <span className={styles.filterTitle}>识别方式</span>
            <Select
              value={form1.detection_method_id || undefined}
              onChange={(v) => {
                setForm1((prev) => {
                  const next = { ...prev, detection_method_id: v ?? "" }
                  form1Ref.current = next
                  return next
                })
              }}
              allowClear
              placeholder="全部"
              style={{ width: 130 }}
              options={recognitionMode.map((x: any) => ({ label: x.text, value: x.value }))}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>门店</span>
            <AutoComplete
              value={storeName1}
              options={storeOptions.map((o) => ({ value: o.value, label: o.value || "没有找到相关门店" }))}
              onSearch={handleStoreSearch}
              onSelect={(_v, opt: any) => {
                setStoreName1(opt?.value || "")
                storeName1Ref.current = opt?.value || ""
                setForm1((prev) => {
                  const next = { ...prev, store_id: opt?.id ?? "" }
                  form1Ref.current = next
                  return next
                })
              }}
              onChange={(v) => {
                setStoreName1(v)
                storeName1Ref.current = v
                if (!v) {
                  setForm1((prev) => {
                    const next = { ...prev, store_id: "" }
                    form1Ref.current = next
                    return next
                  })
                }
              }}
              placeholder="请输入门店名称"
              allowClear
              style={{ width: 200 }}
            />
          </div>
          <Button type="primary" shape="round" className={styles.searchBtn} onClick={searchEvents}>
            查询
          </Button>
          <Button shape="round" className={styles.resetBtn} onClick={resetEvents}>
            重置
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={tableList}
          loading={tableLoading}
          bordered
          rowKey={(r, i) => String(r.id ?? i)}
          pagination={false}
          className={styles.tables}
          scroll={{ x: 1200 }}
        />

        <div className={styles.pageClass}>
          <Pagination
            current={form1.page_no}
            pageSize={form1.page_size}
            total={form1.total}
            showSizeChanger={false}
            showTotal={(t) => `共 ${t} 条`}
            onChange={(page) => {
              setForm1((prev) => {
                const next = { ...prev, page_no: page }
                form1Ref.current = next
                return next
              })
              setTimeout(() => loadEventList(), 0)
            }}
          />
        </div>
      </div>

      <Modal
        title="查看详情"
        open={imgDialogUrls.length > 0}
        onCancel={() => setImgDialogUrls([])}
        footer={null}
        width={800}
        destroyOnClose
        styles={{ body: { maxHeight: "70vh", overflow: "auto" } }}
      >
        <Image.PreviewGroup items={imgDialogUrls}>
          <div className={styles.imgDialog}>
            {imgDialogUrls.map((src, index) => (
              <div key={index} className={styles.imgItemBox}>
                <Image width={140} height={140} src={src} style={{ objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </Image.PreviewGroup>
      </Modal>
    </div>
  )
}
