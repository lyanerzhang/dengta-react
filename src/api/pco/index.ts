import request from "@/utils/axios"

export function getPcoLighthouseEnum(params: any): any {
  return request({ url: "/ec/itr/ticket/get/pco/lighthouse/enum", params, method: "get", noLoading: true } as any)
}

export function getPcoLighthouseStoreInfo(params: any): any {
  return request({ url: "/ec/itr/ticket/get/pco/lighthouse/store/info", params, method: "get", noLoading: true } as any)
}

export function getPcoStoreStandardList(params: any): any {
  return request({ url: "/ec/itr/ticket/get/store/standard_list", params, method: "get", noLoading: true } as any)
}

export function getPcoServiceOverviewStats(params: any): any {
  return request({ url: "/ec/iotdm/pco/get/service_overview/stats", params, method: "get", noLoading: true } as any)
}

export function getPcoIntelligentMonitorStats(params: any): any {
  return request({ url: "/ec/iotdm/pco/get/intelligent/monitor/stats", params, method: "get", noLoading: true } as any)
}

export function getPcoIntelligentMonitorEventList(params: any): any {
  return request({ url: "/ec/iotdm/pco/get/intelligent/monitor/event_list", params, method: "get", noLoading: true } as any)
}

export function getStoreMonitorPointList(params: any): any {
  return request({ url: "/ec/iotdm/pco/get/store/monitor_point/list", params, method: "get", noLoading: true } as any)
}

export function getPcoTicketList(params: any): any {
  return request({ url: "/ec/itr/ticket/ticket/get/ticket/list", params, method: "get", noLoading: true } as any)
}

export function getMessageList(params: any): any {
  return request({ url: "/ec/iotdm/pco/get/message/list", params, method: "get", noLoading: true } as any)
}

export function markMessageRead(data: any) {
  return request({
    url: "/ec/iotdm/pco/mark/message/read",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}
