import { useEffect, useState, useCallback, useRef, useMemo } from "react"
import {
  Table,
  Select,
  Button,
  AutoComplete,
  Pagination,
  message,
  Radio,
  Modal,
  Image,
} from "antd"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import DateRadio from "@/components/DateRadio"
import { getCityList, getTicketListServiceInfo, getVisibleStoreList } from "@/api/dishwasher"
import type { ColumnsType } from "antd/es/table"
import styles from "./aftersaleService.module.scss"

type ReqPath = "ticket" | "repair_ticket" | "train_ticket" | "inspect_ticket"

function ticketTypeListForPath(path: ReqPath): number[] {
  if (path === "inspect_ticket") return [106, 206]
  if (path === "train_ticket") return [104, 204]
  if (path === "repair_ticket") return [105, 205, 108]
  return [105, 205, 108, 104, 204, 106, 206]
}

function pickCreateType(row: any): number | undefined {
  return (
    row?.train_ticket_extend?.create_type ??
    row?.inspect_ticket_extend?.create_type ??
    row?.repair_ticket_extend?.create_type ??
    row?.improve_wash_quality_ticket_extend?.create_type
  )
}

function getTicketTypeName(row: any): string {
  if (row.ticket_type_name) return row.ticket_type_name
  const tt = row.ticket_type
  if (tt && [106, 206].includes(tt)) return row.inspect_ticket_extend?.service_type_name || "-"
  if (tt && [104, 204].includes(tt)) return row.train_ticket_extend?.service_type_name || "-"
  if (tt && [105, 205].includes(tt)) return row.repair_ticket_extend?.service_type_name || "-"
  if (tt && [108].includes(tt)) return row.improve_wash_quality_ticket_extend?.service_type_name || "-"
  return "-"
}

function renderDoorTime(row: any) {
  const ct = pickCreateType(row)
  if (![1, 2, 3].includes(Number(ct))) return <span className={styles.itemLabel}>-</span>
  if (!row.need_home_visit) return <p className={styles.itemValue}>已电话解决</p>
  if (ct === 1) return <p className={styles.itemValue}>报修后{row.create_to_arrive_minute}分钟到店</p>
  if (ct === 2) return <p className={styles.itemValue}>主动维护保证正常使用</p>
  if (ct === 3) return <p className={styles.itemValue}>AIoT实时监测及时上门</p>
  return null
}

function SceneImagesCell(props: { urls: string[]; onOpenAll?: (urls: string[]) => void }) {
  const { urls, onOpenAll } = props
  if (!urls?.length) return <span className={styles.itemValue}>-</span>
  const show = urls.slice(0, 3)
  return (
    <Image.PreviewGroup items={urls}>
      <div
        className={styles.imgRow}
        style={{ justifyContent: urls.length >= 3 ? "space-between" : "flex-start" }}
      >
        {show.map((src, i) => (
          <div key={i} className={styles.imgMiniBox}>
            <Image src={src} className={styles.imgMini} />
            {urls.length > 3 && i === 2 && (
              <span className={styles.numTag} onClick={() => onOpenAll?.(urls)}>
                +{urls.length - 3}
              </span>
            )}
          </div>
        ))}
      </div>
    </Image.PreviewGroup>
  )
}

export default function AftersaleService() {
  const [cityMap, setCityMap] = useState<any[]>([])
  const [storeName, setStoreName] = useState("")
  const [storeOptions, setStoreOptions] = useState<{ value: string; id: string }[]>([])
  const [reqPath, setReqPath] = useState<ReqPath>("ticket")
  const [reqs, setReqs] = useState({
    store_id: null as string | number | null,
    district_code: "",
    tab_type: 16,
    select_time_filter_1: 1,
    ticket_type_list: ticketTypeListForPath("ticket"),
    select_time_filter_start_1: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    select_time_filter_end_1: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  })
  const [dateType, setDateType] = useState(3)
  const [pageInfo, setPageInfo] = useState({ total: 0, pageNo: 1, pageSize: 10 })
  const [tableData, setTableData] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailRow, setDetailRow] = useState<any>(null)
  const [imgDialogUrls, setImgDialogUrls] = useState<string[]>([])

  const reqsRef = useRef(reqs)
  const pageRef = useRef(pageInfo)
  reqsRef.current = reqs
  pageRef.current = pageInfo

  useEffect(() => {
    getCityList({})
      .then((res: any) => {
        const rawList = Array.isArray(res) ? res : res?.city_list ?? []
        const list = rawList.map((item: any) => ({
          city: item.city === "全部城市" ? "全部" : item.city,
          id: item.id === "" ? "" : item.id,
          district_code: item.district_code ?? "",
        }))
        setCityMap(list)
      })
      .catch((err: any) => message.error(typeof err === "string" ? err : "获取城市失败"))
  }, [])

  const search = useCallback(async () => {
    const r = reqsRef.current
    const p = pageRef.current
    setTableLoading(true)
    setTableData([])
    const params = {
      store_ids: r.store_id !== null && r.store_id !== undefined && r.store_id !== "" ? [r.store_id] : [],
      district_code_prefix: r.district_code || undefined,
      ticket_status_list: [4],
      business_type_list: [1, 2],
      create_time_start: r.select_time_filter_start_1,
      create_time_end: r.select_time_filter_end_1,
      ticket_type_list: r.ticket_type_list,
      page_no: p.pageNo,
      page_size: p.pageSize,
      sort_rule_list: ["-create_time"],
      return_opt: {
        need_store_info: true,
        need_contact_info: true,
        need_create_user_info: true,
        need_department_info: true,
        need_engineer_info: true,
        need_door_effective_info: true,
        need_transform_images: true,
        need_phenomenon_reason_record: true,
        need_extend_info: true,
      },
    }
    try {
      const res: any = await getTicketListServiceInfo(params)
      const list = res?.ticket_list?.length
        ? res.ticket_list.map((item: any) => ({
            ...item,
            create_type:
              item?.train_ticket_extend?.create_type ||
              item?.inspect_ticket_extend?.create_type ||
              item?.repair_ticket_extend?.create_type ||
              item?.improve_wash_quality_ticket_extend?.create_type,
          }))
        : []
      setTableData(list)
      setPageInfo((prev) => ({ ...prev, total: res?.total ?? 0 }))
    } catch (err: any) {
      message.error(typeof err === "string" ? err : "请求失败")
      setTableData([])
    } finally {
      setTableLoading(false)
    }
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
      const res: any = await getVisibleStoreList({})
      const list = (res?.list ?? [])
        .filter((item: any) => item.name?.includes(value))
        .map((item: any) => ({ value: item.name, id: item.id }))
      setStoreOptions(list.length ? list : [{ value: "没有找到相关门店", id: "" }])
    } catch {
      setStoreOptions([])
    }
  }

  const onPathChange = (e: any) => {
    const path = e.target.value as ReqPath
    setReqPath(path)
    const nextList = ticketTypeListForPath(path)
    setReqs((prev) => ({ ...prev, ticket_type_list: nextList }))
    reqsRef.current = { ...reqsRef.current, ticket_type_list: nextList }
    setPageInfo((prev) => ({ ...prev, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const changeDate = (dates: { type: number; start_date: string; end_date: string }) => {
    setDateType(dates.type)
    setReqs((prev) => ({
      ...prev,
      select_time_filter_start_1: dates.start_date,
      select_time_filter_end_1: dates.end_date,
    }))
    reqsRef.current = {
      ...reqsRef.current,
      select_time_filter_start_1: dates.start_date,
      select_time_filter_end_1: dates.end_date,
    }
    setPageInfo((prev) => ({ ...prev, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const doSearch = () => {
    setPageInfo((prev) => ({ ...prev, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const reset = () => {
    setStoreName("")
    setReqs((prev) => ({
      ...prev,
      store_id: null,
      district_code: "",
    }))
    reqsRef.current = { ...reqsRef.current, store_id: null, district_code: "" }
    setPageInfo((prev) => ({ ...prev, pageNo: 1 }))
    pageRef.current = { ...pageRef.current, pageNo: 1 }
    setTimeout(() => search(), 0)
  }

  const viewDetail = (row: any) => {
    setDetailRow(row)
    setDetailOpen(true)
  }

  const renderServiceSituation = (row: any) => (
    <div>
      {[1, 2, 3].includes(row.create_type) && (
        <p>
          <span className={styles.itemLabel}>离店时间：</span>
          <span className={styles.itemValue}>{row.leave_time}</span>
        </p>
      )}
      <p>
        <span className={styles.itemLabel}>服务日期：</span>
        <span className={styles.itemValue}>
          {row.arrive_time ? row.arrive_time.slice(0, 10).replace(/-/g, ".") : "-"}
        </span>
      </p>
      {[1, 2, 3].includes(row.create_type) && row.phenomenon_reason_record?.failure_reason_list?.length ? (
        <p>
          <span className={styles.itemLabel}>故障原因：</span>
          <span className={styles.itemValue}>
            {row.phenomenon_reason_record.failure_reason_list.map((x: any) => x.name).join("、")}
          </span>
        </p>
      ) : null}
      {row.ticket_type && [106, 206].includes(row.ticket_type) && (
        <p>
          <span className={styles.itemLabel}>服务类型：</span>
          <span className={styles.itemValue}>
            {row.inspect_ticket_extend?.inspect_content_info || "-"}
          </span>
        </p>
      )}
      {row.ticket_type && [104, 204].includes(row.ticket_type) && (
        <p>
          <span className={styles.itemLabel}>培训内容：</span>
          <span className={styles.itemValue}>
            {(row.train_ticket_extend?.train_content_info || []).join("、") || "-"}
          </span>
        </p>
      )}
      <p>
        <span className={styles.itemLabel}>门店服务经理：</span>
        <span className={styles.itemValue}>{row.responsible_engineer_info?.username}</span>
      </p>
    </div>
  )

  const renderServiceInfo = (row: any) => {
    if (reqPath === "repair_ticket") {
      return (
        <div>
          <p>
            <span className={styles.itemLabel}>到店时间：</span>
            <span className={styles.itemValue}>{row.arrive_time}</span>
          </p>
          <p>
            <span className={styles.itemLabel}>离店时间：</span>
            <span className={styles.itemValue}>{row.leave_time}</span>
          </p>
          <p>
            <span className={styles.itemLabel}>门店服务经理：</span>
            <span className={styles.itemValue}>{row?.responsible_engineer_info?.username}</span>
          </p>
        </div>
      )
    }
    if (reqPath === "train_ticket") {
      return (
        <div>
          <p>
            <span className={styles.itemLabel}>服务日期：</span>
            <span className={styles.itemValue}>
              {row.arrive_time ? row.arrive_time.slice(0, 10) : "-"}
            </span>
          </p>
          <p>
            <span className={styles.itemLabel}>门店服务经理：</span>
            <span className={styles.itemValue}>{row?.responsible_engineer_info?.username}</span>
          </p>
        </div>
      )
    }
    return (
      <div>
        <p>
          <span className={styles.itemLabel}>服务日期：</span>
          <span className={styles.itemValue}>
            {row.arrive_time ? row.arrive_time.slice(0, 10) : "-"}
          </span>
        </p>
        <p>
          <span className={styles.itemLabel}>服务类型：</span>
          <span className={styles.itemValue}>
            {row.inspect_ticket_extend?.service_type_name || "-"}
          </span>
        </p>
        <p>
          <span className={styles.itemLabel}>门店服务经理：</span>
          <span className={styles.itemValue}>{row?.responsible_engineer_info?.username}</span>
        </p>
      </div>
    )
  }

  const renderInspectOverview = (row: any) => {
    const rep = row.inspect_ticket_extend?.service_ticket_report_info?.service_result
    if (row.inspect_ticket_extend?.service_result_type === 2 && rep?.stats_risk_info) {
      const s = rep.stats_risk_info
      return (
        <div className={styles.itemValue}>
          <p>
            <span className={styles.itemLabel}>服务结论：</span>
            共<span style={{ fontWeight: "bold" }}>{s.check_item_count || 0}</span>项检查：
            <span style={{ color: "#E72323", fontWeight: "bold" }}>{s.waiting_solve_count || 0}</span>
            项需改善，
            <span style={{ color: "#03875F", fontWeight: "bold" }}>{s.good_condition_count || 0}</span>
            项良好
          </p>
          {rep?.overview && (
            <p style={{ marginTop: 8 }}>
              <span className={styles.itemLabel}>整体概述：</span>
              {rep.overview}
            </p>
          )}
        </div>
      )
    }
    return (
      <span style={{ color: "#909399" }}>-</span>
    )
  }

  const columns: ColumnsType<any> = useMemo(() => {
    const base: ColumnsType<any> = [
      {
        title: "门店",
        width: 240,
        render: (_: any, row: any) => (
          <div>
            <p className={styles.storeName}>{row.store_name || row.store_info?.name}</p>
            <p className={styles.storeAddr}>{row.store_addr || row.store_info?.addr}</p>
          </div>
        ),
      },
    ]

    if (reqPath === "ticket") {
      base.push(
        {
          title: "服务类型",
          width: 100,
          render: (_: any, row: any) => (
            <span className={styles.itemValue}>{getTicketTypeName(row)}</span>
          ),
        },
        {
          title: "上门时效",
          width: 100,
          render: (_: any, row: any) => renderDoorTime(row),
        },
        {
          title: "服务情况",
          width: 360,
          render: (_: any, row: any) => renderServiceSituation(row),
        },
        {
          title: "现场图片",
          width: 240,
          render: (_: any, row: any) => (
            <SceneImagesCell
              urls={row.scene_image_list?.length ? row.scene_image_list : row.scene_pic || []}
              onOpenAll={(urls) => setImgDialogUrls(urls)}
            />
          ),
        },
      )
      return base
    }

    if (reqPath === "repair_ticket") {
      base.push(
        {
          title: "上门时效",
          width: 100,
          render: (_: any, row: any) => renderDoorTime(row),
        },
        {
          title: "服务单信息",
          width: 200,
          render: (_: any, row: any) => renderServiceInfo(row),
        },
        {
          title: "维修明细",
          width: 252,
          render: (_: any, row: any) => (
            <div>
              <p>
                <span className={styles.itemLabel}>故障现象：</span>
                <span className={styles.itemValue}>
                  {(row.phenomenon_reason_record?.failure_phenomenon_list || [])
                    .map((x: any) => x.name)
                    .join("、") || "-"}
                </span>
              </p>
              <p>
                <span className={styles.itemLabel}>故障原因：</span>
                <span className={styles.itemValue}>
                  {(row.phenomenon_reason_record?.failure_reason_list || []).map((x: any) => x.name).join("、") ||
                    "-"}
                </span>
              </p>
              <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                {row.solved_status === 2 ? (
                  <CheckOutlined style={{ fontSize: 20, color: "#03875F" }} />
                ) : (
                  <CloseOutlined style={{ fontSize: 20, color: "#909399" }} />
                )}
                <span
                  style={{
                    color: row.solved_status === 2 ? "#03875F" : "#909399",
                    fontSize: 16,
                    marginLeft: 4,
                  }}
                >
                  {row.solved_status === 2 ? "已解决" : "未解决"}
                </span>
              </div>
            </div>
          ),
        },
        {
          title: "现场图片",
          width: 240,
          render: (_: any, row: any) => (
            <SceneImagesCell
              urls={row.scene_image_list?.length ? row.scene_image_list : row.scene_pic || []}
              onOpenAll={(urls) => setImgDialogUrls(urls)}
            />
          ),
        },
      )
      return base
    }

    if (reqPath === "train_ticket") {
      base.push(
        {
          title: "服务单信息",
          width: 200,
          render: (_: any, row: any) => renderServiceInfo(row),
        },
        {
          title: "培训内容",
          width: 336,
          render: (_: any, row: any) => (
            <span className={styles.itemValue}>
              {(row.train_ticket_extend?.train_content_info || []).join("、") || "-"}
            </span>
          ),
        },
        {
          title: "现场图片",
          width: 240,
          render: (_: any, row: any) => (
            <SceneImagesCell
              urls={row.scene_image_list?.length ? row.scene_image_list : row.scene_pic || []}
              onOpenAll={(urls) => setImgDialogUrls(urls)}
            />
          ),
        },
      )
      return base
    }

    if (reqPath === "inspect_ticket") {
      base.push(
        {
          title: "服务单信息",
          width: 200,
          render: (_: any, row: any) => renderServiceInfo(row),
        },
        {
          title: "总体情况",
          width: 504,
          render: (_: any, row: any) => renderInspectOverview(row),
        },
        {
          title: "巡检详情",
          width: 100,
          fixed: "right",
          render: (_: any, row: any) => (
            <span className={styles.itemValue} style={{ color: "#3867FF", cursor: "pointer" }} onClick={() => viewDetail(row)}>
              查看详情
            </span>
          ),
        },
      )
      return base
    }

    return base
  }, [reqPath])

  return (
    <div className={styles.aftersaleService}>
      <div className={styles.dateBar}>
        <DateRadio
          dateType={dateType}
          dateRange={[reqs.select_time_filter_start_1, reqs.select_time_filter_end_1]}
          maxDisabledDays={91}
          onChangeDate={changeDate}
        />
      </div>

      <div className={styles.aftersaleDataTable}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>服务信息</p>
        </div>

        <div className={styles.radioRow}>
          <span className={styles.aftersaleTitle}>服务类型</span>
          <Radio.Group value={reqPath} onChange={onPathChange} className={styles.radioGroup}>
            <Radio.Button value="ticket">全部</Radio.Button>
            <Radio.Button value="repair_ticket">维修</Radio.Button>
            <Radio.Button value="train_ticket">培训</Radio.Button>
            <Radio.Button value="inspect_ticket">巡检</Radio.Button>
          </Radio.Group>
        </div>

        <div className={styles.filterRow}>
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
                const o = opt as { value?: string; id?: string }
                setStoreName(o.value || "")
                setReqs((prev) => ({ ...prev, store_id: o.id ?? null }))
              }}
              onChange={(v) => {
                setStoreName(v)
                if (!v) setReqs((prev) => ({ ...prev, store_id: null }))
              }}
              placeholder="请输入门店名称"
              allowClear
              style={{ width: 200 }}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>城市</span>
            <Select
              value={reqs.district_code || undefined}
              onChange={(v) => setReqs((prev) => ({ ...prev, district_code: v || "" }))}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="请选择"
              style={{ width: 100 }}
              options={cityMap.map((c: any) => ({
                label: c.city,
                value: c.district_code ?? "",
              }))}
            />
          </div>
          <div className={styles.filterActions}>
            <Button type="primary" shape="round" onClick={doSearch} className={styles.searchBtn}>
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
          rowKey={(r) => String(r.ticket_id ?? r.id ?? r.order_number ?? Math.random())}
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

      <Modal
        title="现场图片"
        open={imgDialogUrls.length > 0}
        onCancel={() => setImgDialogUrls([])}
        footer={null}
        width={800}
        destroyOnClose
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {imgDialogUrls.map((u, j) => (
            <Image key={j} width={140} height={140} src={u} style={{ objectFit: "contain" }} />
          ))}
        </div>
      </Modal>

      <Modal
        title="巡检详情"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        {detailRow?.inspect_ticket_extend?.service_result_type === 1 ? (
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, maxHeight: "60vh", overflow: "auto" }}>
            {JSON.stringify(detailRow.inspect_ticket_extend, null, 2)}
          </pre>
        ) : (
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, maxHeight: "60vh", overflow: "auto" }}>
            {JSON.stringify(detailRow?.inspect_ticket_extend?.service_ticket_report_info || {}, null, 2)}
          </pre>
        )}
      </Modal>
    </div>
  )
}
