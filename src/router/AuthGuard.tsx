import { useEffect, useState, ReactNode } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  store,
  useAppDispatch,
  useAppSelector,
  getUserMenuPermissions,
  getIsIntelligentWashUser,
  getAppUsagePermission,
  clearAllState,
} from "@/store"
import { getRedirectPath } from "@/utils/getMenuPermission"

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const menuPermission = useAppSelector((s) => s.app.menuPermission)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("userToken")

      if (token) {
        if (!menuPermission.isGetPermission) {
          try {
            await dispatch(getUserMenuPermissions()).unwrap()
            await dispatch(getIsIntelligentWashUser()).unwrap()
            setReady(true)
          } catch {
            clearInfo()
            navigate("/userLogin", { replace: true })
          }
        } else {
          const st = store.getState().app
          if (st.isIntelligentWashUser === null) {
            await dispatch(getIsIntelligentWashUser()).unwrap()
          }
          setReady(true)
          if (location.pathname === "/userLogin") {
            const redirect = getRedirectPath(store.getState().app.menuPermission)
            if (redirect) navigate(redirect, { replace: true })
          }
        }
      } else {
        const searchParams = new URLSearchParams(location.search)
        const appToken = searchParams.get("app_token")
        if (appToken) {
          localStorage.setItem("INTERNAL_APP_TOKEN", encodeURIComponent(appToken))
          await dispatch(getAppUsagePermission(encodeURIComponent(appToken))).unwrap()
        } else {
          clearInfo()
          if (location.pathname !== "/userLogin" && location.pathname !== "/agreementFile") {
            navigate("/userLogin", { replace: true })
          }
        }
      }
    }

    const clearInfo = () => {
      localStorage.removeItem("userToken")
      localStorage.removeItem("userUnionId")
      localStorage.removeItem("userName")
      localStorage.removeItem("imgToken")
      dispatch(clearAllState())
    }

    init()
  }, [location.pathname])

  if (!ready) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        加载中...
      </div>
    )
  }

  return <>{children}</>
}
