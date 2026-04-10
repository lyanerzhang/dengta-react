import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import appReducer from "./appSlice"

export type { MenuPermission, FoodSafetyReqsState } from "./types"

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
  getUserMenuPermissions,
  getIsIntelligentWashUser,
  getAppUsagePermission,
  triggerLoading,
  clearAllState,
  clearRealtimeState,
  clearFoodSafetyState,
  setRealtimeNavState,
  setFoodSafetyNavState,
  setLoading,
} from "./appSlice"
