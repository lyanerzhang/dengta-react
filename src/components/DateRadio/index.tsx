import { useState, useEffect } from "react"
import { DatePicker, message } from "antd"
import { CalendarOutlined } from "@ant-design/icons"
import dayjs, { Dayjs } from "dayjs"
import styles from "./dateRadio.module.scss"

const { RangePicker } = DatePicker

interface DateChangePayload {
  type: number
  start_date: string
  end_date: string
}

interface DateRadioProps {
  dateType?: number
  dateRange?: [string, string]
  maxDisabledDays?: number
  onChangeDate: (payload: DateChangePayload) => void
}

const formatDate = (d: Dayjs) => d.format("YYYY-MM-DD")

export default function DateRadio({
  dateType = 2,
  dateRange,
  maxDisabledDays = 0,
  onChangeDate,
}: DateRadioProps) {
  const [radio, setRadio] = useState(dateType)
  const [showCalendar, setShowCalendar] = useState(false)
  const [date, setDate] = useState<[Dayjs, Dayjs] | null>(null)

  useEffect(() => {
    setRadio(dateType)
    if (dateType === 4 && dateRange) {
      setDate([dayjs(dateRange[0]), dayjs(dateRange[1])])
    }
  }, [dateType, dateRange])

  const clickTab = (val: number) => {
    setRadio(val)
    const yesterday = dayjs().subtract(1, "day")
    if (val === 1) {
      setShowCalendar(false)
      onChangeDate({ type: 1, start_date: formatDate(yesterday), end_date: formatDate(yesterday) })
    } else if (val === 2) {
      setShowCalendar(false)
      onChangeDate({ type: 2, start_date: formatDate(dayjs().subtract(7, "day")), end_date: formatDate(yesterday) })
    } else if (val === 3) {
      setShowCalendar(false)
      onChangeDate({ type: 3, start_date: formatDate(dayjs().subtract(30, "day")), end_date: formatDate(yesterday) })
    } else if (val === 4) {
      setShowCalendar(true)
    }
  }

  const confirmDate = (values: [Dayjs | null, Dayjs | null] | null) => {
    if (values && values[0] && values[1]) {
      const diff = values[1].diff(values[0], "day")
      if (diff > 90) {
        message.warning("所选时间范围不能超过90天，请重新选择")
        setDate(null)
        return
      }
      setShowCalendar(false)
      setDate([values[0], values[1]])
      onChangeDate({ type: 4, start_date: formatDate(values[0]), end_date: formatDate(values[1]) })
    }
  }

  const disabledDate = (current: Dayjs) => {
    const yesterday = dayjs().subtract(1, "day")
    if (maxDisabledDays > 0) {
      const maxDay = dayjs().subtract(maxDisabledDays, "day")
      return current.isBefore(maxDay, "day") || current.isAfter(yesterday, "day")
    }
    return current.isAfter(yesterday, "day")
  }

  return (
    <div className={styles.radioBtn}>
      {[
        { val: 1, label: "昨日" },
        { val: 2, label: "近7天" },
        { val: 3, label: "近30天" },
      ].map(({ val, label }) => (
        <div
          key={val}
          className={`${styles.radioItem} ${radio === val ? styles.isActive : ""}`}
          onClick={() => clickTab(val)}
        >
          {label}
        </div>
      ))}
      <div
        className={`${styles.radioItemIcon} ${radio === 4 ? styles.isActive : ""}`}
        onClick={() => clickTab(4)}
      >
        <CalendarOutlined style={{ fontSize: 16, color: radio === 4 ? "#3867FF" : "#606266" }} />
      </div>
      {showCalendar && (
        <div className={styles.dateBox}>
          <RangePicker
            style={{ width: 240 }}
            value={date}
            disabledDate={disabledDate}
            onChange={confirmDate}
          />
        </div>
      )}
    </div>
  )
}
