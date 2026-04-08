import { useEffect, useState, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Table, Select, Button, AutoComplete, Checkbox, Pagination, message, Tooltip } from "antd"
import { LockOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import CurrentDateRadio from "@/components/DateRadio/CurrentDateRadio"
import { getVisibleCityList, getVisibleStoreList, getEnergyDetail } from "@/api/dishwasher"
import { useAppStore } from "@/store"
import type { ColumnsType } from "antd/es/table"
import { powerConsumptionAvgStyle, tablewareUnderPlacedRateStyle } from "@/views/dishwasher/utils/energyHelpers"
import styles from "./energyConsumption.module.scss"

const moneyFormat = (val: number | string, decimals: number) => {
  const num = Number(val)
  if (Number.isNaN(num)) return String(val)
  return num.toLocaleString("zh-CN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

const ABNORMAL_CHOICES = [
  { label: "筐均耗电量高", value: 2 },
  { label: "筐均耗电量低", value: 11 },
  { label: "摆筐过少", value: 10 },
]

const defaultReqs = () => ({
  store_id: "",
  city_id: "",
  start_date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  abnormal_choices: [] as number[],
})

export default function EnergyConsumption() {
  const navigate = useNavigate()
  const isIntelligentWashUser = useAppStore((s) => s.isIntelligentWashUser === true)

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
    const sp = new URLSearchParams(window.location.search)
    if (sp.get("dateType") && sp.get("start_date") && sp.get("end_date")) {
      const dt = Number(sp.get("dateType"))
      setDateType(dt === 9 ? 9 : dt)
      let abnormal: number[] = []
      const raw = sp.get("abnormalChoices")
      if (raw) {
        try {
          abnormal = JSON.parse(raw)
        } catch {
          abnormal = []
        }
      }
      setReqs((prev) => ({
        ...prev,
        start_date: sp.get("start_date")!,
        end_date: sp.get("end_date")!,
        abnormal_choices: Array.isArray(abnormal) ? abnormal : [],
      }))
    }
    setHydrated(true)
  }, [])

  const search = useCallback(async () => {
    const r = reqsRef.current
    const p = pageRef.current
    setTableLoading(true)
    setTableData([])
    const params = {
      ...r,
      page_no: p.pageNo,
      page_size: p.pageSize,
      abnormal_choices: JSON.stringify(r.abnormal_choices),
    }
    try {
      const res: any = await getEnergyDetail(params)
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

  const onAbnormalChange = (vals: number[]) => {
    const prev = reqsRef.current.abnormal_choices
    let next = [...(vals as number[])]
    if (next.includes(2) && next.includes(11)) {
      const added = next.filter((x) => !prev.includes(x))
      if (added.includes(2)) next = next.filter((x) => x !== 11)
      else if (added.includes(11)) next = next.filter((x) => x !== 2)
      else next = next.filter((x) => x !== 11)
    }
    setReqs((prevState) => ({ ...prevState, abnormal_choices: next }))
    reqsRef.current = { ...reqsRef.current, abnormal_choices: next }
    setPageInfo((p) => ({ ...p, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const query = () => {
    setPageInfo((p) => ({ ...p, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const reset = () => {
    const next = defaultReqs()
    setStoreName("")
    setDateType(2)
    dateTypeRef.current = 2
    setReqs(next)
    reqsRef.current = next
    setPageInfo((p) => ({ ...p, pageNo: 1 }))
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
    setPageInfo((p) => ({ ...p, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
  }

  const toDetail = (info: any) => {
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
      width: 200,
      render: (_: any, record: any) => (
        <div style={{ cursor: "pointer" }} onClick={() => toDetail(record)}>
          <p className={styles.storeName}>{record.store_name}</p>
          <p className={styles.storeAddr}>{record.store_addr}</p>
        </div>
      ),
    },
    {
      title: "设备型号",
      width: 112,
      dataIndex: "order_device_name",
      render: (v: string) => (
        <span className={v === "-" ? styles.noData : styles.ft16}>{v}</span>
      ),
    },
    {
      title: "使用天数",
      width: 112,
      render: (_: any, record: any) => (
        <span>
          <span className={`${styles.numericalValue} ${record.real_used_days === "-" ? styles.noData : ""}`}>
            {record.real_used_days !== "-" ? moneyFormat(record.real_used_days, 0) : "-"}
          </span>
          {record.real_used_days !== "-" && <span className={styles.ft16}> 天</span>}
        </span>
      ),
    },
    {
      title: "总耗电 (kW·h)",
      width: 112,
      render: (_: any, record: any) => (
        <span className={`${styles.numericalValue} ${record.total_power_consumption === "-" ? styles.noData : ""}`}>
          {record.total_power_consumption !== "-" ? moneyFormat(record.total_power_consumption, 2) : "-"}
        </span>
      ),
    },
    {
      title: "筐均耗电 (kW·h)",
      width: 112,
      render: (_: any, record: any) => (
        <span
          className={`${styles.numericalValue} ${record.power_consumption_avg === "-" ? styles.noData : ""}`}
          style={{
            color: powerConsumptionAvgStyle(Number(record.device_type), record.power_consumption_avg) || undefined,
          }}
        >
          {record.power_consumption_avg}
        </span>
      ),
    },
    {
      title: "总洗涤筐数",
      width: 112,
      render: (_: any, record: any) => (
        <span>
          <span className={`${styles.numericalValue} ${record.basket_count_total === "-" ? styles.noData : ""}`}>
            {record.basket_count_total !== "-" ? moneyFormat(record.basket_count_total, 0) : "-"}
          </span>
          {record.basket_count_total !== "-" && <span className={styles.ft16}> 筐</span>}
        </span>
      ),
    },
    {
      title: "日均洗涤筐数",
      width: 112,
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
      title: (
        <Tooltip title="X3 Pro/Ultra版" placement="bottom">
          <span>
            <LockOutlined style={{ marginRight: 4, color: "#909399" }} />
            摆筐过少率
          </span>
        </Tooltip>
      ),
      width: 112,
      render: (_: any, record: any) => {
        const raw = record.underfilled_layout_basket_count_rate
        const isNoData = raw === "-" || raw === undefined || raw === null || raw === ""
        const c = tablewareUnderPlacedRateStyle(isNoData ? "-" : raw)
        return (
          <span
            className={`${styles.numericalValue} ${isNoData ? styles.noData : ""}`}
            style={c ? { color: c } : undefined}
          >
            {!isNoData ? `${raw}%` : "-"}
          </span>
        )
      },
    },
  ]

  return (
    <div className={styles.energyConsumptionContent}>
      <div className={styles.abnormalDataTable}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>能耗数据</p>
        </div>

        <div>
          <div className={styles.filterBlock}>
            <span className={styles.abnormalTitle}>筛选</span>
            <Checkbox.Group
              value={reqs.abnormal_choices}
              onChange={(v) => onAbnormalChange(v as number[])}
              className={styles.checkBtnBox}
            >
              {ABNORMAL_CHOICES.map((item) => (
                <Checkbox
                  key={item.value}
                  value={item.value}
                  disabled={!isIntelligentWashUser && item.value === 10}
                  className={styles.checkBtn}
                >
                  {item.value === 10 ? (
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
                onSelect={(_v, opt) => {
                  setStoreName((opt as { value?: string }).value || "")
                  setReqs((prev) => ({ ...prev, store_id: (opt as { id?: string }).id || "" }))
                }}
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
            rowKey={(r, i) => String(r.order_number ?? r.order_id ?? i)}
            bordered
            className={styles.tables}
            pagination={false}
            scroll={{ x: 1200 }}
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
