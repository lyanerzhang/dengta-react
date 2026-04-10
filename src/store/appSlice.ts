import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { getPassportConfig, getAppRedirectUrl } from "@/api/public"
import { getIsIntelligentWashUser as fetchIsIntelligentWashUser } from "@/api/dishwasher"
import type { FoodSafetyReqsState, MenuPermission, RealtimeFormState } from "./types"

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

export interface AppSliceState {
  permissions: Record<string, unknown>
  userPermission: Record<string, unknown>
  menuPermission: MenuPermission
  isIntelligentWashUser: boolean | null
  loading: boolean
  _realtimeForm: RealtimeFormState | null
  _realtimeStoreName: string
  _realtimeAbnormal: number[]
  _foodSafetyReqs: FoodSafetyReqsState | null
  _foodSafetyStoreName: string
  _foodSafetyDateType: number
}

const initialState: AppSliceState = {
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
}

export const getUserMenuPermissions = createAsyncThunk(
  "app/getUserMenuPermissions",
  async () => {
    const res = await getPassportConfig()
    if (res.it) {
      localStorage.setItem("imgToken", res.it)
    }
    return res.perms
  }
)

export const getIsIntelligentWashUser = createAsyncThunk(
  "app/getIsIntelligentWashUser",
  async () => {
    try {
      const res = await fetchIsIntelligentWashUser()
      return res?.is_intelligent_wash_user || false
    } catch (err) {
      console.error("获取智洗用户状态失败:", err)
      return false
    }
  }
)

export const getAppUsagePermission = createAsyncThunk(
  "app/getAppUsagePermission",
  async (appToken: string) => {
    try {
      const res: any = await getAppRedirectUrl(appToken)
      window.location.href = res.auth_url
    } catch (err) {
      console.error(err)
    }
  }
)

export const triggerLoading = createAsyncThunk("app/triggerLoading", async (_, { dispatch }) => {
  dispatch(appSlice.actions.setLoading(true))
  await new Promise((resolve) => setTimeout(resolve, 1000))
  dispatch(appSlice.actions.setLoading(false))
})

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    clearRealtimeState(state) {
      state._realtimeForm = null
      state._realtimeStoreName = ""
      state._realtimeAbnormal = []
    },
    clearFoodSafetyState(state) {
      state._foodSafetyReqs = null
      state._foodSafetyStoreName = ""
      state._foodSafetyDateType = 2
    },
    clearAllState(state) {
      state.permissions = {}
      state.userPermission = {}
      state.menuPermission = { ...initialMenuPermission }
      state.isIntelligentWashUser = null
      state.loading = false
      state._realtimeForm = null
      state._realtimeStoreName = ""
      state._realtimeAbnormal = []
      state._foodSafetyReqs = null
      state._foodSafetyStoreName = ""
      state._foodSafetyDateType = 2
    },
    setRealtimeNavState(
      state,
      action: PayloadAction<{
        _realtimeForm: RealtimeFormState
        _realtimeStoreName: string
        _realtimeAbnormal: number[]
      }>
    ) {
      state._realtimeForm = action.payload._realtimeForm
      state._realtimeStoreName = action.payload._realtimeStoreName
      state._realtimeAbnormal = action.payload._realtimeAbnormal
    },
    setFoodSafetyNavState(
      state,
      action: PayloadAction<{
        _foodSafetyReqs: FoodSafetyReqsState
        _foodSafetyStoreName: string
        _foodSafetyDateType: number
      }>
    ) {
      state._foodSafetyReqs = action.payload._foodSafetyReqs
      state._foodSafetyStoreName = action.payload._foodSafetyStoreName
      state._foodSafetyDateType = action.payload._foodSafetyDateType
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserMenuPermissions.fulfilled, (state, action) => {
      state.menuPermission = { ...action.payload, isGetPermission: true }
    })
    builder.addCase(getIsIntelligentWashUser.fulfilled, (state, action) => {
      state.isIntelligentWashUser = action.payload
    })
  },
})

export const {
  setLoading,
  clearRealtimeState,
  clearFoodSafetyState,
  clearAllState,
  setRealtimeNavState,
  setFoodSafetyNavState,
} = appSlice.actions

export default appSlice.reducer
