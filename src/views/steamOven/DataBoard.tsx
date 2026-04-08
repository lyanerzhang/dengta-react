import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, createSearchParams } from "react-router-dom"
import {
  Tooltip,
  Table,
  Button,
  AutoComplete,
  Select,
  Pagination,
  message,
} from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import type { ColumnsType } from "antd/es/table"
import DateRadio from "@/components/DateRadio"
import { getCombiovenRunningOverview, getCombiovenRunningDetail } from "@/api/steamOven"
import { getUsageVisibleStoreList, getUsageVisibleCityList } from "@/api/public"
import AbnormalCountDisplay from "./AbnormalCountDisplay"
import styles from "./dataBoard.module.scss"

const ABNORMAL_OPTIONS = [
  { label: "全部异常", value: -1 },
  { label: "空载加热超时", value: 1 },
  { label: "烹饪中途开门超时", value: 2 },
  { label: "修改门店菜单", value: 3 },
  { label: "未规范清洁", value: 4 },
  { label: "未联网", value: 5 },
] as const

function moneyFormat(val: number | string, decimals = 0) {
  const num = Number(val)
  if (Number.isNaN(num)) return String(val)
  return num.toLocaleString("zh-CN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function buildAbnormalParam(choices: number[]): string {
  const all = ABNORMAL_OPTIONS.map((x) => x.value).filter((v) => v !== -1) as number[]
  const raw = choices.includes(-1) ? all : choices
  return JSON.stringify(raw.filter((x) => x !== -1))
}

type Row = {
  device_id?: string
  store_id?: string | number
  store_name: string
  store_address: string
  used_days: number | string
  cooking_duration: number | string
  energy_consumption: number | string
  no_load_heating_timeout_cnt: number | string
  cooking_door_open_timeout_cnt: number | string
  menu_modification_cnt: number | string
  non_standard_cleaning_cnt: number | string
}

export default function SteamOvenDataBoard() {
  const navigate = useNavigate()
  const [dateType, setDateType] = useState(2)
  const [reqs, setReqs] = useState(() => ({
    start_date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    store_id: "" as string,
    city_id: undefined as string | undefined,
    abnormal_choices: [] as number[],
  }))
  const [storeName, setStoreName] = useState("")
  const [storeOptions, setStoreOptions] = useState<{ value: string; id: string }[]>([])
  const [cityMap, setCityMap] = useState<{ id: string; name: string }[]>([])
  const [overviewData, setOverviewData] = useState<any>(null)
  const [dataList, setDataList] = useState<Row[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState({ page_no: 1, page_size: 10, total: 0 })

  const reqsRef = useRef(reqs)
  const pageRef = useRef(pageInfo)
  reqsRef.current = reqs
  pageRef.current = pageInfo

  const fetchOverview = useCallback(async () => {
    const r = reqsRef.current
    try {
      const res = await getCombiovenRunningOverview({
        start_date: r.start_date,
        end_date: r.end_date,
      })
      setOverviewData(res ?? null)
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "加载总览失败")
    }
  }, [])

  const fetchDetail = useCallback(async (page_no: number) => {
    const r = reqsRef.current
    const pz = pageRef.current.page_size
    setTableLoading(true)
    try {
      const res: any = await getCombiovenRunningDetail({
        start_date: r.start_date,
        end_date: r.end_date,
        abnormal_choices: buildAbnormalParam(r.abnormal_choices),
        store_id: r.store_id,
        city_id: r.city_id ?? "",
        page_no,
        page_size: pz,
      })
      const items = res?.items ?? []
      const total = res?.total ?? 0
      setDataList(items)
      setPageInfo((prev) => {
        const next = { ...prev, page_no, total }
        pageRef.current = next
        return next
      })
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "加载明细失败")
    } finally {
      setTableLoading(false)
    }
  }, [])

  useEffect(() => {
    getUsageVisibleCityList({})
      .then((res: any) => setCityMap((res?.list ?? []).map((c: any) => ({ id: String(c.id), name: c.name }))))
      .catch((e: any) => message.error(typeof e === "string" ? e : "获取城市失败"))
  }, [])

  useEffect(() => {
    fetchOverview()
    fetchDetail(1)
  }, [reqs.start_date, reqs.end_date, fetchOverview, fetchDetail])

  const changeDate = (dates: { type: number; start_date: string; end_date: string }) => {
    setDateType(dates.type)
    setReqs((prev) => ({
      ...prev,
      start_date: dates.start_date,
      end_date: dates.end_date,
    }))
    setPageInfo((prev) => {
      const next = { ...prev, page_no: 1 }
      pageRef.current = next
      return next
    })
  }

  const handleStoreSearch = async (value: string) => {
    if (!value) {
      setStoreOptions([])
      return
    }
    try {
      const res: any = await getUsageVisibleStoreList({})
      const list = (res?.list ?? [])
        .filter((item: any) => String(item.name).includes(value))
        .map((item: any) => ({ value: item.name, id: String(item.id) }))
      setStoreOptions(list.length ? list : [{ value: "", id: "" }])
    } catch (e: any) {
      message.error(typeof e === "string" ? e : "搜索门店失败")
      setStoreOptions([])
    }
  }

  const toggleAbnormal = (val: number) => {
    let nextChoices: number[]
    if (val === -1) {
      nextChoices = reqs.abnormal_choices.includes(-1) ? [] : [-1]
    } else {
      let next = reqs.abnormal_choices.filter((x) => x !== -1)
      if (next.includes(val)) next = next.filter((x) => x !== val)
      else next = [...next, val]
      nextChoices = next
    }
    setReqs((prev) => ({ ...prev, abnormal_choices: nextChoices }))
    setPageInfo((prev) => {
      const n = { ...prev, page_no: 1 }
      pageRef.current = n
      return n
    })
    setTimeout(() => fetchDetail(1), 0)
  }

  const handleQuery = () => {
    setPageInfo((prev) => {
      const n = { ...prev, page_no: 1 }
      pageRef.current = n
      return n
    })
    setTimeout(() => fetchDetail(1), 0)
  }

  const handleReset = () => {
    setStoreName("")
    setReqs((prev) => ({
      ...prev,
      store_id: "",
      city_id: undefined,
      abnormal_choices: [],
    }))
    setPageInfo((prev) => {
      const n = { ...prev, page_no: 1 }
      pageRef.current = n
      return n
    })
    setTimeout(() => fetchDetail(1), 0)
  }

  const toDetail = (row: Row) => {
    navigate({
      pathname: "/userData/steamOvenStoreDetail",
      search: createSearchParams({
        storeName: row.store_name ?? "",
        storeAddr: row.store_address ?? "",
        deviceId: String(row.device_id ?? ""),
      }).toString(),
    })
  }

  const columns: ColumnsType<Row> = [
    {
      title: "门店",
      width: 274,
      render: (_, row) => (
        <>
          <p className={styles.storeName} onClick={() => toDetail(row)}>
            {row.store_name}
          </p>
          <p className={styles.storeAddr}>{row.store_address}</p>
        </>
      ),
    },
    {
      title: "使用天数",
      width: 110,
      render: (_, row) => (
        <>
          <span className={`${styles.dinNumber} ${row.used_days === "-" ? styles.noData : ""}`}>
            {row.used_days !== "-" ? row.used_days : "-"}
          </span>
          {row.used_days !== "-" && <span className={styles.ft16}> 天</span>}
        </>
      ),
    },
    {
      title: "日均烹饪时长",
      width: 110,
      render: (_, row) => (
        <>
          <span
            className={`${styles.dinNumber} ${row.cooking_duration === "-" ? styles.noData : ""}`}
          >
            {row.cooking_duration !== "-" ? moneyFormat(row.cooking_duration, 2) : "-"}
          </span>
          {row.cooking_duration !== "-" && <span className={styles.ft16}> 小时</span>}
        </>
      ),
    },
    {
      title: "日均耗电(kW·h)",
      width: 110,
      render: (_, row) => (
        <span
          className={`${styles.dinNumber} ${row.energy_consumption === "-" ? styles.noData : ""}`}
        >
          {row.energy_consumption !== "-" ? moneyFormat(row.energy_consumption, 2) : "-"}
        </span>
      ),
    },
    {
      title: "空载加热超时",
      width: 110,
      render: (_, row) => <AbnormalCountDisplay count={row.no_load_heating_timeout_cnt} />,
    },
    {
      title: "烹饪中途开门超时",
      width: 110,
      render: (_, row) => <AbnormalCountDisplay count={row.cooking_door_open_timeout_cnt} />,
    },
    {
      title: "修改门店菜单",
      width: 110,
      render: (_, row) => <AbnormalCountDisplay count={row.menu_modification_cnt} />,
    },
    {
      title: "未规范清洁",
      width: 110,
      render: (_, row) => <AbnormalCountDisplay count={row.non_standard_cleaning_cnt} />,
    },
  ]

  const tipContent = (
    <div style={{ width: 294, fontSize: 14, lineHeight: "18px", textAlign: "left" }}>
      平台统计的「异常」包含以下四类情况：
      <br />
      1. 空载加热超时：设备没有进行烹饪但仍加热超过 5 分钟；
      <br />
      2. 烹饪中途开门超时：菜品没有完成制作的情况下，舱门打开超过 1分30秒；
      <br />
      3.
      修改门店菜单：门店人员在设备端修改了菜单（新增菜单、删除菜单、新增菜品、调整烹饪时间、上下架菜品）；
      <br />
      4. 未规范清洁：设备在使用后清洁不符合要求，包含未进行清洁和清洁异常中断。
      <br />
    </div>
  )

  return (
    <div className={styles.dataBoardContent}>
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
          <p className={styles.dataTitle}>
            数据总览
            <Tooltip placement="bottomLeft" color="#303133" title={tipContent}>
              <InfoCircleOutlined className={styles.tipIcon} />
            </Tooltip>
          </p>
        </div>
        <div className={styles.dataCategory}>
          {[
            { title: "蒸烤箱合作门店数", key: "cooperating_count" },
            { title: "空载加热超时门店数", key: "no_load_heating_timeout_cnt" },
            { title: "烹饪中途开门超时门店数", key: "cooking_door_open_timeout_cnt" },
            { title: "修改菜单门店数", key: "menu_modification_cnt" },
            { title: "未规范清洁门店数", key: "non_standard_cleaning_cnt" },
            { title: "未联网门店数", key: "unconnected_count" },
          ].map(({ title, key }) => (
            <div key={key} className={styles.data}>
              <div className={styles.title}>{title}</div>
              <div className={styles.dataNum}>{moneyFormat(overviewData?.[key] ?? 0)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dataTableBox}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>数据明细</p>
        </div>

        <div className={styles.mutiCheckBox}>
          <span className={styles.label}>异常事件</span>
          <div className={styles.checkBtnBox}>
            {ABNORMAL_OPTIONS.map((item) => {
              const active = reqs.abnormal_choices.includes(item.value)
              return (
                <button
                  key={item.value}
                  type="button"
                  className={`${styles.checkBtn} ${active ? styles.checkBtnActive : ""}`}
                  onClick={() => toggleAbnormal(item.value)}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>门店</span>
            <AutoComplete
              value={storeName}
              options={storeOptions.map((s) => ({
                value: s.value,
                label: s.value || "没有找到相关门店",
              }))}
              onSearch={handleStoreSearch}
              onSelect={(_v, opt: any) => {
                setStoreName(opt?.value || "")
                setReqs((prev) => ({ ...prev, store_id: opt?.id ?? "" }))
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
              showSearch
              allowClear
              placeholder="请选择"
              style={{ width: 100 }}
              value={reqs.city_id}
              onChange={(v) => setReqs((prev) => ({ ...prev, city_id: v }))}
              options={cityMap.map((c) => ({ label: c.name, value: c.id }))}
              optionFilterProp="label"
            />
          </div>
          <Button type="primary" shape="round" className={styles.searchBtn} onClick={handleQuery}>
            查询
          </Button>
          <Button shape="round" className={styles.resetBtn} onClick={handleReset}>
            重置
          </Button>
        </div>

        <Table<Row>
          className={styles.tables}
          columns={columns}
          dataSource={dataList}
          loading={tableLoading}
          bordered
          rowKey={(r, i) => `${r.device_id ?? r.store_id ?? i}`}
          pagination={false}
          scroll={{ x: 1200 }}
        />

        <div className={styles.pageClass}>
          <Pagination
            current={pageInfo.page_no}
            pageSize={pageInfo.page_size}
            total={pageInfo.total}
            showSizeChanger={false}
            showTotal={(t) => `共 ${t} 条`}
            onChange={(page) => fetchDetail(page)}
          />
        </div>
      </div>
    </div>
  )
}
