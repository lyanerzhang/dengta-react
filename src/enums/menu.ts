export interface MenuItem {
  key: string
  title?: string
  path?: string
  name?: string
  permissions?: string[]
  children?: MenuItem[]
}

const MENUMAP: MenuItem[] = [
  {
    key: "dishwasher_data",
    title: "洗碗机",
    permissions: [
      "DISH_WASHER_REALTIME_DATA",
      "DISH_WASHER_FOOD_SAFETY_RISK",
      "DISH_WASHER_ENERGY_CONSUMPTION",
      "DISH_WASHER_AFTER_SALE",
    ],
    children: [
      { key: "realtime", path: "/userData/deviceRealTimeData", name: "实时数据", permissions: ["DISH_WASHER_REALTIME_DATA"] },
      { key: "databoard", path: "/userData/dishwasherDataBoard", name: "数据看板", permissions: ["DISH_WASHER_DATA_VIEW"] },
      { key: "foodsafety", path: "/userData/foodSafetyRisk", name: "食安风险", permissions: ["DISH_WASHER_FOOD_SAFETY_RISK"] },
      { key: "energy", path: "/userData/energyConsumption", name: "能耗数据", permissions: ["DISH_WASHER_ENERGY_CONSUMPTION"] },
      { key: "aftersale", path: "/userData/aftersaleSevice", name: "服务信息", permissions: ["DISH_WASHER_AFTER_SALE"] },
    ],
  },
  {
    key: "pco",
    title: "智能有害生物防制",
    permissions: ["PCO"],
    children: [
      { key: "pcoBoard", path: "/userData/pcoDataBoard", name: "数据看板" },
      { key: "pcoRisk", path: "/userData/pcoStoreRishManagement", name: "门店风险" },
      { key: "pcoService", path: "/userData/pcoStoreServiceInformation", name: "服务信息" },
    ],
  },
  {
    key: "steamOven",
    title: "蒸烤箱",
    permissions: ["DEVICE_COMBIOVEN_MONITOR"],
    children: [
      { key: "steamBoard", path: "/userData/steamOvenDataBoard", name: "数据看板" },
    ],
  },
  {
    key: "bbqgrill",
    title: "智能烤炉",
    permissions: ["DEVICE_BBQGRILL_MONITOR"],
    children: [
      { key: "bbqRunning", path: "/userData/bbqgrillRunningData", name: "运行数据" },
    ],
  },
  {
    key: "dishes_issued",
    title: "菜品管理",
    permissions: ["IOTDM_BRAND_DISH", "IOTDM_BRAND_MENU", "IOTDM_STORE_MENU"],
    children: [
      { key: "brandDish", path: "/userData/brandDishesLibrary", name: "品牌菜品库", permissions: ["IOTDM_BRAND_DISH"] },
      { key: "brandMenu", path: "/userData/brandMenuManage", name: "品牌菜单管理", permissions: ["IOTDM_BRAND_MENU"] },
      { key: "storeMenu", path: "/userData/storeMenuManage", name: "门店菜单管理", permissions: ["IOTDM_STORE_MENU"] },
    ],
  },
  {
    key: "energy_manage",
    title: "能源管理",
    permissions: ["DEVICE_ENERGY_MONITOR"],
    children: [
      { key: "elecMonitor", path: "/userData/elecMonitorStoreList", name: "用电监测" },
    ],
  },
]

export default MENUMAP
