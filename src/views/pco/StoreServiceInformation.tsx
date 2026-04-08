import { useCallback, useEffect, useRef, useState } from "react"
import {
  Table,
  Select,
  Button,
  AutoComplete,
  Pagination,
  Empty,
  Modal,
  Carousel,
  Image,
  message,
} from "antd"
import { ApiOutlined, WarningOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import type { ColumnsType } from "antd/es/table"
import { getTicketListServiceInfo } from "@/api/dishwasher"
import { getStoreMonitorPointList, getPcoLighthouseStoreInfo, getPcoLighthouseEnum } from "@/api/pco"
import PcoServiceDateRadio, { type PcoServiceDatePayload } from "./PcoServiceDateRadio"
import { downloadCustomName } from "@/utils/download"
import styles from "./pcoStoreService.module.scss"

const imgToken = typeof localStorage !== "undefined" ? localStorage.getItem("imgToken") : ""

function formatChineseDate(str: string) {
  if (!str) return "-"
  const datePart = str.slice(0, 10)
  const [y, m, d] = datePart.split("-")
  return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`
}

function getPcoServiceTypeFilter(pcoServiceType: number | null | undefined) {
  if (pcoServiceType === null || pcoServiceType === undefined) {
    return { ticket_type_list: undefined as number[] | undefined, from_source_list: undefined as number[] | undefined }
  }
  switch (pcoServiceType) {
    case 1:
      return { ticket_type_list: [301], from_source_list: [3] }
    case 2:
      return { ticket_type_list: [301], from_source_list: [1, 2, 4] }
    case 3:
      return { ticket_type_list: [302], from_source_list: undefined }
    case 4:
      return { ticket_type_list: [303], from_source_list: undefined }
    default:
      return { ticket_type_list: undefined, from_source_list: undefined }
  }
}

const DEVICE_LABEL: Record<string, string> = {
  cockroach_house: "智能蟑螂屋",
  sticky_mouse_board: "智能粘鼠板",
  fly_lamp: "智能灭蝇灯",
}

function checkEmptyLists(obj: Record<string, any[]> | null | undefined) {
  if (!obj || typeof obj !== "object") return true
  return (
    Object.keys(obj).length === 0 ||
    Object.values(obj).every((arr) => Array.isArray(arr) && arr.length === 0)
  )
}

export default function StoreServiceInformation() {
  const [serviceTypeOpts, setServiceTypeOpts] = useState<any[]>([])
  const [dateTypeReport, setDateTypeReport] = useState(3)
  const [dateTypePos, setDateTypePos] = useState(3)
  const [reportRange, setReportRange] = useState<[string, string]>(() => {
    const end = dayjs().subtract(0, "day")
    const start = end.subtract(13, "day")
    return [start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")]
  })
  const [storeNameReport, setStoreNameReport] = useState("")
  const [storeName, setStoreName] = useState("")
  const [storeOptions, setStoreOptions] = useState<{ value: string; id: string }[]>([])
  const [reportReqs, setReportReqs] = useState({
    store_id: null as string | null,
    pco_service_type: undefined as number | undefined,
  })
  const [positionReqs, setPositionReqs] = useState({
    store_id: "" as string,
    start_date: dayjs().subtract(13, "day").format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
  })
  const [positionDefaultId, setPositionDefaultId] = useState("")
  const [positionDefaultName, setPositionDefaultName] = useState("")
  const [pageInfo, setPageInfo] = useState({ page_no: 1, page_size: 10, total: 0 })
  const [tableData, setTableData] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [positionData, setPositionData] = useState<Record<string, any[]>>({})
  const [preview, setPreview] = useState<{ urls: string[]; index: number } | null>(null)
  const [reportPreviewUrl, setReportPreviewUrl] = useState<string | null>(null)

  const pageRef = useRef(pageInfo)
  const reportReqsRef = useRef(reportReqs)
  const reportRangeRef = useRef(reportRange)
  const storeNameReportRef = useRef(storeNameReport)
  const positionReqsRef = useRef(positionReqs)
  const storeNameRef = useRef(storeName)
  const positionDefaultIdRef = useRef("")
  const positionDefaultNameRef = useRef("")

  pageRef.current = pageInfo
  reportReqsRef.current = reportReqs
  reportRangeRef.current = reportRange
  storeNameReportRef.current = storeNameReport
  positionReqsRef.current = positionReqs
  storeNameRef.current = storeName
  positionDefaultIdRef.current = positionDefaultId
  positionDefaultNameRef.current = positionDefaultName

  const searchReport = useCallback(() => {
    const range = reportRangeRef.current
    const p = pageRef.current
    let rr = { ...reportReqsRef.current }
    if (!storeNameReportRef.current?.trim()) {
      rr = { ...rr, store_id: null }
    }
    setTableLoading(true)
    const { ticket_type_list, from_source_list } = getPcoServiceTypeFilter(rr.pco_service_type)
    const params: Record<string, unknown> = {
      store_ids: rr.store_id !== null && rr.store_id !== undefined && rr.store_id !== "" ? [rr.store_id] : [],
      has_report_file: true,
      start_arrive_date: range[0],
      end_arrive_date: range[1],
      ticket_status_list: [4],
      business_type_list: [3],
      sort_rule_list: ["-close_time"],
      page_no: p.page_no,
      page_size: p.page_size,
      return_opt: {
        need_store_info: true,
        need_report_info: true,
      },
    }
    if (ticket_type_list) params.ticket_type_list = ticket_type_list
    if (from_source_list) params.from_source_list = from_source_list

    getTicketListServiceInfo(params)
      .then((res: any) => {
        const total = res?.total ?? 0
        setTableData(res?.ticket_list ?? [])
        setPageInfo((prev) => {
          const next = { ...prev, total }
          pageRef.current = next
          return next
        })
      })
      .catch((err: any) => message.error(typeof err === "string" ? err : "请求失败"))
      .finally(() => setTableLoading(false))
  }, [])

  const searchPosition = useCallback(() => {
    const pr = { ...positionReqsRef.current }
    let sn = storeNameRef.current
    if (!sn?.trim()) {
      sn = positionDefaultNameRef.current
      pr.store_id = positionDefaultIdRef.current
    }
    if (!pr.store_id) return
    getStoreMonitorPointList({
      store_id: pr.store_id,
      start_date: pr.start_date,
      end_date: pr.end_date,
    })
      .then((res: any) => setPositionData(res ?? {}))
      .catch((err: any) => message.error(typeof err === "string" ? err : "请求失败"))
  }, [])

  useEffect(() => {
    getPcoLighthouseEnum({})
      .then((res: any) => setServiceTypeOpts(res.service_type ?? []))
      .catch((e: any) => message.error(typeof e === "string" ? e : "获取枚举失败"))

    searchReport()

    getPcoLighthouseStoreInfo({ page_no: 1, page_size: 50 })
      .then((res: any) => {
        const first = res?.store_list?.[0]
        if (first) {
          positionDefaultIdRef.current = first.id
          positionDefaultNameRef.current = first.name
          setPositionDefaultId(first.id)
          setPositionDefaultName(first.name)
          setStoreName(first.name)
          const next = {
            ...positionReqsRef.current,
            store_id: first.id,
          }
          positionReqsRef.current = next
          setPositionReqs(next)
          searchPosition()
        }
      })
      .catch((e: any) => message.error(typeof e === "string" ? e : "获取门店失败"))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 与 PC onMounted 一致：仅挂载时拉取
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

  const changeReportDate = (p: PcoServiceDatePayload) => {
    setDateTypeReport(p.type)
    setReportRange([p.start_date, p.end_date])
    reportRangeRef.current = [p.start_date, p.end_date]
    setTimeout(() => searchReport(), 0)
  }

  const changePosDate = (p: PcoServiceDatePayload) => {
    setDateTypePos(p.type)
    setPositionReqs((prev) => {
      const next = { ...prev, start_date: p.start_date, end_date: p.end_date }
      positionReqsRef.current = next
      return next
    })
    setTimeout(() => searchPosition(), 0)
  }

  const viewFile = (pdf_file: any, report_file: any, row: any, temp_report_file?: any) => {
    const pdfList = Array.isArray(pdf_file) ? pdf_file : pdf_file ? [pdf_file] : []
    const reportList = Array.isArray(report_file) ? report_file : report_file ? [report_file] : []
    const tempList = Array.isArray(temp_report_file)
      ? temp_report_file
      : temp_report_file
        ? [temp_report_file]
        : []
    const isDemo = typeof window !== "undefined" && window.location.pathname.includes("/demo")

    if (pdfList.length) {
      const url = `/api/ticket/get/aly/oss/url.json?object_name=${pdfList[0]}&it=${imgToken || ""}`
      downloadCustomName(
        url,
        `${row.store_info?.name ?? row.store_name ?? "报告"}_${formatChineseDate(row.arrive_time)}.pdf`,
      )
    } else if (reportList.length || tempList.length) {
      let url = ""
      if (isDemo && tempList.length) {
        url = tempList[0]
      } else if (reportList.length) {
        url = isDemo
          ? reportList[0]
          : `/api/ticket/get/aly/oss/url.json?object_name=${reportList[0]}&it=${imgToken || ""}`
      } else {
        url = tempList[0]
      }
      setReportPreviewUrl(url)
    } else {
      message.error("没有报告可以查看")
    }
  }

  const viewPositionFile = (files: any[], index: number) => {
    if (!files?.length) {
      message.error("没有图片可以查看")
      return
    }
    const urls = files.map((item: any) =>
      `${item.image_path}${String(item.image_path).includes("?") ? "&" : "?"}it=${imgToken || ""}`,
    )
    setPreview({ urls, index })
  }

  const imageUrl = (urlItem: any) =>
    `${urlItem.image_path}${String(urlItem.image_path).includes("?") ? "&" : "?"}it=${imgToken || ""}`

  const pestLabel = (key: string) =>
    key === "cockroach_house" ? "蟑螂" : key === "sticky_mouse_board" ? "老鼠" : "飞虫"

  const columns: ColumnsType<any> = [
    {
      title: "门店名称",
      width: 440,
      render: (_, row) => (
        <span className={styles.storeName}>{row.store_info?.name ?? row.store_name ?? "-"}</span>
      ),
    },
    {
      title: "服务日期",
      width: 200,
      render: (_, row) => <span>{formatChineseDate(row.arrive_time)}</span>,
    },
    {
      title: "服务类型",
      width: 200,
      render: (_, row) => (
        <span className={styles.serviceType}>
          <span>{row.pco_service_type_name ?? "-"}</span>
          {row.pco_service_type === 1 && <ApiOutlined style={{ color: "#3867FF" }} />}
          {row.pco_service_type === 2 && <WarningOutlined style={{ color: "#FF8900" }} />}
        </span>
      ),
    },
    {
      title: "服务报告",
      width: 200,
      render: (_, row) => (
        <span
          className={styles.serviceReport}
          onClick={() =>
            viewFile(
              row.ticket_report?.pdf_file,
              row.ticket_report?.report_file,
              row,
              row.ticket_report?.temp_report_file,
            )
          }
        >
          查看报告
        </span>
      ),
    },
  ]

  const handleSearchReport = () => {
    setPageInfo((prev) => {
      const next = { ...prev, page_no: 1 }
      pageRef.current = next
      return next
    })
    setTimeout(() => searchReport(), 0)
  }

  const resetReport = () => {
    setStoreNameReport("")
    storeNameReportRef.current = ""
    const cleared = { store_id: null as string | null, pco_service_type: undefined as number | undefined }
    setReportReqs(cleared)
    reportReqsRef.current = cleared
    const end = dayjs().subtract(0, "day")
    const start = end.subtract(13, "day")
    const range: [string, string] = [start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")]
    setReportRange(range)
    reportRangeRef.current = range
    setDateTypeReport(3)
    setPageInfo((prev) => {
      const next = { ...prev, page_no: 1 }
      pageRef.current = next
      return next
    })
    setTimeout(() => searchReport(), 0)
  }

  const resetPosition = () => {
    const defId = positionDefaultIdRef.current
    const defName = positionDefaultNameRef.current
    setStoreName(defName)
    storeNameRef.current = defName
    const end = dayjs().subtract(0, "day")
    const start = end.subtract(13, "day")
    setDateTypePos(3)
    const next = {
      store_id: defId,
      start_date: start.format("YYYY-MM-DD"),
      end_date: end.format("YYYY-MM-DD"),
    }
    setPositionReqs(next)
    positionReqsRef.current = next
    setTimeout(() => searchPosition(), 0)
  }

  return (
    <div className={styles.pcoServiceInfo}>
      <div className={styles.serviceTable}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>服务报告</p>
        </div>
        <div className={styles.filterRow}>
          <div className={styles.filterDate}>
            <PcoServiceDateRadio dateType={dateTypeReport} onChangeDate={changeReportDate} />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>门店</span>
            <AutoComplete
              value={storeNameReport}
              options={storeOptions.map((s) => ({ value: s.value, label: s.value || "没有找到相关门店" }))}
              onSearch={handleStoreSearch}
              onSelect={(_v, opt: any) => {
                setStoreNameReport(opt?.value || "")
                storeNameReportRef.current = opt?.value || ""
                setReportReqs((prev) => {
                  const n = { ...prev, store_id: opt?.id ?? null }
                  reportReqsRef.current = n
                  return n
                })
              }}
              onChange={(v) => {
                setStoreNameReport(v)
                storeNameReportRef.current = v
                if (!v) {
                  setReportReqs((prev) => {
                    const n = { ...prev, store_id: null }
                    reportReqsRef.current = n
                    return n
                  })
                }
              }}
              placeholder="请输入门店名称"
              allowClear
              style={{ width: 200 }}
            />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>服务类型</span>
            <Select
              value={reportReqs.pco_service_type}
              onChange={(v) => {
                setReportReqs((prev) => {
                  const n = { ...prev, pco_service_type: v }
                  reportReqsRef.current = n
                  return n
                })
              }}
              allowClear
              placeholder="全部"
              style={{ width: 130 }}
              options={serviceTypeOpts.map((x: any) => ({ label: x.text, value: x.value }))}
            />
          </div>
          <Button type="primary" shape="round" className={styles.searchBtn} onClick={handleSearchReport}>
            查询
          </Button>
          <Button shape="round" className={styles.resetBtn} onClick={resetReport}>
            重置
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          bordered
          rowKey={(r) => String(r.ticket_id ?? r.id)}
          pagination={false}
          className={styles.tables}
        />

        <div className={styles.pageClass}>
          <Pagination
            current={pageInfo.page_no}
            pageSize={pageInfo.page_size}
            total={pageInfo.total}
            showSizeChanger={false}
            showTotal={(t) => `共 ${t} 条`}
            onChange={(page) => {
              setPageInfo((prev) => {
                const next = { ...prev, page_no: page }
                pageRef.current = next
                return next
              })
              setTimeout(() => searchReport(), 0)
            }}
          />
        </div>
      </div>

      <div className={styles.serviceTable}>
        <div className={styles.dataTitleBox}>
          <div className={styles.sideBar} />
          <p className={styles.dataTitle}>监测点位</p>
        </div>
        <div className={styles.filterRow}>
          <div className={styles.filterDate}>
            <PcoServiceDateRadio dateType={dateTypePos} onChangeDate={changePosDate} />
          </div>
          <div className={styles.filterItem}>
            <span className={styles.filterTitle}>门店</span>
            <AutoComplete
              value={storeName}
              options={storeOptions.map((s) => ({ value: s.value, label: s.value || "没有找到相关门店" }))}
              onSearch={handleStoreSearch}
              onSelect={(_v, opt: any) => {
                setStoreName(opt?.value || "")
                storeNameRef.current = opt?.value || ""
                setPositionReqs((prev) => {
                  const n = { ...prev, store_id: opt?.id ?? "" }
                  positionReqsRef.current = n
                  return n
                })
              }}
              onChange={(v) => {
                setStoreName(v)
                storeNameRef.current = v
                if (!v) {
                  setPositionReqs((prev) => {
                    const n = { ...prev, store_id: "" }
                    positionReqsRef.current = n
                    return n
                  })
                }
              }}
              placeholder="请输入门店名称"
              allowClear
              style={{ width: 200 }}
            />
          </div>
          <Button type="primary" shape="round" className={styles.searchBtn} onClick={searchPosition}>
            查询
          </Button>
          <Button shape="round" className={styles.resetBtn} onClick={resetPosition}>
            重置
          </Button>
        </div>

        {!checkEmptyLists(positionData) ? (
          Object.keys(positionData).map((key) => (
            <div key={key} className={styles.deviceImageBox}>
              <div className={styles.imageHeader}>{DEVICE_LABEL[key] ?? key}</div>
              {(positionData[key] ?? []).map((item2: any, index2: number) => (
                <div
                  key={index2}
                  style={{
                    borderBottom: index2 === (positionData[key]?.length ?? 0) - 1 ? "none" : "1px solid #EBEEF5",
                    paddingBottom: 16,
                  }}
                >
                  <div className={styles.devicePosition}>【{item2.location}】</div>
                  {item2.report_list?.length ? (
                    <div className={styles.imgWarp}>
                      {item2.report_list.map((urlItem: any, index3: number) => (
                        <div key={index3} className={styles.imgBox}>
                          <img
                            className={styles.imgItem}
                            src={imageUrl(urlItem)}
                            alt=""
                            onClick={() => viewPositionFile(item2.report_list, index3)}
                          />
                          <p className={styles.imgDesc}>{formatChineseDate(urlItem.report_date)}</p>
                          {!!urlItem.recognized_count && (
                            <div className={styles.warnTag}>
                              <div className={styles.iconBox}>AI</div>
                              <div className={styles.tagText}>
                                {pestLabel(key)}
                                {urlItem.recognized_count}只
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.notData}>
                      <span style={{ color: "#909399", fontSize: 14 }}>暂无图片</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className={styles.emptyWrap}>
            <Empty description="暂无图片" />
          </div>
        )}
      </div>

      <Modal
        open={preview !== null}
        onCancel={() => setPreview(null)}
        footer={null}
        width={720}
        destroyOnClose
      >
        {preview && (
          <Carousel key={preview.urls.join("|")} initialSlide={preview.index}>
            {preview.urls.map((u, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <Image src={u} style={{ maxHeight: "70vh" }} preview={false} />
              </div>
            ))}
          </Carousel>
        )}
      </Modal>

      {reportPreviewUrl && (
        <Image
          key={reportPreviewUrl}
          wrapperStyle={{ display: "none" }}
          src={reportPreviewUrl}
          preview={{
            visible: true,
            onVisibleChange: (v) => {
              if (!v) setReportPreviewUrl(null)
            },
          }}
        />
      )}
    </div>
  )
}
