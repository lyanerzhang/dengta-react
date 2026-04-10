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

export interface RealtimeFormState {
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
