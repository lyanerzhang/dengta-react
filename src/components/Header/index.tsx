import { useState } from "react"
import { CaretDownOutlined } from "@ant-design/icons"
import headLogo from "@/assets/images/headLogo.png"
import icDemo from "@/assets/images/ic_demo.png"
import styles from "./header.module.scss"

interface HeaderProps {
  onLogout: () => void
}

/** 与 dengta-pc Header 一致：浏览器地址含 `/demo` 时为体验版 */
function getIsDemoMode(): boolean {
  return typeof window !== "undefined" && window.location.pathname.includes("/demo")
}

export default function Header({ onLogout }: HeaderProps) {
  const username = localStorage.getItem("userName") || "-"
  const [showTooltip, setShowTooltip] = useState(false)
  const [isMouseOverTooltip, setIsMouseOverTooltip] = useState(false)
  const isDemoMode = getIsDemoMode()

  const handleMouseLeaveUserInfo = () => {
    if (!isMouseOverTooltip) setShowTooltip(false)
  }

  const openDemoMode = () => {
    const publicBase = import.meta.env.BASE_URL.replace(/\/$/, "") || ""
    const url = `${window.location.origin}${publicBase}/demo/userData/deviceRealTimeData`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className={styles.headerContent}>
      <div>
        <img width={104} height={32} src={headLogo} alt="logo" />
      </div>
      <div className={styles.headerRight}>
        <div>
          {!isDemoMode && (
            <div className={styles.demoModeBtn} onClick={openDemoMode} role="button" tabIndex={0}>
              进入体验版
            </div>
          )}
          {isDemoMode && <img width={88} height={28} src={icDemo} alt="体验版" />}
        </div>
        <div
          className={styles.userInfo}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={handleMouseLeaveUserInfo}
        >
          <p>{username}</p>
          <CaretDownOutlined style={{ marginLeft: 8, fontSize: 16 }} />
          {showTooltip && (
            <div
              className={styles.tooltip}
              onMouseEnter={() => setIsMouseOverTooltip(true)}
              onMouseLeave={() => setIsMouseOverTooltip(false)}
            >
              <p onClick={onLogout}>退出登录</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
