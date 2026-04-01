import request from "@/utils/axios"

export function getStoreDeviceEnergyOverview(params: any): any {
  return request({ url: "/ec/iotdm/energy/get/store_device_energy_overview", params, method: "get", noLoading: true } as any)
}

export function getDeviceEnergyOverview(params: any): any {
  return request({ url: "/ec/iotdm/energy/get/device_energy_overview", params, method: "get", noLoading: true } as any)
}

export function getDeviceEnergyContrast(params: any): any {
  return request({
    url: "/ec/iotdm/energy/get/device_energy_contrast",
    data: params,
    method: "post",
    headers: { "Content-Type": "application/json" },
    noLoading: true,
  } as any)
}

export function getDeviceEnergyDetail(params: any): any {
  return request({ url: "/ec/iotdm/energy/get/device_energy_detail", params, method: "get", noLoading: true } as any)
}

export function getDeviceUsageTimeDetail(params: any): any {
  return request({ url: "/ec/iotdm/energy/get/device_use_detail", params, method: "get", noLoading: true } as any)
}
