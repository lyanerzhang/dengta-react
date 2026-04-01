import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import Menu from "@/components/Menu"
import Footer from "@/components/Footer"
import { authService } from "@/api/auth"
import styles from "./userData.module.scss"

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
