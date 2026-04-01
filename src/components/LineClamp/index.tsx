import { useState, useRef, useEffect, ReactNode } from "react"
import { Tooltip } from "antd"
import styles from "./lineClamp.module.scss"

interface LineClampProps {
  maxLines?: number
  lineHeight?: number
  tooltipText?: string
  children: ReactNode
}

export default function LineClamp({
  maxLines = 2,
  lineHeight = 20,
  tooltipText = "",
  children,
}: LineClampProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkOverflow = () => {
      requestAnimationFrame(() => {
        const content = contentRef.current
        if (content) {
          const maxHeight = lineHeight * maxLines
          setShowToggle(content.scrollHeight - 2 > maxHeight)
        }
      })
    }
    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [lineHeight, maxLines])

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={styles.textEllipsis}>
      <div
        ref={contentRef}
        className={`${styles.textContent} ${showToggle && !isExpanded ? styles.textContentEllipsis : ""}`}
        style={{
          WebkitLineClamp: isExpanded ? "unset" : maxLines,
          maxHeight: isExpanded ? "none" : `${lineHeight * maxLines}px`,
        }}
      >
        {children}
      </div>
      {showToggle && (
        tooltipText && !isExpanded ? (
          <Tooltip title={tooltipText}>
            <span className={isExpanded ? styles.toggleBtnHide : styles.toggleBtn} onClick={toggleExpand}>
              {isExpanded ? "收起" : "...更多"}
            </span>
          </Tooltip>
        ) : (
          <span className={isExpanded ? styles.toggleBtnHide : styles.toggleBtn} onClick={toggleExpand}>
            {isExpanded ? "收起" : "...更多"}
          </span>
        )
      )}
    </div>
  )
}
