import request from "@/utils/axios"

export function getBrandDishList(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/brand_dish/list", params, method: "get" })
}

export function getCookMethodList(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/cook_method/list", params, method: "get" })
}

export function getStoreDishMenuList(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/store_dish_menu/list", params, method: "get" })
}

export function getSameDishList(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/brand_dish_menu/same_image_recognition_dish_list", params, method: "get" })
}

export function getStoreDishMenuDishList(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/store_dish_menu/dish/list", params, method: "get" })
}

export function getBrandDishMenuDishList(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/brand_dish_menu/dish/list", params, method: "get" })
}

export function updateStoreDishMenuDishStatus(data: any): any {
  return request({ url: "/ec/iotdm/cook/dish/change/store_dish_menu/dish_status", data, method: "post" })
}

export function getBrandDishDispatchList(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/brand_dish/dispatch/list", params, method: "get" })
}

export function getBrandDishMenuList(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/brand_dish_menu/list", params, method: "get" })
}

export function getStoreDishMenuDishListByImageId(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/store_dish_menu/same_image_recognition_dish_list", params, method: "get" })
}

export function getDishListForAdd(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/brand_dish/list_for_menu_add_dish", params, method: "get", noLoading: true } as any)
}

export function getListForDispatch(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/brand_dish_menu/dish/list_for_dispatch", params, method: "get", noLoading: true } as any)
}

export function getBrandDishStoreTree(params: any): any {
  return request({ url: "/ec/iotdm/cook/dish/get/brand_dish/store_tree", params, method: "get", noLoading: true } as any)
}

export function getAbnormalStoreList(data: any): any {
  return request({
    url: "/ec/iotdm/cook/dish/get/brand_dish/dispatch/abnormal_store/list",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function createCookMethod(data: any) {
  return request({
    url: "/ec/iotdm/cook/dish/create/cook_method",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function addBrandDishMenuDish(data: any) {
  return request({
    url: "/ec/iotdm/cook/dish/add/brand_dish_menu/dish",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function addBrandDishMenu(data: any) {
  return request({
    url: "/ec/iotdm/cook/dish/add/brand_dish_menu",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function changeDishDuration(data: any) {
  return request({
    url: "/ec/iotdm/cook/dish/change/brand_dish_menu/dish_duration",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function changeMenuDishStatus(data: any) {
  return request({
    url: "/ec/iotdm/cook/dish/change/brand_dish_menu/dish_status",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function createBrandDishDispatch(data: any) {
  return request({
    url: "/ec/iotdm/cook/dish/create/brand_dish/dispatch",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function editBrandDishImageOrVideo(data: any) {
  return request({
    url: "/ec/iotdm/cook/dish/edit/brand_dish",
    data,
    method: "post",
    headers: { "Content-Type": "application/json" },
  } as any)
}

export function updateStoreDishMenuDishCookTime(data: any): any {
  return request({ url: "/ec/iotdm/cook/dish/change/store_dish_menu/dish_duration", data, method: "post" })
}
