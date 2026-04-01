import { useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { CaretRightOutlined } from "@ant-design/icons"
import MENUMAP from "@/enums/menu"
import { getMenuMap } from "@/utils/getMenuPermission"
import emitter from "@/utils/eventBus"
import styles from "./menu.module.scss"

export default function Menu() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuList] = useState(() => getMenuMap(MENUMAP))
  const [activePath, setActivePath] = useState("")
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {}
    menuList.forEach((menu) => { state[menu.key] = true })
    return state
  })
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  const findActivePath = useCallback(() => {
    const defaultPath = menuList[0]?.children?.[0]?.path || ""
    for (const menuGroup of menuList) {
      const matched = menuGroup.children?.find((child) => child.path === location.pathname)
      if (matched?.path) return matched.path
    }
    return defaultPath
  }, [location.pathname, menuList])

  useEffect(() => {
    setActivePath(findActivePath())
  }, [findActivePath])

  useEffect(() => {
    const handler = (path: string) => setActivePath(path)
    emitter.on("reActiveMenu", handler)
    return () => emitter.off("reActiveMenu", handler)
  }, [])

  const toggleExpand = (menuKey: string) => {
    setExpandedState((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }))
  }

  const clickPush = (path: string) => {
    setActivePath(path)
    navigate(path)
  }

  return (
    <div className={styles.menuContainer}>
      {menuList.map((menu) => (
        <div key={menu.key} className={styles.menuGroup}>
          <div className={styles.menuGroupTitle} onClick={() => toggleExpand(menu.key)}>
            <CaretRightOutlined
              className={`${styles.arrowIcon} ${expandedState[menu.key] ? styles.expanded : ""}`}
              style={{ fontSize: 14 }}
            />
            <span>{menu.title}</span>
          </div>
          {expandedState[menu.key] && (
            <div className={styles.menuItemsWrapper}>
              {menu.children?.map((child) => (
                <div
                  key={child.path}
                  className={`${styles.menuItem} ${activePath === child.path ? styles.isActive : ""} ${hoveredPath === child.path ? styles.mhovered : ""}`}
                  onClick={() => child.path && clickPush(child.path)}
                  onMouseEnter={() => setHoveredPath(child.path || null)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <span
                    className={`${styles.menuItemText} ${hoveredPath === child.path ? styles.shovered : ""} ${activePath === child.path ? styles.isActiveText : ""}`}
                  >
                    {child.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
