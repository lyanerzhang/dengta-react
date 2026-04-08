import { lazy, Suspense } from "react"
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
} from "react-router-dom"
import AuthGuard from "./AuthGuard"

const UserLogin = lazy(() => import("@/views/dishwasher/UserLogin"))
const AgreementFile = lazy(() => import("@/views/dishwasher/AgreementFile"))
const UserData = lazy(() => import("@/views/dishwasher/UserData"))
const DeviceRealTimeData = lazy(() => import("@/views/dishwasher/DeviceRealTimeData"))
const DishwasherDataBoard = lazy(() => import("@/views/dishwasher/DishwasherDataBoard"))
const FoodSafetyRisk = lazy(() => import("@/views/dishwasher/FoodSafetyRisk"))
const EnergyConsumption = lazy(() => import("@/views/dishwasher/EnergyConsumption"))
const StoreDetail = lazy(() => import("@/views/dishwasher/StoreDetail"))
const AftersaleService = lazy(() => import("@/views/dishwasher/AftersaleService"))

const BrandDishesLibrary = lazy(() => import("@/views/dishesManage/BrandDishesLibrary"))
const BrandMenuManage = lazy(() => import("@/views/dishesManage/BrandMenuManage"))
const MenuDishesList = lazy(() => import("@/views/dishesManage/MenuDishesList"))
const StoreMenuManage = lazy(() => import("@/views/dishesManage/StoreMenuManage"))
const StoreMenuDetail = lazy(() => import("@/views/dishesManage/StoreMenuDetail"))
const DishesDistributeStore = lazy(() => import("@/views/dishesManage/DishesDistributeStore"))

const PcoDataBoard = lazy(() => import("@/views/pco/DataBoard"))
const StoreRiskManagement = lazy(() => import("@/views/pco/StoreRiskManagement"))
const StoreServiceInformation = lazy(() => import("@/views/pco/StoreServiceInformation"))

const SteamOvenDataBoard = lazy(() => import("@/views/steamOven/DataBoard"))
const SteamOvenStoreDetail = lazy(() => import("@/views/steamOven/StoreDetail"))

const ElecMonitorStoreList = lazy(() => import("@/views/energyManage/ElecMonitorStoreList"))
const ElecMonitorStoreDetail = lazy(() => import("@/views/energyManage/ElecMonitorStoreDetail"))

const BbqgrillRunningData = lazy(() => import("@/views/bbqgrill/RunningData"))
const DengtaDemo = lazy(() => import("@/views/dishwasher/DengtaDemo"))

function LazyLoad({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          加载中...
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export interface RouteMeta {
  permissions?: string[]
  fromMenuPath?: string
}

export type AppRouteObject = RouteObject & {
  meta?: RouteMeta
  children?: AppRouteObject[]
}

export const routes: AppRouteObject[] = [
  { path: "/", element: <Navigate to="/userLogin" replace /> },
  {
    path: "/userLogin",
    element: <LazyLoad><UserLogin /></LazyLoad>,
  },
  {
    path: "/agreementFile",
    element: <LazyLoad><AgreementFile /></LazyLoad>,
  },
  {
    path: "/userData",
    element: (
      <AuthGuard>
        <LazyLoad><UserData /></LazyLoad>
      </AuthGuard>
    ),
    children: [
      {
        path: "dengtaDemo",
        element: <LazyLoad><DengtaDemo /></LazyLoad>,
        meta: { permissions: ["DENGTA_DEMO"] },
      },
      {
        path: "deviceRealTimeData",
        element: <LazyLoad><DeviceRealTimeData /></LazyLoad>,
        meta: { permissions: ["DISH_WASHER_REALTIME_DATA"] },
      },
      {
        path: "dishwasherDataBoard",
        element: <LazyLoad><DishwasherDataBoard /></LazyLoad>,
        meta: { permissions: ["DISH_WASHER_DATA_VIEW"] },
      },
      {
        path: "foodSafetyRisk",
        element: <LazyLoad><FoodSafetyRisk /></LazyLoad>,
        meta: { permissions: ["DISH_WASHER_FOOD_SAFETY_RISK"] },
      },
      {
        path: "energyConsumption",
        element: <LazyLoad><EnergyConsumption /></LazyLoad>,
        meta: { permissions: ["DISH_WASHER_ENERGY_CONSUMPTION"] },
      },
      {
        path: "storeDetail",
        element: <LazyLoad><StoreDetail /></LazyLoad>,
        meta: {
          permissions: ["DISH_WASHER_REALTIME_DATA", "DISH_WASHER_FOOD_SAFETY_RISK", "DISH_WASHER_ENERGY_CONSUMPTION"],
          fromMenuPath: "/userData/deviceRealTimeData",
        },
      },
      {
        path: "aftersaleSevice",
        element: <LazyLoad><AftersaleService /></LazyLoad>,
        meta: { permissions: ["DISH_WASHER_AFTER_SALE"] },
      },
      {
        path: "brandDishesLibrary",
        element: <LazyLoad><BrandDishesLibrary /></LazyLoad>,
        meta: { permissions: ["IOTDM_BRAND_DISH"] },
      },
      {
        path: "brandMenuManage",
        element: <LazyLoad><BrandMenuManage /></LazyLoad>,
        meta: { permissions: ["IOTDM_BRAND_MENU"] },
      },
      {
        path: "menuDishesList",
        element: <LazyLoad><MenuDishesList /></LazyLoad>,
        meta: { permissions: ["IOTDM_BRAND_MENU"], fromMenuPath: "/userData/brandMenuManage" },
      },
      {
        path: "storeMenuManage",
        element: <LazyLoad><StoreMenuManage /></LazyLoad>,
        meta: { permissions: ["IOTDM_STORE_MENU"] },
      },
      {
        path: "storeMenuDetail",
        element: <LazyLoad><StoreMenuDetail /></LazyLoad>,
        meta: { permissions: ["IOTDM_STORE_MENU"], fromMenuPath: "/userData/storeMenuManage" },
      },
      {
        path: "pcoDataBoard",
        element: <LazyLoad><PcoDataBoard /></LazyLoad>,
        meta: { permissions: ["PCO"] },
      },
      {
        path: "pcoStoreRishManagement",
        element: <LazyLoad><StoreRiskManagement /></LazyLoad>,
        meta: { permissions: ["PCO"] },
      },
      {
        path: "pcoStoreServiceInformation",
        element: <LazyLoad><StoreServiceInformation /></LazyLoad>,
        meta: { permissions: ["PCO"] },
      },
      {
        path: "steamOvenDataBoard",
        element: <LazyLoad><SteamOvenDataBoard /></LazyLoad>,
        meta: { permissions: ["DEVICE_COMBIOVEN_MONITOR"] },
      },
      {
        path: "steamOvenStoreDetail",
        element: <LazyLoad><SteamOvenStoreDetail /></LazyLoad>,
        meta: { permissions: ["DEVICE_COMBIOVEN_MONITOR"] },
      },
      {
        path: "elecMonitorStoreList",
        element: <LazyLoad><ElecMonitorStoreList /></LazyLoad>,
        meta: { permissions: ["DEVICE_ENERGY_MONITOR"] },
      },
      {
        path: "elecMonitorStoreDetail",
        element: <LazyLoad><ElecMonitorStoreDetail /></LazyLoad>,
        meta: { permissions: ["DEVICE_ENERGY_MONITOR"] },
      },
      {
        path: "bbqgrillRunningData",
        element: <LazyLoad><BbqgrillRunningData /></LazyLoad>,
        meta: { permissions: ["DEVICE_BBQGRILL_MONITOR"] },
      },
    ],
  },
  {
    path: "/dishesDistributeStore",
    element: (
      <AuthGuard>
        <LazyLoad><DishesDistributeStore /></LazyLoad>
      </AuthGuard>
    ),
    meta: { permissions: ["IOTDM_BRAND_MENU"] },
  },
  { path: "*", element: <Navigate to="/" replace /> },
]

/** 与 dengta-pc `createWebHistory` 的 `/demo` base 一致：体验版地址为 `/demo/userData/...` */
const routerBasename =
  typeof window !== "undefined" && window.location.pathname.includes("/demo") ? "/demo" : undefined

export const router = createBrowserRouter(routes, routerBasename ? { basename: routerBasename } : {})
