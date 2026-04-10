import { useEffect, useState, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Table, Select, Button, AutoComplete, Checkbox, message } from "antd"
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons"
import { getVisibleCityList, getVisibleStoreList, getWishdasherLastestReport } from "@/api/dishwasher"
import { formatCurrentDateTime } from "@/utils/timeFormat"
import { useAppDispatch, setRealtimeNavState } from "@/store"
import type { ColumnsType } from "antd/es/table"
import styles from "./deviceRealTimeData.module.scss"

const ABNORMAL_OPTIONS = [
  { label: "全部异常", value: -1 },
  { label: "主洗温度低", value: 5 },
  { label: "漂洗温度低", value: 6 },
  { label: "中途揭盖", value: 7 },
]

export default function DeviceRealTimeData() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [abnormalChoices, setAbnormalChoices] = useState<number[]>([])
  const [storeName, setStoreName] = useState("")
  const [storeId, setStoreId] = useState("")
  const [cityId, setCityId] = useState<string>("")
  const [cityList, setCityList] = useState<any[]>([])
  const [storeOptions, setStoreOptions] = useState<{ value: string; id: string }[]>([])
  const [updateTime, setUpdateTime] = useState("")
  const [tableData, setTableData] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState({ total: 0, pageNo: 1, pageSize: 10 })

  const storeIdRef = useRef(storeId)
  const cityIdRef = useRef(cityId)
  const abnormalRef = useRef(abnormalChoices)
  const pageRef = useRef(pageInfo)
  storeIdRef.current = storeId
  cityIdRef.current = cityId
  abnormalRef.current = abnormalChoices
  pageRef.current = pageInfo

  const getTableData = useCallback(async (pageNo?: number) => {
    const pn = pageNo ?? pageRef.current.pageNo
    setTableLoading(true)
    try {
      const choices = abnormalRef.current.includes(-1) ? [5, 6, 7] : abnormalRef.current
      const res: any = await getWishdasherLastestReport({
        // 与 dengta-pc 一致：未选时传空字符串，避免 axios 省略参数导致与 mock/后端行为不一致
        store_id: storeIdRef.current ?? "",
        city_id: cityIdRef.current ?? "",
        abnormal_choices: JSON.stringify(choices),
        page_no: pn,
        page_size: pageRef.current.pageSize,
      })
      setTableData(res?.list || [])
      setPageInfo((prev) => ({ ...prev, total: res?.total_num || 0, pageNo: pn }))
    } catch (err: any) {
      message.error(typeof err === "string" ? err : "请求失败")
    } finally {
      setUpdateTime(formatCurrentDateTime())
      setTableLoading(false)
    }
  }, [])

  const fetchCityList = async () => {
    try {
      const res: any = await getVisibleCityList({})
      setCityList(res?.items || [])
    } catch (err: any) {
      message.error(typeof err === "string" ? err : "获取城市失败")
    }
  }

  useEffect(() => {
    fetchCityList()
    getTableData(1)
  }, [getTableData])

  const onCheckChange = (checkedValues: number[]) => {
    const lastValue = checkedValues[checkedValues.length - 1]
    let next: number[]
    if (lastValue === -1) {
      next = checkedValues.includes(-1) ? [-1] : []
    } else {
      next = checkedValues.filter((v) => v !== -1)
    }
    setAbnormalChoices(next)
    setTimeout(() => {
      abnormalRef.current = next
      getTableData(1)
    }, 0)
  }

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

  const handleStoreSelect = (_value: string, option: any) => {
    setStoreName(option.value)
    setStoreId(option.id)
  }

  const query = () => getTableData(1)

  const reset = () => {
    setStoreId("")
    setStoreName("")
    setCityId("")
    setAbnormalChoices([])
    abnormalRef.current = []
    storeIdRef.current = ""
    cityIdRef.current = ""
    setTimeout(() => getTableData(1), 0)
  }

  const refreshData = async () => {
    await getTableData(1)
    message.success("刷新成功")
  }

  const toDetail = (record: any) => {
    dispatch(
      setRealtimeNavState({
        _realtimeForm: { store_id: storeId, city_id: cityId },
        _realtimeStoreName: storeName,
        _realtimeAbnormal: abnormalChoices,
      })
    )
    const order = encodeURIComponent(String(record.order_number ?? ""))
    navigate(`/userData/storeDetail?order_number=${order}`)
  }

  const columns: ColumnsType<any> = [
    {
      title: "门店",
      dataIndex: "store_name",
      width: 240,
      render: (_: any, record: any) => (
        <div style={{ cursor: "pointer" }} onClick={() => toDetail(record)}>
          <p className={styles.storeName}>{record.store_name}</p>
          <p className={styles.storeAddr}>{record.store_addr}</p>
        </div>
      ),
    },
    {
      title: "设备型号",
      dataIndex: "order_device_name",
      width: 132,
      render: (v: string) => <span className={v === "-" ? styles.noData : ""}>{v}</span>,
    },
    {
      title: "洗涤开始 - 洗涤结束",
      width: 184,
      render: (_: any, r: any) =>
        r.wash_start_time === "-" && r.wash_end_time === "-" ? (
          <span className={`${styles.numericalValue} ${styles.noData}`}>-</span>
        ) : (
          <span className={styles.numericalValue}>
            {r.wash_start_time} - {r.wash_end_time}
          </span>
        ),
    },
    {
      title: "洗涤时长",
      dataIndex: "wash_duration",
      width: 100,
      render: (v: any) => (
        <span className={`${styles.numericalValue} ${v === "-" ? styles.noData : ""}`}>
          {v !== "-" ? `${v}s` : "-"}
        </span>
      ),
    },
    {
      title: "主洗温度",
      dataIndex: "main_water_high_temperature_in_wash",
      width: 100,
      render: (v: any) => (
        <span
          className={`${styles.numericalValue} ${v !== "-" && v < 50 ? styles.red : ""} ${v === "-" ? styles.noData : ""}`}
        >
          {v !== "-" ? `${v}℃` : "-"}
        </span>
      ),
    },
    {
      title: "漂洗温度",
      dataIndex: "rinse_water_high_temperature_in_wash",
      width: 100,
      render: (v: any) => (
        <span
          className={`${styles.numericalValue} ${v !== "-" && v < 80 ? styles.red : ""} ${v === "-" ? styles.noData : ""}`}
        >
          {v !== "-" ? `${v}℃` : "-"}
        </span>
      ),
    },
    {
      title: "是否中途揭盖",
      dataIndex: "is_halfway_uncover",
      width: 128,
      render: (v: any) => (
        <span className={`${v !== "-" && v ? styles.red : ""} ${v === "-" ? styles.noData : ""}`}>
          {v === true ? "是" : v === false ? "否" : "-"}
        </span>
      ),
    },
  ]

  return (
    <div className={styles.realTimeDataContainer}>
      <div className={styles.realTimeDataTable}>
        <div className={styles.dataTitleBox}>
          <div className={styles.flexCenter}>
            <div className={styles.sideBar} />
            <p className={styles.dataTitle}>今日最近一筐洗涤数据</p>
          </div>
          <div className={styles.flexCenter}>
            <span className={styles.updateText}>更新时间：{updateTime}</span>
            <span className={styles.refreshText} onClick={refreshData}>
              刷新
              <ReloadOutlined style={{ fontSize: 18, marginLeft: 4 }} />
            </span>
          </div>
        </div>

        <div className={styles.flexCenter} style={{ marginTop: 24 }}>
          <span className={styles.aftersaleTitle}>异常门店</span>
          <Checkbox.Group
            value={abnormalChoices}
            onChange={(vals) => onCheckChange(vals as number[])}
            className={styles.checkBtnBox}
          >
            {ABNORMAL_OPTIONS.map((opt) => (
              <Checkbox key={opt.value} value={opt.value} className={styles.checkBtn}>
                {opt.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>门店</span>
            <AutoComplete
              value={storeName}
              options={storeOptions.map((s) => ({ value: s.value, id: s.id, label: s.value || "没有找到相关门店" }))}
              onSearch={handleStoreSearch}
              onSelect={handleStoreSelect}
              onChange={(v) => {
                setStoreName(v)
                if (!v) { setStoreId("") }
              }}
              placeholder="输入门店名称"
              allowClear
              style={{ width: 200 }}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>城市</span>
            <Select
              value={cityId || undefined}
              onChange={(v) => setCityId(v || "")}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="全部"
              style={{ width: 100 }}
              options={cityList.map((c: any) => ({ label: c.name, value: c.id }))}
            />
          </div>
          <div>
            <Button type="primary" shape="round" onClick={query} style={{ background: "#3867FF" }}>
              查询
            </Button>
            <Button shape="round" onClick={reset} style={{ marginLeft: 8 }}>
              重置
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          rowKey={(r) => r.order_number || r.store_id || Math.random().toString()}
          bordered
          className={styles.tables}
          pagination={false}
        />

        <div className={styles.pageClass}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>共 {pageInfo.total} 条</span>
            <Button
              size="small"
              disabled={pageInfo.pageNo <= 1}
              onClick={() => getTableData(pageInfo.pageNo - 1)}
            >
              &lt;
            </Button>
            {Array.from({ length: Math.ceil(pageInfo.total / pageInfo.pageSize) || 1 }, (_, i) => i + 1)
              .slice(
                Math.max(0, pageInfo.pageNo - 3),
                Math.min(Math.ceil(pageInfo.total / pageInfo.pageSize), pageInfo.pageNo + 2)
              )
              .map((p) => (
                <Button
                  key={p}
                  size="small"
                  type={p === pageInfo.pageNo ? "primary" : "default"}
                  onClick={() => getTableData(p)}
                  style={p === pageInfo.pageNo ? { background: "#3867FF" } : {}}
                >
                  {p}
                </Button>
              ))}
            <Button
              size="small"
              disabled={pageInfo.pageNo >= Math.ceil(pageInfo.total / pageInfo.pageSize)}
              onClick={() => getTableData(pageInfo.pageNo + 1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
