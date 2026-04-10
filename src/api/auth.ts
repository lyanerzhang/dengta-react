import { logoutSys } from "@/api/dishwasher"
import { message } from "antd"
import { store, clearAllState } from "@/store"

export const authService = {
  async globalLogout() {
    try {
      await logoutSys({})
      localStorage.removeItem("userToken")
      localStorage.removeItem("userUnionId")
      localStorage.removeItem("userName")
      localStorage.removeItem("imgToken")
      store.dispatch(clearAllState())
      window.location.href = "/userLogin"
    } catch {
      message.error("退出操作失败")
    }
  },
}
