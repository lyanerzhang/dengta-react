import { useEffect, useState } from "react"
import { DatePicker, message } from "antd"
import { CalendarOutlined } from "@ant-design/icons"
import dayjs, { Dayjs } from "dayjs"
import styles from "./dateRadio.module.scss"

const { RangePicker } = DatePicker

export interface DateChangePayload {
  type: number
  start_date: string
  end_date: string
}

interface CurrentDateRadioProps {
  dateType: number
  dateRange?: [string, string]
  /** 结束日相对「今天」减几天，与 pc `isCurrentDay` 一致，默认 1 即昨日 */
  isCurrentDay?: number
  onChangeDate: (payload: DateChangePayload) => void
}

const formatDate = (d: Dayjs) => d.format("YYYY-MM-DD")

/**
 * 与 dengta-pc `components/DateRadio/currentdateRadio.vue` 对齐：
 * 昨日 / 近7天 / 近30天 / 自定义（type 9 + RangePicker）
 */
export default function CurrentDateRadio({
  dateType,
  dateRange = ["", ""],
  isCurrentDay = 1,
  onChangeDate,
}: CurrentDateRadioProps) {
  const [radio, setRadio] = useState(dateType)
  const [calendarOpen, setCalendarOpen] = useState(false)

  useEffect(() => {
    setRadio(dateType)
  }, [dateType])

  const clickTab = (val: number) => {
    if (val === 1) {
      setCalendarOpen(false)
      const y = dayjs().subtract(1, "day")
      const s = formatDate(y)
      onChangeDate({ type: 1, start_date: s, end_date: s })
    } else if (val === 9) {
      setCalendarOpen(true)
    } else if (val === 2 || val === 3) {
      setCalendarOpen(false)
      const days = val === 2 ? 7 : 30
      const end = dayjs().subtract(isCurrentDay, "day")
      const start = dayjs().subtract(days, "day")
      onChangeDate({
        type: val,
        start_date: formatDate(start),
        end_date: formatDate(end),
      })
    }
  }

  const confirmRange = (values: null | [Dayjs | null, Dayjs | null]) => {
    if (!values?.[0] || !values[1]) return
    const diff = values[1].diff(values[0], "day")
    if (diff > 90) {
      message.warning("所选时间范围不能超过90天，请重新选择")
      return
    }
    setCalendarOpen(false)
    onChangeDate({
      type: 9,
      start_date: formatDate(values[0]),
      end_date: formatDate(values[1]),
    })
  }

  const disabledDate = (current: Dayjs) => {
    const yesterday = dayjs().subtract(isCurrentDay, "day")
    return current.isAfter(yesterday, "day")
  }

  const rangeValue: [Dayjs, Dayjs] | null =
    dateRange[0] && dateRange[1] ? [dayjs(dateRange[0]), dayjs(dateRange[1])] : null

  return (
    <div className={styles.radioBtn} style={{ position: "relative" }}>
      <div
        className={`${styles.radioItem} ${radio === 1 ? styles.isActive : ""}`}
        onClick={() => clickTab(1)}
      >
        昨日
      </div>
      <div
        className={`${styles.radioItem} ${radio === 2 ? styles.isActive : ""}`}
        onClick={() => clickTab(2)}
      >
        近7天
      </div>
      <div
        className={`${styles.radioItem} ${radio === 3 ? styles.isActive : ""}`}
        onClick={() => clickTab(3)}
      >
        近30天
      </div>
      <div
        className={`${styles.radioItemIcon} ${radio === 9 ? styles.isActive : ""}`}
        onClick={() => clickTab(9)}
      >
        <CalendarOutlined style={{ fontSize: 16, color: radio === 9 ? "#3867FF" : "#606266" }} />
      </div>
      <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0 }}>
        <RangePicker
          open={calendarOpen}
          onOpenChange={setCalendarOpen}
          value={rangeValue}
          disabledDate={disabledDate}
          onChange={confirmRange}
          getPopupContainer={() => document.body}
        />
      </div>
    </div>
  )
}
