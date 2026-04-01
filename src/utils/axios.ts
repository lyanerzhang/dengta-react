import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios"
import { message as antdMessage } from "antd"
import globalAxiosParams from "@/utils/globalAxiosParams"

interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  isMock?: boolean
  mock?: string
  responseError?: boolean
  noLoading?: boolean
  withToken?: boolean
  errorData?: boolean
}

const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
})

service.defaults.headers.post["Content-Type"] = "application/json"

let responseError = false
let errorData = false

service.interceptors.request.use(
  (config: CustomAxiosConfig) => {
    responseError = false

    if (config.isMock && config.mock) {
      config.url = config.mock
      return config
    }
    if (config.responseError) {
      responseError = true
    }

    config.params = Object.assign(config.params || {}, {
      union_id: localStorage.getItem("userUnionId") || null,
      bi: globalAxiosParams.bi,
    })

    if (config.withToken === undefined) {
      config.withToken = true
    }
    if (!config.headers) {
      config.headers = {} as any
    }
    config.headers["app-type"] = "1"
    if (config.withToken) {
      const token = localStorage.getItem("userToken")
      if (token) {
        config.headers.token = token
      } else {
        antdMessage.error("未找到有效的 token")
      }
    }

    if ((config as any).errorData) {
      errorData = true
    } else {
      errorData = false
    }
    return config
  },
  (err) => {
    antdMessage.error(`请求错误: ${err}`)
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (res: AxiosResponse) => {
    if (
      res.headers &&
      (res.headers["content-disposition"] ||
        res.headers["content-type"]?.toLowerCase().includes("application/octet-stream"))
    ) {
      return res.data
    }
    if (res.status === 200 && res.data.success) {
      return res?.data?.content
    } else if (
      res.status === 200 &&
      !res.data.success &&
      res.data.error?.code === "InvalidToken"
    ) {
      localStorage.removeItem("userToken")
      localStorage.removeItem("userName")
      localStorage.removeItem("userUnionId")
      window.location.href = "/userLogin"
      return Promise.reject("登录过期，请重新登录")
    } else {
      if (errorData) {
        return Promise.reject(res.data.error)
      }
      const error = res?.data?.error
        ? res?.data?.error?.message
        : "缺少code、message"
      return Promise.reject(error)
    }
  },
  (err) => {
    const msg = err.message
    if (!msg) return Promise.reject(err)

    if (msg.includes("404")) err.message = "404:服务器故障"
    else if (msg.includes("500")) err.message = "500:服务器故障"
    else if (msg.includes("502")) err.message = "502:服务器故障"
    else if (msg.includes("timeout")) err.message = "请求超时,请刷新重试"
    else err.message = "未知错误"

    if (!responseError) {
      antdMessage.error("网络异常，请刷新重试")
    }
    return Promise.reject(err.message)
  }
)

export default service
