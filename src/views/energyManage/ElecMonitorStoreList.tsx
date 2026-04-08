import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Table, Input, Select, Button, Pagination, Tooltip, message } from "antd"
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { getStoreDeviceEnergyOverview } from "@/api/energyManage"
import styles from "./elecMonitorStoreList.module.scss"

const MONITOR_STATUS_OPTS = [
  { value: -1, label: "全部" },
  { value: 1, label: "正在监测" },
  { value: 2, label: "历史监测" },
]

type Row = {
  store_name: string
  store_addr: string
  store_id: string | number
  monitor_status: number
  monitor_duration: number
  monitor_device_quantity: number
}

export default function ElecMonitorStoreList() {
  const navigate = useNavigate()
  const [storeKeyword, setStoreKeyword] = useState("")
  const [monitorStatus, setMonitorStatus] = useState<number>(1)
  const [tableData, setTableData] = useState<Row[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState({ page_no: 1, page_size: 10, total: 0 })

  const fetchList = useCallback(
    async (opts?: { page_no?: number; store_keyword?: string; monitor_status?: number | null }) => {
      const page_no = opts?.page_no ?? pageInfo.page_no
      const kw = opts?.store_keyword ?? storeKeyword
      const ms = opts?.monitor_status ?? monitorStatus
      setTableLoading(true)
      try {
        const res: any = await getStoreDeviceEnergyOverview({
          store_keyword: kw,
          monitor_status: ms === -1 || ms == null ? "" : ms,
          page_no,
          page_size: pageInfo.page_size,
        })
        setTableData(res?.list ?? [])
        setPageInfo((prev) => ({ ...prev, page_no, total: res?.total_num ?? 0 }))
      } catch (e: any) {
        message.error(typeof e === "string" ? e : "加载失败")
      } finally {
        setTableLoading(false)
      }
    },
    [monitorStatus, pageInfo.page_no, pageInfo.page_size, storeKeyword],
  )

  useEffect(() => {
    fetchList({ page_no: 1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 与 PC `query()` 首次进入一致
  }, [])

  /** 与 PC「查询」按钮一致：不重置页码 */
  const handleSearch = () => {
    fetchList()
  }

  const handleReset = () => {
    setStoreKeyword("")
    setMonitorStatus(1)
    fetchList({ page_no: 1, store_keyword: "", monitor_status: 1 })
  }

  const toStoreDetail = (row: Row) => {
    const q = new URLSearchParams({
      store_name: row.store_name ?? "",
      store_addr: row.store_addr ?? "",
      store_id: String(row.store_id ?? ""),
    })
    navigate(`/userData/elecMonitorStoreDetail?${q.toString()}`)
  }

  const columns: ColumnsType<Row> = [
    {
      title: "门店名称",
      width: 440,
      render: (_, row) => (
        <>
          <p className={styles.storeName} onClick={() => toStoreDetail(row)}>
            {row.store_name}
          </p>
          <p className={styles.storeAddr}>{row.store_addr}</p>
        </>
      ),
    },
    {
      title: "监测状态",
      width: 200,
      render: (_, row) => (
        <span className={row.monitor_status === 1 ? styles.monitorStatus : styles.historyMonitor}>
          {row.monitor_status === 1 ? "正在监测" : "历史监测"}
        </span>
      ),
    },
    {
      title: (
        <span>
          监测天数
          <Tooltip title="门店设备累计被监测的自然日">
            <QuestionCircleOutlined className={styles.headerTip} />
          </Tooltip>
        </span>
      ),
      width: 200,
      render: (_, row) => <span className={styles.number}>{row.monitor_duration}</span>,
    },
    {
      title: (
        <span>
          监测设备数
          <Tooltip
            title={
              <>
                正在监测门店显示当前监测的门店设备数，
                <br />
                历史监测门店显示累计监测过的门店设备总数
              </>
            }
          >
            <QuestionCircleOutlined className={styles.headerTip} />
          </Tooltip>
        </span>
      ),
      width: 200,
      render: (_, row) => <span className={styles.number}>{row.monitor_device_quantity}</span>,
    },
  ]

  return (
    <div className={styles.elecMonitorStoreList}>
      <div className={styles.dataTable}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>监测门店</p>
        </div>
        <div className={styles.filterRow}>
          <div className={styles.filterItem} style={{ marginLeft: 0 }}>
            <span className={styles.filterTitle}>门店</span>
            <Input
              value={storeKeyword}
              onChange={(e) => setStoreKeyword(e.target.value)}
              placeholder="输入门店名称"
              allowClear
              prefix={<SearchOutlined style={{ color: "#909399" }} />}
              style={{ width: 200, height: 32 }}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>状态</span>
            <Select
              value={monitorStatus}
              onChange={(v) => setMonitorStatus(v as number)}
              allowClear
              placeholder="请选择"
              style={{ width: 110, height: 32 }}
              options={MONITOR_STATUS_OPTS.map((o) => ({ label: o.label, value: o.value }))}
            />
          </div>
          <Button type="primary" shape="round" className={styles.searchBtn} onClick={handleSearch}>
            查询
          </Button>
          <Button shape="round" className={styles.resetBtn} onClick={handleReset}>
            重置
          </Button>
        </div>

        <Table<Row>
          className={styles.tables}
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          bordered
          rowKey={(r) => String(r.store_id)}
          pagination={false}
          scroll={{ x: 900 }}
        />

        <div className={styles.pageClass}>
          <Pagination
            current={pageInfo.page_no}
            pageSize={pageInfo.page_size}
            total={pageInfo.total}
            showSizeChanger={false}
            showTotal={(t) => `共 ${t} 条`}
            onChange={(page) => fetchList({ page_no: page })}
          />
        </div>
      </div>
    </div>
  )
}
