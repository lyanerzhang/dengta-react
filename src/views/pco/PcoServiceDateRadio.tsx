import { useEffect, useState } from "react"
import dayjs from "dayjs"
import styles from "@/components/DateRadio/dateRadio.module.scss"

/** 与 dengta-pc PCO 服务信息 `days_map` 一致：近7天 / 近14天 / 近30天，结束日为当天 */
export interface PcoServiceDatePayload {
  type: number
  start_date: string
  end_date: string
}

const format = (d: dayjs.Dayjs) => d.format("YYYY-MM-DD")

function rangeForType(type: number): [string, string] {
  const end = dayjs().subtract(0, "day")
  const daysBack = type === 2 ? 6 : type === 3 ? 13 : 29
  const start = end.subtract(daysBack, "day")
  return [format(start), format(end)]
}

interface Props {
  dateType: number
  /** 与 PC DateRadio 受控展示一致（可选） */
  dateRange?: [string, string]
  onChangeDate: (p: PcoServiceDatePayload) => void
}

export default function PcoServiceDateRadio({ dateType, onChangeDate }: Props) {
  const [radio, setRadio] = useState(dateType)

  useEffect(() => {
    setRadio(dateType)
  }, [dateType])

  const clickTab = (type: number) => {
    setRadio(type)
    const [start_date, end_date] = rangeForType(type)
    onChangeDate({ type, start_date, end_date })
  }

  return (
    <div className={`${styles.radioBtn} ${styles.radioBtnThreeOnly}`}>
      {[
        { type: 2, label: "近7天" },
        { type: 3, label: "近14天" },
        { type: 4, label: "近30天" },
      ].map(({ type, label }) => (
        <div
          key={type}
          className={`${styles.radioItem} ${radio === type ? styles.isActive : ""}`}
          onClick={() => clickTab(type)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
