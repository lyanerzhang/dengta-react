import { message } from "antd"

const toast = {
  show(msg: string, duration = 2) {
    message.open({ content: msg, duration, type: "info" })
  },
  success(msg: string, duration = 2) {
    message.success({ content: msg, duration })
  },
  error(msg: string, duration = 2) {
    message.error({ content: msg, duration })
  },
  warning(msg: string, duration = 2) {
    message.warning({ content: msg, duration })
  },
}

export default toast
