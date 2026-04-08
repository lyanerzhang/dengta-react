import { useEffect, useRef } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Header from "@/components/Header"
import Menu from "@/components/Menu"
import Footer from "@/components/Footer"
import { authService } from "@/api/auth"
import { useAppStore } from "@/store"
import styles from "./userData.module.scss"

/** 离开食安风险页且非进入门店详情时，清理草稿（对齐 Vue beforeRouteLeave） */
function FoodSafetyLeaveSync() {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  useEffect(() => {
    const prev = prevPath.current
    const next = location.pathname
    prevPath.current = next
    if (
      prev === "/userData/foodSafetyRisk" &&
      next !== "/userData/storeDetail" &&
      next !== "/userData/foodSafetyRisk"
    ) {
      useAppStore.getState().clearFoodSafetyState()
    }
  }, [location.pathname])
  return null
}

export default function UserData() {
  const logoutSystem = () => {
    authService.globalLogout()
  }

  return (
    <div className={styles.commonLayout}>
      <div className={styles.header}>
        <Header onLogout={logoutSystem} />
      </div>
      <div className={styles.body}>
        <aside className={styles.aside}>
          <Menu />
        </aside>
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <FoodSafetyLeaveSync />
            <Outlet />
          </main>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  )
}
