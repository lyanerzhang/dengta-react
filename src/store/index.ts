import { create } from "zustand"
import { getPassportConfig, getAppRedirectUrl } from "@/api/public"
import { getIsIntelligentWashUser as fetchIsIntelligentWashUser } from "@/api/dishwasher"

export interface MenuPermission {
  isGetPermission: boolean
  DISH_WASHER_REALTIME_DATA: boolean
  DISH_WASHER_DATA_VIEW: boolean
  DISH_WASHER_FOOD_SAFETY_RISK: boolean
  DISH_WASHER_ENERGY_CONSUMPTION: boolean
  DISH_WASHER_AFTER_SALE: boolean
  PCO: boolean
  DEVICE_ENERGY_MONITOR: boolean
  IOTDM_BRAND_DISH: boolean
  IOTDM_BRAND_MENU: boolean
  IOTDM_STORE_MENU: boolean
  DEVICE_BBQGRILL_MONITOR: boolean
  DEVICE_COMBIOVEN_MONITOR: boolean
  DENGTA_DEMO: boolean
  [key: string]: boolean
}

interface RealtimeFormState {
  store_id: string
  city_id: string
}

export interface FoodSafetyReqsState {
  store_id: string
  city_id: string
  start_date: string
  end_date: string
  abnormal_choices: number[]
  /** 门店评估风险等级筛选，与 dengta-pc 一致传 store_risk_level */
  store_risk_levels: number[]
}

interface AppState {
  permissions: Record<string, any>
  userPermission: Record<string, any>
  menuPermission: MenuPermission
  isIntelligentWashUser: boolean | null
  loading: boolean

  _realtimeForm: RealtimeFormState | null
  _realtimeStoreName: string
  _realtimeAbnormal: number[]

  _foodSafetyReqs: FoodSafetyReqsState | null
  _foodSafetyStoreName: string
  _foodSafetyDateType: number

  getUserMenuPermissions: () => Promise<void>
  getAppUsagePermission: (appToken: string) => Promise<void>
  getIsIntelligentWashUser: () => Promise<void>
  setLoading: (loading: boolean) => void
  clearAllState: () => void
  clearRealtimeState: () => void
  clearFoodSafetyState: () => void
}

const initialMenuPermission: MenuPermission = {
  isGetPermission: false,
  DISH_WASHER_REALTIME_DATA: false,
  DISH_WASHER_DATA_VIEW: false,
  DISH_WASHER_FOOD_SAFETY_RISK: false,
  DISH_WASHER_ENERGY_CONSUMPTION: false,
  DISH_WASHER_AFTER_SALE: false,
  PCO: false,
  DEVICE_ENERGY_MONITOR: false,
  IOTDM_BRAND_DISH: false,
  IOTDM_BRAND_MENU: false,
  IOTDM_STORE_MENU: false,
  DEVICE_BBQGRILL_MONITOR: false,
  DEVICE_COMBIOVEN_MONITOR: false,
  DENGTA_DEMO: false,
}

export const useAppStore = create<AppState>((set) => ({
  permissions: {},
  userPermission: {},
  menuPermission: { ...initialMenuPermission },
  isIntelligentWashUser: null,
  loading: false,

  _realtimeForm: null,
  _realtimeStoreName: "",
  _realtimeAbnormal: [],

  _foodSafetyReqs: null,
  _foodSafetyStoreName: "",
  _foodSafetyDateType: 2,

  async getUserMenuPermissions() {
    const res = await getPassportConfig()
    set({
      menuPermission: { ...res.perms, isGetPermission: true },
    })
    if (res.it) {
      localStorage.setItem("imgToken", res.it)
    }
  },

  async getAppUsagePermission(appToken: string) {
    try {
      const res: any = await getAppRedirectUrl(appToken)
      window.location.href = res.auth_url
    } catch (err) {
      console.error(err)
    }
  },

  async getIsIntelligentWashUser() {
    try {
      const res = await fetchIsIntelligentWashUser()
      set({ isIntelligentWashUser: res?.is_intelligent_wash_user || false })
    } catch (err) {
      console.error("获取智洗用户状态失败:", err)
      set({ isIntelligentWashUser: false })
    }
  },

  setLoading(loading: boolean) {
    set({ loading })
    if (loading) {
      setTimeout(() => set({ loading: false }), 1000)
    }
  },

  clearRealtimeState() {
    set({
      _realtimeForm: null,
      _realtimeStoreName: "",
      _realtimeAbnormal: [],
    })
  },

  clearFoodSafetyState() {
    set({
      _foodSafetyReqs: null,
      _foodSafetyStoreName: "",
      _foodSafetyDateType: 2,
    })
  },

  clearAllState() {
    set({
      permissions: {},
      userPermission: {},
      menuPermission: { ...initialMenuPermission },
      isIntelligentWashUser: null,
      loading: false,
      _realtimeForm: null,
      _realtimeStoreName: "",
      _realtimeAbnormal: [],
      _foodSafetyReqs: null,
      _foodSafetyStoreName: "",
      _foodSafetyDateType: 2,
    })
  },
}))
