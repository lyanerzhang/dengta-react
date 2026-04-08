import { useEffect, useMemo, useRef, useState } from "react"
import { Modal } from "antd"
import { formatTime } from "@/utils/timeFormat"
import adStyles from "./abnormalDetail.module.scss"

export type AbnormalDetailData = {
  no_load_heating_timeout?: Array<{ abnormal_detail?: string; start_time?: string }>
  cooking_door_open_timeout?: Array<{ abnormal_detail?: string; start_time?: string }>
  menu_modification?: Array<{ abnormal_detail?: string; start_time?: string }>
  cleaning_state?: Array<{ abnormal_detail?: string; start_time?: string }>
}

const SECTIONS: Record<string, { title: string }> = {
  no_load_heating_timeout: { title: "空载加热超时" },
  cooking_door_open_timeout: { title: "烹饪中途开门超时" },
  menu_modification: { title: "修改门店菜单" },
  cleaning_state: { title: "清洁状态" },
}

const NAV_CLEAN_MAP: Record<number, string> = {
  0: "无记录",
  1: "清洁成功",
  2: "清洁中断",
  3: "未清洁",
}

const SECTION_KEYS = Object.keys(SECTIONS) as (keyof AbnormalDetailData)[]

interface Props {
  open: boolean
  cleaningState: number
  data: AbnormalDetailData | null
  onClose: () => void
}

export default function AbnormalDetailModal({ open, cleaningState, data, onClose }: Props) {
  const [activeAnchor, setActiveAnchor] = useState("no_load_heating_timeout")
  const [activeBarPosition, setActiveBarPosition] = useState(0)
  const [isBarMoving, setIsBarMoving] = useState(false)
  const detailConRef = useRef<HTMLDivElement>(null)
  const menuItemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())
  const isProgrammaticScroll = useRef(false)

  const detailData = useMemo(() => {
    const d = data || {}
    return {
      no_load_heating_timeout: d.no_load_heating_timeout ?? [],
      cooking_door_open_timeout: d.cooking_door_open_timeout ?? [],
      menu_modification: d.menu_modification ?? [],
      cleaning_state: d.cleaning_state ?? [],
    }
  }, [data])

  useEffect(() => {
    if (open && data && Object.keys(data).length) {
      setActiveAnchor("no_load_heating_timeout")
      setActiveBarPosition(0)
    }
  }, [open, data])

  const getMenuItemHeight = () => {
    const el = menuItemRefs.current.get("no_load_heating_timeout")
    return el ? el.offsetHeight : 42.5
  }

  const scrollToSection = (sectionId: string, index: number) => {
    setIsBarMoving(true)
    isProgrammaticScroll.current = true
    const itemHeight = getMenuItemHeight()
    const targetPosition = index * itemHeight
    setActiveBarPosition(targetPosition)
    setActiveAnchor(sectionId)
    const element = sectionRefs.current.get(sectionId)
    const container = detailConRef.current
    if (element && container) {
      const containerRect = container.getBoundingClientRect()
      const rect = element.getBoundingClientRect()
      const sectionTop = rect.top - containerRect.top
      container.scrollTo({
        top: sectionTop + container.scrollTop - targetPosition,
        behavior: "smooth",
      })
    }
    setTimeout(() => setIsBarMoving(false), 300)
    setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 800)
  }

  return (
    <Modal
      title={<span className={adStyles.modalHeader}>使用详情</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnClose
      styles={{ body: { paddingTop: 8 } }}
    >
      <div className={adStyles.abnormalDetailContent}>
        <div className={adStyles.anchorNav}>
          <span
            className={adStyles.activeBar}
            style={{
              transform: `translateY(${activeBarPosition}px)`,
              transition: isBarMoving ? "transform 0.3s ease-out" : "none",
            }}
          />
          {SECTION_KEYS.map((key, index) => (
            <div
              key={key}
              ref={(el) => {
                if (el) menuItemRefs.current.set(key, el)
                else menuItemRefs.current.delete(key)
              }}
              className={`${adStyles.anchorItem} ${activeAnchor === key ? adStyles.anchorActive : ""}`}
              onClick={() => scrollToSection(key, index)}
            >
              {SECTIONS[key].title}:{" "}
              {key === "cleaning_state" && (
                <span className={[2, 3].includes(cleaningState) ? adStyles.red : ""}>
                  {NAV_CLEAN_MAP[cleaningState] ?? "-"}
                </span>
              )}
              {key === "menu_modification" && (
                <span className={(detailData.menu_modification?.length ?? 0) > 0 ? adStyles.red : ""}>
                  {(detailData.menu_modification?.length ?? 0) > 0 ? "有修改" : "无修改"}
                </span>
              )}
              {key !== "cleaning_state" && key !== "menu_modification" && (
                <>
                  {(detailData[key] as { length: number } | undefined)?.length ? (
                    <span className={`${adStyles.dinNumber} ${adStyles.dataNumWarn}`}>
                      {(detailData[key] as { length: number }).length}
                    </span>
                  ) : null}
                  <span
                    className={
                      ((detailData[key] as { length: number } | undefined)?.length ?? 0) > 0
                        ? adStyles.dataNumWarn
                        : ""
                    }
                  >
                    {((detailData[key] as { length: number } | undefined)?.length ?? 0) > 0 ? "次" : "无"}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
        <div ref={detailConRef} className={adStyles.detailCon}>
          {SECTION_KEYS.map((key) => (
            <div
              key={key}
              id={key}
              ref={(el) => {
                if (el) sectionRefs.current.set(key, el)
                else sectionRefs.current.delete(key)
              }}
              className={adStyles.detailSection}
            >
              <div className={adStyles.sectionHeader}>
                <div className={adStyles.sectionTitle}>{SECTIONS[key].title}</div>
              </div>
              {!detailData[key]?.length ? (
                <div className={adStyles.detailItemWrap}>
                  <div className={adStyles.emptyState}>无</div>
                </div>
              ) : (
                <div>
                  {(detailData[key] ?? []).map((item, index) => (
                    <div key={index} className={adStyles.detailItemWrap}>
                      <div className={adStyles.detailItem}>
                        <div className={adStyles.timeInfo}>{item.abnormal_detail}</div>
                        {item.start_time ? (
                          <div className={adStyles.actionInfo}>{formatTime(item.start_time)} 开始</div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
