import request from "@/utils/axios"

/** 行政区列表（与 dengta-pc mdc 一致） */
export function getDistrictList(params: { include_all_option?: boolean; level?: number }): any {
  return request({
    url: "/mdc/public/get/district/list",
    params,
    method: "get",
    noLoading: true,
  } as any)
}

export function getCityListMdc(): any {
  return request({
    url: "/mdc/public/get/city/list",
    method: "get",
    noLoading: true,
  } as any)
}

/** 与 dengta-pc `@/api/mdc` 的 `getCityList` 同名 */
export const getCityList = getCityListMdc
