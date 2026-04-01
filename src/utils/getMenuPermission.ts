import { useAppStore, MenuPermission } from "@/store"
import MENUMAP, { MenuItem } from "@/enums/menu"

export function verifyPermission(keys: string[] | string): boolean {
  const menuPermission = useAppStore.getState().menuPermission

  if (Array.isArray(keys)) {
    return keys.some((key) => menuPermission[key])
  }
  return !!menuPermission[keys]
}

export function getMenuMap(menuList: MenuItem[] = MENUMAP): MenuItem[] {
  return menuList
    .map((item) => ({ ...item, children: item.children ? [...item.children] : undefined }))
    .filter((item) => {
      if (item.permissions && !verifyPermission(item.permissions)) {
        return false
      }
      if (item.children && item.children.length > 0) {
        item.children = getMenuMap(item.children)
        if (item.children.length === 0 && !item.path) {
          return false
        }
      }
      return true
    })
}

export function getRedirectPath(menuPermission: MenuPermission): string | false {
  if (menuPermission.DISH_WASHER_REALTIME_DATA) return "/userData/deviceRealTimeData"
  if (menuPermission.DISH_WASHER_FOOD_SAFETY_RISK) return "/userData/foodSafetyRisk"
  if (menuPermission.DISH_WASHER_ENERGY_CONSUMPTION) return "/userData/energyConsumption"
  if (menuPermission.DISH_WASHER_AFTER_SALE) return "/userData/aftersaleSevice"
  if (menuPermission.PCO) return "/userData/pcoDataBoard"
  if (menuPermission.DEVICE_COMBIOVEN_MONITOR) return "/userData/steamOvenDataBoard"
  if (menuPermission.DEVICE_BBQGRILL_MONITOR) return "/userData/bbqgrillRunningData"
  if (menuPermission.IOTDM_BRAND_DISH) return "/userData/brandDishesLibrary"
  if (menuPermission.IOTDM_BRAND_MENU) return "/userData/brandMenuManage"
  if (menuPermission.IOTDM_STORE_MENU) return "/userData/storeMenuManage"
  if (menuPermission.DEVICE_ENERGY_MONITOR) return "/userData/elecMonitorStoreList"
  return false
}
