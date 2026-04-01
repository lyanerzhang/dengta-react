import request from "@/utils/axios"

export function getCombiovenRunningOverview(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/combioven_running_overview", params, method: "get" })
}

export function getCombiovenRunningDetail(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/combioven_running_detail", params, method: "get" })
}

export function getStoreCombiovenRunningOverview(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/store_combioven_running_overview", params, method: "get" })
}

export function getStoreCombiovenRunningTrend(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/store_combioven_running_trend", params, method: "get" })
}

export function getStoreCombiovenRunningDetail(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/store_combioven_running_detail", params, method: "get" })
}

export function getStoreCombiovenRunningAbnormalDetail(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/store_combioven_running_abnormal_detail", params, method: "get" })
}
