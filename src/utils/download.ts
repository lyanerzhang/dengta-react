import axios, { Method } from "axios"
import { message, notification } from "antd"

function getFileName(res: any): string {
  const content: string = decodeURI(res.headers["content-disposition"] || "")
  let fileName: string = content.match(/filename\*?=(.*)/)?.[1] || ""
  if (fileName.toLocaleLowerCase().includes("utf-8")) {
    fileName = fileName.substring(7)
  }
  return fileName
}

function downloadNotIE(blob: Blob, name: string) {
  const elink = document.createElement("a")
  elink.target = "_blank"
  elink.download = name || ""
  elink.style.display = "none"
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href)
  document.body.removeChild(elink)
}

export function downloadFile(
  methods: Method,
  url: string,
  params: any,
  fileName?: string
) {
  const hide = message.loading("Loading", 0)
  const config: any = {
    method: methods || "get",
    url,
    responseType: "blob",
    timeout: 60000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      token: localStorage.getItem("userToken"),
      "app-type": 1,
      union_id: localStorage.getItem("userUnionId"),
    },
  }
  if (methods === "post") {
    config.headers["Content-Type"] = "application/json"
    config.data = params
  } else {
    config.params = params
  }
  return axios(config)
    .then((res: any) => {
      hide()
      if (res.status === 200) {
        const blob = new Blob([res.data])
        const fr = new FileReader()
        fr.onload = function (evt) {
          const result = evt?.target?.result as string
          try {
            const resultObj = JSON.parse(result)
            if (!resultObj.success) {
              notification.error({
                message: "提示",
                description: resultObj.error.message || resultObj.error,
              })
            }
          } catch {
            const _fileName = getFileName(res)
            downloadNotIE(blob, fileName || _fileName || "")
          }
        }
        fr.readAsText(blob, "utf-8")
      } else {
        const err =
          res?.data?.error?.message || res?.data?.error || "下载失败"
        notification.error({ message: "错误", description: err })
        return Promise.reject(err)
      }
    })
    .catch((err) => {
      hide()
      const msg = err.message
      if (!msg) return Promise.reject(err)
      if (msg.includes("404")) err.message = "404:服务器故障"
      else if (msg.includes("500")) err.message = "500:服务器故障"
      else if (msg.includes("502")) err.message = "502:服务器故障"
      else if (msg.includes("timeout")) err.message = "请求超时,请刷新重试"
      else err.message = "未知错误"
      return Promise.reject(err.message)
    })
}

export const downloadUrl = (url: string) => {
  const iframe = document.createElement("iframe")
  iframe.style.display = "none"
  iframe.src = url
  iframe.onload = () => document.body.removeChild(iframe)
  document.body.appendChild(iframe)
}

export const downLoadAttribute = (url: string, fileName?: string) => {
  const link = document.createElement("a")
  document.body.appendChild(link)
  link.href = url
  link.download = fileName || ""
  link.style.display = "none"
  link.click()
  document.body.removeChild(link)
}

export const downloadCustomName = (url: string, fileName?: string) => {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)
  xhr.responseType = "blob"
  xhr.onload = () => {
    const blobUrl = window.URL.createObjectURL(xhr.response)
    const a = document.createElement("a")
    a.href = blobUrl
    a.download = fileName || ""
    a.click()
    window.URL.revokeObjectURL(blobUrl)
  }
  xhr.send()
}
