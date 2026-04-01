import request from "@/utils/axios"

export function getBbqGrillOverview(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/bbqgrill_running_overview", params, method: "get" })
}

export function getBbqGrillTrend(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/bbqgrill_running_trend", params, method: "get" })
}

export function getBbqGrillUsageList(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/bbqgrill_running_abnormal_usage_list", params, method: "get" })
}

export function getBbqGrillStoreList(params: any): any {
  return request({ url: "/ec/iotdm/cook/usage/get/visible_store_list", params, method: "get" })
}
