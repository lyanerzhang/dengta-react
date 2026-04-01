import { logoutSys } from "@/api/dishwasher"
import { message } from "antd"
import { useAppStore } from "@/store"

export const authService = {
  async globalLogout() {
    try {
      await logoutSys({})
      localStorage.removeItem("userToken")
      localStorage.removeItem("userUnionId")
      localStorage.removeItem("userName")
      localStorage.removeItem("imgToken")
      useAppStore.getState().clearAllState()
      window.location.href = "/userLogin"
    } catch {
      message.error("退出操作失败")
    }
  },
}
