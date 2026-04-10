import { useEffect, useState, useCallback, useRef, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { Table, Select, Button, AutoComplete, Checkbox, Pagination, message, Tooltip } from "antd"
import { LockOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import CurrentDateRadio from "@/components/DateRadio/CurrentDateRadio"
import {
  getVisibleCityList,
  getVisibleStoreList,
  getFoodSafetyRiskDeatil,
} from "@/api/dishwasher"
import { store, useAppDispatch, useAppSelector, setFoodSafetyNavState } from "@/store"
import type { ColumnsType } from "antd/es/table"
import {
  getRiskLevelText,
  getRiskLevelStyle,
  dirtyGloveStorageBasketRateStyle,
  overcrowdedLayoutBasketCountRateStyle,
} from "@/views/dishwasher/utils/foodSafetyRiskHelpers"
import styles from "./foodSafetyRisk.module.scss"

const moneyFormat = (val: number | string, decimals: number) => {
  const num = Number(val)
  if (Number.isNaN(num)) return String(val)
  return num.toLocaleString("zh-CN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** 与 dengta-pc RISK_LEVEL_ENUM 顺序、文案一致 */
const RISK_LEVEL_ENUM = [
  { label: "高风险", value: 4 },
  { label: "中风险", value: 3 },
  { label: "低风险", value: 2 },
  { label: "优秀", value: 1 },
] as const

/** 与 dengta-pc abnormalChoices 一致（无「全部异常」） */
const ABNORMAL_CHOICES = [
  { label: "主洗温度低", value: 5 },
  { label: "漂洗温度低", value: 6 },
  { label: "中途揭盖率高", value: 1 },
  { label: "未规范换水", value: 3 },
  { label: "脏手套收纳", value: 8 },
  { label: "摆筐过密", value: 9 },
]

const defaultReqs = () => ({
  store_id: "",
  city_id: "",
  start_date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  abnormal_choices: [] as number[],
  store_risk_levels: [] as number[],
})

function LockHeader({ children }: { children: ReactNode }) {
  return (
    <span>
      <LockOutlined style={{ marginRight: 4, color: "#909399" }} />
      {children}
    </span>
  )
}

export default function FoodSafetyRisk() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isIntelligentWashUser = useAppSelector((s) => s.app.isIntelligentWashUser === true)

  const [hydrated, setHydrated] = useState(false)
  const [storeName, setStoreName] = useState("")
  const [storeOptions, setStoreOptions] = useState<{ value: string; id: string }[]>([])
  const [reqs, setReqs] = useState(defaultReqs)
  const [dateType, setDateType] = useState(2)
  const [cityMap, setCityMap] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState({ total: 0, pageNo: 1, pageSize: 10 })

  const reqsRef = useRef(reqs)
  const pageRef = useRef(pageInfo)
  const dateTypeRef = useRef(dateType)
  reqsRef.current = reqs
  pageRef.current = pageInfo
  dateTypeRef.current = dateType

  useEffect(() => {
    reqsRef.current = reqs
  }, [reqs])

  useEffect(() => {
    const st = store.getState().app
    const sp = new URLSearchParams(window.location.search)
    if (st._foodSafetyReqs) {
      const fr = st._foodSafetyReqs
      setReqs({
        ...fr,
        abnormal_choices: [...fr.abnormal_choices],
        store_risk_levels: [...(fr.store_risk_levels ?? [])],
      })
      setStoreName(st._foodSafetyStoreName)
      const dt = st._foodSafetyDateType
      setDateType(dt === 9 ? 9 : dt)
    } else if (sp.get("dateType") && sp.get("start_date") && sp.get("end_date")) {
      const dt = Number(sp.get("dateType"))
      setDateType(dt === 9 ? 9 : dt)
      let levels: number[] = []
      const raw = sp.get("riskLevel")
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          levels = Array.isArray(parsed) ? parsed : []
        } catch {
          levels = []
        }
      }
      setReqs((prev) => ({
        ...prev,
        start_date: sp.get("start_date")!,
        end_date: sp.get("end_date")!,
        store_risk_levels: levels,
      }))
    }
    setHydrated(true)
  }, [])

  const search = useCallback(async () => {
    const r = reqsRef.current
    const p = pageRef.current
    setTableLoading(true)
    setTableData([])
    const { store_risk_levels, ...rest } = r
    const params = {
      ...rest,
      page_no: p.pageNo,
      page_size: p.pageSize,
      abnormal_choices: JSON.stringify(r.abnormal_choices),
      store_risk_level: store_risk_levels?.length ? store_risk_levels[0] : null,
    }
    try {
      const res: any = await getFoodSafetyRiskDeatil(params)
      setTableData(res?.list || [])
      setPageInfo((prev) => ({ ...prev, total: res?.total_num || 0 }))
    } catch (err: any) {
      message.error(typeof err === "string" ? err : "请求失败")
      setTableData([])
    } finally {
      setTableLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    getVisibleCityList({})
      .then((res: any) => setCityMap(res?.items || []))
      .catch((err: any) => message.error(typeof err === "string" ? err : "获取城市失败"))
  }, [hydrated])

  useEffect(() => {
    if (!hydrated) return
    search()
  }, [hydrated, reqs.start_date, reqs.end_date, search])

  const handleStoreSearch = async (value: string) => {
    if (!value) {
      setStoreOptions([])
      return
    }
    try {
      const res: any = await getVisibleStoreList({})
      const list = (res?.list || [])
        .filter((item: any) => item.name.includes(value))
        .map((item: any) => ({ value: item.name, id: item.id }))
      setStoreOptions(list.length ? list : [{ value: "没有找到相关门店", id: "" }])
    } catch {
      setStoreOptions([])
    }
  }

  const handleStoreSelect = (_value: string, option: { value?: string; id?: string }) => {
    setStoreName(option.value || "")
    setReqs((prev) => ({ ...prev, store_id: option.id || "" }))
  }

  const onAbnormalChange = (vals: number[]) => {
    setReqs((prev) => ({ ...prev, abnormal_choices: vals }))
    reqsRef.current = { ...reqsRef.current, abnormal_choices: vals }
    setPageInfo((prev) => ({ ...prev, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const onRiskLevelsChange = (vals: number[]) => {
    const v = vals as number[]
    const nextLevels = v.length === 0 ? [] : [v[v.length - 1]!]
    setReqs((prev) => ({ ...prev, store_risk_levels: nextLevels }))
    reqsRef.current = { ...reqsRef.current, store_risk_levels: nextLevels }
    setPageInfo((prev) => ({ ...prev, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const query = () => {
    reqsRef.current = reqs
    setPageInfo((prev) => ({ ...prev, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const reset = () => {
    const next = {
      ...defaultReqs(),
    }
    setStoreName("")
    setDateType(2)
    dateTypeRef.current = 2
    setReqs(next)
    reqsRef.current = next
    setPageInfo((prev) => ({ ...prev, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const changeDate = (dates: { type: number; start_date: string; end_date: string }) => {
    setDateType(dates.type)
    dateTypeRef.current = dates.type
    setReqs((prev) => ({
      ...prev,
      start_date: dates.start_date,
      end_date: dates.end_date,
    }))
    reqsRef.current = {
      ...reqsRef.current,
      start_date: dates.start_date,
      end_date: dates.end_date,
    }
    setPageInfo((prev) => ({ ...prev, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
  }

  const toDetail = (info: any) => {
    dispatch(
      setFoodSafetyNavState({
        _foodSafetyReqs: { ...reqsRef.current },
        _foodSafetyStoreName: storeName,
        _foodSafetyDateType: dateTypeRef.current,
      })
    )
    const dt = dateTypeRef.current
    const q = new URLSearchParams({
      order_number: String(info.order_number ?? ""),
      order_id: String(info.order_id ?? ""),
      start_date: reqsRef.current.start_date,
      end_date: reqsRef.current.end_date,
      dateType: String(dt === 9 ? 4 : dt),
    })
    navigate(`/userData/storeDetail?${q.toString()}`)
  }

  const columns: ColumnsType<any> = [
    {
      title: "门店",
      width: 220,
      render: (_: any, record: any) => (
        <div style={{ cursor: "pointer" }} onClick={() => toDetail(record)}>
          <p className={styles.storeName}>{record.store_name}</p>
          <p className={styles.storeAddr}>{record.store_addr}</p>
        </div>
      ),
    },
    {
      title: "设备型号",
      width: 84,
      dataIndex: "order_device_name",
      render: (v: string) => <span className={v === "-" ? styles.noData : styles.ft16}>{v}</span>,
    },
    {
      title: "使用天数",
      width: 68,
      render: (_: any, record: any) => (
        <span>
          <span
            className={`${styles.numericalValue} ${record.real_used_days === "-" ? styles.noData : ""}`}
          >
            {record.real_used_days !== "-" ? moneyFormat(record.real_used_days || 0, 2) : "-"}
          </span>
          {record.real_used_days !== "-" && <span className={styles.ft16}> 天</span>}
        </span>
      ),
    },
    {
      title: "门店评估",
      width: 84,
      render: (_: any, record: any) => (
        <span
          className={`${styles.numericalValue} ${
            record.store_risk_level === "-" || !record.store_risk_level ? styles.noData : ""
          }`}
          style={getRiskLevelStyle(record.store_risk_level)}
        >
          {getRiskLevelText(record.store_risk_level)}
        </span>
      ),
    },
    {
      title: "日均洗涤筐数",
      width: 84,
      render: (_: any, record: any) => (
        <span>
          <span className={`${styles.numericalValue} ${record.avg_basket_count === "-" ? styles.noData : ""}`}>
            {record.avg_basket_count !== "-" ? moneyFormat(record.avg_basket_count, 0) : "-"}
          </span>
          {record.avg_basket_count !== "-" && <span className={styles.ft16}> 筐</span>}
        </span>
      ),
    },
    {
      title: "平均主洗温度",
      width: 84,
      render: (_: any, record: any) => (
        <span
          className={`${styles.numericalValue} ${
            record.cleanse_water_temperature_avg !== "-" && record.cleanse_water_temperature_avg < 50
              ? styles.red
              : ""
          } ${record.cleanse_water_temperature_avg === "-" ? styles.noData : ""}`}
        >
          {record.cleanse_water_temperature_avg !== "-"
            ? `${record.cleanse_water_temperature_avg}℃`
            : "-"}
        </span>
      ),
    },
    {
      title: "平均漂洗温度",
      width: 84,
      render: (_: any, record: any) => (
        <span
          className={`${styles.numericalValue} ${
            record.rinse_water_temperature_avg !== "-" && record.rinse_water_temperature_avg < 80
              ? styles.red
              : ""
          } ${record.rinse_water_temperature_avg === "-" ? styles.noData : ""}`}
        >
          {record.rinse_water_temperature_avg !== "-"
            ? `${record.rinse_water_temperature_avg}℃`
            : "-"}
        </span>
      ),
    },
    {
      title: "中途揭盖率",
      width: 84,
      render: (_: any, record: any) => (
        <span
          className={`${styles.numericalValue} ${
            record.halfway_uncover_rate !== "-" && record.halfway_uncover_rate > 5 ? styles.red : ""
          } ${record.halfway_uncover_rate === "-" ? styles.noData : ""}`}
        >
          {record.halfway_uncover_rate !== "-" ? `${record.halfway_uncover_rate}%` : "-"}
        </span>
      ),
    },
    {
      title: "未规范换水",
      width: 84,
      render: (_: any, record: any) => (
        <span>
          <span
            className={`${styles.numericalValue} ${
              record.not_change_water_days !== "-" && record.not_change_water_days > 1 ? styles.red : ""
            } ${record.not_change_water_days === "-" ? styles.noData : ""}`}
          >
            {record.not_change_water_days}
          </span>
          {record.not_change_water_days !== "-" && (
            <span
              className={`${styles.ft16} ${record.not_change_water_days > 1 ? styles.red : ""}`}
            >
              {" "}
              天
            </span>
          )}
        </span>
      ),
    },
    {
      title: (
        <Tooltip title="X3 Pro/Ultra版" placement="bottom">
          <span>
            <LockHeader>脏手套收纳</LockHeader>
          </span>
        </Tooltip>
      ),
      width: 84,
      render: (_: any, record: any) => {
        const c = dirtyGloveStorageBasketRateStyle(
          record.dirty_glove_stored_days,
          record.real_used_days,
        )
        return (
          <span>
            <span
              className={`${styles.numericalValue} ${record.dirty_glove_stored_days === "-" ? styles.noData : ""}`}
              style={c ? { color: c } : undefined}
            >
              {record.dirty_glove_stored_days}
            </span>
            {record.dirty_glove_stored_days !== "-" && (
              <span className={styles.ft16} style={c ? { color: c } : undefined}>
                {" "}
                天
              </span>
            )}
          </span>
        )
      },
    },
    {
      title: (
        <Tooltip title="X3 Pro/Ultra版" placement="bottom">
          <span>
            <LockHeader>摆筐过密率</LockHeader>
          </span>
        </Tooltip>
      ),
      width: 84,
      render: (_: any, record: any) => {
        const c = overcrowdedLayoutBasketCountRateStyle(record.overcrowded_layout_basket_count_rate)
        return (
          <span
            className={`${styles.numericalValue} ${
              record.overcrowded_layout_basket_count_rate === "-" ? styles.noData : ""
            }`}
            style={c ? { color: c } : undefined}
          >
            {record.overcrowded_layout_basket_count_rate !== "-"
              ? `${record.overcrowded_layout_basket_count_rate}%`
              : "-"}
          </span>
        )
      },
    },
  ]

  return (
    <div className={styles.foodSafetyRiskContent}>
      <div className={styles.abnormalDataTable}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>食安风险监测</p>
        </div>

        <div>
          <div className={styles.filterBlock}>
            <span className={styles.abnormalTitle}>门店评估</span>
            <Checkbox.Group
              value={reqs.store_risk_levels}
              onChange={(vals) => onRiskLevelsChange(vals as number[])}
              className={styles.checkBtnBox}
            >
              {RISK_LEVEL_ENUM.map((item) => (
                <Checkbox key={item.value} value={item.value} className={styles.checkBtn}>
                  {item.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>

          <div className={styles.filterBlock}>
            <span className={styles.abnormalTitle}>门店风险项</span>
            <Checkbox.Group
              value={reqs.abnormal_choices}
              onChange={(vals) => onAbnormalChange(vals as number[])}
              className={styles.checkBtnBox}
            >
              {ABNORMAL_CHOICES.map((item) => (
                <Checkbox
                  key={item.value}
                  value={item.value}
                  disabled={!isIntelligentWashUser && (item.value === 8 || item.value === 9)}
                  className={styles.checkBtn}
                >
                  {item.value === 8 || item.value === 9 ? (
                    <span>
                      <LockOutlined style={{ marginRight: 4, color: "#909399" }} />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>

          <div className={styles.filterRow}>
            <div className={styles.dateRadioWrap}>
              <CurrentDateRadio
                dateType={dateType}
                dateRange={[reqs.start_date, reqs.end_date]}
                isCurrentDay={1}
                onChangeDate={changeDate}
              />
            </div>
            <div className={styles.filterItem}>
              <span className={styles.filterTitle}>门店</span>
              <AutoComplete
                value={storeName}
                options={storeOptions.map((s) => ({
                  value: s.value,
                  label: s.value || "没有找到相关门店",
                  id: s.id,
                }))}
                onSearch={handleStoreSearch}
                onSelect={(_v, opt) => handleStoreSelect(_v, opt as { value?: string; id?: string })}
                onChange={(v) => {
                  setStoreName(v)
                  if (!v) setReqs((prev) => ({ ...prev, store_id: "" }))
                }}
                placeholder="输入门店名称"
                allowClear
                style={{ width: 200 }}
              />
            </div>
            <div className={styles.filterItem}>
              <span className={styles.filterTitle}>城市</span>
              <Select
                value={reqs.city_id || undefined}
                onChange={(v) => setReqs((prev) => ({ ...prev, city_id: v || "" }))}
                allowClear
                showSearch
                optionFilterProp="label"
                placeholder="请选择"
                style={{ width: 100 }}
                options={cityMap.map((c: any) => ({ label: c.name, value: c.id }))}
              />
            </div>
            <div className={styles.filterActions}>
              <Button type="primary" shape="round" onClick={query} className={styles.searchBtn}>
                查询
              </Button>
              <Button shape="round" onClick={reset} className={styles.resetBtn}>
                重置
              </Button>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={tableData}
            loading={tableLoading}
            rowKey={(r, i) => String(r.order_number ?? r.order_id ?? r.store_id ?? i)}
            bordered
            className={styles.tables}
            pagination={false}
            scroll={{ x: 1400 }}
          />

          <div className={styles.pageClass}>
            <Pagination
              current={pageInfo.pageNo}
              pageSize={pageInfo.pageSize}
              total={pageInfo.total}
              showSizeChanger={false}
              showTotal={(t) => `共 ${t} 条`}
              onChange={(page) => {
                setPageInfo((prev) => ({ ...prev, pageNo: page }))
                pageRef.current = { ...pageRef.current, pageNo: page }
                setTimeout(() => search(), 0)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
