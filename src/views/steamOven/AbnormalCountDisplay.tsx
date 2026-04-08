import styles from "./dataBoard.module.scss"

/** 与 dengta-pc `AbnormalCountDisplay` + `useAbnormalCount` 一致 */
export default function AbnormalCountDisplay({ count }: { count: string | number }) {
  const isNoData = count === "-"
  const isPositive = !isNoData && Number(count) > 0
  const showUnit = !isNoData
  const text = isNoData ? "-" : String(count)

  return (
    <>
      <span
        className={`${styles.dinNumber} ${isNoData ? styles.noData : isPositive ? styles.red : ""}`}
      >
        {text}
      </span>
      {showUnit && <span className={isPositive ? styles.red : undefined}> 次</span>}
    </>
  )
}
