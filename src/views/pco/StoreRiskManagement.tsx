import { useEffect, useState, useCallback, useRef } from "react"
import { Table, Select, Button, AutoComplete, Pagination, Modal, Image, message } from "antd"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import { getPcoLighthouseEnum, getPcoLighthouseStoreInfo, getPcoStoreStandardList } from "@/api/pco"
import { getDistrictList } from "@/api/mdc"
import styles from "./pcoStoreRisk.module.scss"

const imgToken = typeof localStorage !== "undefined" ? localStorage.getItem("imgToken") : ""

function withImgToken(urls: string[]) {
  if (!urls?.length) return []
  return urls.map((u) => (u.includes("&it=") ? u : `${u}${u.includes("?") ? "&" : "?"}it=${imgToken || ""}`))
}

export default function StoreRiskManagement() {
  const [cityList, setCityList] = useState<{ value: string; label: string }[]>([])
  const [riskType, setRiskType] = useState<any[]>([])
  const [pestType, setPestType] = useState<any[]>([])
  const [adjustType, setAdjustType] = useState<any[]>([])
  const [storeName, setStoreName] = useState("")
  const [storeOptions, setStoreOptions] = useState<{ value: string; id: string }[]>([])
  const [form, setForm] = useState({
    store_id: "" as string,
    district_code: "" as string,
    risk_type: "" as string | number,
    pest_type: "" as string | number,
    adjust_type: 1 as number | "" | undefined,
    page_no: 1,
    page_size: 10,
    total: 0,
  })
  const [tableData, setTableData] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [imgDialogUrls, setImgDialogUrls] = useState<string[]>([])
  const [imgDialogTitle, setImgDialogTitle] = useState("")
  const formRef = useRef(form)
  const storeNameRef = useRef(storeName)
  formRef.current = form
  storeNameRef.current = storeName

  useEffect(() => {
    getDistrictList({ include_all_option: true, level: 2 })
      .then((res: any) => {
        const list = res?.item_list ?? []
        const options: { value: string; label: string }[] = []
        list.forEach((item: any) => {
          options.push({ value: item.code, label: item.label })
          ;(item.children || []).forEach((child: any) => {
            if (child.code) options.push({ value: child.code, label: child.label })
          })
        })
        setCityList(options)
      })
      .catch((err: any) => message.error(typeof err === "string" ? err : "获取城市失败"))

    getPcoLighthouseEnum({})
      .then((res: any) => {
        setRiskType(res.risk_type ?? [])
        setPestType(res.pest_type ?? [])
        setAdjustType(res.adjust_type ?? [])
      })
      .catch((err: any) => message.error(typeof err === "string" ? err : "获取枚举失败"))
  }, [])

  const search = useCallback(() => {
    setTableLoading(true)
    const payload: any = { ...formRef.current }
    if (!storeNameRef.current) {
      delete payload.store_id
    }
    getPcoStoreStandardList(payload)
      .then((res: any) => {
        const list = (res?.standard_list ?? []).map((item: any) => ({
          ...item,
          pic: withImgToken(item.pic ?? []),
          after_adjust_pic: withImgToken(item.after_adjust_pic ?? []),
        }))
        setTableData(list)
        setForm((prev) => ({ ...prev, total: res?.total ?? 0 }))
      })
      .catch((err: any) => {
        message.error(typeof err === "string" ? err : "请求失败")
        setTableData([])
        setForm((prev) => ({ ...prev, total: 0 }))
      })
      .finally(() => setTableLoading(false))
  }, [])

  useEffect(() => {
    search()
  }, [search])

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
      message.error(typeof e === "string" ? e : "搜索门店失败")
      setStoreOptions([])
    }
  }

  const doSearch = () => {
    setForm((prev) => {
      const next = { ...prev, page_no: 1 }
      formRef.current = next
      return next
    })
    setTimeout(() => search(), 0)
  }

  const reset = () => {
    setStoreName("")
    storeNameRef.current = ""
    setForm((prev) => {
      const next = {
        ...prev,
        store_id: "",
        district_code: "",
        pest_type: "",
        risk_type: "",
        adjust_type: "" as "" | undefined,
        page_no: 1,
      }
      formRef.current = next
      return next
    })
    setTimeout(() => search(), 0)
  }

  const openImgWindow = (urls: string[], title: string) => {
    setImgDialogUrls(urls)
    setImgDialogTitle(title)
  }

  const renderImgCell = (urls: string[] | undefined, title: string) => {
    if (!urls?.length) return null
    const first = urls[0]
    return (
      <div className={styles.imgRow}>
        <Image.PreviewGroup items={urls}>
          <div className={styles.imgMiniBox}>
            <Image src={first} className={styles.imgMini} />
            {urls.length > 1 && (
              <span className={styles.numTag} onClick={() => openImgWindow(urls, title)}>
                +{urls.length - 1}
              </span>
            )}
            <div className={styles.mask} />
          </div>
        </Image.PreviewGroup>
      </div>
    )
  }

  const columns: ColumnsType<any> = [
    {
      title: "门店名称",
      width: 160,
      render: (_, row) => <p className={styles.storeName}>{row.store_name}</p>,
    },
    {
      title: "服务日期",
      width: 160,
      render: (_, row) => (
        <p className={styles.defaultTableText}>
          {row.ticket_arrive_time
            ? dayjs(row.ticket_arrive_time).format("YYYY年MM月DD日")
            : "-"}
        </p>
      ),
    },
    {
      title: "虫害类别",
      width: 100,
      render: (_, row) => <p className={styles.defaultTableText}>{row.pest_type_name}</p>,
    },
    { title: "风险类型", width: 100, dataIndex: "risk_type_name" },
    {
      title: "风险情况",
      width: 160,
      render: (_, row) => (
        <p className={styles.defaultTableText}>
          {row.area}
          {row.check_item_name}-{row.standard_description}
        </p>
      ),
    },
    {
      title: "整改措施",
      width: 160,
      dataIndex: "rectification_measures",
      render: (t) => <p className={styles.defaultTableText}>{t}</p>,
    },
    {
      title: "整改前",
      width: 100,
      render: (_, row) => renderImgCell(row.pic, "整改前图片"),
    },
    {
      title: "整改后",
      width: 100,
      render: (_, row) => renderImgCell(row.after_adjust_pic, "整改后图片"),
    },
  ]

  return (
    <div className={styles.storeRishManagement}>
      <div className={styles.storeRishManagementTable}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>门店风险管理</p>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>门店</span>
            <AutoComplete
              value={storeName}
              options={storeOptions.map((s) => ({ value: s.value, label: s.value || "没有找到相关门店" }))}
              onSearch={handleStoreSearch}
              onSelect={(_v, opt: any) => {
                setStoreName(opt?.value || "")
                setForm((prev) => ({ ...prev, store_id: opt?.id ?? "" }))
              }}
              onChange={(v) => {
                setStoreName(v)
                if (!v) setForm((prev) => ({ ...prev, store_id: "" }))
              }}
              placeholder="输入门店名称"
              allowClear
              style={{ width: 200 }}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>城市</span>
            <Select
              value={form.district_code || undefined}
              onChange={(v) => setForm((prev) => ({ ...prev, district_code: v ?? "" }))}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="全部"
              style={{ width: 100 }}
              options={cityList}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>风险类型</span>
            <Select
              value={form.risk_type === "" ? undefined : form.risk_type}
              onChange={(v) => setForm((prev) => ({ ...prev, risk_type: v ?? "" }))}
              allowClear
              placeholder="全部"
              style={{ width: 100 }}
              options={riskType.map((x: any) => ({ label: x.text, value: x.value }))}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>风险状态</span>
            <Select
              value={form.adjust_type === "" ? undefined : form.adjust_type}
              onChange={(v) => setForm((prev) => ({ ...prev, adjust_type: v ?? "" }))}
              allowClear
              placeholder="全部"
              style={{ width: 100 }}
              options={adjustType.map((x: any) => ({ label: x.text, value: x.value }))}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>虫害</span>
            <Select
              value={form.pest_type === "" ? undefined : form.pest_type}
              onChange={(v) => setForm((prev) => ({ ...prev, pest_type: v ?? "" }))}
              allowClear
              placeholder="全部"
              style={{ width: 100 }}
              options={pestType.map((x: any) => ({ label: x.text, value: x.value }))}
            />
          </div>
          <Button type="primary" shape="round" className={styles.searchBtn} onClick={doSearch}>
            查询
          </Button>
          <Button shape="round" className={styles.resetBtn} onClick={reset}>
            重置
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          bordered
          rowKey={(r, i) => String(r.id ?? i)}
          pagination={false}
          className={styles.tables}
          scroll={{ x: 1200 }}
        />

        <div className={styles.pageClass}>
          <Pagination
            current={form.page_no}
            pageSize={form.page_size}
            total={form.total}
            showSizeChanger={false}
            showTotal={(t) => `共 ${t} 条`}
            onChange={(page) => {
              setForm((prev) => {
                const next = { ...prev, page_no: page }
                formRef.current = next
                return next
              })
              setTimeout(() => search(), 0)
            }}
          />
        </div>
      </div>

      <Modal
        title={imgDialogTitle}
        open={imgDialogUrls.length > 0}
        onCancel={() => setImgDialogUrls([])}
        footer={null}
        width={800}
        destroyOnClose
      >
        <div className={styles.imgDialog}>
          {imgDialogUrls.map((src, j) => (
            <div key={j} className={styles.imgItemBox}>
              <Image width={140} height={140} src={src} style={{ objectFit: "contain" }} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
