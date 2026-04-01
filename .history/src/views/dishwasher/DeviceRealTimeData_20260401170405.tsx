import { useEffect, useState } from "react"
import { Table, Select } from "antd"
import { getUsageOverview, getUsageList, getVisibleCityList, getVisibleStoreList } from "@/api/dishwasher"
import DateRadio from "@/components/DateRadio"
import dayjs from "dayjs"

export default function DeviceRealTimeData() {
  const [overview, setOverview] = useState<any>({})
  const [dataList, setDataList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [cityList, setCityList] = useState<any[]>([])
  const [storeList, setStoreList] = useState<any[]>([])
  const [params, setParams] = useState({
    start_date: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    end_date: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    city_code: "",
    store_id: "",
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const [overviewRes, listRes] = await Promise.all([
        getUsageOverview(params),
        getUsageList(params),
      ])
      setOverview(overviewRes || {})
      setDataList(listRes || [])
    } finally {
      setLoading(false)
    }
  }

  const fetchFilters = async () => {
    const [cities, stores] = await Promise.all([
      getVisibleCityList({}),
      getVisibleStoreList({}),
    ])
    setCityList(cities.items || [])
    setStoreList(stores.list || [])
  }

  useEffect(() => { fetchFilters() }, [])
  useEffect(() => { fetchData() }, [params])

  const columns = [
    { title: "门店名称", dataIndex: "store_name", key: "store_name" },
    { title: "设备型号", dataIndex: "device_model", key: "device_model" },
    { title: "洗涤次数", dataIndex: "wash_count", key: "wash_count" },
    { title: "运行时长(h)", dataIndex: "running_hours", key: "running_hours" },
    { title: "状态", dataIndex: "status", key: "status" },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <DateRadio
          onChangeDate={({ start_date, end_date }) =>
            setParams((prev) => ({ ...prev, start_date, end_date }))
          }
        />
        <Select
          allowClear
          placeholder="选择城市"
          style={{ width: 160 }}
          options={cityList.map((c: any) => ({ label: c.city_name, value: c.city_code }))}
          onChange={(v) => setParams((prev) => ({ ...prev, city_code: v || "" }))}
        />
        <Select
          allowClear
          placeholder="选择门店"
          style={{ width: 200 }}
          showSearch
          optionFilterProp="label"
          options={storeList.map((s: any) => ({ label: s.store_name, value: s.store_id }))}
          onChange={(v) => setParams((prev) => ({ ...prev, store_id: v || "" }))}
        />
      </div>
      <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
        {[
          { label: "门店总数", value: overview.store_count },
          { label: "设备总数", value: overview.device_count },
          { label: "洗涤总次数", value: overview.total_wash_count },
        ].map((item) => (
          <div key={item.label} style={{ background: "#fff", padding: "16px 24px", borderRadius: 8, flex: 1 }}>
            <div style={{ color: "#909399", fontSize: 14 }}>{item.label}</div>
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>{item.value ?? "-"}</div>
          </div>
        ))}
      </div>
      <Table
        columns={columns}
        dataSource={dataList}
        loading={loading}
        rowKey={(record) => record.store_id || record.device_id || Math.random()}
        pagination={{ pageSize: 20 }}
      />
    </div>
  )
}
