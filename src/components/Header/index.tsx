import { useState } from "react"
import { CaretDownOutlined } from "@ant-design/icons"
import headLogo from "@/assets/images/headLogo.png"
import styles from "./header.module.scss"

interface HeaderProps {
  onLogout: () => void
}

export default function Header({ onLogout }: HeaderProps) {
  const username = localStorage.getItem("userName") || "-"
  const [showTooltip, setShowTooltip] = useState(false)
  const [isMouseOverTooltip, setIsMouseOverTooltip] = useState(false)

  const handleMouseLeaveUserInfo = () => {
    if (!isMouseOverTooltip) setShowTooltip(false)
  }

  return (
    <div className={styles.headerContent}>
      <div>
        <img width={104} height={32} src={headLogo} alt="logo" />
      </div>
      <div className={styles.headerRight}>
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
