import request from "@/utils/axios"

export function getAliStsToken(): any {
  return request({ url: "/ec/iam/thirdparty/get/st", method: "get" })
}

export function getUserRolePermissions(): any {
  return request({ url: "/role/get/user/role.json", method: "get" })
}

export function getPassportConfig(): any {
  return request({
    url: "/ec/iam/passport/get/config",
    method: "get",
    noLoading: true,
  } as any)
}

export function getUsageVisibleStoreList(params: any): any {
  return request({
    url: "/ec/iotdm/cook/usage/get/visible_store_list",
    params,
    method: "get",
  })
}

export function getUsageVisibleCityList(params: any): any {
  return request({
    url: "/ec/iotdm/cook/usage/get/visible_city_list",
    params,
    method: "get",
  })
}

export function getAppRedirectUrl(data: any) {
  return request({
    url: "/ec/iam/passport/auth/get/auth_url",
    method: "post",
    withToken: false,
    headers: { "Content-Type": "application/json", "APP-TOKEN": data },
  } as any)
}

export function loginByCode(data: any, token: any) {
  return request({
    url: "/ec/iam/passport/auth_login",
    method: "post",
    data,
    withToken: false,
    headers: { "Content-Type": "application/json", "APP-TOKEN": token },
  } as any)
}

export function getLoginSendSmsInApp(data: any, token: any) {
  return request({
    url: "/ec/iam/passport/login_send_sms",
    data,
    method: "post",
    withToken: false,
    headers: { "Content-Type": "application/json", "APP-TOKEN": token },
  } as any)
}
