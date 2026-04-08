import request from "@/utils/axios"
import qs from "qs"

export function getUsageOverview(params: any): any {
  return request({ url: "/ec/iotdm/dishwasher/get/usage/overview", params, method: "get" })
}

export function getLoginSendSms(data: any) {
  return request({
    url: "/ec/iam/passport/login_send_sms",
    data,
    method: "post",
    withToken: false,
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function loginSystem(data: any) {
  return request({
    url: "/ec/iam/passport/sms_login",
    data,
    method: "post",
    withToken: false,
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function getVisibleCityList(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/visible_city_list",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getUsageList(params: any): any {
  return request({ url: "/ec/iotdm/dishwasher/get/usage_list", params, method: "get" })
}

export function getDeviceDetailOverview(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/device_detail/overview",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getDeviceRealtimeInfo(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/device_detail/realtime_info",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getDdetailUsageList(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/device_detail/usage_list",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getAbnormalOverview(params: any): any {
  return request({ url: "/ec/iotdm/dishwasher/get/abnormal_usage/overview", params, method: "get" })
}

export function getAbnormalUsageList(params: any): any {
  return request({ url: "/ec/iotdm/dishwasher/get/abnormal_usage_list", params, method: "get" })
}

export function logoutSys(data: any) {
  return request({
    url: "/ec/iam/passport/logout",
    data: qs.stringify(data),
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  } as any)
}

export function checkUserInfo(data: any) {
  return request({
    url: "/ec/iam/passport/check_login",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function getTicketListByType(data: any) {
  return request({
    url: "/ec/itr/ticket/ticket/get/ticket/list/for_all",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

/** 灯塔云-洗碗机-服务信息列表（与 dengta-pc 一致） */
export function getTicketListServiceInfo(data: any) {
  return request({
    url: "/ec/itr/ticket/ticket/filter/ticket/list/service_info",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
    noLoading: true,
  } as any)
}

export function getCityList(params: any): any {
  return request({ url: "/ecmall/get/city/list.json", params, method: "get", noLoading: true } as any)
}

export function getVisibleStoreList(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/visible_store_list",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getWishdasherLastestReport(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/dishwasher_lastest_report",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getFoodSafetyRiskOverview(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/food_safety_risk_overview",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getFoodSafetyRiskDeatil(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/food_safety_risk_detail",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getEnergyOverview(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/energy_overview",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getEnergyDetail(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/energy_detail",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getBoardStoreFoodSafetyRisk(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/board/store_food_safety_risk",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getBoardStoreEnergyOverview(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/board/store_energy_overview",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getBoardStoreServiceInfoOverview(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/board/service_info_overview",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getIsIntelligentWashUser(): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/is_intelligent_wash_user",
    method: "get",
    noLoading: true,
  } as any)
}

export function getUnqualifiedWashingBasketsDetails(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/unqualified_washing_baskets_details",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getGloveStorageDetail(params: any): any {
  return request({
    url: "/ec/iotdm/dishwasher/get/glove_storage_detail",
    params,
    method: "get",
    noLoading: true,
  } as any)
}
