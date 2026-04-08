const mockData = {
  "api/ec/iotdm/dishwasher/get/visible_city_list": (params, data) => {
    return {
        data: getVisibleCityList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/dishwasher_lastest_report": (params, data) => {
    return {
        data: getDishwasherLastestReport(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/usage/overview": (params, data) => {
    return {
        data: getDishwasherUsageOverview(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/board/store_food_safety_risk": (params, data) => {
    return {
        data: getBoardStoreFoodSafetyRiskData(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/board/store_energy_overview": (params, data) => {
    return {
        data: getBoardStoreEnergyOverviewData(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/is_intelligent_wash_user": (params, data) => {
    return {
        data: getIsIntelligentWashUserData(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/device_detail/overview": (params, data) => {
    return {
        data: getDeviceDetailOverview(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/device_detail/realtime_info": (params, data) => {
    return {
        data: getDeviceDetailRealtimeInfo(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/device_detail/usage_list": (params, data) => {
    return {
        data: getDeviceDetailUsageList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/food_safety_risk_detail": (params, data) => {
    return {
        data: getFoodSafetyRiskDetail(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/food_safety_risk_overview": (params, data) => {
    return {
        data: getFoodSafetyRiskOverview(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/energy_detail": (params, data) => {
    return {
        data: getEnergyDetail(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/energy_overview": (params, data) => {
    return {
        data: getEnergyOverview(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/itr/ticket/ticket/filter/ticket/list/service_info": (params, data) => {
    return {
        data: getTicketListForAll(params, data),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ecmall/get/city/list.json": (params, data) => {
    return {
        data: getEcmallVisibleCityList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ecmall/get/ticket/list.json": (params, data) => {
    return {
        data: getEcmallVisibleTicketList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ecmall/get/repair_ticket/list.json": (params, data) => {
    // 维修工单
    return {
        data: getEcmallRepairTicketList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ecmall/get/train_ticket/list.json": (params, data) => {
    // 培训工单
    return {
        data: getEcmallTrainTicketList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ecmall/get/inspect_ticket/list.json": (params, data) => {
    // 巡检工单
    return {
        data: getEcmallInspectTicketList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/energy/get/store_device_energy_overview": (params, data) => {
    return {
        data: getStoreDeviceEnergyOverview(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/energy/get/device_energy_overview": (params, data) => {
    return {
        data: getDeviceEnergyOverview(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/energy/get/device_energy_contrast": (params, data) => {
    return {
        data: getDeviceEnergyContrast(params, data),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/energy/get/device_energy_detail": (params, data) => {
    return {
        data: getDeviceEnergyDetail(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/energy/get/device_use_detail": (params, data) => {
    return {
        data: getDeviceUseDetail(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/itr/ticket/get/pco/lighthouse/enum": (params, data) => {
    return {
        data: getPcoLighthouseEnum(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/itr/ticket/get/store/standard_list": (params, data) => {
    return {
        data: getStoreStandardList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/itr/ticket/get/pco/lighthouse/store/info": (params, data) => {
    return {
        data: getPcoLighthouseStoreInfo(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/pco/get/store/monitor_point/list": (params, data) => {
    return {
        data: getPcoLighthouseMonitorPointList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/pco/get/service_overview/stats": (params, data) => {
    return {
        data: getPcoLighthouseServiceOverviewStats(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/pco/get/intelligent/monitor/stats": (params, data) => {
    return {
        data: getPcoLighthouseIntelligentMonitorStats(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/pco/get/intelligent/monitor/event_list": (params, data) => {
    return {
        data: getPcoLighthouseIntelligentMonitorEventList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/pco/get/message/list": (params, data) => {
    return {
        data: getPcoLighthouseMessageList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/dishwasher/get/visible_store_list": (params, data) => {
    return {
        data: getVisibleStoreList(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
  "api/ec/iotdm/pco/mark/message/read": (params, data) => {
    return {
        data: markMessageRead(params),
        status: 200,
        statusText: 'OK',
        headers: {},
    }
  },
    // 菜品管理-品牌菜品库
    "api/ec/iotdm/cook/dish/get/brand_dish/list":  (params, data) => {
        return {
            data: getBrandDishList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-品牌菜单管理-烹饪方式
    "api/ec/iotdm/cook/dish/get/cook_method/list":  (params, data) => {
        return {
            data: getCookMethodList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-品牌菜单管理-列表
    "api/ec/iotdm/cook/dish/get/brand_dish_menu/list": (params, data) => {
        return {
            data: getBrandDishMenuList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-品牌菜单管理-编辑菜品
    "api/ec/iotdm/cook/dish/get/brand_dish_menu/dish/list": (params, data) => {
        return {
            data: getBrandDishMenuDishList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-品牌菜单管理-下发
    "api/ec/iotdm/cook/dish/get/brand_dish_menu/dish/list_for_dispatch": (params, data) => {
        return {
            data: getListForDispatch(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-品牌菜单管理-下发
    "api/ec/iotdm/cook/dish/get/brand_dish/store_tree": (params, data) => {
        return {
            data: getBrandDishStoreTree(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-品牌菜单列表-添加菜品
    "api/ec/iotdm/cook/dish/get/brand_dish/list_for_menu_add_dish": (params, data) => {
        return {
            data: getDishListForAdd(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-品牌菜单管理-编辑菜品烹饪时长
    "api/ec/iotdm/cook/dish/get/brand_dish_menu/same_image_recognition_dish_list": (params, data) => {
        return {
            data: getSameDishList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-门店菜单管理-门店菜单列表
    "api/ec/iotdm/cook/dish/get/store_dish_menu/list": (params, data) => {
        return {
            data: getStoreDishMenuList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-门店菜单管理-编辑菜品
    "api/ec/iotdm/cook/dish/get/store_dish_menu/dish/list": (params, data) => {
        return {
            data: getStoreDishMenuDishList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    // 菜品管理-门店菜单管理-编辑烹饪时长
    "api/ec/iotdm/cook/dish/get/store_dish_menu/same_image_recognition_dish_list": (params, data) => {
        return {
            data: getStoreDishMenuDishListByImageId(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/combioven_running_overview": (params, data) => {
        return {
            data: getCombiovenRunningOverview(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/combioven_running_detail": (params, data) => {
        return {
            data: getCombiovenRunningDetail(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/visible_store_list": (params, data) => {
        return {
            data: getUsageVisibleStoreList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/visible_city_list": (params, data) => {
        return {
            data: getUsageVisibleStoreList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/store_combioven_running_overview": (params, data) => {
        return {
            data: getStoreCombiovenRunningOverview(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/store_combioven_running_trend": (params, data) => {
        return {
            data: getStoreCombiovenRunningTrend(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/store_combioven_running_detail": (params, data) => {
        return {
            data: getStoreCombiovenRunningDetail(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/store_combioven_running_abnormal_detail": (params, data) => {
        return {
            data: getStoreCombiovenRunningAbnormalDetail(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/bbqgrill_running_overview": (params, data) => {
        return {
            data: getBbqGrillOverview(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/bbqgrill_running_trend": (params, data) => {
        return {
            data: getBbqGrillTrend(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    },
    "api/ec/iotdm/cook/usage/get/bbqgrill_running_abnormal_usage_list": (params, data) => {
        return {
            data: getBbqGrillUsageList(params),
            status: 200,
            statusText: 'OK',
            headers: {},
        }
    }
}
function getStoreDishMenuDishListByImageId(params) {
    return {"success":true,"content":{"items":[]}}
}
function getSameDishList(params) {
    return {"success":true,"content":{"items":[]}}
}
function getDishListForAdd(params) {
    return {
        "success": true,
        "content": {
            "items": [
                {
                    "id": 1195,
                    "name": "烤海虾（串）",
                    "image_url": "/api/ticket/get/aly/oss/url.json?&object_name=iotdm/cook/935581766988706482-1766988702686.png&bucket_name=chuxin-dengta-pub",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1194,
                    "name": "熊猫羊麻辣串（6串）（串到家）",
                    "image_url": "",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1193,
                    "name": "烤鱿鱼须(外卖)",
                    "image_url": "",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1192,
                    "name": "烤鱿鱼（外卖）",
                    "image_url": "/api/ticket/get/aly/oss/url.json?&object_name=iotdm/cook/508311766988906133-1766988899679.png&bucket_name=chuxin-dengta-pub",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1191,
                    "name": "烤鱿鱼（1串份熟）",
                    "image_url": "",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1190,
                    "name": "熊猫羊羊肉小串（外卖）",
                    "image_url": "",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1189,
                    "name": "（抖）国贸专享｜周末单人轻享羊雪花·烤串畅吃",
                    "image_url": "",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1188,
                    "name": "（抖）国贸专享｜周末单人尊享鲍鱼·生蚝·烤串畅吃",
                    "image_url": "",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1187,
                    "name": "（抖）国贸专享｜周末单人招牌熊猫羊·烤串畅吃",
                    "image_url": "",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1186,
                    "name": "牛牛畅吃卡",
                    "image_url": "",
                    "cook_video_url": "",
                    "can_select": true
                },
                {
                    "id": 1185,
                    "name": "周末单人轻享羊雪花·烤串畅吃",
                    "image_url": "",
                    "cook_video_url": "",
                    "can_select": true
                },
            ]
        }
    }
}
function getStoreDishMenuDishList(params) {
    return {
        "success": true,
        "content": {
            "items": [
                {
                    "id": 598,
                    "name": "熊猫羊麻辣串（6串）（串到家）",
                    "status": 1,
                    "duration": 300,
                    "timeout_duration": 60,
                    "image_url": "/api/ticket/get/aly/oss/url.json?&object_name=iotdm/cook/508311766988906133-1766988899679.png&bucket_name=chuxin-dengta-pub",
                    "cook_video_url": ""
                },
                {
                    "id": 592,
                    "name": "烤海虾（串）",
                    "status": 1,
                    "duration": 30,
                    "timeout_duration": 5,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 709,
                    "name": "烤鱿鱼须(外卖)",
                    "status": 1,
                    "duration": 300,
                    "timeout_duration": 60,
                    "image_url": "/api/ticket/get/aly/oss/url.json?&object_name=iotdm/cook/508311766988906133-1766988899679.png&bucket_name=chuxin-dengta-pub",
                    "cook_video_url": ""
                },
                {
                    "id": 551,
                    "name": "烤鱿鱼（外卖）",
                    "status": 1,
                    "duration": 359,
                    "timeout_duration": 60,
                    "image_url": "/api/ticket/get/aly/oss/url.json?&object_name=iotdm/cook/508311766988906133-1766988899679.png&bucket_name=chuxin-dengta-pub",
                    "cook_video_url": ""
                },
                {
                    "id": 552,
                    "name": "烤鱿鱼（1串份熟）",
                    "status": 1,
                    "duration": 359,
                    "timeout_duration": 60,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 553,
                    "name": "熊猫羊羊肉小串（外卖）",
                    "status": 1,
                    "duration": 359,
                    "timeout_duration": 60,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 554,
                    "name": "芝士靠年糕（畅吃）",
                    "status": 2,
                    "duration": 359,
                    "timeout_duration": 60,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1064,
                    "name": "烤香肠（畅吃）",
                    "duration": 2,
                    "timeout_duration": 5,
                    "status": 2,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1065,
                    "name": "手工面包（畅吃）",
                    "duration": 9,
                    "timeout_duration": 15,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1066,
                    "name": "鱼豆腐(畅吃)",
                    "duration": 2,
                    "timeout_duration": 5,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                }
            ],
            "total": 10
        }
    }
}
function getStoreDishMenuList(params) {
    return {
        "success": true,
        "content": {
            "items": [
                {
                    "id": 34,
                    "name": "25秋季招牌烤串菜单",
                    "on_sale_dish_count": 8,
                    "cook_method": {
                        "id": 2,
                        "device_model": 1,
                        "device_model_name": "智能烤炉 01"
                    },
                    "store_name": "火星基地1号店",
                    "store_addr": "江苏省苏州市吴中区苏州工业园区苏州大道西118号苏悦广场北楼4楼"
                },
                {
                    "id": 24,
                    "name": "26春季招牌烤串菜单",
                    "on_sale_dish_count": 8,
                    "cook_method": {
                        "id": 6,
                        "device_model": 2,
                        "device_model_name": "ZK02 蒸烤箱",
                        "cook_mode": 1,
                        "cook_mode_name": "烤",
                        "temperature": 197,
                        "humidity": 12,
                        "wind_speed": 1,
                        "wind_speed_name": "1档"
                    },
                    "store_name": "火星基地2号店",
                    "store_addr": "江苏省苏州市吴中区苏州工业园区苏州大道西118号苏悦广场北楼4楼"
                },
                {
                    "id": 8,
                    "name": "烤串新品菜单",
                    "on_sale_dish_count": 8,
                    "cook_method": {
                        "id": 4,
                        "device_model": 2,
                        "device_model_name": "ZK02 蒸烤箱",
                        "cook_mode": 1,
                        "cook_mode_name": "烤",
                        "temperature": 197,
                        "humidity": 11,
                        "wind_speed": 2,
                        "wind_speed_name": "2档"
                    },
                    "store_name": "火星基地3号店",
                    "store_addr": "江苏省苏州市吴中区苏州工业园区苏州大道西118号苏悦广场北楼4楼"
                }
            ],
            "total": 3
        }
    }
}
function getBrandDishStoreTree(params) {
    return {
        "success": true,
        "content": {
            "list": [
                {
                    "children": [
                        {
                            "count": 2,
                            "label": "北京城区",
                            "children": [
                                {
                                    "id": 14574,
                                    "label": "火星基地1号店",
                                    "store_addr": "北京市北京城区朝阳区亚运村大屯北路金泉美食宫4号电梯二层"
                                },
                                {
                                    "id": 14685,
                                    "label": "火星基地2号店",
                                    "store_addr": "北京市北京城区昌平区北京市昌平区城北街道永安路永安电脑城二层丰茂烤串(昌平永安路店)"
                                }
                            ]
                        },
                        {
                            "count": 1,
                            "label": "苏州市",
                            "children": [
                                {
                                    "id": 699475,
                                    "label": "火星基地3号店",
                                    "store_addr": "江苏省苏州市吴中区苏州工业园区苏州大道西118号苏悦广场北楼4楼"
                                }
                            ]
                        }
                    ],
                    "count": 3,
                    "label": "全国门店"
                }
            ]
        }
    }
}
function getListForDispatch(params) {
    return {
        "success": true,
        "content": {
            "items": [
                {
                    "id": 1062,
                    "name": "泰国椰子冰淇淋",
                    "image_url": "",
                    "cook_video_url": "",
                    "duration": 9,
                    "timeout_duration": 3,
                    "status": 1,
                    "can_select": true
                },
                {
                    "id": 1061,
                    "name": "羊汤加汤（免费）",
                    "image_url": "",
                    "cook_video_url": "",
                    "duration": 7,
                    "timeout_duration": 22,
                    "status": 1,
                    "can_select": true
                },
                {
                    "id": 1060,
                    "name": "肉蓉面",
                    "image_url": "",
                    "cook_video_url": "",
                    "duration": 7,
                    "timeout_duration": 18,
                    "status": 1,
                    "can_select": true
                },
                {
                    "id": 1059,
                    "name": "蜜汁烤鸡翅",
                    "image_url": "",
                    "cook_video_url": "",
                    "duration": 3,
                    "timeout_duration": 25,
                    "status": 1,
                    "can_select": true
                },
                {
                    "id": 1058,
                    "name": "烤生蚝",
                    "image_url": "",
                    "cook_video_url": "",
                    "duration": 9,
                    "timeout_duration": 15,
                    "status": 1,
                    "can_select": true
                },
                {
                    "id": 1057,
                    "name": "烤羊肉串",
                    "image_url": "",
                    "cook_video_url": "",
                    "duration": 2,
                    "timeout_duration": 5,
                    "status": 1,
                    "can_select": true
                }
            ]
        }
    }
}
function getBrandDishMenuDishList(params) {
    return {
        "success": true,
        "content": {
            "items": [
                {
                    "id": 1062,
                    "name": "熊猫羊麻辣串（6串）（串到家）",
                    "duration": 9,
                    "timeout_duration": 3,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1061,
                    "name": "烤海虾（串）",
                    "duration": 7,
                    "timeout_duration": 22,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1060,
                    "name": "烤鱿鱼须(外卖)",
                    "duration": 7,
                    "timeout_duration": 18,
                    "status": 2,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1059,
                    "name": "烤鱿鱼（外卖）",
                    "duration": 3,
                    "timeout_duration": 25,
                    "status": 2,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1058,
                    "name": "烤鱿鱼（1串份熟）",
                    "duration": 9,
                    "timeout_duration": 15,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1057,
                    "name": "熊猫羊羊肉小串（外卖）",
                    "duration": 2,
                    "timeout_duration": 5,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1063,
                    "name": "芝士靠年糕（畅吃）",
                    "duration": 9,
                    "timeout_duration": 15,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1064,
                    "name": "烤香肠（畅吃）",
                    "duration": 2,
                    "timeout_duration": 5,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1065,
                    "name": "手工面包（畅吃）",
                    "duration": 9,
                    "timeout_duration": 15,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                },
                {
                    "id": 1066,
                    "name": "鱼豆腐(畅吃)",
                    "duration": 2,
                    "timeout_duration": 5,
                    "status": 1,
                    "image_url": "",
                    "cook_video_url": ""
                }
            ],
            "total": 10
        }
    }
}
function getBrandDishMenuList(params) {
    return {
        "success": true,
        "content": {
            "items": [
                {
                    "id": 16,
                    "image_url": "",
                    "name": "25秋季招牌烤串菜单",
                    "on_sale_dish_count": 8,
                    "cook_method": {
                        "id": 2,
                        "device_model": 1,
                        "device_model_name": "智能烤炉 01"
                    }
                },
                {
                    "id": 14,
                    "image_url": "",
                    "name": "26春季招牌烤串菜单",
                    "on_sale_dish_count": 8,
                    "cook_method": {
                        "id": 5,
                        "device_model": 2,
                        "device_model_name": "ZK02 蒸烤箱",
                        "cook_mode": 2,
                        "cook_mode_name": "蒸烤",
                        "temperature": 233,
                        "humidity": 25,
                        "wind_speed": 1,
                        "wind_speed_name": "1档"
                    }
                },
                {
                    "id": 13,
                    "image_url": "",
                    "name": "烤串新品菜单",
                    "on_sale_dish_count": 8,
                    "cook_method": {
                        "id": 6,
                        "device_model": 2,
                        "device_model_name": "ZK02 蒸烤箱",
                        "cook_mode": 1,
                        "cook_mode_name": "烤",
                        "temperature": 197,
                        "humidity": 12,
                        "wind_speed": 1,
                        "wind_speed_name": "1档"
                    }
                }
            ],
            "total": 3
        }
    }
}
function getCookMethodList(params) {
    return {
        "success": true,
        "content": {
            "items": [
                {
                    "id": 6,
                    "device_model": 2,
                    "device_model_name": "ZK02 蒸烤箱",
                    "cook_mode": 1,
                    "cook_mode_name": "烤",
                    "temperature": 197,
                    "humidity": 12,
                    "wind_speed": 1,
                    "wind_speed_name": "1档"
                },
                {
                    "id": 5,
                    "device_model": 2,
                    "device_model_name": "ZK02 蒸烤箱",
                    "cook_mode": 2,
                    "cook_mode_name": "蒸烤",
                    "temperature": 233,
                    "humidity": 25,
                    "wind_speed": 1,
                    "wind_speed_name": "1档"
                },
                {
                    "id": 4,
                    "device_model": 2,
                    "device_model_name": "ZK02 蒸烤箱",
                    "cook_mode": 1,
                    "cook_mode_name": "烤",
                    "temperature": 197,
                    "humidity": 11,
                    "wind_speed": 2,
                    "wind_speed_name": "2档"
                },
                {
                    "id": 2,
                    "device_model": 1,
                    "device_model_name": "智能烤炉 01"
                }
            ]
        }
    }
}

function getBrandDishList(params) {
  return {
    "success": true,
    "content": {
        "items": [
            {
                "id": 1194,
                "name": "熊猫羊麻辣串（6串）（串到家）",
                "image_url": "",
                "cook_video_url": ""
            },
            {
                "id": 1195,
                "name": "烤海虾（串）",
                "image_url": "/api/ticket/get/aly/oss/url.json?&object_name=iotdm/cook/935581766988706482-1766988702686.png&bucket_name=chuxin-dengta-pub",
                "cook_video_url": ""
            },
            {
                "id": 1193,
                "name": "烤鱿鱼须(外卖)",
                "image_url": "",
                "cook_video_url": ""
            },
            {
                "id": 1192,
                "name": "烤鱿鱼（外卖）",
                "image_url": "/api/ticket/get/aly/oss/url.json?&object_name=iotdm/cook/935581766988706482-1766988702686.png&bucket_name=chuxin-dengta-pub",
                "cook_video_url": ""
            },
            {
                "id": 1191,
                "name": "烤鱿鱼（1串份熟）",
                "image_url": "/api/ticket/get/aly/oss/url.json?&object_name=iotdm/cook/935581766988706482-1766988702686.png&bucket_name=chuxin-dengta-pub",
                "cook_video_url": ""
            },
            {
                "id": 1190,
                "name": "熊猫羊羊肉小串（外卖）",
                "image_url": "",
                "cook_video_url": ""
            },
            {
                "id": 1196,
                "name": "芝士靠年糕（畅吃）",
                "image_url": "/api/ticket/get/aly/oss/url.json?&object_name=iotdm/cook/935581766988706482-1766988702686.png&bucket_name=chuxin-dengta-pub",
                "cook_video_url": ""
            },
            {
                "id": 1197,
                "name": "烤香肠（畅吃）",
                "image_url": "",
                "cook_video_url": ""
            },
            {
                "id": 1198,
                "name": "手工面包（畅吃）",
                "image_url": "",
                "cook_video_url": ""
            },
            {
                "id": 1199,
                "name": "鱼豆腐(畅吃)",
                "image_url": "",
                "cook_video_url": ""
            }
        ],
        "total": 10
    },
  }
}
function markMessageRead(params) {
  return {
    "success": true,
    "content": {},
  }
}

function getVisibleStoreList(params) {
    return {
        "success": true,
        "content": {
            "list": [
                {
                    "id": -1,
                    "name": "全部"
                },
                {
                    "id": 123,
                    "name": "火星基地1号店"
                }
            ]
        }
    }
}

function getVisibleCityList(params) {
  return {
    "success": true,
    "content": {
        "items": [
            {
                "id": -1,
                "name": "全部"
            },
            {
                "id": 301,
                "name": "淮安市"
            },
            {
                "id": 3,
                "name": "天津城区"
            },
            {
                "id": 159,
                "name": "郑州市"
            },
            {
                "id": 1,
                "name": "北京城区"
            },
            {
                "id": 160,
                "name": "武汉市"
            },
            {
                "id": 4,
                "name": "济南市"
            },
            {
                "id": 16,
                "name": "南京市"
            },
            {
                "id": 24,
                "name": "常州市"
            },
            {
                "id": 2,
                "name": "上海城区"
            },
            {
                "id": 401,
                "name": "淮南市"
            },
            {
                "id": 26,
                "name": "杭州市"
            },
            {
                "id": 134,
                "name": "黄石市"
            },
            {
                "id": 161,
                "name": "仙桃市"
            },
            {
                "id": 10,
                "name": "廊坊市"
            },
            {
                "id": 59,
                "name": "金华市"
            },
            {
                "id": 43,
                "name": "镇江市"
            },
            {
                "id": 303,
                "name": "六安市"
            },
            {
                "id": 14,
                "name": "苏州市"
            },
            {
                "id": 34,
                "name": "深圳市"
            },
            {
                "id": 35,
                "name": "台州市"
            },
            {
                "id": 55,
                "name": "绍兴市"
            },
            {
                "id": 27,
                "name": "宁波市"
            },
            {
                "id": 202,
                "name": "黄冈市"
            },
            {
                "id": 28,
                "name": "南通市"
            },
            {
                "id": 71,
                "name": "西安市"
            },
            {
                "id": 40,
                "name": "湖州市"
            },
            {
                "id": 33,
                "name": "广州市"
            },
            {
                "id": 98,
                "name": "荆州市"
            },
            {
                "id": 376,
                "name": "洛阳市"
            },
            {
                "id": 221,
                "name": "襄阳市"
            },
            {
                "id": 42,
                "name": "嘉兴市"
            },
            {
                "id": 272,
                "name": "成都市"
            },
            {
                "id": 322,
                "name": "孝感市"
            },
            {
                "id": 29,
                "name": "青岛市"
            },
            {
                "id": 116,
                "name": "长沙市"
            },
            {
                "id": 13,
                "name": "合肥市"
            },
            {
                "id": 6,
                "name": "邢台市"
            },
            {
                "id": 314,
                "name": "阜阳市"
            },
            {
                "id": 46,
                "name": "芜湖市"
            },
            {
                "id": 260,
                "name": "宿迁市"
            },
            {
                "id": 44,
                "name": "盐城市"
            },
            {
                "id": 23,
                "name": "无锡市"
            },
            {
                "id": 315,
                "name": "宣城市"
            },
            {
                "id": 174,
                "name": "安庆市"
            },
            {
                "id": 231,
                "name": "亳州市"
            },
            {
                "id": 320,
                "name": "连云港市"
            },
            {
                "id": 21,
                "name": "马鞍山市"
            },
            {
                "id": 19,
                "name": "扬州市"
            },
            {
                "id": 256,
                "name": "蚌埠市"
            },
            {
                "id": 108,
                "name": "黄山市"
            },
            {
                "id": 210,
                "name": "泰安市"
            },
            {
                "id": 334,
                "name": "滁州市"
            },
            {
                "id": 367,
                "name": "太原市"
            },
            {
                "id": 214,
                "name": "宿州市"
            },
            {
                "id": 230,
                "name": "重庆城区"
            },
            {
                "id": 282,
                "name": "铜陵市"
            },
            {
                "id": 25,
                "name": "徐州市"
            }
        ]
    }}
}

function getEcmallVisibleCityList(params) {
    return {
        "content": {
            "city_list": [
                { "city": "全部城市", "id": "", "district_code": "" },
                { "city": "北京市", "id": 1, "district_code": "110100" },
                { "city": "上海市", "id": 2, "district_code": "310100" },
                { "city": "天津市", "id": 3, "district_code": "120100" },
                { "city": "济南市", "id": 4, "district_code": "370100" },
                { "city": "邢台市", "id": 6, "district_code": "130500" },
                { "city": "廊坊市", "id": 10, "district_code": "131000" },
                { "city": "合肥市", "id": 13, "district_code": "340100" },
                { "city": "苏州市", "id": 14, "district_code": "320500" },
                { "city": "南京市", "id": 16, "district_code": "320100" },
                { "city": "扬州市", "id": 19, "district_code": "321000" },
                { "city": "马鞍山市", "id": 21, "district_code": "340500" },
                { "city": "无锡市", "id": 23, "district_code": "320200" },
                { "city": "常州市", "id": 24, "district_code": "320400" },
                { "city": "徐州市", "id": 25, "district_code": "320300" },
                { "city": "杭州市", "id": 26, "district_code": "330100" },
                { "city": "宁波市", "id": 27, "district_code": "330200" },
                { "city": "南通市", "id": 28, "district_code": "320600" },
                { "city": "青岛市", "id": 29, "district_code": "370200" },
                { "city": "广州市", "id": 33, "district_code": "440100" },
                { "city": "深圳市", "id": 34, "district_code": "440300" },
                { "city": "台州市", "id": 35, "district_code": "331000" },
                { "city": "湖州市", "id": 40, "district_code": "330500" },
                { "city": "嘉兴市", "id": 42, "district_code": "330400" },
                { "city": "镇江市", "id": 43, "district_code": "321100" },
                { "city": "盐城市", "id": 44, "district_code": "320900" },
                { "city": "芜湖市", "id": 46, "district_code": "340200" },
                { "city": "荆州市", "id": 98, "district_code": "421000" },
                { "city": "黄山市", "id": 108, "district_code": "341000" },
                { "city": "长沙市", "id": 116, "district_code": "430100" },
                { "city": "黄石市", "id": 134, "district_code": "420200" },
                { "city": "郑州市", "id": 159, "district_code": "410100" },
                { "city": "仙桃市", "id": 161, "district_code": "429004" },
                { "city": "武汉市", "id": 160, "district_code": "420100" },
                { "city": "安庆市", "id": 174, "district_code": "340800" },
                { "city": "泰安市", "id": 210, "district_code": "370900" },
                { "city": "宿州市", "id": 214, "district_code": "341300" },
                { "city": "襄阳市", "id": 221, "district_code": "420600" },
                { "city": "重庆市", "id": 230, "district_code": "500100" },
                { "city": "亳州市", "id": 231, "district_code": "341600" },
                { "city": "蚌埠市", "id": 256, "district_code": "340300" },
                { "city": "宿迁市", "id": 260, "district_code": "321300" },
                { "city": "成都市", "id": 272, "district_code": "510100" },
                { "city": "铜陵市", "id": 282, "district_code": "340700" },
                { "city": "淮安市", "id": 301, "district_code": "320800" },
                { "city": "六安市", "id": 303, "district_code": "341500" },
                { "city": "阜阳市", "id": 314, "district_code": "341200" },
                { "city": "宣城市", "id": 315, "district_code": "341800" },
                { "city": "连云港市", "id": 320, "district_code": "320700" },
                { "city": "孝感市", "id": 322, "district_code": "420900" },
                { "city": "滁州市", "id": 334, "district_code": "341100" },
                { "city": "太原市", "id": 367, "district_code": "140100" },
                { "city": "洛阳市", "id": 376, "district_code": "410300" },
                { "city": "淮南市", "id": 401, "district_code": "340400" },
                { "city": "绍兴市", "id": 55, "district_code": "330600" },
                { "city": "金华市", "id": 59, "district_code": "330700" },
                { "city": "西安市", "id": 71, "district_code": "610100" }
            ]
        },
        "success": true
    }
}

function getDishwasherLastestReport(params) {
    let list = []
    let allData = [
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地1号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "wash_start_time": "10:18:22",
            "wash_end_time": "10:19:23",
            "wash_duration": 61,
            "main_water_high_temperature_in_wash": 41.5,
            "rinse_water_high_temperature_in_wash": 88.8,
            "is_halfway_uncover": false
        },
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地2号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "wash_start_time": "10:19:22",
            "wash_end_time": "10:20:23",
            "wash_duration": 63,
            "main_water_high_temperature_in_wash": 52,
            "rinse_water_high_temperature_in_wash": 79.2,
            "is_halfway_uncover": false
        },
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地3号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "wash_start_time": "10:20:22",
            "wash_end_time": "10:21:23",
            "wash_duration": 62,
            "main_water_high_temperature_in_wash": 52,
            "rinse_water_high_temperature_in_wash": 81,
            "is_halfway_uncover": true
        }
    ]
    let total_num = 0
    let rawChoices = params.abnormal_choices
    if (typeof rawChoices === 'string') {
        try {
            params.abnormal_choices = JSON.parse(rawChoices)
        } catch (e) {
            params.abnormal_choices = []
        }
    } else if (Array.isArray(rawChoices)) {
        params.abnormal_choices = rawChoices
    } else {
        params.abnormal_choices = []
    }
    const cid = params.city_id
    // dengta-react 未选城市时可能不传 city_id（undefined），与 PC 传空字符串一致
    const cityMatchesDemo =
        cid === '' ||
        cid === undefined ||
        cid === null ||
        cid === -1 ||
        cid === 210 ||
        cid === '210' ||
        Number(cid) === 210
    if (cityMatchesDemo) {
        if (params.abnormal_choices.length === 0) {
            return {
                "success": true,
                "content": {
                    "list": allData,
                    "total_num": 3
                }
            }
        }
        if (params.abnormal_choices.includes(5)) {
            allData.filter(item => item.main_water_high_temperature_in_wash < 50).forEach(item => {
                list.push(item)
                total_num++
            })
        }
        if (params.abnormal_choices.includes(6)) {
            allData.filter(item => item.rinse_water_high_temperature_in_wash < 80).forEach(item => {
                list.push(item)
                total_num++
            })
        }
        if (params.abnormal_choices.includes(7)) {
            allData.filter(item => item.is_halfway_uncover).forEach(item => {
                list.push(item)
                total_num++
            })
        }
    }
    return {
        "success": true,
        "content": {
            "list": list,
            "total_num": total_num
        }
    }
}

function getDishwasherUsageOverview(params) {
    return {
        "success": true,
        "content": {
            "update_date": formatDateWithOffset(0),
            "cooperating_store_count": 12,
            "intelligent_wash_store_count": 8,
            "cooperating_device_count": 45,
            "unconnected_device_count": 2
        }
    }
}

function getBoardStoreFoodSafetyRiskData(params) {
    // 与 dengta-pc 体验版演示对齐：饼图四类门店数与列表、下方统计一致，无门店重复出现在「高风险」与「优秀」
    return {
        "success": true,
        "content": {
            "good_store_count": 5,
            "low_risk_store_count": 2,
            "middle_risk_store_count": 1,
            "high_risk_store_count": 2,
            "food_safety_high_frequent_item": {
                "water_temperature_low_store_count": 0,
                "high_halfway_uncover_rate_store_count": 2,
                "not_change_water_store_count": 0,
                "dirty_glove_stored_store_count": 0,
                "overcrowded_layout_basket_store_count": 0
            },
            "operate_qualified": {
                "water_temperature_qualified_store_count": 7,
                "not_uncover_rate_store_count": 5,
                "change_water_store_count": 7,
                "dirty_glove_stored_qualified_store_count": 0,
                "layout_basket_qualified_store_count": 0
            },
            "high_risk_store_list": [
                { "store_id": 699476, "store_name": "火星基地6号店" },
                { "store_id": 699477, "store_name": "火星基地7号店" }
            ],
            "good_store_list": [
                { "store_id": 949940, "store_name": "火星基地1号店" },
                { "store_id": 949941, "store_name": "火星基地2号店" },
                { "store_id": 949942, "store_name": "火星基地3号店" },
                { "store_id": 949943, "store_name": "火星基地4号店" },
                { "store_id": 949944, "store_name": "火星基地5号店" }
            ]
        }
    }
}

function getBoardStoreEnergyOverviewData(params) {
    const start = params.start_date || formatDateWithOffset(-7)
    const end = params.end_date || formatDateWithOffset(-1)
    const list = []
    const d0 = new Date(start)
    const endD = new Date(end)
    let guard = 0
    let d = new Date(d0)
    // 与 dengta-pc 体验版一致：日总耗电约 4～10 kW·h，近 7 天曲线按天循环；超长区间重复该曲线
    const dailyCurveKwh = [4.2, 6.2, 5.1, 8.8, 10.0, 6.3, 7.4]
    while (d <= endD && guard++ < 120) {
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const event_date = `${y}-${m}-${day}`
        const i = list.length
        list.push({
            "event_date": event_date,
            "power_consumption": dailyCurveKwh[i % dailyCurveKwh.length]
        })
        d.setDate(d.getDate() + 1)
    }
    return {
        "success": true,
        "content": {
            "list": list,
            "high_power_store_list": [
                { "store_id": 949943, "store_name": "火星基地3号店" },
                { "store_id": 949944, "store_name": "火星基地4号店" },
                { "store_id": 949945, "store_name": "火星基地5号店" }
            ],
            "low_power_store_list": [
                { "store_id": 949940, "store_name": "火星基地1号店" },
                { "store_id": 949941, "store_name": "火星基地2号店" }
            ]
        }
    }
}

function getIsIntelligentWashUserData(params) {
    return {
        "success": true,
        "content": {
            "is_intelligent_wash_user": true
        }
    }
}


function getDeviceDetailOverview(params) {
    return {
        "success": true,
        "content": {
            "total_stat_days": 7,
            "real_used_days": 4,
            "total_basket_count": 97,
            "total_power_consumption_sum": 65.64,
            "not_change_water_days": 0,
            "avg_basket_count": 24.25,
            "avg_used_duration": 2.55,
            "avg_wash_speed": 9.51,
            "power_consumption_avg": 0.68,
            "halfway_uncover_rate": 1.03,
            "month_on_month_rate": -15.09,
            "year_to_year_rate": -10.94,
            "store_name": "火星基地1号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "cleanse_water_temperature_avg": 61.9,
            "rinse_water_temperature_avg": 85.7
        }
    }
}

function getDeviceDetailRealtimeInfo(params) {
    return {
        "success": true,
        "content": {
            "cleanse_temperature": 43.6,
            "rinse_water_high_temperature": 84.7,
            "order_device_name": "揭盖机X1"
        }
    }
}

function getDeviceDetailUsageList(params) {
    return {
        "success": true,
        "content": {
            "items": [
                {
                    "event_date": "2025-11-27",
                    "has_data": true,
                    "wash_count": 17,
                    "avg_cleanse_temperature": 61.5,
                    "avg_rinse_temperature": 85.8,
                    "power_consumption": 13.17,
                    "avg_power_consumption": 0.77,
                    "is_change_water": "是",
                    "change_water_time_points": [
                        "10:01:41"
                    ],
                    "change_water_count": 1,
                    "halfway_uncover_rate": 0.0,
                    "halfway_uncover": 0
                },
                {
                    "event_date": "2025-11-28",
                    "has_data": true,
                    "wash_count": 20,
                    "avg_cleanse_temperature": 61.8,
                    "avg_rinse_temperature": 85.3,
                    "power_consumption": 13.96,
                    "avg_power_consumption": 0.7,
                    "is_change_water": "是",
                    "change_water_time_points": [
                        "10:03:37"
                    ],
                    "change_water_count": 1,
                    "halfway_uncover_rate": 5.0,
                    "halfway_uncover": 1
                },
                {
                    "event_date": "2025-11-29",
                    "has_data": true,
                    "wash_count": 33,
                    "avg_cleanse_temperature": 62.9,
                    "avg_rinse_temperature": 85.6,
                    "power_consumption": 19.8,
                    "avg_power_consumption": 0.6,
                    "is_change_water": "是",
                    "change_water_time_points": [
                        "10:00:53"
                    ],
                    "change_water_count": 1,
                    "halfway_uncover_rate": 0.0,
                    "halfway_uncover": 0
                },
                {
                    "event_date": "2025-11-30",
                    "has_data": true,
                    "wash_count": 27,
                    "avg_cleanse_temperature": 61.3,
                    "avg_rinse_temperature": 85.8,
                    "power_consumption": 18.71,
                    "avg_power_consumption": 0.69,
                    "is_change_water": "是",
                    "change_water_time_points": [
                        "09:59:10"
                    ],
                    "change_water_count": 1,
                    "halfway_uncover_rate": 0.0,
                    "halfway_uncover": 0
                },
                {
                    "event_date": "2025-12-01",
                    "has_data": false,
                    "wash_count": "-",
                    "avg_cleanse_temperature": "-",
                    "avg_rinse_temperature": "-",
                    "power_consumption": "-",
                    "avg_power_consumption": "-",
                    "is_change_water": "-",
                    "change_water_time_points": "-",
                    "change_water_count": "-",
                    "halfway_uncover_rate": "-",
                    "halfway_uncover": "-"
                },
                {
                    "event_date": "2025-12-02",
                    "has_data": false,
                    "wash_count": "-",
                    "avg_cleanse_temperature": "-",
                    "avg_rinse_temperature": "-",
                    "power_consumption": "-",
                    "avg_power_consumption": "-",
                    "is_change_water": "-",
                    "change_water_time_points": "-",
                    "change_water_count": "-",
                    "halfway_uncover_rate": "-",
                    "halfway_uncover": "-"
                },
                {
                    "event_date": "2025-12-03",
                    "has_data": false,
                    "wash_count": "-",
                    "avg_cleanse_temperature": "-",
                    "avg_rinse_temperature": "-",
                    "power_consumption": "-",
                    "avg_power_consumption": "-",
                    "is_change_water": "-",
                    "change_water_time_points": "-",
                    "change_water_count": "-",
                    "halfway_uncover_rate": "-",
                    "halfway_uncover": "-"
                }
            ]
        }
    }
}

function getFoodSafetyRiskDetail(params) {
    let allData = [
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地1号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "real_used_days": 4,
            "avg_basket_count": 24.25,
            "halfway_uncover_rate": 1.03,
            "not_change_water_days": 0,
            "cleanse_water_temperature_avg": 61.9,
            "rinse_water_temperature_avg": 85.7
        },
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地2号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "real_used_days": 4,
            "avg_basket_count": 22.25,
            "halfway_uncover_rate": 1.03,
            "not_change_water_days": 0,
            "cleanse_water_temperature_avg": 49.2,
            "rinse_water_temperature_avg": 82.7
        },
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地3号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "real_used_days": 4,
            "avg_basket_count": 21.25,
            "halfway_uncover_rate": 1.03,
            "not_change_water_days": 0,
            "cleanse_water_temperature_avg": 65.4,
            "rinse_water_temperature_avg": 78.3
        },
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地4号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "real_used_days": 5,
            "avg_basket_count": 20.25,
            "halfway_uncover_rate": 20,
            "not_change_water_days": 0,
            "cleanse_water_temperature_avg": 61.9,
            "rinse_water_temperature_avg": 85.7
        },
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地5号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "real_used_days": 5,
            "avg_basket_count": 35.25,
            "halfway_uncover_rate": 0.5,
            "not_change_water_days": 2,
            "cleanse_water_temperature_avg": 61.9,
            "rinse_water_temperature_avg": 85.7
        },
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地6号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": false,
            "real_used_days": "-",
            "avg_basket_count": "-",
            "halfway_uncover_rate": "-",
            "not_change_water_days": "-",
            "cleanse_water_temperature_avg": "-",
            "rinse_water_temperature_avg": "-"
        },
    ]
    return {
        "success": true,
        "content": {
            "list": allData,
            "total_num": allData.length
        }
    }
}

function getFoodSafetyRiskOverview(params) {
    return {
        "success": true,
        "content": {
            "cooperating_store_count": 6,
            "cleanse_water_temperature_low_store_count": 1,
            "rinse_water_temperature_low_store_count": 1,
            "high_halfway_uncover_rate_store_count": 1,
            "not_change_water_store_count": 1,
            "unconnected_store_count": 1
        }
    }
}

function getEnergyDetail(params) {
    let allData = [
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地1号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "real_used_days": 4,
            "avg_basket_count": 24.25,
            "basket_count_total": 97,
            "total_power_consumption": 65.64,
            "power_consumption_avg": 0.68,
            "underfilled_layout_basket_count_rate": 25
        },
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地1号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": true,
            "real_used_days": 4,
            "avg_basket_count": 35.25,
            "basket_count_total": 120,
            "total_power_consumption": 65.64,
            "power_consumption_avg": 0.22,
            "underfilled_layout_basket_count_rate": 8
        },
        {
            "order_device_name": "揭盖机X1",
            "store_name": "火星基地1号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_number": "916130101486",
            "has_data": false,
            "real_used_days": "-",
            "avg_basket_count": "-",
            "basket_count_total": "-",
            "total_power_consumption": "-",
            "power_consumption_avg": "-",
            "underfilled_layout_basket_count_rate": "-"
        },
    ]
    return {
        "success": true,
        "content": {
            "list": allData,
            "total_num": allData.length
        }
    }
}

function getEnergyOverview(params) {
    return {
        "success": true,
        "content": {
            "cooperating_store_count": 3,
            "high_power_consumption_avg_store_count": 1,
            "total_energy": 272.12,
            "unconnected_store_count": 1
        }
    }
}

function getTicketListForAll(params, data) {
    // 新接口 POST body 为对象；旧接口可能为字符串
    const parsed = typeof data === 'string' ? JSON.parse(data) : (data || {})
    const businessTypeList = Array.isArray(parsed.business_type_list) ? parsed.business_type_list : []
    // PCO 服务信息列表（business_type=3）返回 PCO 工单格式，按 ticket_type_list / from_source_list 过滤
    if (businessTypeList.includes(3)) {
        const ticketTypeList = Array.isArray(parsed.ticket_type_list) ? parsed.ticket_type_list : []
        const fromSourceList = Array.isArray(parsed.from_source_list) ? parsed.from_source_list : []

        const pcoMockListAll = [
            // pco_service_type 1 灯塔云服务：ticket_type=301, from_source=3
            {
                id: 3001511,
                create_time: '2025-10-20 09:15:00',
                update_time: '2025-10-20 09:45:00',
                store_id: 949940,
                business_type: 3,
                ticket_type: 301,
                from_source: 3,
                arrive_time: '2025-10-20 09:30:00',
                leave_time: '2025-10-20 09:42:00',
                status: 4,
                status_name: '已完成',
                business_type_name: 'PCO',
                ticket_type_name: '虫害问题处理',
                pco_service_type: 1,
                pco_service_type_name: '灯塔云服务',
                store_info: { id: 949940, name: '火星基地1号店', addr: '(模拟地址)山东省泰安市泰山区望岳东路' },
                ticket_report: {
                    report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1'],
                    pdf_file: [],
                    temp_report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1']
                }
            },
            {
                id: 3001512,
                create_time: '2025-10-21 14:00:00',
                update_time: '2025-10-21 14:35:00',
                store_id: 949941,
                business_type: 3,
                ticket_type: 301,
                from_source: 3,
                arrive_time: '2025-10-21 14:20:00',
                leave_time: '2025-10-21 14:32:00',
                status: 4,
                status_name: '已完成',
                business_type_name: 'PCO',
                ticket_type_name: '虫害问题处理',
                pco_service_type: 1,
                pco_service_type_name: '灯塔云服务',
                store_info: { id: 949941, name: '火星基地2号店', addr: '(模拟地址)山东省泰安市泰山区望岳东路' },
                ticket_report: {
                    report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1'],
                    pdf_file: [],
                    temp_report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1']
                }
            },
            // pco_service_type 2 客户紧急服务：ticket_type=301, from_source in [1,2,4]
            {
                id: 3001510,
                create_time: '2025-10-22 10:30:19',
                update_time: '2025-10-22 10:43:37',
                store_id: 949940,
                business_type: 3,
                ticket_type: 301,
                from_source: 2,
                arrive_time: '2025-10-22 10:40:58',
                leave_time: '2025-10-22 10:41:00',
                status: 4,
                status_name: '已完成',
                business_type_name: 'PCO',
                ticket_type_name: '虫害问题处理',
                pco_service_type: 2,
                pco_service_type_name: '客户紧急服务',
                store_info: { id: 949940, name: '火星基地1号店', addr: '(模拟地址)山东省泰安市泰山区望岳东路' },
                ticket_report: {
                    report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1'],
                    pdf_file: [],
                    temp_report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1']
                }
            },
            {
                id: 3001513,
                create_time: '2025-10-23 11:00:00',
                update_time: '2025-10-23 11:28:00',
                store_id: 949942,
                business_type: 3,
                ticket_type: 301,
                from_source: 1,
                arrive_time: '2025-10-23 11:15:00',
                leave_time: '2025-10-23 11:25:00',
                status: 4,
                status_name: '已完成',
                business_type_name: 'PCO',
                ticket_type_name: '虫害问题处理',
                pco_service_type: 2,
                pco_service_type_name: '客户紧急服务',
                store_info: { id: 949942, name: '火星基地3号店', addr: '(模拟地址)山东省泰安市泰山区望岳东路' },
                ticket_report: {
                    report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1'],
                    pdf_file: [],
                    temp_report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1']
                }
            },
            // pco_service_type 3 常规服务：ticket_type=302
            {
                id: 3001514,
                create_time: '2025-10-24 08:30:00',
                update_time: '2025-10-24 09:10:00',
                store_id: 949940,
                business_type: 3,
                ticket_type: 302,
                arrive_time: '2025-10-24 08:45:00',
                leave_time: '2025-10-24 09:05:00',
                status: 4,
                status_name: '已完成',
                business_type_name: 'PCO',
                ticket_type_name: '常规服务',
                pco_service_type: 3,
                pco_service_type_name: '常规服务',
                store_info: { id: 949940, name: '火星基地1号店', addr: '(模拟地址)山东省泰安市泰山区望岳东路' },
                ticket_report: {
                    report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1'],
                    pdf_file: [],
                    temp_report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1']
                }
            },
            {
                id: 3001515,
                create_time: '2025-10-25 15:00:00',
                update_time: '2025-10-25 15:40:00',
                store_id: 949943,
                business_type: 3,
                ticket_type: 302,
                arrive_time: '2025-10-25 15:20:00',
                leave_time: '2025-10-25 15:38:00',
                status: 4,
                status_name: '已完成',
                business_type_name: 'PCO',
                ticket_type_name: '常规服务',
                pco_service_type: 3,
                pco_service_type_name: '常规服务',
                store_info: { id: 949943, name: '火星基地4号店', addr: '(模拟地址)山东省泰安市泰山区望岳东路' },
                ticket_report: {
                    report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1'],
                    pdf_file: [],
                    temp_report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1']
                }
            },
            // pco_service_type 4 勘查服务：ticket_type=303
            {
                id: 3001516,
                create_time: '2025-10-26 10:00:00',
                update_time: '2025-10-26 10:50:00',
                store_id: 949941,
                business_type: 3,
                ticket_type: 303,
                arrive_time: '2025-10-26 10:25:00',
                leave_time: '2025-10-26 10:48:00',
                status: 4,
                status_name: '已完成',
                business_type_name: 'PCO',
                ticket_type_name: '勘查服务',
                pco_service_type: 4,
                pco_service_type_name: '勘查服务',
                store_info: { id: 949941, name: '火星基地5号店', addr: '(模拟地址)山东省泰安市泰山区望岳东路' },
                ticket_report: {
                    report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1'],
                    pdf_file: [],
                    temp_report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1']
                }
            },
            {
                id: 3001517,
                create_time: '2025-10-27 13:30:00',
                update_time: '2025-10-27 14:15:00',
                store_id: 949942,
                business_type: 3,
                ticket_type: 303,
                arrive_time: '2025-10-27 13:50:00',
                leave_time: '2025-10-27 14:12:00',
                status: 4,
                status_name: '已完成',
                business_type_name: 'PCO',
                ticket_type_name: '勘查服务',
                pco_service_type: 4,
                pco_service_type_name: '勘查服务',
                store_info: { id: 949942, name: '火星基地3号店', addr: '(模拟地址)山东省泰安市泰山区望岳东路' },
                ticket_report: {
                    report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1'],
                    pdf_file: [],
                    temp_report_file: ['https://static.honganrobots.com/dengta-pc-demo/images/2-1.png?a=1']
                }
            }
        ]

        let pcoMockList = [...pcoMockListAll].sort(() => Math.random() - 0.5)
        if (ticketTypeList.length) {
            pcoMockList = pcoMockList.filter((item) => ticketTypeList.includes(item.ticket_type))
        }
        if (fromSourceList.length) {
            pcoMockList = pcoMockList.filter((item) => item.from_source !== null && item.from_source !== undefined && fromSourceList.includes(item.from_source))
        }

        return {
            success: true,
            content: {
                ticket_list: pcoMockList,
                total: pcoMockList.length
            }
        }
    }
    let mocklist = [
        // 巡检
        {
            "id": 3000011,
            "create_time": "2026-01-04 14:14:02",
            "update_time": "2026-01-05 14:33:52",
            "store_id": 88264,
            "store_name": "火星基地1号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_id": 25752,
            "business_type": 1,
            "ticket_type": 106,
            "create_remark": "",
            "create_images": [],
            "start_execute_date": "2026-01-05",
            "end_execute_date": "2026-01-05",
            "start_execute_time": "00:00",
            "end_execute_time": "23:59",
            "contact_id": "",
            "create_user_id": 2967,
            "from_source": 1,
            "need_call": false,
            "department_id": 92369930,
            "dispatch_department_remark": "系统自动分配",
            "dispatch_department_time": "2026-01-05 14:14:02",
            "dispatch_type": 1,
            "dispatch_user_id": 2967,
            "dispatch_time": "2026-01-05 14:14:12",
            "dispatch_remark": "",
            "responsible_engineer_id": 2967,
            "participating_engineer_ids": [],
            "is_third_party_execute": false,
            "need_home_visit": true,
            "arrive_time": "2026-01-05 14:14:34",
            "scene_image_list": [
                "https://static.honganrobots.com/dengta-pc-demo/images/6-1.jpg?a=1"
            ],
            "leave_time": "2026-01-05 14:14:38",
            "execute_remark": "",
            "status": 4,
            "close_reason": "",
            "close_time": "2026-01-05 14:15:47",
            "solved_status": "",
            "flow_id": "",
            "extra_info": {},
            "pco_ticket_extend": "",
            "external_device_ticket_extend": "",
            "survey_ticket_extend": "",
            "install_ticket_extend": "",
            "test_ticket_extend": "",
            "inspect_ticket_extend": {
                "inspect_type": 1,
                "inspect_type_name": "普通巡检",
                "service_result_type": 1,
                "service_result_type_name": "巡检报告",
                "service_result_creator_id": 2967,
                "is_clean_washing_arm": false,
                "is_clean_heat_recovery_cistern": false,
                "is_clean_cleanse_cistern": false,
                "is_clean_rinse_cistern": false,
                "is_training_washing_flow": false,
                "is_training_daily_washing": false,
                "is_training_cleanse_cistern": false,
                "is_training_simple_fault_dispose": false,
                "has_new_dishwasher": 1,
                "has_new_dishwasher_name": "是",
                "check_results": 2,
                "check_results_name": "部分项目异常，已修复",
                "check_results_abnormal_type_list": [
                    2
                ],
                "check_results_abnormal_type_name_list": [
                    "洗剂出液"
                ],
                "check_results_abnormal_info": "你看看",
                "check_results_abnormal_imgs": [],
                "check_washing_results": 2,
                "check_washing_results_name": "否",
                "cleanse_cistern_ppm": null,
                "degreasing_results": 0,
                "degreasing_results_name": "",
                "degreasing_abnormal_type_list": [],
                "degreasing_abnormal_type_name_list": [],
                "assisted_drying_results": 0,
                "assisted_drying_results_name": "",
                "assisted_drying_abnormal_type_list": [],
                "assisted_drying_abnormal_type_name_list": [],
                "status": 2,
                "status_name": "已提交",
                "residual_drier_count": 3.0,
                "residual_descaling_count": 1.0,
                "residual_lotion_count": 2.0,
                "inspect_content_info": "故障排查, 洗涤效果",
                "create_type": 4,
                "service_type": 2,
                "service_type_name": "巡检服务"
            },
            "risk_inspect_ticket_extend": "",
            "is_new_ticket": true,
            "status_name": "已完成",
            "business_type_name": "洗碗机",
            "ticket_type_name": "巡检",
            "from_source_name": "主动服务",
            "solved_status_name": "",
            "allow_service_advice": false,
            "charge_item_count": 0,
            "create_to_arrive_minute": 1440,
            "pco_service_type": null,
            "pco_service_type_name": "",
            "store_info": {
                "id": 88264,
                "name": "火星基地1号店",
                "brand_id": 381006,
                "valid": true,
                "city_id": 2,
                "district_code": "310112",
                "addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                "lat": 31.107538,
                "lng": 121.386604,
                "dianping_id": "k6gmR8nyiwzwlFoM",
                "sales_id": 6453,
                "team_id": 21,
                "store_progress": 25,
                "store_progress_name": "已验收",
                "operate_status": 1,
                "operate_status_name": "正常营业",
                "sales_district_id": 3157,
                "business_district_name": "莘庄",
                "city_info": {
                    "id": 2,
                    "name": "上海城区",
                    "district_code": "310100"
                },
                "district_position_info": {
                    "code": "310112",
                    "province": "上海市",
                    "city": "上海城区",
                    "district": "闵行区",
                    "sys_city_id": 2
                },
                "creator_id": 0,
                "created_at": "",
                "updated_at": "",
                "door_time_type": 0,
                "door_time_type_name": "",
                "return_visit_notice": "",
                "return_visit_status": "",
                "store_progress_update_time": "",
                "store_corp_type": 0,
                "store_corp_type_name": "",
                "string_dianping_id": "",
                "int_dianping_id": 0,
                "create_source": 0
            },
            "door_effective_info": {
                "store_id": 88264,
                "door_time_type": 3,
                "door_time_type_name": "本地4H"
            },
            "contact_info": {},
            "create_user_info": {
                "id": 2967,
                "username": "小明",
                "did": "1a23abdcb25f469c9d2d1e314e6285e3",
                "status": 2,
                "mobile": "18810499248",
                "join": "2020-11-16",
                "city_id": 1,
                "org_email": "caipengbo@honganrobots.com",
                "job_number": "H0295",
                "dingding_union_id": "bojBmsYYb6rGtsLK5piPPhAiEiE",
                "role_info": {},
                "departments": [
                    {
                        "id": 496108494,
                        "name": "运营后台组",
                        "is_valid": true,
                        "parent_id": 20082475
                    }
                ]
            },
            "responsible_engineer_info": {
                "id": 2967,
                "username": "小张",
                "did": "1a23abdcb25f469c9d2d1e314e6285e3",
                "status": 2,
                "mobile": "18810499248",
                "join": "2020-11-16",
                "city_id": 1,
                "org_email": "caipengbo@honganrobots.com",
                "job_number": "H0295",
                "dingding_union_id": "bojBmsYYb6rGtsLK5piPPhAiEiE",
                "role_info": {},
                "departments": [
                    {
                        "id": 496108494,
                        "name": "运营后台组",
                        "is_valid": true,
                        "parent_id": 20082475
                    }
                ]
            },
            "participating_engineer_info_list": [],
            "department_info": {
                "id": 92369930,
                "name": "上海2区",
                "role": 2,
                "level": 5,
                "is_valid": true,
                "parent_id": 359323574,
                "managers": [],
                "users": [],
                "children": []
            },
            "assets_obj_list": [],
            "requirement_list": [],
            "store_service_remark": "主洗连接管憋了需要更换12/12郑朝勇",
            "ecmall_order_device_type_name": "揭盖机(二代机)",
            "ecmall_order_assets_id": "",
            "contact_customer_time": ""
        },
        {
            "id": 3000011,
            "create_time": "2026-01-04 14:14:02",
            "update_time": "2026-01-05 14:33:52",
            "store_id": 88264,
            "store_name": "火星基地1号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_id": 25752,
            "business_type": 1,
            "ticket_type": 106,
            "create_remark": "",
            "create_images": [],
            "start_execute_date": "2026-01-05",
            "end_execute_date": "2026-01-05",
            "start_execute_time": "00:00",
            "end_execute_time": "23:59",
            "contact_id": "",
            "create_user_id": 2967,
            "from_source": 1,
            "need_call": false,
            "department_id": 92369930,
            "dispatch_department_remark": "系统自动分配",
            "dispatch_department_time": "2026-01-05 14:14:02",
            "dispatch_type": 1,
            "dispatch_user_id": 2967,
            "dispatch_time": "2026-01-05 14:14:12",
            "dispatch_remark": "",
            "responsible_engineer_id": 2967,
            "participating_engineer_ids": [],
            "is_third_party_execute": false,
            "need_home_visit": true,
            "arrive_time": "2026-01-05 14:14:34",
            "scene_image_list": [
                "https://static.honganrobots.com/dengta-pc-demo/images/3-1.jpg?a=1",
                "https://static.honganrobots.com/dengta-pc-demo/images/3-2.jpg?a=1"
            ],
            "leave_time": "2026-01-05 14:14:38",
            "execute_remark": "",
            "status": 4,
            "close_reason": "",
            "close_time": "2026-01-05 14:15:47",
            "solved_status": "",
            "flow_id": "",
            "extra_info": {},
            "pco_ticket_extend": "",
            "external_device_ticket_extend": "",
            "survey_ticket_extend": "",
            "install_ticket_extend": "",
            "test_ticket_extend": "",
            "inspect_ticket_extend": {
                "inspect_type": 1,
                "inspect_type_name": "普通巡检",
                "service_result_type": 1,
                "service_result_type_name": "巡检报告",
                "service_result_creator_id": 2967,
                "is_clean_washing_arm": false,
                "is_clean_heat_recovery_cistern": false,
                "is_clean_cleanse_cistern": false,
                "is_clean_rinse_cistern": false,
                "is_training_washing_flow": false,
                "is_training_daily_washing": false,
                "is_training_cleanse_cistern": false,
                "is_training_simple_fault_dispose": false,
                "has_new_dishwasher": 1,
                "has_new_dishwasher_name": "是",
                "check_results": 2,
                "check_results_name": "部分项目异常，已修复",
                "check_results_abnormal_type_list": [
                    2
                ],
                "check_results_abnormal_type_name_list": [
                    "洗剂出液"
                ],
                "check_results_abnormal_info": "你看看",
                "check_results_abnormal_imgs": [],
                "check_washing_results": 2,
                "check_washing_results_name": "否",
                "cleanse_cistern_ppm": null,
                "degreasing_results": 0,
                "degreasing_results_name": "",
                "degreasing_abnormal_type_list": [],
                "degreasing_abnormal_type_name_list": [],
                "assisted_drying_results": 0,
                "assisted_drying_results_name": "",
                "assisted_drying_abnormal_type_list": [],
                "assisted_drying_abnormal_type_name_list": [],
                "status": 2,
                "status_name": "已提交",
                "residual_drier_count": 3.0,
                "residual_descaling_count": 1.0,
                "residual_lotion_count": 2.0,
                "inspect_content_info": "故障排查, 洗涤效果",
                "create_type": 4,
                "service_type": 2,
                "service_type_name": "巡检服务"
            },
            "risk_inspect_ticket_extend": "",
            "is_new_ticket": true,
            "status_name": "已完成",
            "business_type_name": "洗碗机",
            "ticket_type_name": "巡检",
            "from_source_name": "主动服务",
            "solved_status_name": "",
            "allow_service_advice": false,
            "charge_item_count": 0,
            "create_to_arrive_minute": 1440,
            "pco_service_type": null,
            "pco_service_type_name": "",
            "store_info": {
                "id": 88264,
                "name": "火星基地1号店",
                "brand_id": 381006,
                "valid": true,
                "city_id": 2,
                "district_code": "310112",
                "addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                "lat": 31.107538,
                "lng": 121.386604,
                "dianping_id": "k6gmR8nyiwzwlFoM",
                "sales_id": 6453,
                "team_id": 21,
                "store_progress": 25,
                "store_progress_name": "已验收",
                "operate_status": 1,
                "operate_status_name": "正常营业",
                "sales_district_id": 3157,
                "business_district_name": "莘庄",
                "city_info": {
                    "id": 2,
                    "name": "上海城区",
                    "district_code": "310100"
                },
                "district_position_info": {
                    "code": "310112",
                    "province": "上海市",
                    "city": "上海城区",
                    "district": "闵行区",
                    "sys_city_id": 2
                },
                "creator_id": 0,
                "created_at": "",
                "updated_at": "",
                "door_time_type": 0,
                "door_time_type_name": "",
                "return_visit_notice": "",
                "return_visit_status": "",
                "store_progress_update_time": "",
                "store_corp_type": 0,
                "store_corp_type_name": "",
                "string_dianping_id": "",
                "int_dianping_id": 0,
                "create_source": 0
            },
            "door_effective_info": {
                "store_id": 88264,
                "door_time_type": 3,
                "door_time_type_name": "本地4H"
            },
            "contact_info": {},
            "create_user_info": {
                "id": 2967,
                "username": "小明",
                "did": "1a23abdcb25f469c9d2d1e314e6285e3",
                "status": 2,
                "mobile": "18810499248",
                "join": "2020-11-16",
                "city_id": 1,
                "org_email": "caipengbo@honganrobots.com",
                "job_number": "H0295",
                "dingding_union_id": "bojBmsYYb6rGtsLK5piPPhAiEiE",
                "role_info": {},
                "departments": [
                    {
                        "id": 496108494,
                        "name": "运营后台组",
                        "is_valid": true,
                        "parent_id": 20082475
                    }
                ]
            },
            "responsible_engineer_info": {
                "id": 2967,
                "username": "小明",
                "did": "1a23abdcb25f469c9d2d1e314e6285e3",
                "status": 2,
                "mobile": "18810499248",
                "join": "2020-11-16",
                "city_id": 1,
                "org_email": "caipengbo@honganrobots.com",
                "job_number": "H0295",
                "dingding_union_id": "bojBmsYYb6rGtsLK5piPPhAiEiE",
                "role_info": {},
                "departments": [
                    {
                        "id": 496108494,
                        "name": "运营后台组",
                        "is_valid": true,
                        "parent_id": 20082475
                    }
                ]
            },
            "participating_engineer_info_list": [],
            "department_info": {
                "id": 92369930,
                "name": "上海2区",
                "role": 2,
                "level": 5,
                "is_valid": true,
                "parent_id": 359323574,
                "managers": [],
                "users": [],
                "children": []
            },
            "assets_obj_list": [],
            "requirement_list": [],
            "store_service_remark": "主洗连接管憋了需要更换12/12郑朝勇",
            "ecmall_order_device_type_name": "揭盖机(二代机)",
            "ecmall_order_assets_id": "",
            "contact_customer_time": ""
        },
        {
            "id": 1477723,
            "create_time": "2025-12-30 17:24:37",
            "update_time": "2025-12-31 17:27:29",
            "store_id": 837552,
            "store_name": "火星基地1号店",
            "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
            "order_id": 89153,
            "business_type": 1,
            "ticket_type": 106,
            "create_remark": "",
            "create_images": [],
            "start_execute_date": "2025-12-31",
            "end_execute_date": "2025-12-31",
            "start_execute_time": "00:00",
            "end_execute_time": "23:59",
            "contact_id": 5046040,
            "create_user_id": 5937,
            "from_source": 2,
            "need_call": true,
            "department_id": 92594024,
            "dispatch_department_remark": "系统自动分配",
            "dispatch_department_time": "2025-12-31 17:24:39",
            "dispatch_type": 1,
            "dispatch_user_id": -20,
            "dispatch_time": "2025-12-31 17:24:39",
            "dispatch_remark": "系统自动分配",
            "responsible_engineer_id": 5937,
            "participating_engineer_ids": [],
            "is_third_party_execute": false,
            "need_home_visit": true,
            "arrive_time": "2025-12-31 17:25:01",
            "scene_image_list": [
                "https://static.honganrobots.com/dengta-pc-demo/images/5-1.jpg?a=1",
                "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1"
            ],
            "leave_time": "2025-12-31 17:25:08",
            "execute_remark": "",
            "status": 4,
            "close_reason": "",
            "close_time": "2025-12-31 17:27:29",
            "solved_status": "",
            "flow_id": "",
            "extra_info": {},
            "pco_ticket_extend": "",
            "external_device_ticket_extend": "",
            "survey_ticket_extend": "",
            "install_ticket_extend": "",
            "test_ticket_extend": "",
            "inspect_ticket_extend": {
                "inspect_type": 1,
                "inspect_type_name": "普通巡检",
                "service_result_type": 2,
                "service_result_type_name": "服务单",
                "service_result_creator_id": 5937,
                "is_clean_washing_arm": null,
                "is_clean_heat_recovery_cistern": null,
                "is_clean_cleanse_cistern": null,
                "is_clean_rinse_cistern": null,
                "is_training_washing_flow": null,
                "is_training_daily_washing": null,
                "is_training_cleanse_cistern": null,
                "is_training_simple_fault_dispose": null,
                "has_new_dishwasher": null,
                "has_new_dishwasher_name": "",
                "check_results": null,
                "check_results_name": "",
                "check_results_abnormal_type_list": [],
                "check_results_abnormal_type_name_list": [],
                "check_results_abnormal_info": "",
                "check_results_abnormal_imgs": [],
                "check_washing_results": null,
                "check_washing_results_name": "",
                "cleanse_cistern_ppm": null,
                "degreasing_results": null,
                "degreasing_results_name": "",
                "degreasing_abnormal_type_list": [],
                "degreasing_abnormal_type_name_list": [],
                "assisted_drying_results": null,
                "assisted_drying_results_name": "",
                "assisted_drying_abnormal_type_list": [],
                "assisted_drying_abnormal_type_name_list": [],
                "status": 1,
                "status_name": "待提交",
                "residual_drier_count": 0,
                "residual_descaling_count": 0,
                "residual_lotion_count": 0,
                "inspect_content_info": "主动检查-餐具清洁",
                "create_type": 4,
                "service_type": 2,
                "service_type_name": "巡检服务",
                "service_ticket_status": 3,
                "service_ticket_status_name": "已签字",
                "service_ticket_id": 13,
                "service_ticket_report_info": {
                    "customer_info": {
                        "brand_id": 14937,
                        "store_id": 837552,
                        "brand_name": "九田家",
                        "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                        "store_name": "火星基地2号店"
                    },
                    "customer_manager_info": {
                        "username": "小明",
                        "dept_name": "北京2区",
                        "job_number": "C3773",
                        "service_type_name": "主动检查-餐具清洁",
                        "service_date": "2025-12-31",
                        "service_datetime": "2025-12-31 17:26:25"
                    },
                    "service_result": {
                        "overview": "洗涤效果良好；洗涤效率良好",
                        "prominent_manifestation": null,
                        "scene_solve_risk_list": [],
                        "waiting_solve_risk_list": [],
                        "report_file_url": "/api/ticket/get/aly/oss/url.json?object_name=serviceReport/513271767173210487-九田家黑牛烤肉料理(首开胥江龙湖店)-fcef66e1-d9d0-4e3e-b3de-efa8df356f65.png",
                        "stats_risk_info": {
                            "device_count": 1,
                            "check_item_count": 13,
                            "good_condition_count": 13,
                            "waiting_solve_count": 0,
                            "waiting_solve_risk_count": 0,
                            "scene_solve_risk_count": 0,
                            "waiting_follow_solve_risk_count": 0
                        },
                        "stats_items": {
                            "1": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "2": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "3": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "4": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "5": {
                                "check_device_count": "-",
                                "find_risk_count": "-",
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "6": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "7": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "8": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "9": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "10": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "11": {
                                "check_device_count": "-",
                                "find_risk_count": "-",
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "12": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "13": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "14": {
                                "check_device_count": "-",
                                "find_risk_count": "-",
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "15": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "16": {
                                "check_device_count": 1,
                                "find_risk_count": 0,
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "17": {
                                "check_device_count": "-",
                                "find_risk_count": "-",
                                "scene_solve_risk_count": "-",
                                "waiting_solve_risk_count": "-"
                            },
                            "-1": {
                                "check_device_count": "-",
                                "find_risk_count": 0,
                                "scene_solve_risk_count": 0,
                                "waiting_solve_risk_count": 0
                            }
                        },
                        "disable_check_info_list": [],
                        "stats_value_added_service_items": [],
                        "upgrade_for_last": ""
                    },
                    "service_ticket_version": 7,
                    "check_detail": [
                        {
                            "device_name": "揭盖机-JGA309201200477",
                            "item_map": {
                                "9": {
                                    "item_name": "餐具洗涤效果",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1"
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "8": {
                                    "item_name": "洗剂打入及进液弯头",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1"
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "7": {
                                    "item_name": "洗剂位置、库存及保质期",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "13": {
                                    "item_name": "主漂洗温度、洗涤时间",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "4": {
                                    "item_name": "上下洗臂及水箱泡沫、残渣、水垢情况",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "2": {
                                    "item_name": "设备水平高度及动线",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "3": {
                                    "item_name": "溢流杆、滤网、水位开关/温度浓度探头、主洗抽水口",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "10": {
                                    "item_name": "洗碗工操作",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "15": {
                                    "item_name": "电磁阀&水管连接处、设备内部底板漏水检查",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "16": {
                                    "item_name": "排水管",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "12": {
                                    "item_name": "其他设备配件",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "6": {
                                    "item_name": "用电安全",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                },
                                "1": {
                                    "item_name": "操作贴纸、报修码及设备外部清洁",
                                    "enable_check": true,
                                    "risk_name_total": "",
                                    "scene_solve_risk_list": [],
                                    "waiting_solve_risk_list": [],
                                    "normal_item_explain": "",
                                    "image_list": [
                                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1",
                                    ],
                                    "last_service_risk_list": [],
                                    "last_service_submit_time": "2025-12-31"
                                }
                            },
                            "value_added_service_items_list": [],
                            "other_check_info": {
                                "explain": "",
                                "image_list": []
                            }
                        }
                    ],
                    "service_add_value": [],
                    "customer_signature_info": [
                        "/api/ticket/get/aly/oss/url.json?object_name=customerServiceTicketSign/741991767173209446-a1bba540-9b67-43f3-9880-3d2003cd2c72.png"
                    ],
                    "customer_manager_signature_info": [
                        "/api/ticket/get/aly/oss/url.json?object_name=customerServiceTicketSign/166551767173192464-6e3970d5-7d30-43ac-9710-87f6d2c97f3d.png"
                    ],
                    "show_customer_signature": false,
                    "device_count": 1,
                    "report_file_url": "/api/ticket/get/aly/oss/url.json?object_name=serviceReport/513271767173210487-九田家黑牛烤肉料理(首开胥江龙湖店)-fcef66e1-d9d0-4e3e-b3de-efa8df356f65.png",
                    "signature_contact_info": {
                        "id": 3159763,
                        "nickname": "白",
                        "tel": "139****9827",
                        "is_valid": true,
                        "org_type": 1,
                        "org_type_name": "品牌",
                        "brand_id": 14937,
                        "title": 1,
                        "title_name": "董事长/老板",
                        "decision_power": 1,
                        "decision_power_name": "最高决策者",
                        "creator_id": 2159,
                        "email": "",
                        "store_id": 0,
                        "updater_id": 0,
                        "roles": [],
                        "remark": "",
                        "is_finance_contact": false,
                        "other_feature": "",
                        "attitude_for_dishwasher": 0,
                        "attitude_for_dishwasher_name": "",
                        "attitude_for_cx": 0,
                        "attitude_for_cx_name": "",
                        "focus": "",
                        "objection_list": [],
                        "work_experience": ""
                    },
                    "is_customer_in_scene": true,
                    "is_agree_to_sign": true,
                    "source_type": 2,
                    "source_type_name": "巡检工单",
                    "source_type_id": 1477723
                }
            },
            "risk_inspect_ticket_extend": "",
            "is_new_ticket": true,
            "status_name": "已完成",
            "business_type_name": "洗碗机",
            "ticket_type_name": "巡检",
            "from_source_name": "客户发起",
            "solved_status_name": "",
            "allow_service_advice": false,
            "charge_item_count": 0,
            "create_to_arrive_minute": 1440,
            "pco_service_type": null,
            "pco_service_type_name": "",
            "store_info": {
                "id": 837552,
                "name": "火星基地2号店",
                "brand_id": 14937,
                "valid": true,
                "city_id": 1,
                "district_code": "110113",
                "addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                "lat": 40.087955,
                "lng": 116.545944,
                "dianping_id": "G1w26dRRNoSspkCO",
                "sales_id": 5937,
                "team_id": 46,
                "creator_id": 1296,
                "store_progress": 25,
                "store_progress_name": "已验收",
                "operate_status": 1,
                "operate_status_name": "正常营业",
                "sales_district_id": 3577,
                "city_info": {
                    "id": 1,
                    "name": "北京城区",
                    "district_code": "110100"
                },
                "district_position_info": {
                    "code": "110113",
                    "province": "北京市",
                    "city": "北京城区",
                    "district": "顺义区",
                    "sys_city_id": 1
                },
                "created_at": "",
                "updated_at": "",
                "door_time_type": 0,
                "door_time_type_name": "",
                "return_visit_notice": "",
                "return_visit_status": "",
                "store_progress_update_time": "",
                "store_corp_type": 0,
                "store_corp_type_name": "",
                "string_dianping_id": "",
                "int_dianping_id": 0,
                "business_district_name": "",
                "create_source": 0
            },
            "door_effective_info": {
                "store_id": 837552,
                "door_time_type": 3,
                "door_time_type_name": "本地4H"
            },
            "contact_info": {
                "id": 5046040,
                "nickname": "刘",
                "tel": "186****9222",
                "is_valid": true,
                "org_type": 4,
                "org_type_name": "售后(门店)",
                "store_id": 837552,
                "title": 9,
                "title_name": "门店店长",
                "decision_power": 5,
                "decision_power_name": "其他",
                "creator_id": 6813,
                "email": "",
                "brand_id": 0,
                "updater_id": 0,
                "roles": [],
                "remark": "",
                "is_finance_contact": false,
                "other_feature": "",
                "attitude_for_dishwasher": 0,
                "attitude_for_dishwasher_name": "",
                "attitude_for_cx": 0,
                "attitude_for_cx_name": "",
                "focus": "",
                "objection_list": [],
                "work_experience": ""
            },
            "create_user_info": {
                "id": 5937,
                "username": "小明",
                "did": "e80e0c6a99fc407e85df1baaaff8b54c",
                "status": 2,
                "mobile": "13051253140",
                "join": "2022-03-03",
                "city_id": 1,
                "org_email": "liangjinzong@honganrobots.com",
                "job_number": "C3773",
                "dingding_union_id": "L9Np6iS4bgcOiir801rPhDggiEiE",
                "role_info": {
                    "is_after_sale": true
                },
                "departments": [
                    {
                        "id": 92441802,
                        "name": "北京2区",
                        "role": 2,
                        "level": 5,
                        "is_valid": true,
                        "parent_id": 749999554
                    }
                ]
            },
            "responsible_engineer_info": {
                "id": 5937,
                "username": "小红",
                "did": "e80e0c6a99fc407e85df1baaaff8b54c",
                "status": 2,
                "mobile": "13051253140",
                "join": "2022-03-03",
                "city_id": 1,
                "org_email": "liangjinzong@honganrobots.com",
                "job_number": "C3773",
                "dingding_union_id": "L9Np6iS4bgcOiir801rPhDggiEiE",
                "role_info": {
                    "is_after_sale": true
                },
                "departments": [
                    {
                        "id": 92441802,
                        "name": "北京2区",
                        "role": 2,
                        "level": 5,
                        "is_valid": true,
                        "parent_id": 749999554
                    }
                ]
            },
            "participating_engineer_info_list": [],
            "department_info": {
                "id": 92594024,
                "name": "苏州1区",
                "role": 2,
                "level": 5,
                "is_valid": true,
                "parent_id": 750225192,
                "managers": [],
                "users": [],
                "children": []
            },
            "assets_obj_list": [],
            "requirement_list": [],
            "store_service_remark": "",
            "ecmall_order_device_type_name": "揭盖机(二代机)",
            "ecmall_order_assets_id": "",
            "contact_customer_time": ""
        },
        // 维修
        {
            "id": 2111216,
            "create_time": "2026-01-04 18:45:46",
            "update_time": "2026-01-21 15:48:15",
            "store_id": 948897,
            "order_id": 100670,
            "business_type": 1,
            "ticket_type": 105,
            "create_remark": "",
            "create_images": [],
            "start_execute_date": "2026-01-05",
            "end_execute_date": "2026-01-05",
            "start_execute_time": "00:00",
            "end_execute_time": "23:59",
            "contact_id": 5263933,
            "create_user_id": 7446,
            "from_source": 2,
            "need_call": false,
            "department_id": 92577093,
            "dispatch_department_remark": "",
            "dispatch_department_time": "2026-01-04 18:45:47",
            "dispatch_type": "",
            "dispatch_user_id": "",
            "dispatch_time": "",
            "dispatch_remark": "",
            "responsible_engineer_id": 7446,
            "participating_engineer_ids": [],
            "is_third_party_execute": false,
            "need_home_visit": true,
            "arrive_time": "2026-01-14 10:05:34",
            "scene_image_list": [
                "https://static.honganrobots.com/dengta-pc-demo/images/4-1.jpg?a=1"
            ],
            "leave_time": "2026-01-21 15:47:29",
            "execute_remark": "",
            "status": 4,
            "close_reason": "",
            "close_time": "2026-01-21 15:48:15",
            "solved_status": "",
            "flow_id": 648647,
            "extra_info": {
              "oneoff_order_ids": "",
              "delivery_oneoff_order_ids": "",
              "record_id": "",
              "urgency_degree": "",
              "city_district_code": "",
              "our_contact_user_id": ""
            },
            "pco_ticket_extend": "",
            "external_device_ticket_extend": "",
            "survey_ticket_extend": "",
            "install_ticket_extend": "",
            "test_ticket_extend": "",
            "inspect_ticket_extend": "",
            "risk_inspect_ticket_extend": "",
            "is_new_ticket": true,
            "status_name": "已完成",
            "business_type_name": "洗碗机",
            "ticket_type_name": "维修",
            "from_source_name": "客户发起",
            "solved_status_name": "",
            "allow_service_advice": false,
            "charge_item_count": 0,
            "create_to_arrive_minute": 13879,
            "repair_ticket_extend": {
              "ticket_id": 2111216,
              "repair_date": null,
              "device_type": "JG-310",
              "is_escalated_to_experts": null,
              "customer_communication_attachments": [
              ],
              "merchant_described_fault": "科技客家话",
              "fault_analysis": "你看你看两年",
              "maintenance_result": "v都是VS大V",
              "assets_id": "JGA310220500207",
              "customer_repair_issue_type": 1,
              "reported_phenomenon_exists": true,
              "is_solution_provided": true,
              "is_need_follow": false,
              "need_home_visit": true,
              "is_machine_operating_normally": false,
              "is_discoverer_satisfaction": false,
              "is_repairs_satisfaction": false,
              "is_need_upgrade": true,
              "status": 2,
              "create_time": "2026-01-13 15:13:53",
              "update_time": "2026-01-19 10:58:59",
              "service_type": 1,
              "service_type_name": "维修服务",
              "create_type": 1
            },
            "pco_service_type": null,
            "pco_service_type_name": "",
            "store_info": {
              "id": 948897,
              "name": "火星基地1号店",
              "brand_id": 269161,
              "valid": true,
              "city_id": 21,
              "district_code": "340503",
              "addr": "(模拟地址)山东省泰安市泰山区望岳东路",
              "lat": 31.68551,
              "lng": 118.50963,
              "dianping_id": "k4Ytbg2iM2XxfdFn",
              "sales_id": 3025,
              "team_id": 36,
              "store_progress": 25,
              "store_progress_name": "已验收",
              "operate_status": 1,
              "operate_status_name": "正常营业",
              "sales_district_id": 5224,
              "business_district_name": "金鹰",
              "city_info": {
                "id": 21,
                "name": "马鞍山市",
                "district_code": "340500"
              },
              "district_position_info": {
                "code": "340503",
                "province": "安徽省",
                "city": "马鞍山市",
                "district": "花山区",
                "sys_city_id": 21
              },
              "creator_id": 0,
              "created_at": "",
              "updated_at": "",
              "door_time_type": 0,
              "door_time_type_name": "",
              "return_visit_notice": "",
              "return_visit_status": "",
              "store_progress_update_time": "",
              "store_corp_type": 0,
              "store_corp_type_name": "",
              "string_dianping_id": "",
              "int_dianping_id": 0,
              "create_source": 0
            },
            "door_effective_info": {
              "store_id": 948897,
              "door_time_type": 4,
              "door_time_type_name": "异地"
            },
            "contact_info": {
              "id": 5263933,
              "nickname": "陈店长（新店长）",
              "tel": "151****2277",
              "is_valid": true,
              "org_type": 4,
              "org_type_name": "售后(门店)",
              "store_id": 948897,
              "title": 9,
              "title_name": "门店店长",
              "decision_power": 5,
              "decision_power_name": "其他",
              "creator_id": 3923,
              "email": "",
              "brand_id": 0,
              "updater_id": 0,
              "roles": [],
              "remark": "",
              "is_finance_contact": false,
              "other_feature": "",
              "attitude_for_dishwasher": 0,
              "attitude_for_dishwasher_name": "",
              "attitude_for_cx": 0,
              "attitude_for_cx_name": "",
              "focus": "",
              "objection_list": [],
              "work_experience": ""
            },
            "create_user_info": {
              "id": 7446,
              "username": "小明",
              "did": "5a1b034069c44268955f76870960d3fc",
              "status": 2,
              "mobile": "18361385686",
              "join": "2025-08-01",
              "city_id": 16,
              "org_email": "wuhao02@honganrobots.com",
              "job_number": "C5175",
              "dingding_union_id": "mk9dAAriPduRJiSZYq0NHiPuQiEiE",
              "role_info": {
                "is_after_sale": true
              },
              "departments": [
                {
                  "id": 92577093,
                  "name": "南京1区",
                  "role": 2,
                  "level": 5,
                  "is_valid": true,
                  "parent_id": 1055343019
                }
              ]
            },
            "responsible_engineer_info": {
              "id": 7446,
              "username": "小明",
              "did": "5a1b034069c44268955f76870960d3fc",
              "status": 2,
              "mobile": "18361385686",
              "join": "2025-08-01",
              "city_id": 16,
              "org_email": "wuhao02@honganrobots.com",
              "job_number": "C5175",
              "dingding_union_id": "mk9dAAriPduRJiSZYq0NHiPuQiEiE",
              "role_info": {
                "is_after_sale": true
              },
              "departments": [
                {
                  "id": 92577093,
                  "name": "南京1区",
                  "role": 2,
                  "level": 5,
                  "is_valid": true,
                  "parent_id": 1055343019
                }
              ]
            },
            "participating_engineer_info_list": [],
            "department_info": {
              "id": 92577093,
              "name": "南京1区",
              "role": 2,
              "level": 5,
              "is_valid": true,
              "parent_id": 1055343019,
              "managers": [],
              "users": [],
              "children": []
            },
            "assets_obj_list": [],
            "requirement_list": [],
            "store_service_remark": "",
            "ecmall_order_device_type_name": "揭盖机(三代机)",
            "ecmall_order_assets_id": "",
            "contact_customer_time": "",
            "phenomenon_reason_record": {
              "sku_id": 2509,
              "ticket_id": 2111216,
              "failure_phenomenon_list": [
                {
                  "id": 36,
                  "name": "洗剂管漏液/进气",
                  "phenomenon_type": 20
                },
                {
                  "id": 101,
                  "name": "揭盖内凝露",
                  "phenomenon_type": 30
                },
                {
                  "id": 102,
                  "name": "排水慢/不排水/排水排不干净/下水口反水/隔板上存水",
                  "phenomenon_type": 30
                },
                {
                  "id": 103,
                  "name": "设备漏水，包括进水管/排水管等漏水",
                  "phenomenon_type": 30
                },
                {
                  "id": 168,
                  "name": "平台破损变形",
                  "phenomenon_type": 40
                }
              ],
              "other_failure_phenomenon": "",
              "failure_reason_list": [
                {
                  "reason_type": 105,
                  "id": 1881,
                  "name": "主洗泵故障"
                },
                {
                  "reason_type": 105,
                  "id": 1882,
                  "name": "主洗泵卡异物"
                },
                {
                  "reason_type": 105,
                  "id": 1884,
                  "name": "主洗泵进水受潮"
                },
                {
                  "reason_type": 100,
                  "id": 2094,
                  "name": "故障未复现（桔云上门未发现故障也选此）"
                },
                {
                  "reason_type": 64,
                  "id": 3214,
                  "name": "整体塑料背板脱落"
                }
              ],
              "id": 586161
            }
          },
        // 培训
        {
            "id": 666666,
            "create_time": "2026-01-15 19:49:00",
            "update_time": "2026-01-17 19:51:10",
            "store_id": 666,
            "order_id": 66666,
            "business_type": 1,
            "ticket_type": 104,
            "create_remark": "",
            "create_images": [],
            "start_execute_date": "2026-01-16",
            "end_execute_date": "2026-01-17",
            "start_execute_time": "00:00",
            "end_execute_time": "23:59",
            "contact_id": "",
            "create_user_id": 6666,
            "from_source": 1,
            "need_call": false,
            "department_id": 666666,
            "dispatch_department_remark": "系统自动分配",
            "dispatch_department_time": "2026-01-17 19:49:00",
            "dispatch_type": 1,
            "dispatch_user_id": 6666,
            "dispatch_time": "2026-01-17 19:49:12",
            "dispatch_remark": "",
            "responsible_engineer_id": 6666,
            "participating_engineer_ids": [],
            "is_third_party_execute": false,
            "need_home_visit": true,
            "arrive_time": "2026-01-16 19:51:41",
            "scene_image_list": [
                "https://static.honganrobots.com/dengta-pc-demo/images/4-1.jpg?a=1"
            ],
            "leave_time": "2026-01-16 19:55:24",
            "execute_remark": "",
            "status": 4,
            "close_reason": "",
            "close_time": "2026-01-17 19:51:10",
            "solved_status": 2,
            "flow_id": "",
            "extra_info": {},
            "pco_ticket_extend": "",
            "external_device_ticket_extend": "",
            "survey_ticket_extend": "",
            "install_ticket_extend": "",
            "test_ticket_extend": "",
            "inspect_ticket_extend": "",
            "risk_inspect_ticket_extend": "",
            "train_ticket_extend": {
                "ticket_id": 666666,
                "is_training": true,
                "dishwasher_staff_count": 1,
                "trained_dishwasher_staff_count": 1,
                "responsible_person_count": 2,
                "trained_other_person_count": 3,
                "trained_contact_ids": [
                    666666
                ],
                "is_space_move_line_reasonable": false,
                "space_move_line_optimization_plan": "市中心",
                "main_cleaner_param_c1": "99",
                "main_cleaner_param_c2": "0",
                "main_cleaner_param_c3": "6",
                "main_cleaner_param_c4": "1",
                "main_cleaner_param_c5": "0",
                "dryer_agent_param_b1": "35",
                "dryer_agent_param_b2": "5",
                "dryer_agent_param_b3": "4",
                "cleanse_cistern_ppm": null,
                "has_tableware_and_poor": false,
                "tableware_material_items": [],
                "tableware_material_other": "",
                "special_problem_items": [],
                "follow_up_matters_other": "",
                "training_effect_items": [],
                "has_follow_up_matters": false,
                "follow_up_matters_items": [],
                "requires_next_training": true,
                "next_training_time": "2026-01-17 19:49:00",
                "status": 2,
                "status_name": "已提交",
                "create_type": 5,
                "service_type": 3,
                "service_type_name": "培训服务",
                "train_content_info": [
                    "洗碗流程",
                    "日常清洁",
                    "主洗水箱除垢",
                    "简单故障处理"
                ],
                "is_show_check_service_result": true,
                "is_solve": []
            },
            "is_new_ticket": true,
            "status_name": "已完成",
            "business_type_name": "洗碗机",
            "ticket_type_name": "培训",
            "from_source_name": "主动服务",
            "solved_status_name": "已解决",
            "allow_service_advice": false,
            "charge_item_count": 0,
            "create_to_arrive_minute": 1442,
            "pco_service_type": null,
            "pco_service_type_name": "",
            "store_info": {
                "id": 666,
                "name": "火星基地1号店",
                "brand_id": 666666,
                "valid": true,
                "city_id": 1,
                "district_code": "110115",
                "addr": "(模拟地址)北京市大兴区黄村镇",
                "lat": 39.752377,
                "lng": 116.33744,
                "dianping_id": "G1w26dRRNoSspkCO",
                "sales_id": 6666,
                "team_id": 666,
                "store_progress": 25,
                "store_progress_name": "已验收",
                "operate_status": 1,
                "operate_status_name": "正常营业",
                "sales_district_id": 6666,
                "business_district_name": "黄村",
                "city_info": {
                    "id": 1,
                    "name": "北京城区",
                    "district_code": "110100"
                },
                "district_position_info": {
                    "code": "110115",
                    "province": "北京市",
                    "city": "北京城区",
                    "district": "大兴区",
                    "sys_city_id": 1
                },
                "creator_id": 0,
                "created_at": "",
                "updated_at": "",
                "door_time_type": 0,
                "door_time_type_name": "",
                "return_visit_notice": "",
                "return_visit_status": "",
                "store_progress_update_time": "",
                "store_corp_type": 0,
                "store_corp_type_name": "",
                "string_dianping_id": "",
                "int_dianping_id": 0,
                "create_source": 0
            },
            "door_effective_info": {
                "store_id": 6666,
                "door_time_type": 3,
                "door_time_type_name": "本地4H"
            },
            "contact_info": {},
            "create_user_info": {
                "id": 6666,
                "username": "小明",
                "did": "e80e0c6a99fc407e85df1baaaff8b54c",
                "status": 2,
                "mobile": "188****8888",
                "join": "2020-11-16",
                "city_id": 1,
                "org_email": "xiaoming@honganrobots.com",
                "job_number": "H0295",
                "dingding_union_id": "L9Np6iS4bgcOiir801rPhDggiEiE",
                "role_info": {
                    "is_after_sale": true
                },
                "departments": [
                    {
                        "id": 666,
                        "name": "北京1区",
                        "role": 2,
                        "level": 5,
                        "is_valid": true,
                        "parent_id": 666
                    }
                ]
            },
            "responsible_engineer_info": {
                "id": 6666,
                "username": "小明",
                "did": "e80e0c6a99fc407e85df1baaaff8b54c",
                "status": 2,
                "mobile": "188****8888",
                "join": "2020-11-16",
                "city_id": 1,
                "org_email": "xiaoming@honganrobots.com",
                "job_number": "H0295",
                "dingding_union_id": "L9Np6iS4bgcOiir801rPhDggiEiE",
                "role_info": {
                    "is_after_sale": true
                },
                "departments": [
                    {
                        "id": 666666,
                        "name": "北京1区",
                        "role": 2,
                        "level": 5,
                        "is_valid": true,
                        "parent_id": 666666
                    }
                ]
            },
            "participating_engineer_info_list": [],
            "department_info": {
                "id": 666666,
                "name": "北京2区",
                "role": 2,
                "level": 5,
                "is_valid": true,
                "parent_id": 666666,
                "managers": [],
                "users": [],
                "children": []
            },
            "assets_obj_list": [],
            "requirement_list": [],
            "store_service_remark": "",
            "ecmall_order_device_type_name": "揭盖机(二代机)",
            "ecmall_order_assets_id": "",
            "contact_customer_time": ""
        },
        {
            "id": 777777,
            "create_time": "2026-01-16 20:30:00",
            "update_time": "2026-01-18 20:32:10",
            "store_id": 777,
            "order_id": 77777,
            "business_type": 1,
            "ticket_type": 104,
            "create_remark": "",
            "create_images": [],
            "start_execute_date": "2026-01-17",
            "end_execute_date": "2026-01-18",
            "start_execute_time": "00:00",
            "end_execute_time": "23:59",
            "contact_id": "",
            "create_user_id": 7777,
            "from_source": 1,
            "need_call": false,
            "department_id": 777777,
            "dispatch_department_remark": "系统自动分配",
            "dispatch_department_time": "2026-01-18 20:30:00",
            "dispatch_type": 1,
            "dispatch_user_id": 7777,
            "dispatch_time": "2026-01-18 20:30:12",
            "dispatch_remark": "",
            "responsible_engineer_id": 7777,
            "participating_engineer_ids": [],
            "is_third_party_execute": false,
            "need_home_visit": true,
            "arrive_time": "2026-01-17 20:32:41",
            "scene_image_list": [
                "https://static.honganrobots.com/dengta-pc-demo/images/6-1.jpg?a=1"
            ],
            "leave_time": "2026-01-17 20:36:24",
            "execute_remark": "",
            "status": 4,
            "close_reason": "",
            "close_time": "2026-01-18 20:32:10",
            "solved_status": 2,
            "flow_id": "",
            "extra_info": {},
            "pco_ticket_extend": "",
            "external_device_ticket_extend": "",
            "survey_ticket_extend": "",
            "install_ticket_extend": "",
            "test_ticket_extend": "",
            "inspect_ticket_extend": "",
            "risk_inspect_ticket_extend": "",
            "train_ticket_extend": {
                "ticket_id": 777777,
                "is_training": true,
                "dishwasher_staff_count": 1,
                "trained_dishwasher_staff_count": 1,
                "responsible_person_count": 2,
                "trained_other_person_count": 3,
                "trained_contact_ids": [
                    777777
                ],
                "is_space_move_line_reasonable": false,
                "space_move_line_optimization_plan": "市中心",
                "main_cleaner_param_c1": "99",
                "main_cleaner_param_c2": "0",
                "main_cleaner_param_c3": "6",
                "main_cleaner_param_c4": "1",
                "main_cleaner_param_c5": "0",
                "dryer_agent_param_b1": "35",
                "dryer_agent_param_b2": "5",
                "dryer_agent_param_b3": "4",
                "cleanse_cistern_ppm": null,
                "has_tableware_and_poor": false,
                "tableware_material_items": [],
                "tableware_material_other": "",
                "special_problem_items": [],
                "follow_up_matters_other": "",
                "training_effect_items": [],
                "has_follow_up_matters": false,
                "follow_up_matters_items": [],
                "requires_next_training": true,
                "next_training_time": "2026-01-18 20:30:00",
                "status": 2,
                "status_name": "已提交",
                "create_type": 5,
                "service_type": 3,
                "service_type_name": "培训服务",
                "train_content_info": [
                    "洗碗流程",
                    "日常清洁",
                    "主洗水箱除垢",
                    "简单故障处理"
                ],
                "is_show_check_service_result": true,
                "is_solve": []
            },
            "is_new_ticket": true,
            "status_name": "已完成",
            "business_type_name": "洗碗机",
            "ticket_type_name": "培训",
            "from_source_name": "主动服务",
            "solved_status_name": "已解决",
            "allow_service_advice": false,
            "charge_item_count": 0,
            "create_to_arrive_minute": 1442,
            "pco_service_type": null,
            "pco_service_type_name": "",
            "store_info": {
                "id": 777,
                "name": "火星基地2号店",
                "brand_id": 777777,
                "valid": true,
                "city_id": 1,
                "district_code": "110115",
                "addr": "(模拟地址)北京市大兴区黄村镇",
                "lat": 39.752377,
                "lng": 116.33744,
                "dianping_id": "G1w26dRRNoSspkCO",
                "sales_id": 7777,
                "team_id": 777,
                "store_progress": 25,
                "store_progress_name": "已验收",
                "operate_status": 1,
                "operate_status_name": "正常营业",
                "sales_district_id": 7777,
                "business_district_name": "黄村",
                "city_info": {
                    "id": 1,
                    "name": "北京城区",
                    "district_code": "110100"
                },
                "district_position_info": {
                    "code": "110115",
                    "province": "北京市",
                    "city": "北京城区",
                    "district": "大兴区",
                    "sys_city_id": 1
                },
                "creator_id": 0,
                "created_at": "",
                "updated_at": "",
                "door_time_type": 0,
                "door_time_type_name": "",
                "return_visit_notice": "",
                "return_visit_status": "",
                "store_progress_update_time": "",
                "store_corp_type": 0,
                "store_corp_type_name": "",
                "string_dianping_id": "",
                "int_dianping_id": 0,
                "create_source": 0
            },
            "door_effective_info": {
                "store_id": 7777,
                "door_time_type": 3,
                "door_time_type_name": "本地4H"
            },
            "contact_info": {},
            "create_user_info": {
                "id": 7777,
                "username": "小红",
                "did": "e80e0c6a99fc407e85df1baaaff8b54c",
                "status": 2,
                "mobile": "139****9999",
                "join": "2020-11-16",
                "city_id": 1,
                "org_email": "xiaohong@honganrobots.com",
                "job_number": "H0295",
                "dingding_union_id": "L9Np6iS4bgcOiir801rPhDggiEiE",
                "role_info": {
                    "is_after_sale": true
                },
                "departments": [
                    {
                        "id": 777,
                        "name": "北京1区",
                        "role": 2,
                        "level": 5,
                        "is_valid": true,
                        "parent_id": 777
                    }
                ]
            },
            "responsible_engineer_info": {
                "id": 7777,
                "username": "小红",
                "did": "e80e0c6a99fc407e85df1baaaff8b54c",
                "status": 2,
                "mobile": "139****9999",
                "join": "2020-11-16",
                "city_id": 1,
                "org_email": "xiaohong@honganrobots.com",
                "job_number": "H0295",
                "dingding_union_id": "L9Np6iS4bgcOiir801rPhDggiEiE",
                "role_info": {
                    "is_after_sale": true
                },
                "departments": [
                    {
                        "id": 777777,
                        "name": "北京1区",
                        "role": 2,
                        "level": 5,
                        "is_valid": true,
                        "parent_id": 777777
                    }
                ]
            },
            "participating_engineer_info_list": [],
            "department_info": {
                "id": 777777,
                "name": "北京2区",
                "role": 2,
                "level": 5,
                "is_valid": true,
                "parent_id": 777777,
                "managers": [],
                "users": [],
                "children": []
            },
            "assets_obj_list": [],
            "requirement_list": [],
            "store_service_remark": "",
            "ecmall_order_device_type_name": "揭盖机(二代机)",
            "ecmall_order_assets_id": "",
            "contact_customer_time": ""
        }
    ]
    const ticketTypeList = Array.isArray(parsed.ticket_type_list) ? parsed.ticket_type_list : []
    const ticketTypeListStr = JSON.stringify(ticketTypeList)
    let list = mocklist
    if (ticketTypeListStr.includes('106') || ticketTypeListStr.includes('206')) {
        list = mocklist.slice(0, 3)
    } else if (ticketTypeListStr.includes('104') || ticketTypeListStr.includes('204')) {
        list = mocklist.slice(4, 6)
    } else if (ticketTypeListStr.includes('105') || ticketTypeListStr.includes('205') || ticketTypeListStr.includes('108')) {
        list = mocklist.slice(3, 4)
    }
    const mockAddr = '(模拟地址)山东省泰安市泰山区望岳东路'
    list = list.map((item) => {
        const x = 1 + Math.floor(Math.random() * 5)
        const mockName = '火星基地' + x + '号店'
        return {
            ...item,
            store_name: mockName,
            store_addr: mockAddr,
            store_info: item.store_info ? { ...item.store_info, name: mockName, addr: mockAddr } : item.store_info
        }
    })
    return {
        success: true,
        content: {
            ticket_list: list,
            total: list.length
        }
    }
}

function getEcmallRepairTicketList(params) {
    return {
        "content": {
            "list": [
                {
                    "create_type": 1,
                    "failure_reason_list": [
                        "漂洗低水位开关卡水垢",
                        "漂洗高水位开关卡水垢"
                    ],
                    "inspection_entry_list": [],
                    "is_door": true,
                    "master_engineer_name": "小红",
                    "repair_response_min": 30,
                    "scene_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/4-1.jpg?a=1",
                        ],
                    "service_type": 1,
                    "service_type_name": "维修服务",
                    "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                    "store_name": "火星基地1号店",
                    "task_done": "2025.03.02 10:20",
                    "task_start": "2025.03.02 10:04",
                    "ticket_id": 1880841,
                    "train_entry_list": []
                }
            ],
            "total": 1
        },
        "success": true
    }
}

function getEcmallTrainTicketList(params) {
    return {
        "content": {
            "list": [],
            "total": 0
        },
        "success": true
    }
}

function getEcmallInspectTicketList(params) {
    return {
        "content": {
            "list": [
                {
                    "create_type": 4,
                    "failure_reason_list": [],
                    "inspection_entry_list": [
                        "主动检查-餐具清洁"
                    ],
                    "is_door": true,
                    "master_engineer_name": "小红",
                    "repair_response_min": 42,
                    "scene_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/3-1.jpg?a=1",
                        "https://static.honganrobots.com/dengta-pc-demo/images/3-2.jpg?a=1"
                    ],
                    "service_type": 2,
                    "service_type_name": "巡检服务",
                    "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                    "store_name": "火星基地1号店",
                    "task_done": "2025.03.02 10:41",
                    "task_start": "2025.03.02 10:20",
                    "ticket_id": 1880880,
                    "train_entry_list": []
                },
                {
                    "create_type": 4,
                    "failure_reason_list": [],
                    "inspection_entry_list": [
                        "主动检查-餐具清洁"
                    ],
                    "is_door": true,
                    "master_engineer_name": "小红",
                    "repair_response_min": 24,
                    "scene_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/5-1.jpg?a=1",
                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1"
                        ],
                    "service_type": 2,
                    "service_type_name": "巡检服务",
                    "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                    "store_name": "火星基地1号店",
                    "task_done": "2025.02.10 14:27",
                    "task_start": "2025.02.10 14:13",
                    "ticket_id": 1862061,
                    "train_entry_list": []
                },
                {
                    "create_type": 4,
                    "failure_reason_list": [],
                    "inspection_entry_list": [
                        "主动检查-餐具清洁"
                    ],
                    "is_door": true,
                    "master_engineer_name": "小明",
                    "repair_response_min": 13,
                    "scene_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/6-1.jpg?a=1"
                        ],
                    "service_type": 2,
                    "service_type_name": "巡检服务",
                    "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                    "store_name": "火星基地1号店",
                    "task_done": "2025.02.08 10:22",
                    "task_start": "2025.02.08 10:10",
                    "ticket_id": 1859863,
                    "train_entry_list": []
                }
            ],
            "total": 4
        },
        "success": true
    }
}

function getEcmallVisibleTicketList(params) {
    let list = []
    if (params.city_id === -1 || params.city_id === 210) {
        list = [
                {
                    "create_type": 4,
                    "failure_reason_list": [],
                    "inspection_entry_list": [
                        "主动检查-餐具清洁"
                    ],
                    "is_door": true,
                    "master_engineer_name": "小红",
                    "repair_response_min": 42,
                    "scene_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/3-1.jpg?a=1",
                        "https://static.honganrobots.com/dengta-pc-demo/images/3-2.jpg?a=1"
                    ],
                    "service_type": 2,
                    "service_type_name": "巡检服务",
                    "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                    "store_name": "火星基地1号店",
                    "task_done": formatDateWithOffset(-1),
                    "task_start": formatDateWithOffset(-1),
                    "ticket_id": 1880880,
                    "train_entry_list": []
                },
                {
                    "create_type": 1,
                    "failure_reason_list": [
                        "漂洗低水位开关卡水垢",
                        "漂洗高水位开关卡水垢"
                    ],
                    "inspection_entry_list": [],
                    "is_door": true,
                    "master_engineer_name": "小红",
                    "repair_response_min": 30,
                    "scene_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/4-1.jpg?a=1",
                        ],
                    "service_type": 1,
                    "service_type_name": "维修服务",
                    "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                    "store_name": "火星基地1号店",
                    "task_done": formatDateWithOffset(-2),
                    "task_start": formatDateWithOffset(-2),
                    "ticket_id": 1880841,
                    "train_entry_list": []
                },
                {
                    "create_type": 4,
                    "failure_reason_list": [],
                    "inspection_entry_list": [
                        "主动检查-餐具清洁"
                    ],
                    "is_door": true,
                    "master_engineer_name": "小红",
                    "repair_response_min": 24,
                    "scene_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/5-1.jpg?a=1",
                        "https://static.honganrobots.com/dengta-pc-demo/images/5-2.jpg?a=1"
                        ],
                    "service_type": 2,
                    "service_type_name": "巡检服务",
                    "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                    "store_name": "火星基地1号店",
                    "task_done": formatDateWithOffset(-3),
                    "task_start": formatDateWithOffset(-3),
                    "ticket_id": 1862061,
                    "train_entry_list": []
                },
                {
                    "create_type": 4,
                    "failure_reason_list": [],
                    "inspection_entry_list": [
                        "主动检查-餐具清洁"
                    ],
                    "is_door": true,
                    "master_engineer_name": "小明",
                    "repair_response_min": 13,
                    "scene_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/6-1.jpg?a=1"
                        ],
                    "service_type": 2,
                    "service_type_name": "巡检服务",
                    "store_addr": "(模拟地址)山东省泰安市泰山区望岳东路",
                    "store_name": "火星基地1号店",
                    "task_done": formatDateWithOffset(-4),
                    "task_start": formatDateWithOffset(-4),
                    "ticket_id": 1859863,
                    "train_entry_list": []
                }
            ]
    }
    return {
        "content": {
            "list": list,
            "total": 4
        },
        "success": true
    }
}

function getStoreDeviceEnergyOverview(params) {
    let allData = [
        {
            "store_name": "火星基地1号店",
            "monitor_status": 1,
            "monitor_duration": 153,
            "monitor_device_quantity": 4,
            "store_addr": "(模拟地址)山大路47",
            "store_id": 1131339
        },
        {
            "store_name": "火星基地2号店",
            "monitor_status": 1,
            "monitor_duration": 153,
            "monitor_device_quantity": 21,
            "store_addr": "(模拟地址)经二路与黄河路交叉口",
            "store_id": 956757
        },
        {
            "store_name": "火星基地3号店",
            "monitor_status": 1,
            "monitor_duration": 153,
            "monitor_device_quantity": 2,
            "store_addr": "(模拟地址)张庄路175",
            "store_id": 1017976
        },
        {
            "store_name": "火星基地4号店",
            "monitor_status": 1,
            "monitor_duration": 140,
            "monitor_device_quantity": 1,
            "store_addr": "(模拟地址)平安大道197号",
            "store_id": 1017091
        },
        {
            "store_name": "火星基地5号店",
            "monitor_status": 2,
            "monitor_duration": 10,
            "monitor_device_quantity": 15,
            "store_addr": "(模拟地址)人民路与中华园路交叉口",
            "store_id": 840932
        }
    ]
    let list = []
    if (params.monitor_status === undefined || params.monitor_status === '') {
        list = allData
    } else {
        list = allData.filter(item => item.monitor_status === params.monitor_status)
    }
    return {
        "success": true,
        "content": {
            "list": list,
            "total_num": list.length
        }
    }
}

function getDeviceEnergyOverview(params) {
    return {
        "success": true,
        "content": {
            "total": 1594.0,
            "average": 227.71,
            "top_energy": [
                {
                    "energy": 321.3,
                    "device_name": "煮面炉",
                    "device_id": "6c932afa1fe2646e0cxpxn"
                },
                {
                    "energy": 304.2,
                    "device_name": "高汤锅",
                    "device_id": "6ca872663ad51f0fb0bktp"
                },
                {
                    "energy": 204.2,
                    "device_name": "烤箱",
                    "device_id": "6c050aec6a80bbd2aayvbc"
                },
                {
                    "energy": 192.0,
                    "device_name": "风机",
                    "device_id": "6c4c4d84d45b124072atfp"
                },
                {
                    "energy": 111.0,
                    "device_name": "后厨5台冰箱",
                    "device_id": "6c1f7cc6a8aaec19817zbr"
                },
                {
                    "energy": 86.5,
                    "device_name": "洗碗间热水器",
                    "device_id": "6c60208c164dee80ddvmfw"
                },
                {
                    "energy": 81.5,
                    "device_name": "八头灶2",
                    "device_id": "6c0fe35bbb88a14399sbp8"
                },
                {
                    "energy": 64.7,
                    "device_name": "吧台4台冰箱",
                    "device_id": "6cb02729d7ea7ce819zwup"
                },
                {
                    "energy": 51.0,
                    "device_name": "八头灶1",
                    "device_id": "6c820669ec72a1a30c3jkw"
                },
                {
                    "energy": 50.7,
                    "device_name": "吧台开水机",
                    "device_id": "6c3a4a2f0145d0397avzml"
                },
                {
                    "energy": 32.3,
                    "device_name": "吧台电磁炉中",
                    "device_id": "6c802d78b5b8d58f56z1yp"
                },
                {
                    "energy": 31.3,
                    "device_name": "吧台电磁炉右",
                    "device_id": "6ca30df5d343d1d361id26"
                },
                {
                    "energy": 25.4,
                    "device_name": "吧台冻小熊冰箱",
                    "device_id": "6cae44e38fcb2c7d19hhcw"
                },
                {
                    "energy": 19.7,
                    "device_name": "吧台小熊速冻柜",
                    "device_id": "6cf8a9597290503a25uyyq"
                },
                {
                    "energy": 14.2,
                    "device_name": "后厨其他3台冰箱",
                    "device_id": "6c010fb08ef28c9d89obxa"
                },
                {
                    "energy": 2.6,
                    "device_name": "保温桶",
                    "device_id": "6c2af9ff007d80a943utk8"
                },
                {
                    "energy": 0.8,
                    "device_name": "后厨化油设备",
                    "device_id": "6c1f84f1a90a71a9bekct3"
                },
                {
                    "energy": 0.4,
                    "device_name": "洗衣机",
                    "device_id": "6c18711b592c9278c0eiqw"
                },
                {
                    "energy": 0.2,
                    "device_name": "吧台加热炉",
                    "device_id": "6cec300e1b1cd827b27yfi"
                },
                {
                    "energy": 0.0,
                    "device_name": "电饭煲右",
                    "device_id": "6cff5bd977a5772109ihio"
                },
                {
                    "energy": 0.0,
                    "device_name": "小炸炉",
                    "device_id": "6cfc5711dc90dcdbd6awrk"
                }
            ]
        }
    }
}

function getDeviceEnergyContrast(params, data) {
    console.log(params, data)
    let store_ids = ["956757", "1017976", "1131339", "1017091", "840932"]
    let dataList = [
        {
            "device_id": "6c932afa1fe2646e0cxpxn",
            "label": "煮面炉",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                69.3,
                74.9,
                65.5,
                75.4,
                73.3,
                69.2,
                72.8,
                84.9,
                87.6,
                78.7,
                77.7,
                77.3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6ca872663ad51f0fb0bktp",
            "label": "高汤锅",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                80.3,
                78.8,
                66.9,
                73.3,
                72.5,
                82.7,
                71.7,
                72.9,
                76.5,
                66.0,
                77.4,
                84.3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c050aec6a80bbd2aayvbc",
            "label": "烤箱",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                49.8,
                56.1,
                47.2,
                53.5,
                50.7,
                56.9,
                48.7,
                50.1,
                50.3,
                49.8,
                51.9,
                52.2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c4c4d84d45b124072atfp",
            "label": "风机",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                48.7,
                47.8,
                48.1,
                46.7,
                48.2,
                46.8,
                47.1,
                58.7,
                46.6,
                46.4,
                47.5,
                51.5,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c1f7cc6a8aaec19817zbr",
            "label": "后厨5台冰箱",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                23.7,
                25.1,
                25.7,
                27.3,
                27.0,
                29.0,
                27.5,
                26.9,
                25.3,
                27.5,
                27.8,
                30.4,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c820669ec72a1a30c3jkw",
            "label": "八头灶1",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                11.0,
                12.3,
                9.0,
                9.0,
                7.5,
                11.9,
                12.3,
                13.2,
                15.2,
                10.4,
                13.6,
                11.8,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c0fe35bbb88a14399sbp8",
            "label": "八头灶2",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                19.6,
                21.6,
                21.3,
                25.5,
                22.3,
                25.6,
                16.9,
                22.9,
                20.1,
                23.5,
                19.1,
                18.8,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c3a4a2f0145d0397avzml",
            "label": "吧台开水机",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                14.1,
                15.7,
                15.8,
                13.5,
                14.5,
                17.2,
                12.4,
                11.5,
                13.6,
                12.9,
                13.5,
                10.7,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c60208c164dee80ddvmfw",
            "label": "洗碗间热水器",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                25.8,
                24.1,
                22.2,
                16.2,
                24.1,
                22.6,
                19.4,
                17.8,
                24.1,
                19.4,
                20.1,
                22.9,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6cb02729d7ea7ce819zwup",
            "label": "吧台4台冰箱",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                15.3,
                15.8,
                15.6,
                15.7,
                16.3,
                17.5,
                14.9,
                17.1,
                13.4,
                16.5,
                17.4,
                17.4,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6cf8a9597290503a25uyyq",
            "label": "吧台小熊速冻柜",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                0.0,
                0.0,
                0.0,
                0.0,
                8.1,
                13.1,
                13.0,
                10.6,
                0.0,
                0.0,
                5.3,
                14.4,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c802d78b5b8d58f56z1yp",
            "label": "吧台电磁炉中",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                9.2,
                7.0,
                7.0,
                7.9,
                8.9,
                7.6,
                7.9,
                8.0,
                7.1,
                8.4,
                8.0,
                8.8,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6ca30df5d343d1d361id26",
            "label": "吧台电磁炉右",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                7.7,
                7.3,
                8.2,
                7.6,
                8.6,
                7.1,
                6.7,
                7.3,
                8.0,
                8.4,
                7.8,
                7.1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c010fb08ef28c9d89obxa",
            "label": "后厨其他3台冰箱",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                3.1,
                3.5,
                2.8,
                3.3,
                3.3,
                3.0,
                3.0,
                3.3,
                2.9,
                3.4,
                3.5,
                4.4,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6cae44e38fcb2c7d19hhcw",
            "label": "吧台冻小熊冰箱",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                0.0,
                0.0,
                0.0,
                0.0,
                10.5,
                13.6,
                14.9,
                10.8,
                0.0,
                0.0,
                6.8,
                18.6,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c18711b592c9278c0eiqw",
            "label": "洗衣机",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                0.4,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.5,
                0.1,
                0.0,
                0.0,
                0.4,
                0.0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c1f84f1a90a71a9bekct3",
            "label": "后厨化油设备",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                0.1,
                0.2,
                0.1,
                0.2,
                0.1,
                0.2,
                0.1,
                0.4,
                0.2,
                0.1,
                0.3,
                0.2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6c2af9ff007d80a943utk8",
            "label": "保温桶",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                0.6,
                0.2,
                0.7,
                0.5,
                1.6,
                0.6,
                0.5,
                1.2,
                0.9,
                0.8,
                0.9,
                0.0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6cff5bd977a5772109ihio",
            "label": "电饭煲右",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6cec300e1b1cd827b27yfi",
            "label": "吧台加热炉",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.2,
                0.0,
                0.0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "device_id": "6cfc5711dc90dcdbd6awrk",
            "label": "小炸炉",
            "device_energy_data": [
                0,
                0,
                0,
                0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        }
    ]
    let dataJson = JSON.parse(data)
    if (store_ids.includes(dataJson.store_id)) {
        let list = []
        for (let i = 0; i < dataJson.device_id_list.length; i++) {
            for (let j = 0; j < dataList.length; j++) {
                if (dataList[j].device_id === dataJson.device_id_list[i]) {
                    list.push(dataList[j])
                }
            }
        }
        return {
            "success": true,
            "content": {
                "labels": [
                    "11.15",
                    "11.16",
                    "11.17",
                    "11.18",
                    "11.19",
                    "11.20",
                    "11.21",
                    "11.22",
                    "11.23",
                    "11.24",
                    "11.25",
                    "11.26",
                    "11.27",
                    "11.28",
                    "11.29",
                    "11.30",
                    "12.01",
                    "12.02",
                    "12.03",
                    "12.04",
                    "12.05",
                    "12.06",
                    "12.07",
                    "12.08",
                    "12.09",
                    "12.10",
                    "12.11",
                    "12.12",
                    "12.13",
                    "12.14"
                ],
                "data": list
            }
        }
    }
    return {
        "success": true,
        "content": {
            "labels": [
                "11.27",
                "11.28",
                "11.29",
                "11.30",
                "12.01",
                "12.02",
                "12.03"
            ],
            "data": [
                {
                    "device_id": "6c932afa1fe2646e0cxpxn",
                    "label": "煮面炉",
                    "device_energy_data": [
                        87.6,
                        78.7,
                        77.7,
                        77.3,
                        0,
                        0,
                        0
                    ]
                }
            ]
        }
    }
}

function getDeviceEnergyDetail(params) {
    let store_ids = ["956757", "1017976", "1131339", "1017091", "840932"]
    if (store_ids.includes(params.store_id)) {
        return {
            "success": true,
            "content": {
                "labels": [
                    "总耗电",
                    "后厨其他3台冰箱",
                    "烤箱",
                    "八头灶2",
                    "洗衣机",
                    "后厨5台冰箱",
                    "后厨化油设备",
                    "保温桶",
                    "吧台开水机",
                    "风机",
                    "洗碗间热水器",
                    "吧台电磁炉中",
                    "八头灶1",
                    "煮面炉",
                    "吧台电磁炉右",
                    "高汤锅",
                    "吧台冻小熊冰箱",
                    "吧台4台冰箱",
                    "吧台加热炉",
                    "吧台小熊速冻柜",
                    "小炸炉",
                    "电饭煲右"
                ],
                "data": [
                    {
                        "label": "11月15日",
                        "device_energy_data": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "label": "11月16日",
                        "device_energy_data": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "label": "11月17日",
                        "device_energy_data": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "label": "11月18日",
                        "device_energy_data": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "label": "11月19日",
                        "device_energy_data": [
                            378.7,
                            3.1,
                            49.8,
                            19.6,
                            0.4,
                            23.7,
                            0.1,
                            0.6,
                            14.1,
                            48.7,
                            25.8,
                            9.2,
                            11.0,
                            69.3,
                            7.7,
                            80.3,
                            0.0,
                            15.3,
                            0.0,
                            0.0,
                            0.0,
                            0.0
                        ]
                    },
                    {
                        "label": "11月20日",
                        "device_energy_data": [
                            390.4,
                            3.5,
                            56.1,
                            21.6,
                            0.0,
                            25.1,
                            0.2,
                            0.2,
                            15.7,
                            47.8,
                            24.1,
                            7.0,
                            12.3,
                            74.9,
                            7.3,
                            78.8,
                            0.0,
                            15.8,
                            0.0,
                            0.0,
                            0.0,
                            0.0
                        ]
                    },
                    {
                        "label": "11月21日",
                        "device_energy_data": [
                            356.1,
                            2.8,
                            47.2,
                            21.3,
                            0.0,
                            25.7,
                            0.1,
                            0.7,
                            15.8,
                            48.1,
                            22.2,
                            7.0,
                            9.0,
                            65.5,
                            8.2,
                            66.9,
                            0.0,
                            15.6,
                            0.0,
                            0.0,
                            0.0,
                            0.0
                        ]
                    },
                    {
                        "label": "11月22日",
                        "device_energy_data": [
                            375.6,
                            3.3,
                            53.5,
                            25.5,
                            0.0,
                            27.3,
                            0.2,
                            0.5,
                            13.5,
                            46.7,
                            16.2,
                            7.9,
                            9.0,
                            75.4,
                            7.6,
                            73.3,
                            0.0,
                            15.7,
                            0.0,
                            0.0,
                            0.0,
                            0.0
                        ]
                    },
                    {
                        "label": "11月23日",
                        "device_energy_data": [
                            397.5,
                            3.3,
                            50.7,
                            22.3,
                            0.0,
                            27.0,
                            0.1,
                            1.6,
                            14.5,
                            48.2,
                            24.1,
                            8.9,
                            7.5,
                            73.3,
                            8.6,
                            72.5,
                            10.5,
                            16.3,
                            0.0,
                            8.1,
                            0.0,
                            0.0
                        ]
                    },
                    {
                        "label": "11月24日",
                        "device_energy_data": [
                            424.6,
                            3.0,
                            56.9,
                            25.6,
                            0.0,
                            29.0,
                            0.2,
                            0.6,
                            17.2,
                            46.8,
                            22.6,
                            7.6,
                            11.9,
                            69.2,
                            7.1,
                            82.7,
                            13.6,
                            17.5,
                            0.0,
                            13.1,
                            0.0,
                            0.0
                        ]
                    }
                ],
                "total_num": 10
            }
        }
    }
    return {
        "success": true,
        "content": {
            "labels": [
                "总耗电",
                "后厨其他3台冰箱",
                "烤箱",
                "八头灶2",
                "洗衣机",
                "后厨5台冰箱",
                "后厨化油设备",
                "保温桶",
                "吧台开水机",
                "风机",
                "洗碗间热水器",
                "吧台电磁炉中",
                "八头灶1",
                "煮面炉",
                "吧台电磁炉右",
                "高汤锅",
                "吧台冻小熊冰箱",
                "吧台4台冰箱",
                "吧台加热炉",
                "吧台小熊速冻柜",
                "小炸炉",
                "电饭煲右"
            ],
            "data": [
                {
                    "label": "11月27日",
                    "device_energy_data": [
                        391.8,
                        2.9,
                        50.3,
                        20.1,
                        0.0,
                        25.3,
                        0.2,
                        0.9,
                        13.6,
                        46.6,
                        24.1,
                        7.1,
                        15.2,
                        87.6,
                        8.0,
                        76.5,
                        0.0,
                        13.4,
                        0.0,
                        0.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "label": "11月28日",
                    "device_energy_data": [
                        372.4,
                        3.4,
                        49.8,
                        23.5,
                        0.0,
                        27.5,
                        0.1,
                        0.8,
                        12.9,
                        46.4,
                        19.4,
                        8.4,
                        10.4,
                        78.7,
                        8.4,
                        66.0,
                        0.0,
                        16.5,
                        0.2,
                        0.0,
                        0.0,
                        0.0
                    ]
                },
                {
                    "label": "11月29日",
                    "device_energy_data": [
                        399.0,
                        3.5,
                        51.9,
                        19.1,
                        0.4,
                        27.8,
                        0.3,
                        0.9,
                        13.5,
                        47.5,
                        20.1,
                        8.0,
                        13.6,
                        77.7,
                        7.8,
                        77.4,
                        6.8,
                        17.4,
                        0.0,
                        5.3,
                        0.0,
                        0.0
                    ]
                },
                {
                    "label": "11月30日",
                    "device_energy_data": [
                        430.8,
                        4.4,
                        52.2,
                        18.8,
                        0.0,
                        30.4,
                        0.2,
                        0.0,
                        10.7,
                        51.5,
                        22.9,
                        8.8,
                        11.8,
                        77.3,
                        7.1,
                        84.3,
                        18.6,
                        17.4,
                        0.0,
                        14.4,
                        0.0,
                        0.0
                    ]
                },
                {
                    "label": "12月01日",
                    "device_energy_data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    "label": "12月02日",
                    "device_energy_data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    "label": "12月03日",
                    "device_energy_data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ],
            "total_num": 7
        }
    }
}

function getDeviceUseDetail(params) {
    let store_ids = ["956757", "1017976", "1131339", "1017091", "840932"]
    if (store_ids.includes(params.store_id)) {
        return {
            "success": true,
            "content": {
                "labels": [
                    "数据",
                    "后厨其他3台冰箱",
                    "烤箱",
                    "八头灶2",
                    "洗衣机",
                    "后厨5台冰箱",
                    "后厨化油设备",
                    "保温桶",
                    "吧台开水机",
                    "风机",
                    "洗碗间热水器",
                    "吧台电磁炉中",
                    "八头灶1",
                    "煮面炉",
                    "吧台电磁炉右",
                    "高汤锅",
                    "吧台冻小熊冰箱",
                    "吧台4台冰箱",
                    "吧台加热炉",
                    "吧台小熊速冻柜",
                    "小炸炉",
                    "电饭煲右"
                ],
                "data": [
                    {
                        "label": "11月15日",
                        "use_duration_data": [
                            "使用时长",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            ""
                        ]
                    },
                    {
                        "label": "11月16日",
                        "use_duration_data": [
                            "使用时长",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            ""
                        ]
                    },
                    {
                        "label": "11月17日",
                        "use_duration_data": [
                            "使用时长",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            ""
                        ]
                    },
                    {
                        "label": "11月18日",
                        "use_duration_data": [
                            "使用时长",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            ""
                        ]
                    },
                    {
                        "label": "11月19日",
                        "use_duration_data": [
                            "使用时长",
                            "7小时45分钟",
                            "12小时15分钟",
                            "10小时45分钟",
                            "45分钟",
                            "24小时0分钟",
                            "15分钟",
                            "1小时30分钟",
                            "11小时0分钟",
                            "13小时15分钟",
                            "10小时0分钟",
                            "10小时15分钟",
                            "5小时30分钟",
                            "10小时15分钟",
                            "11小时15分钟",
                            "7小时45分钟",
                            "0",
                            "23小时30分钟",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "10:30-10:45,11:00-18:15,18:45-19:00",
                            "09:15-21:30",
                            "10:30-15:00,15:15-15:30,15:45-21:45",
                            "14:45-15:30",
                            "00:00-00:00",
                            "09:15-09:30",
                            "16:15-16:30,16:45-17:00,18:00-18:15,19:00-19:45",
                            "08:45-10:30,10:45-11:15,11:30-15:00,15:15-15:30,15:45-16:15,16:30-16:45,17:00-17:15,17:30-17:45,18:00-18:30,18:45-19:15,19:30-21:45,22:00-22:30",
                            "09:15-22:30",
                            "09:00-10:00,10:30-11:00,11:45-16:00,17:30-18:00,18:15-19:45,20:00-22:15",
                            "09:00-12:45,14:15-16:15,17:00-20:15,20:30-21:30,21:45-22:00",
                            "09:30-10:00,10:30-14:00,17:00-17:15,18:00-19:00,20:30-20:45",
                            "10:00-20:15",
                            "09:00-15:15,15:30-18:45,19:00-20:30,20:45-21:00",
                            "08:45-10:00,10:15-10:30,11:15-13:00,14:00-14:30,14:45-15:45,17:45-18:15,19:30-22:00",
                            "",
                            "00:00-04:00,04:15-05:30,05:45-00:00",
                            "",
                            "",
                            "",
                            ""
                        ]
                    },
                    {
                        "label": "11月20日",
                        "use_duration_data": [
                            "使用时长",
                            "8小时45分钟",
                            "12小时30分钟",
                            "9小时30分钟",
                            "0",
                            "24小时0分钟",
                            "30分钟",
                            "30分钟",
                            "12小时15分钟",
                            "13小时15分钟",
                            "9小时0分钟",
                            "10小时15分钟",
                            "7小时30分钟",
                            "12小时0分钟",
                            "11小时30分钟",
                            "7小时45分钟",
                            "0",
                            "23小时45分钟",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "09:15-09:45,10:00-16:30,16:45-17:00,17:15-18:15,18:45-19:00,19:30-19:45",
                            "09:00-21:30",
                            "11:00-14:30,14:45-15:30,16:00-16:30,16:45-18:00,18:15-21:45",
                            "",
                            "00:00-00:00",
                            "09:45-10:00,10:15-10:30",
                            "17:00-17:15,20:00-20:15",
                            "02:00-02:15,08:45-10:30,10:45-11:00,11:15-14:45,15:15-16:45,17:00-17:45,18:00-22:15",
                            "09:15-22:30",
                            "09:00-10:00,11:15-15:30,18:15-19:15,19:30-22:15",
                            "09:00-11:45,12:00-12:15,13:00-19:45,20:00-20:15,20:45-21:00",
                            "09:15-09:45,11:15-14:30,15:00-15:15,15:45-16:15,16:45-17:00,17:15-17:30,17:45-18:00,18:15-19:15,19:30-20:15,20:45-21:15",
                            "09:00-21:00",
                            "09:00-11:45,12:00-14:45,15:00-18:30,18:45-21:00,21:15-21:30",
                            "08:45-10:30,11:00-12:30,13:00-13:30,15:00-16:15,19:45-22:30",
                            "",
                            "00:00-00:15,00:30-00:00",
                            "",
                            "",
                            "",
                            ""
                        ]
                    },
                    {
                        "label": "11月21日",
                        "use_duration_data": [
                            "使用时长",
                            "7小时0分钟",
                            "11小时45分钟",
                            "10小时0分钟",
                            "0",
                            "24小时0分钟",
                            "15分钟",
                            "1小时30分钟",
                            "12小时15分钟",
                            "13小时15分钟",
                            "8小时45分钟",
                            "10小时30分钟",
                            "5小时30分钟",
                            "11小时15分钟",
                            "11小时30分钟",
                            "6小时45分钟",
                            "0",
                            "23小时45分钟",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "10:45-16:30,16:45-17:00,17:15-17:30,17:45-18:30",
                            "09:45-21:30",
                            "10:30-10:45,11:00-15:00,15:15-16:00,16:30-17:15,17:30-21:45",
                            "",
                            "00:00-00:00",
                            "09:30-09:45",
                            "16:30-16:45,17:00-17:15,18:45-19:00,19:45-20:00,20:30-21:00",
                            "02:00-02:15,09:00-10:30,10:45-14:30,14:45-15:00,15:15-17:00,17:15-19:15,19:30-21:00,21:15-22:30",
                            "09:15-22:30",
                            "02:00-02:15,09:00-09:45,11:45-15:30,18:15-21:30,21:45-22:30",
                            "09:15-12:15,12:30-12:45,13:00-14:45,15:00-15:15,15:30-17:30,18:15-21:30",
                            "09:45-10:15,10:30-10:45,11:15-13:30,17:00-17:15,17:45-18:00,18:15-18:45,19:00-19:45,20:15-20:45,21:00-21:15",
                            "09:15-20:30",
                            "09:15-13:00,13:15-15:30,15:45-18:00,18:15-21:15,21:30-21:45",
                            "09:00-10:45,11:30-13:00,15:15-16:15,19:45-22:15",
                            "",
                            "00:00-08:30,08:45-00:00",
                            "",
                            "",
                            "",
                            ""
                        ]
                    },
                    {
                        "label": "11月22日",
                        "use_duration_data": [
                            "使用时长",
                            "8小时15分钟",
                            "12小时45分钟",
                            "11小时0分钟",
                            "0",
                            "24小时0分钟",
                            "30分钟",
                            "45分钟",
                            "12小时0分钟",
                            "13小时0分钟",
                            "7小时30分钟",
                            "10小时0分钟",
                            "6小时0分钟",
                            "11小时0分钟",
                            "12小时0分钟",
                            "7小时30分钟",
                            "0",
                            "23小时30分钟",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "10:00-18:15",
                            "09:00-21:45",
                            "10:45-21:45",
                            "",
                            "00:00-00:00",
                            "09:15-09:30,09:45-10:00",
                            "20:15-21:00",
                            "08:45-10:15,10:30-10:45,11:00-14:30,14:45-15:15,15:30-16:30,16:45-17:15,17:30-20:30,20:45-22:30",
                            "09:30-22:30",
                            "09:00-09:30,11:00-11:45,12:15-12:45,13:00-13:45,14:00-15:00,18:00-20:15,20:30-21:30,21:45-22:30",
                            "09:00-12:00,12:15-12:30,12:45-14:45,15:00-15:15,16:15-17:45,18:00-20:45,21:00-21:15",
                            "10:45-11:00,11:30-13:15,13:30-13:45,14:15-14:45,17:30-18:00,18:30-19:45,20:00-21:30",
                            "09:00-20:00",
                            "09:00-14:00,14:15-17:45,18:00-21:30",
                            "09:00-10:45,11:15-13:00,14:00-15:15,18:15-20:45,21:30-21:45",
                            "",
                            "00:00-08:00,08:15-23:15,23:30-00:00",
                            "",
                            "",
                            "",
                            ""
                        ]
                    },
                    {
                        "label": "11月23日",
                        "use_duration_data": [
                            "使用时长",
                            "8小时15分钟",
                            "12小时0分钟",
                            "10小时0分钟",
                            "0",
                            "24小时0分钟",
                            "15分钟",
                            "4小时0分钟",
                            "12小时15分钟",
                            "13小时30分钟",
                            "9小时0分钟",
                            "11小时0分钟",
                            "7小时0分钟",
                            "11小时45分钟",
                            "12小时0分钟",
                            "7小时15分钟",
                            "13小时30分钟",
                            "23小时45分钟",
                            "0",
                            "13小时30分钟",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "09:15-10:00,10:15-10:30,10:45-16:15,16:30-16:45,17:00-17:30,17:45-18:30,18:45-19:00",
                            "09:30-21:30",
                            "10:30-14:30,14:45-17:00,17:15-20:30,21:15-21:30,21:45-22:00",
                            "",
                            "00:00-00:00",
                            "09:15-09:30",
                            "16:15-17:15,17:30-19:30,19:45-20:45",
                            "09:00-12:15,12:30-14:00,14:15-15:00,15:15-15:30,15:45-16:00,16:15-22:30",
                            "09:15-22:45",
                            "09:00-10:00,10:30-11:00,11:45-15:00,16:30-17:15,18:30-19:30,20:00-22:30",
                            "09:00-15:15,15:30-15:45,16:15-18:30,18:45-20:45,21:00-21:15",
                            "09:45-10:15,10:30-13:45,14:15-14:30,14:45-15:00,15:30-15:45,16:15-16:30,17:15-18:15,18:30-19:45",
                            "09:30-21:15",
                            "09:00-11:00,11:15-16:00,16:15-20:45,21:00-21:30,21:45-22:00",
                            "09:00-10:15,11:00-12:45,15:30-16:45,18:00-18:30,19:45-22:15",
                            "10:30-00:00",
                            "00:00-02:15,02:30-00:00",
                            "",
                            "10:30-00:00",
                            "",
                            ""
                        ]
                    },
                    {
                        "label": "11月24日",
                        "use_duration_data": [
                            "使用时长",
                            "7小时30分钟",
                            "12小时30分钟",
                            "9小时30分钟",
                            "0",
                            "24小时0分钟",
                            "30分钟",
                            "1小时30分钟",
                            "12小时0分钟",
                            "13小时0分钟",
                            "9小时0分钟",
                            "8小时15分钟",
                            "8小时0分钟",
                            "10小时15分钟",
                            "10小时15分钟",
                            "8小时0分钟",
                            "24小时0分钟",
                            "24小时0分钟",
                            "0",
                            "24小时0分钟",
                            "0",
                            "0"
                        ],
                        "use_period_data": [
                            "使用时段",
                            "09:00-09:15,11:00-18:00,18:45-19:00",
                            "09:00-21:30",
                            "10:30-15:30,16:00-16:45,17:00-17:30,17:45-20:45,21:15-21:30",
                            "",
                            "00:00-00:00",
                            "09:15-09:30,09:45-10:00",
                            "17:15-17:30,17:45-18:00,19:30-20:30",
                            "09:00-13:30,13:45-14:45,15:00-17:00,17:15-21:45",
                            "09:15-22:15",
                            "09:00-09:30,12:00-13:00,13:15-15:45,17:00-17:45,18:00-22:15",
                            "09:00-13:00,15:00-19:15",
                            "09:30-10:30,10:45-14:45,16:00-16:45,17:00-17:30,17:45-18:00,18:30-19:00,19:45-20:45",
                            "09:00-19:15",
                            "10:30-13:00,13:15-16:30,16:45-21:00,21:15-21:30",
                            "09:00-10:15,10:45-13:00,14:15-15:45,17:30-20:00,21:30-22:00",
                            "00:00-00:00",
                            "00:00-00:00",
                            "",
                            "00:00-00:00",
                            "",
                            ""
                        ]
                    }
                ],
                "total_num": 10
            }
        }
    }
    return {
        "success": true,
        "content": {
            "labels": [
                "数据",
                "后厨其他3台冰箱",
                "烤箱",
                "八头灶2",
                "洗衣机",
                "后厨5台冰箱",
                "后厨化油设备",
                "保温桶",
                "吧台开水机",
                "风机",
                "洗碗间热水器",
                "吧台电磁炉中",
                "八头灶1",
                "煮面炉",
                "吧台电磁炉右",
                "高汤锅",
                "吧台冻小熊冰箱",
                "吧台4台冰箱",
                "吧台加热炉",
                "吧台小熊速冻柜",
                "小炸炉",
                "电饭煲右"
            ],
            "data": [
                {
                    "label": "11月27日",
                    "use_duration_data": [
                        "使用时长",
                        "7小时15分钟",
                        "12小时45分钟",
                        "10小时45分钟",
                        "0",
                        "24小时0分钟",
                        "30分钟",
                        "2小时15分钟",
                        "11小时0分钟",
                        "13小时0分钟",
                        "9小时0分钟",
                        "9小时30分钟",
                        "7小时45分钟",
                        "12小时15分钟",
                        "11小时0分钟",
                        "7小时45分钟",
                        "0",
                        "23小时0分钟",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "use_period_data": [
                        "使用时段",
                        "10:30-11:00,11:15-18:00",
                        "09:00-21:45",
                        "10:30-15:15,15:30-20:00,20:15-21:45",
                        "",
                        "00:00-00:00",
                        "09:15-09:30,09:45-10:00",
                        "15:30-15:45,16:00-17:30,17:45-18:00,18:30-18:45",
                        "09:00-10:00,10:15-10:45,11:00-11:15,11:30-14:15,14:30-15:15,15:30-16:30,16:45-17:00,17:15-21:15,21:30-22:00",
                        "09:15-22:15",
                        "09:00-09:45,10:15-11:00,12:00-15:45,18:15-22:00",
                        "09:00-12:30,12:45-13:00,13:45-15:45,16:30-19:00,20:00-21:15",
                        "09:00-10:15,11:15-14:30,14:45-15:00,17:30-17:45,18:00-18:15,18:30-21:00",
                        "09:00-21:15",
                        "10:15-15:45,16:00-21:30",
                        "09:00-12:30,13:45-15:00,18:00-20:30,21:00-21:30",
                        "",
                        "00:00-06:00,06:15-06:30,06:45-07:00,07:15-08:30,08:45-00:00",
                        "",
                        "",
                        "",
                        ""
                    ]
                },
                {
                    "label": "11月28日",
                    "use_duration_data": [
                        "使用时长",
                        "8小时30分钟",
                        "12小时15分钟",
                        "9小时45分钟",
                        "0",
                        "24小时0分钟",
                        "15分钟",
                        "1小时45分钟",
                        "12小时30分钟",
                        "13小时15分钟",
                        "8小时0分钟",
                        "11小时45分钟",
                        "7小时30分钟",
                        "12小时15分钟",
                        "9小时45分钟",
                        "7小时30分钟",
                        "0",
                        "22小时45分钟",
                        "30分钟",
                        "0",
                        "0",
                        "0"
                    ],
                    "use_period_data": [
                        "使用时段",
                        "10:00-18:15,18:30-18:45",
                        "09:15-21:30",
                        "10:45-15:30,16:45-21:45",
                        "",
                        "00:00-00:00",
                        "09:15-09:30",
                        "18:30-19:15,19:45-20:45",
                        "09:00-10:45,11:00-16:00,16:15-16:30,16:45-22:15",
                        "09:15-22:30",
                        "09:00-09:30,11:30-12:00,12:15-14:30,14:45-15:45,18:30-22:15",
                        "09:00-16:00,16:45-21:30",
                        "09:00-10:15,10:45-11:15,11:30-14:30,16:45-17:00,17:15-18:30,19:15-19:45,20:15-20:30,21:15-21:45",
                        "09:00-21:15",
                        "10:00-14:15,14:30-16:15,17:00-20:15,20:30-21:00",
                        "09:00-10:45,11:15-13:00,15:00-16:00,19:00-21:30,21:45-22:15",
                        "",
                        "00:00-02:00,02:15-02:30,02:45-04:30,04:45-06:15,06:30-08:45,09:00-00:00",
                        "21:00-21:30",
                        "",
                        "",
                        ""
                    ]
                },
                {
                    "label": "11月29日",
                    "use_duration_data": [
                        "使用时长",
                        "8小时45分钟",
                        "12小时30分钟",
                        "9小时45分钟",
                        "45分钟",
                        "24小时0分钟",
                        "45分钟",
                        "2小时15分钟",
                        "11小时0分钟",
                        "13小时15分钟",
                        "8小时30分钟",
                        "11小时45分钟",
                        "8小时45分钟",
                        "12小时15分钟",
                        "11小时15分钟",
                        "7小时30分钟",
                        "8小时45分钟",
                        "22小时45分钟",
                        "0",
                        "8小时45分钟",
                        "0",
                        "0"
                    ],
                    "use_period_data": [
                        "使用时段",
                        "09:45-18:15,18:45-19:00",
                        "09:00-21:30",
                        "10:45-15:00,15:15-15:45,16:00-16:45,17:00-20:15,20:30-21:15,21:30-21:45",
                        "14:30-15:15",
                        "00:00-00:00",
                        "09:30-09:45,10:45-11:00,11:15-11:30",
                        "16:15-17:00,17:45-18:15,19:00-19:30,19:45-20:15",
                        "09:00-10:30,10:45-12:30,12:45-13:45,14:00-15:15,15:30-17:00,17:15-18:00,18:15-19:45,20:00-20:30,20:45-21:00,21:15-22:15",
                        "09:15-22:30",
                        "09:00-10:15,12:00-12:45,13:00-13:45,14:00-15:30,17:15-18:00,19:00-22:30",
                        "09:00-12:15,12:30-17:30,17:45-19:45,20:00-21:15,21:30-21:45",
                        "09:00-10:15,10:45-14:00,14:30-15:00,15:30-15:45,16:00-16:15,17:15-17:45,18:15-19:45,20:30-21:00,21:15-22:00",
                        "09:00-21:15",
                        "10:00-19:15,19:30-21:15,21:30-21:45",
                        "09:00-12:15,14:00-15:00,16:30-16:45,18:30-21:00,21:45-22:15",
                        "15:15-00:00",
                        "00:00-00:30,00:45-01:30,01:45-03:00,03:15-04:30,04:45-06:00,06:15-00:00",
                        "",
                        "15:15-00:00",
                        "",
                        ""
                    ]
                },
                {
                    "label": "11月30日",
                    "use_duration_data": [
                        "使用时长",
                        "11小时0分钟",
                        "12小时45分钟",
                        "10小时15分钟",
                        "0",
                        "24小时0分钟",
                        "30分钟",
                        "0",
                        "11小时30分钟",
                        "14小时30分钟",
                        "8小时45分钟",
                        "11小时0分钟",
                        "7小时15分钟",
                        "12小时30分钟",
                        "11小时30分钟",
                        "8小时0分钟",
                        "24小时0分钟",
                        "23小时45分钟",
                        "0",
                        "24小时0分钟",
                        "0",
                        "0"
                    ],
                    "use_period_data": [
                        "使用时段",
                        "09:15-20:00,21:00-21:15",
                        "09:00-21:45",
                        "10:30-10:45,11:00-15:30,15:45-21:00,21:15-21:30",
                        "",
                        "00:00-00:00",
                        "09:15-09:30,09:45-10:00",
                        "",
                        "09:00-10:15,10:30-11:45,12:00-14:15,14:30-14:45,15:00-16:45,17:00-17:15,17:30-18:30,18:45-19:45,20:15-20:30,20:45-22:45,23:00-23:15",
                        "09:15-23:45",
                        "09:00-10:00,12:00-15:30,19:00-23:15",
                        "09:00-12:00,12:30-15:15,15:30-15:45,16:30-19:00,19:15-21:30,21:45-22:00",
                        "09:00-10:00,11:15-11:30,11:45-14:15,14:30-14:45,16:30-16:45,17:00-17:15,17:30-18:00,18:30-19:45,20:00-21:00",
                        "09:00-21:30",
                        "09:45-17:15,17:30-20:45,21:00-21:45",
                        "09:00-10:15,10:30-13:00,16:45-18:15,21:00-23:45",
                        "00:00-00:00",
                        "00:00-06:45,07:00-00:00",
                        "",
                        "00:00-00:00",
                        "",
                        ""
                    ]
                },
                {
                    "label": "12月01日",
                    "use_duration_data": [
                        "使用时长",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "use_period_data": [
                        "使用时段",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
                    ]
                },
                {
                    "label": "12月02日",
                    "use_duration_data": [
                        "使用时长",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "use_period_data": [
                        "使用时段",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
                    ]
                },
                {
                    "label": "12月03日",
                    "use_duration_data": [
                        "使用时长",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "use_period_data": [
                        "使用时段",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
                    ]
                }
            ],
            "total_num": 7
        }
    }
}

function getPcoLighthouseEnum(params) {
    return {
        "success": true,
        "content": {
            "risk_type": [
                {
                    "value": 1,
                    "text": "日常管理"
                },
                {
                    "value": 2,
                    "text": "设备设施"
                },
                {
                    "value": 3,
                    "text": "卫生清洁"
                },
                {
                    "value": 4,
                    "text": "外围环境"
                },
                {
                    "value": 5,
                    "text": "结构设施"
                }
            ],
            "pest_type": [
                {
                    "value": 1,
                    "text": "鼠类"
                },
                {
                    "value": 2,
                    "text": "蟑螂"
                },
                {
                    "value": 3,
                    "text": "飞虫"
                }
            ],
            "service_type": [
                {
                    "value": 1,
                    "text": "灯塔云服务"
                },
                {
                    "value": 2,
                    "text": "客户紧急服务"
                },
                {
                    "value": 3,
                    "text": "常规服务"
                },
                {
                    "value": 4,
                    "text": "勘查服务"
                }
            ],
            "dispose_status": [
                {
                    "value": 1,
                    "text": "待处理"
                },
                {
                    "value": 2,
                    "text": "已处理"
                }
            ],
            "recognition_mode": [
                {
                    "value": 1,
                    "text": "常规服务"
                },
                {
                    "value": 2,
                    "text": "灯塔云服务"
                },
                {
                    "value": 3,
                    "text": "勘察服务"
                },
                {
                    "value": 4,
                    "text": "紧急服务"
                }
            ],
            "adjust_type": [
                {
                    "value": 1,
                    "text": "待整改"
                },
                {
                    "value": 2,
                    "text": "已整改"
                }
            ]
        }
    }
}

function getStoreStandardList(params) {
    return {
        "success": true,
        "content": {
            "standard_list": [
                {
                    "store_id": 64904,
                    "store_name": "火星基地1号店",
                    "area": "后厨",
                    "check_item_name": "铝扣板吊顶",
                    "pest_type_name": "鼠类",
                    "risk_type_name": "结构设施",
                    "standard_description": "存在结构漏洞，有鼠类入侵风险",
                    "rectification_measures": "使用不易被鼠类破坏的封堵材料进行封堵处理",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/1-1.jpg?a=1"
                    ],
                    "after_adjust_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/TIME2025-06-04%2008_35_21-66f11d94-337d-47f5-8893-42696b965952.jpeg?a=1",
                        "https://static.honganrobots.com/dengta-pc-demo/images/TIME2025-06-04%2009_00_35-f2e10619-32c3-4ee6-a55a-9b266cded8f8.jpeg?a=1"
                    ],
                    "standard_id": 23,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 1
                },
                {
                    "store_id": 64904,
                    "store_name": "火星基地2号店",
                    "area": "操作间",
                    "check_item_name": "铝扣板吊顶",
                    "pest_type_name": "鼠类",
                    "risk_type_name": "结构设施",
                    "standard_description": "存在结构漏洞，有鼠类入侵风险",
                    "rectification_measures": "使用不易被鼠类破坏的封堵材料进行封堵处理",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/1-2.jpg?a=1"
                    ],
                    "after_adjust_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/TIME2025-06-04%2019_30_49-1df4d2cb-1758-4a51-8742-2b48fab56341.jpg?a=1"
                    ],
                    "standard_id": 23,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 1
                },
                {
                    "store_id": 64904,
                    "store_name": "火星基地3号店",
                    "area": "客区穿管管路",
                    "check_item_name": "镂空吊顶",
                    "pest_type_name": "鼠类",
                    "risk_type_name": "结构设施",
                    "standard_description": "存在结构漏洞，有鼠类入侵风险",
                    "rectification_measures": "使用不易被鼠类破坏的封堵材料进行封堵处理",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/1-3.jpg?a=1"
                    ],
                    "after_adjust_pic": [],
                    "standard_id": 25,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 1
                },
                {
                    "store_id": 64904,
                    "store_name": "火星基地4号店",
                    "area": "前后门",
                    "check_item_name": "门店外围",
                    "pest_type_name": "飞虫",
                    "risk_type_name": "外围环境",
                    "standard_description": "外围环境害虫密度较高，害虫有较大入侵风险",
                    "rectification_measures": "建议加强三防设施的维护/管理",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/pcoStoreRishManagement4-1.jpeg?a=1"
                    ],
                    "after_adjust_pic": [],
                    "standard_id": 14,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 3
                },
                {
                    "store_id": 64904,
                    "store_name": "火星基地5号店",
                    "area": "客区外围",
                    "check_item_name": "门店外围",
                    "pest_type_name": "飞虫",
                    "risk_type_name": "外围环境",
                    "standard_description": "外围环境害虫密度较高，害虫有较大入侵风险",
                    "rectification_measures": "建议加强三防设施的维护/管理",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/pcoStoreRishManagement5-1.jpeg?a=1"
                    ],
                    "after_adjust_pic": [],
                    "standard_id": 14,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 3
                },
                {
                    "store_id": 64904,
                    "store_name": "火星基地6号店",
                    "area": "客区",
                    "check_item_name": "胶帘",
                    "pest_type_name": "飞虫",
                    "risk_type_name": "设备设施",
                    "standard_description": "胶帘存在密封不严的情况，有飞虫入侵风险",
                    "rectification_measures": "加强对门店胶帘的维护与管理",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/pcoStoreRishManagement6-1.jpg?a=1"
                    ],
                    "after_adjust_pic": [],
                    "standard_id": 17,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 3
                },
                {
                    "store_id": 64904,
                    "store_name": "火星基地7号店",
                    "area": "后厨",
                    "check_item_name": "垃圾桶",
                    "pest_type_name": "飞虫",
                    "risk_type_name": "日常管理",
                    "standard_description": "垃圾桶无桶盖，易吸引孳生飞虫",
                    "rectification_measures": "垃圾桶加盖处理/管理",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/pcoStoreRishManagement7-1.jpeg?a=1"
                    ],
                    "after_adjust_pic": [],
                    "standard_id": 19,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 3
                },
                {
                    "store_id": 64904,
                    "store_name": "火星基地8号店",
                    "area": "后厨",
                    "check_item_name": "清洁工具放置区",
                    "pest_type_name": "飞虫",
                    "risk_type_name": "日常管理",
                    "standard_description": "清洁工具未悬空放置，易孳生飞虫",
                    "rectification_measures": "清洁工具悬空放置",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/pcoStoreRishManagement8-1.jpeg?a=1"
                    ],
                    "after_adjust_pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/pcoStoreRishManagement8-2.jpeg?a=1"
                    ],
                    "standard_id": 34,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 3
                },
                {
                    "store_id": 64904,
                    "store_name": "火星基地9号店",
                    "area": "后厨",
                    "check_item_name": "地面、墙角",
                    "pest_type_name": "飞虫",
                    "risk_type_name": "结构设施",
                    "standard_description": "有裂缝或破损,容易孳生飞虫",
                    "rectification_measures": "用速干水泥或玻璃胶进行封堵",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/pcoStoreRishManagement9-1.jpg?a=1",
                        "https://static.honganrobots.com/dengta-pc-demo/images/pcoStoreRishManagement9-2.jpg?a=1"
                    ],
                    "after_adjust_pic": [],
                    "standard_id": 48,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 3
                },
                {
                    "store_id": 64904,
                    "store_name": "火星基地10号店",
                    "area": "操作间",
                    "check_item_name": "下水管",
                    "pest_type_name": "飞虫",
                    "risk_type_name": "设备设施",
                    "standard_description": "与下水管间存在结构缝隙，有飞虫孳生风险",
                    "rectification_measures": "安装防臭堵头",
                    "pic": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/pcoStoreRishManagement10-1.jpg?a=1"
                    ],
                    "after_adjust_pic": [],
                    "standard_id": 53,
                    "ticket_arrive_time": getSpecifiedDate(2025, 6, 3),
                    "pest_type": 3
                }
            ],
            "total": 10
        }
    }
}

function getPcoLighthouseStoreInfo(params) {
  return {
        "success": true,
        "content": {
            "store_list": [
                {
                    "id": 912,
                    "name": "火星基地1号店"
                }
            ],
            "city": [
                {
                    "value": 1,
                    "text": "北京市"
                },
                {
                    "value": 2,
                    "text": "上海市"
                },
                {
                    "value": 3,
                    "text": "天津市"
                },
                {
                    "value": 4,
                    "text": "济南市"
                },
                {
                    "value": 6,
                    "text": "邢台市"
                },
                {
                    "value": 10,
                    "text": "廊坊市"
                },
                {
                    "value": 13,
                    "text": "合肥市"
                },
                {
                    "value": 14,
                    "text": "苏州市"
                },
                {
                    "value": 16,
                    "text": "南京市"
                },
                {
                    "value": 19,
                    "text": "扬州市"
                },
                {
                    "value": 21,
                    "text": "马鞍山市"
                },
                {
                    "value": 23,
                    "text": "无锡市"
                },
                {
                    "value": 24,
                    "text": "常州市"
                },
                {
                    "value": 25,
                    "text": "徐州市"
                },
                {
                    "value": 26,
                    "text": "杭州市"
                },
                {
                    "value": 27,
                    "text": "宁波市"
                },
                {
                    "value": 28,
                    "text": "南通市"
                },
                {
                    "value": 29,
                    "text": "青岛市"
                },
                {
                    "value": 33,
                    "text": "广州市"
                },
                {
                    "value": 34,
                    "text": "深圳市"
                },
                {
                    "value": 35,
                    "text": "台州市"
                },
                {
                    "value": 40,
                    "text": "湖州市"
                },
                {
                    "value": 42,
                    "text": "嘉兴市"
                },
                {
                    "value": 43,
                    "text": "镇江市"
                },
                {
                    "value": 44,
                    "text": "盐城市"
                },
                {
                    "value": 46,
                    "text": "芜湖市"
                },
                {
                    "value": 55,
                    "text": "绍兴市"
                },
                {
                    "value": 59,
                    "text": "金华市"
                },
                {
                    "value": 71,
                    "text": "西安市"
                },
                {
                    "value": 98,
                    "text": "荆州市"
                },
                {
                    "value": 108,
                    "text": "黄山市"
                },
                {
                    "value": 116,
                    "text": "长沙市"
                },
                {
                    "value": 134,
                    "text": "黄石市"
                },
                {
                    "value": 159,
                    "text": "郑州市"
                },
                {
                    "value": 160,
                    "text": "武汉市"
                },
                {
                    "value": 161,
                    "text": "仙桃市"
                },
                {
                    "value": 174,
                    "text": "安庆市"
                },
                {
                    "value": 202,
                    "text": "黄冈市"
                },
                {
                    "value": 210,
                    "text": "泰安市"
                },
                {
                    "value": 214,
                    "text": "宿州市"
                },
                {
                    "value": 221,
                    "text": "襄阳市"
                },
                {
                    "value": 230,
                    "text": "重庆市"
                },
                {
                    "value": 231,
                    "text": "亳州市"
                },
                {
                    "value": 256,
                    "text": "蚌埠市"
                },
                {
                    "value": 260,
                    "text": "宿迁市"
                },
                {
                    "value": 272,
                    "text": "成都市"
                },
                {
                    "value": 282,
                    "text": "铜陵市"
                },
                {
                    "value": 301,
                    "text": "淮安市"
                },
                {
                    "value": 303,
                    "text": "六安市"
                },
                {
                    "value": 314,
                    "text": "阜阳市"
                },
                {
                    "value": 315,
                    "text": "宣城市"
                },
                {
                    "value": 320,
                    "text": "连云港市"
                },
                {
                    "value": 322,
                    "text": "孝感市"
                },
                {
                    "value": 334,
                    "text": "滁州市"
                },
                {
                    "value": 367,
                    "text": "太原市"
                },
                {
                    "value": 376,
                    "text": "洛阳市"
                },
                {
                    "value": 401,
                    "text": "淮南市"
                }
            ]
        }
    }
}

function getPcoLighthouseMonitorPointList(params) {
    return {
        "success": true,
        "content": {
            "sticky_mouse_board": [
                {
                    "location": "餐厅后厨角落",
                    "report_list": [
                        {
                            "image_path": "https://static.honganrobots.com/dengta-pc-demo/images/10-1.png?a=1",
                            "report_date": formatDateWithOffset(-1),
                            "recognized_count": 0
                        },
                        {
                            "image_path": "https://static.honganrobots.com/dengta-pc-demo/images/10-2.png?a=1",
                            "report_date": formatDateWithOffset(-1),
                            "recognized_count": 1
                        }
                    ]
                },
                {
                    "location": "仓库入口",
                    "report_list": [
                        {
                            "image_path": "https://static.honganrobots.com/dengta-pc-demo/images/10-3.png?a=1",
                            "report_date": formatDateWithOffset(-1),
                            "recognized_count": 0
                        }
                    ]
                }
            ],
            "cockroach_house": [
                {
                    "location": "洗碗池下方",
                    "report_list": [
                        {
                            "image_path": "https://static.honganrobots.com/dengta-pc-demo/images/10-4.png?a=1",
                            "report_date": formatDateWithOffset(-2),
                            "recognized_count": 23
                        },
                        {
                            "image_path": "https://static.honganrobots.com/dengta-pc-demo/images/10-4.png?a=1",
                            "report_date": formatDateWithOffset(-2),
                            "recognized_count": 34
                        }
                    ]
                },
                {
                    "location": "食品储藏柜旁",
                    "report_list": [
                        {
                            "image_path": "https://static.honganrobots.com/dengta-pc-demo/images/10-4.png?a=1",
                            "report_date": formatDateWithOffset(-2),
                            "recognized_count": 15
                        }
                    ]
                }
            ],
            "fly_killing_lamp": [
                {
                    "location": "餐厅大厅",
                    "report_list": [
                        {
                            "image_path": "https://static.honganrobots.com/dengta-pc-demo/images/10-5.png?a=1",
                            "report_date":formatDateWithOffset(-3),
                            "recognized_count": 15
                        },
                        {
                            "image_path": "https://static.honganrobots.com/dengta-pc-demo/images/10-5.png?a=1",
                            "report_date": formatDateWithOffset(-3),
                            "recognized_count": 15
                        }
                    ]
                },
                {
                    "location": "厨房出口",
                    "report_list": [
                        {
                            "image_path": "https://static.honganrobots.com/dengta-pc-demo/images/10-5.png?a=1",
                            "report_date": formatDateWithOffset(-3),
                            "recognized_count": 23
                        }
                    ]
                }
            ]
        }
    }
}

function getPcoLighthouseServiceOverviewStats(params) {
    return {
        "success": true,
        "content": {
            "user_id": 134467,
            "short_year_month_name": "202512",
            "total_served_store_count": 91,
            "served_stores_growth_rate": "12.1%",
            "service_count": 105,
            "service_count_growth_rate": "14.3%",
            "pest_incident_count": 89,
            "pest_incident_decline_rate": "35%",
            "customer_satisfaction": "0.0",
            "customer_satisfaction_growth_rate": null,
            "survey_service_count": 0,
            "emergency_service_count": 12,
            "lighthouse_cloud_service_count": 2,
            "routine_service_count": 91,
            "partnered_stores_count": 91,
            "emergency_24h_arrival_rate": "100.0%",
            "new_store_survey_ontime_rate": "100.0%",
            "routine_service_ontime_rate": "100.0%",
            "update_date": formatDateWithOffset(-1)
        }
    }
}

function getPcoLighthouseIntelligentMonitorStats(params) {
    return {
        "success": true,
        "content": [
            {
                "occurrence_date": formatDateWithOffset(-32),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 6
            },
            {
                "occurrence_date": formatDateWithOffset(-31),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 6
            },
            {
                "occurrence_date": formatDateWithOffset(-30),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 6
            },
            {
                "occurrence_date": formatDateWithOffset(-29),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 11
            },
            {
                "occurrence_date": formatDateWithOffset(-28),
                "mouse_count": null,
                "cockroach_count": 1,
                "winged_insect_count": 9
            },
            {
                "occurrence_date": formatDateWithOffset(-27),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 10
            },
            {
                "occurrence_date": formatDateWithOffset(-26),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 10
            },
            {
                "occurrence_date": formatDateWithOffset(-25),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 10
            },
            {
                "occurrence_date": formatDateWithOffset(-24),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 7
            },
            {
                "occurrence_date": formatDateWithOffset(-23),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 6
            },
            {
                "occurrence_date": formatDateWithOffset(-22),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 8
            },
            {
                "occurrence_date": formatDateWithOffset(-21),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 4
            },
            {
                "occurrence_date": formatDateWithOffset(-20),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 4
            },
            {
                "occurrence_date": formatDateWithOffset(-19),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 10
            },
            {
                "occurrence_date": formatDateWithOffset(-18),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 6
            },
            {
                "occurrence_date": formatDateWithOffset(-17),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 9
            },
            {
                "occurrence_date": formatDateWithOffset(-16),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 7
            },
            {
                "occurrence_date": formatDateWithOffset(-15),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 7
            },
            {
                "occurrence_date": formatDateWithOffset(-14),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 4
            },
            {
                "occurrence_date": formatDateWithOffset(-13),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 7
            },
            {
                "occurrence_date": formatDateWithOffset(-12),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 7
            },
            {
                "occurrence_date": formatDateWithOffset(-11),
                "mouse_count": null,
                "cockroach_count": 1,
                "winged_insect_count": 4
            },
            {
                "occurrence_date": formatDateWithOffset(-10),
                "mouse_count": 1,
                "cockroach_count": null,
                "winged_insect_count": 4
            },
            {
                "occurrence_date": formatDateWithOffset(-9),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 4
            },
            {
                "occurrence_date": formatDateWithOffset(-8),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 5
            },
            {
                "occurrence_date": formatDateWithOffset(-7),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 6
            },
            {
                "occurrence_date": formatDateWithOffset(-6),
                "mouse_count": 1,
                "cockroach_count": null,
                "winged_insect_count": 5
            },
            {
                "occurrence_date": formatDateWithOffset(-5),
                "mouse_count": null,
                "cockroach_count": null,
                "winged_insect_count": 7
            },
            {
                "occurrence_date": formatDateWithOffset(-4),
                "mouse_count": 0,
                "cockroach_count": 0,
                "winged_insect_count": 0
            },
            {
                "occurrence_date": formatDateWithOffset(-3),
                "mouse_count": 0,
                "cockroach_count": 0,
                "winged_insect_count": 0
            },
            {
                "occurrence_date": formatDateWithOffset(-2),
                "mouse_count": 0,
                "cockroach_count": 0,
                "winged_insect_count": 0
            },
            {
                "occurrence_date": formatDateWithOffset(-1),
                "mouse_count": 0,
                "cockroach_count": 0,
                "winged_insect_count": 0
            }
        ]
    }
}

function getPcoLighthouseIntelligentMonitorEventList(params) {
    return {
        "success": true,
        "content": {
            "item_list": [
                {
                    "user_id": 134467,
                    "ticket_id": 1000288800,
                    "order_id": null,
                    "city_id": 2,
                    "city_name": "上海市",
                    "ecmall_store_id": 78023,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 3,
                    "pest_category_name": "飞虫",
                    "detection_method_id": 2,
                    "detection_method_name": "灯塔云服务",
                    "occurrence_time": "2025-11-30 06:02:57",
                    "occurrence_date": "2025-11-30",
                    "occurrence_location": "客区门口",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"2025/202511/20251130/3835333831335116003c0045/2035384236315014003a0040_1764453625_sr4.jpeg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/1.jpeg?a=1"
                    ]
                },
                {
                    "user_id": 134467,
                    "ticket_id": 1000288854,
                    "order_id": null,
                    "city_id": 2,
                    "city_name": "上海市",
                    "ecmall_store_id": 629293,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 3,
                    "pest_category_name": "飞虫",
                    "detection_method_id": 2,
                    "detection_method_name": "灯塔云服务",
                    "occurrence_time": "2025-11-30 06:03:14",
                    "occurrence_date": "2025-11-30",
                    "occurrence_location": "客区洗手间",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"2025/202511/20251130/3734373631335117003e003a/2035384236315016002c005c_1764453626_sr4.jpeg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/2.jpeg?a=1"
                    ]
                },
                {
                    "user_id": 134467,
                    "ticket_id": 1000288891,
                    "order_id": null,
                    "city_id": 31,
                    "city_name": "温州市",
                    "ecmall_store_id": 1130225,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 3,
                    "pest_category_name": "飞虫",
                    "detection_method_id": 2,
                    "detection_method_name": "灯塔云服务",
                    "occurrence_time": "2025-11-30 06:03:26",
                    "occurrence_date": "2025-11-30",
                    "occurrence_location": "大厅后门旁边",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"2025/202511/20251130/3734373631335117004a0035/203538423631501700610050_1764453631_sr4.jpeg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/3.jpeg?a=1"
                    ]
                },
                {
                    "user_id": 134467,
                    "ticket_id": 1000288953,
                    "order_id": null,
                    "city_id": 1,
                    "city_name": "北京市",
                    "ecmall_store_id": 90856,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 3,
                    "pest_category_name": "飞虫",
                    "detection_method_id": 2,
                    "detection_method_name": "灯塔云服务",
                    "occurrence_time": "2025-11-30 06:03:43",
                    "occurrence_date": "2025-11-30",
                    "occurrence_location": "后厨-库房门口",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"2025/202511/20251130/37343736313351180052002c/20353842363150160061003d_1764453632_sr4.jpeg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/4.jpeg?a=1"
                    ]
                },
                {
                    "user_id": 134467,
                    "ticket_id": 1000289877,
                    "order_id": null,
                    "city_id": 2,
                    "city_name": "上海市",
                    "ecmall_store_id": 71394,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 3,
                    "pest_category_name": "飞虫",
                    "detection_method_id": 2,
                    "detection_method_name": "灯塔云服务",
                    "occurrence_time": "2025-11-30 06:20:46",
                    "occurrence_date": "2025-11-30",
                    "occurrence_location": "穿串间出餐口旁,后门处垃圾站上方,客区后厨入口处",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"2025/202511/20251130/38353338313351110028002c/2035384236315017006b004f_1764454716_sr4.jpeg\",\"2025/202511/20251130/38353338313351110028002c/2035384236315016001f005b_1764455074_sr4.jpeg\",\"2025/202511/20251130/38353338313351110028002c/20353842363150160048005c_1764455441_sr4.jpeg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/5.jpeg?a=1"
                    ]
                },
                {
                    "user_id": 134467,
                    "ticket_id": 1000290197,
                    "order_id": null,
                    "city_id": 26,
                    "city_name": "杭州市",
                    "ecmall_store_id": 1209204,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 3,
                    "pest_category_name": "飞虫",
                    "detection_method_id": 2,
                    "detection_method_name": "灯塔云服务",
                    "occurrence_time": "2025-11-30 06:31:50",
                    "occurrence_date": "2025-11-30",
                    "occurrence_location": "后厨臭氧消毒室内",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"2025/202511/20251130/3835333831335111001c002b/2035384236315017004f0060_1764455425_sr4.jpeg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/1.jpeg?a=1"
                    ]
                },
                {
                    "user_id": 134467,
                    "ticket_id": 1000290423,
                    "order_id": null,
                    "city_id": 1,
                    "city_name": "北京市",
                    "ecmall_store_id": 3063,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 3,
                    "pest_category_name": "飞虫",
                    "detection_method_id": 2,
                    "detection_method_name": "灯塔云服务",
                    "occurrence_time": "2025-11-30 06:37:39",
                    "occurrence_date": "2025-11-30",
                    "occurrence_location": "客区-26号桌附近",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"2025/202511/20251130/3734373631335117004c0036/2035384236315016004e0052_1764455789_sr4.jpeg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/2.jpeg?a=1"
                    ]
                },
                {
                    "user_id": 134467,
                    "ticket_id": 3015323,
                    "order_id": null,
                    "city_id": 2,
                    "city_name": "上海市",
                    "ecmall_store_id": 64904,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 1,
                    "pest_category_name": "鼠类",
                    "detection_method_id": 2,
                    "detection_method_name": "灯塔云服务",
                    "occurrence_time": "2025-11-29 06:48:39",
                    "occurrence_date": "2025-11-29",
                    "occurrence_location": "二楼vip2号房间上发",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"2025/202511/20251129/3835333831335111002a002c/2035384236315017001f0053_1764370114.jpeg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/3.jpeg?a=1"
                    ]
                },
                {
                    "user_id": 134467,
                    "ticket_id": 3015345,
                    "order_id": 117307,
                    "city_id": 14,
                    "city_name": "苏州市",
                    "ecmall_store_id": 1209203,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 2,
                    "pest_category_name": "蟑螂",
                    "detection_method_id": 4,
                    "detection_method_name": "紧急服务",
                    "occurrence_time": "2025-11-29 17:54:07",
                    "occurrence_date": "2025-11-29",
                    "occurrence_location": "橱柜",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"pcoRecordCheckPointImg/IMG20251129223332_B7823f6c-ADDR开平路2299号吴江万象汇4层-TIME2025-11-29-22-50-49-f842912b-1ad3-4e13-8239-eec41de5f342.jpg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/4.jpeg?a=1"
                    ]
                },
                {
                    "user_id": 134467,
                    "ticket_id": 1000286279,
                    "order_id": null,
                    "city_id": 2,
                    "city_name": "上海市",
                    "ecmall_store_id": 629293,
                    "ecmall_store_name": "火星基地1号店",
                    "brand_id": 58,
                    "brand_name": "火星基地",
                    "pest_category_id": 3,
                    "pest_category_name": "飞虫",
                    "detection_method_id": 2,
                    "detection_method_name": "灯塔云服务",
                    "occurrence_time": "2025-11-29 06:03:15",
                    "occurrence_date": "2025-11-29",
                    "occurrence_location": "客区洗手间",
                    "processing_status": 2,
                    "processing_status_name": "已处理",
                    "image_path": "[\"2025/202511/20251129/3734373631335117003e003a/2035384236315016002c005c_1764367225_sr4.jpeg\"]",
                    "image_url": [
                        "https://static.honganrobots.com/dengta-pc-demo/images/5.jpeg?a=1"
                    ]
                }
            ],
            "total": 10
        }
    }
}

function getPcoLighthouseMessageList(params) {
  return {
    "success": true,
    "content": {
      "has_unread": true,
      "list": [
        {
          "msg_id": 10001,
          "title": "设备异常告警",
          "msg_content": "您的店铺[火星基地1号店]的设备出现异常，请及时查看。",
          "message_type": 1,
          "message_type_name": "设备告警",
          "is_read": false,
          "msg_create_time": "2025-11-30 14:30:00",
          "city_id": 2,
          "city_name": "上海市",
          "ecmall_store_id": 78023,
          "store_name": "火星基地1号店",
          "brand_id": 58,
          "brand_name": "火星基地"
        },
        {
          "msg_id": 10002,
          "title": "清洁任务提醒",
          "msg_content": "您的店铺[火星基地1号店]有新的清洁任务需要处理。",
          "message_type": 2,
          "message_type_name": "任务提醒",
          "is_read": true,
          "msg_create_time": "2025-11-30 10:15:00",
          "city_id": 2,
          "city_name": "上海市",
          "ecmall_store_id": 78023,
          "store_name": "火星基地1号店",
          "brand_id": 58,
          "brand_name": "火星基地"
        },
        {
          "msg_id": 10003,
          "title": "数据报告生成",
          "msg_content": "您的店铺[火星基地1号店]的月度数据报告已生成，请查看。",
          "message_type": 3,
          "message_type_name": "数据报告",
          "is_read": true,
          "msg_create_time": "2025-11-29 16:45:00",
          "city_id": 1,
          "city_name": "北京市",
          "ecmall_store_id": 90856,
          "store_name": "火星基地1号店",
          "brand_id": 58,
          "brand_name": "火星基地"
        },
        {
          "msg_id": 10005,
          "title": "设备维护提醒",
          "msg_content": "您的店铺[火星基地1号店]的设备需要进行定期维护，请安排相关人员处理。",
          "message_type": 1,
          "message_type_name": "设备告警",
          "is_read": true,
          "msg_create_time": "2025-11-27 14:20:00",
          "city_id": 31,
          "city_name": "温州市",
          "ecmall_store_id": 1130225,
          "store_name": "火星基地1号店",
          "brand_id": 58,
          "brand_name": "火星基地"
        }
      ]
    }
  }
}
function getCombiovenRunningOverview(params) {
    return {
        "success": true,
        "content": {
            "cooperating_count": 3,
            "no_load_heating_timeout_cnt": 2,
            "cooking_door_open_timeout_cnt": 3,
            "non_standard_cleaning_cnt": 3,
            "unconnected_count": 0,
            "menu_modification_cnt": 3
        }
    }
}
function getCombiovenRunningDetail(params) {
    return {
        "success": true,
        "content": {
            "items": [
            {
                "device_id": "DEVICE_001",
                "used_days": 3,
                "avg_cooking_duration": 3.266666666666667,
                "avg_energy_consumption": 9.266666666666667,
                "menu_modification_cnt": 2,
                "no_load_heating_timeout_cnt": 3,
                "cooking_door_open_timeout_cnt": 3,
                "non_standard_cleaning_cnt": 1,
                "store_id": 14574,
                "store_name": "火星基地1号店",
                "store_address": "北京市朝阳区建国路100号",
                "is_online": 1,
                "cooking_duration": 3.27,
                "energy_consumption": 9.27
            },
            {
                "device_id": "DEVICE_002",
                "used_days": 1,
                "avg_cooking_duration": 1.8,
                "avg_energy_consumption": 7.8,
                "menu_modification_cnt": 1,
                "no_load_heating_timeout_cnt": 0,
                "cooking_door_open_timeout_cnt": 1,
                "non_standard_cleaning_cnt": 1,
                "store_id": 699475,
                "store_name": "火星基地2号店",
                "store_address": "测试地址2",
                "is_online": 1,
                "cooking_duration": 1.8,
                "energy_consumption": 7.8
            },
            {
                "device_id": "DEVICE_003",
                "used_days": 3,
                "avg_cooking_duration": 5.2,
                "avg_energy_consumption": 5.333333333333333,
                "menu_modification_cnt": 2,
                "no_load_heating_timeout_cnt": 8,
                "cooking_door_open_timeout_cnt": 4,
                "non_standard_cleaning_cnt": 2,
                "store_id": 14685,
                "store_name": "火星基地3号店",
                "store_address": "测试地址3",
                "is_online": 1,
                "cooking_duration": 5.2,
                "energy_consumption": 5.33
            }
        ],
        "total": 3
        }
    }
}
function getUsageVisibleStoreList(params) {
    return {
        "success": true,
        "content": {
            "list": [
                {
                    "id": -1,
                    "name": "全部"
                },
                {
                    "id": 14574,
                    "name": "火星基地1号店"
                },
                {
                    "id": 14685,
                    "name": "火星基地2号店"
                },
                {
                    "id": 840932,
                    "name": "火星基地3号店"
                },
                {
                    "id": 956757,
                    "name": "火星基地4号店"
                },
                {
                    "id": 699475,
                    "name": "火星基地5号店"
                },
                {
                    "id": 1017091,
                    "name": "火星基地6号店"
                },
                {
                    "id": 1017976,
                    "name": "火星基地7号店"
                }
            ]
        }
    }
}
function getUsageVisibleCityList(params) {
    return {
        "success": true,
        "content": {
             "list": [
                {
                    "id": -1,
                    "name": "全部"
                },
                {
                    "id": 1,
                    "name": "北京城区"
                },
                {
                    "id": 14,
                    "name": "苏州市"
                },
                {
                    "id": 159,
                    "name": "郑州市"
                },
                {
                    "id": 4,
                    "name": "济南市"
                }
            ]
        }
    }
}
function getStoreCombiovenRunningOverview() {
    return {
        "success": true,
        "content": {
            "used_days": 3,
            "cooking_duration": 3.27,
            "energy_consumption": 9.27,
            "no_load_heating_timeout_cnt": 3,
            "cooking_door_open_timeout_cnt": 3,
            "menu_modification_cnt": 2,
            "non_standard_cleaning_cnt": 1
        }
    }
}
function getStoreCombiovenRunningTrend(){
    return {
        "success": true,
        "content": {
            "labels": [
                "09.01",
                "09.02",
                "09.03",
                "09.04",
                "09.05",
                "09.06",
                "09.07",
                "09.08",
                "09.09",
                "09.10",
                "09.11",
                "09.12",
                "09.13",
                "09.14",
                "09.15",
                "09.16",
                "09.17",
                "09.18",
                "09.19",
                "09.20",
                "09.21",
                "09.22",
                "09.23",
                "09.24",
                "09.25",
                "09.26",
                "09.27",
                "09.28",
                "09.29",
                "09.30"
            ],
            "data": [
                {
                    "label": 1,
                    "data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        7,
                        2,
                        2,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    "label": 2,
                    "data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        3.0,
                        2.3,
                        4.5,
                        0,
                        0,
                        0,
                        0
                    ]
                },{
                    "label": 3,
                    "data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        10.0,
                        8.5,
                        9.3,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        }
    }
}
function getStoreCombiovenRunningDetail() {
    let allData = [
        {
            "date": "2025-09-30",
            "cooking_duration": "-",
            "energy_consumption": "-",
            "no_load_heating_timeout_cnt": "-",
            "cooking_door_open_timeout_cnt": "-",
            "menu_modification_cnt": "-",
            "non_standard_cleaning_state": "-",
            "non_standard_cleaning_state_name": "-",
            "has_data": false
        },
        {
            "date": "2025-09-29",
            "cooking_duration": "-",
            "energy_consumption": "-",
            "no_load_heating_timeout_cnt": "-",
            "cooking_door_open_timeout_cnt": "-",
            "menu_modification_cnt": "-",
            "non_standard_cleaning_state": "-",
            "non_standard_cleaning_state_name": "-",
            "has_data": false
        },
        {
            "date": "2025-09-28",
            "cooking_duration": "-",
            "energy_consumption": "-",
            "no_load_heating_timeout_cnt": "-",
            "cooking_door_open_timeout_cnt": "-",
            "menu_modification_cnt": "-",
            "non_standard_cleaning_state": "-",
            "non_standard_cleaning_state_name": "-",
            "has_data": false
        },
        {
            "date": "2025-09-27",
            "cooking_duration": "-",
            "energy_consumption": "-",
            "no_load_heating_timeout_cnt": "-",
            "cooking_door_open_timeout_cnt": "-",
            "menu_modification_cnt": "-",
            "non_standard_cleaning_state": "-",
            "non_standard_cleaning_state_name": "-",
            "has_data": false
        },
        {
            "date": "2025-09-26",
            "cooking_duration": 4.5,
            "energy_consumption": 9.3,
            "no_load_heating_timeout_cnt": 0,
            "cooking_door_open_timeout_cnt": 0,
            "menu_modification_cnt": 0,
            "non_standard_cleaning_state": 1,
            "non_standard_cleaning_state_name": "清洁成功",
            "has_data": true
        },
        {
            "date": "2025-09-25",
            "cooking_duration": 2.3,
            "energy_consumption": 8.5,
            "no_load_heating_timeout_cnt": 2,
            "cooking_door_open_timeout_cnt": 0,
            "menu_modification_cnt": 1,
            "non_standard_cleaning_state": 1,
            "non_standard_cleaning_state_name": "清洁成功",
            "has_data": true
        },
        {
            "date": "2025-09-24",
            "cooking_duration": 3.0,
            "energy_consumption": 10.0,
            "no_load_heating_timeout_cnt": 1,
            "cooking_door_open_timeout_cnt": 3,
            "menu_modification_cnt": 1,
            "non_standard_cleaning_state": 3,
            "non_standard_cleaning_state_name": "未清洁",
            "has_data": true
        }
    ]
    return {
        "success": true,
        "content": {
             "items": allData
        }
    }
}
function getStoreCombiovenRunningAbnormalDetail(params) {
    let content = {}
    if (params.date === "2025-09-26") {
        content = {
            "menu_modification": [],
            "no_load_heating_timeout": [],
            "cooking_door_open_timeout": [],
            "cleaning_state": [
                {
                    "abnormal_detail": "已清洁"
                }
            ]
        }
    } else if (params.date === "2025-09-25") {
        content = {
            "menu_modification": [
                {
                    "abnormal_detail": "有修改"
                }
            ],
            "no_load_heating_timeout": [
                {
                    "device_id": "DEVICE_001",
                    "event_date": "2025-09-25",
                    "start_time": "2025-09-25 03:33:20",
                    "stop_time": null,
                    "abnormal_detail": "持续2分21秒后，继续烹饪",
                    "abnormal_event_type": 1
                },
                {
                    "device_id": "DEVICE_001",
                    "event_date": "2025-09-25",
                    "start_time": "2025-09-25 07:34:20",
                    "stop_time": null,
                    "abnormal_detail": "持续5分30秒后，继续烹饪",
                    "abnormal_event_type": 1
                }
            ],
            "cooking_door_open_timeout": [],
            "cleaning_state": [
                {
                    "abnormal_detail": "已清洁"
                }
            ]
        }
    } else if (params.date === "2025-09-24") {
        content = {
            "menu_modification": [
                {
                    "abnormal_detail": "有修改"
                }
            ],
            "no_load_heating_timeout": [
                {
                    "device_id": "DEVICE_001",
                    "event_date": "2025-09-25",
                    "start_time": "2025-09-25 07:34:20",
                    "stop_time": null,
                    "abnormal_detail": "持续5分30秒后，继续烹饪",
                    "abnormal_event_type": 1
                }
            ],
            "cooking_door_open_timeout": [
                {
                    "device_id": "DEVICE_001",
                    "event_date": "2025-09-25",
                    "start_time": "2025-09-25 06:12:20",
                    "stop_time": null,
                    "abnormal_detail": "持续36秒",
                    "abnormal_event_type": 2
                },
                {
                    "device_id": "DEVICE_001",
                    "event_date": "2025-09-25",
                    "start_time": "2025-09-25 06:33:20",
                    "stop_time": null,
                    "abnormal_detail": "持续1分21秒",
                    "abnormal_event_type": 2
                },
                {
                    "device_id": "DEVICE_001",
                    "event_date": "2025-09-25",
                    "start_time": "2025-09-25 04:03:20",
                    "stop_time": null,
                    "abnormal_detail": "持续1分12秒",
                    "abnormal_event_type": 2
                }
            ],
            "cleaning_state": [
                {
                    "device_id": "DEVICE_001",
                    "event_date": "2025-09-24",
                    "start_time": "2025-09-24 03:33:20",
                    "stop_time": null,
                    "abnormal_detail": "当日未清洁，上次清洗完成时间为 2025-09-01 12:33:01",
                    "abnormal_event_type": 3
                }
            ]
        }
    }
    return {
        "success": true,
        "content": content
    }
}
function getBbqGrillOverview(params) {
   return {
    "success": true,
    "content": {
        "grilled_skewer_count": 9464,
        "image_recognition_accuracy": 0.982,
        "total_energy": 2831.0,
        "skewer_not_rotate_handle_duration": 23,
        "skewer_cooked_not_handle_duration": 38
    }
   }
}
function getBbqGrillTrend(params) {
   return {
    "success": true,
    "content": {
        "labels": [
            "09.14",
            "09.15",
            "09.16",
            "09.17",
            "09.18",
            "09.19",
            "09.20",
            "09.21"
        ],
        "data": [
            {
                "label": 1,
                "data": [
                    0,
                    0,
                    0,
                    0.765,
                    0.9,
                    0.903,
                    0,
                    0
                ]
            },
            {
                "label": 2,
                "data": [
                    0,
                    0,
                    0,
                    34,
                    21,
                    15,
                    0,
                    0
                ]
            },
            {
                "label": 3,
                "data": [
                    0,
                    0,
                    0,
                    38,
                    15,
                    98,
                    0,
                    0
                ]
            }
        ]
    }
   }
}
function getBbqGrillUsageList(params) {
   return {
    "success": true,
    "content": {
        "items": [
            {
                "date": "2025-09-17",
                "store_id": 14685,
                "store_name": "火星基地1号店",
                "store_address": "测试地址3",
                "abnormal_type": 1,
                "abnormal_type_name": "未识别烤串事件",
                "table_number": "A26",
                "grilled_skewer_location": 3,
                "abnormal_start_time": "2025-09-17 12:32:01",
                "abnormal_end_time": "2025-09-17 12:34:23"
            },
            {
                "date": "2025-09-17",
                "store_id": 14685,
                "store_name": "火星基地2号店",
                "store_address": "测试地址3",
                "abnormal_type": 3,
                "abnormal_type_name": "烤串成熟后处理超时事件",
                "table_number": "A26",
                "grilled_skewer_location": 3,
                "abnormal_start_time": "2025-09-17 12:32:01",
                "abnormal_end_time": "2025-09-17 12:34:23"
            },
            {
                "date": "2025-09-17",
                "store_id": 14685,
                "store_name": "火星基地3号店",
                "store_address": "测试地址3",
                "abnormal_type": 3,
                "abnormal_type_name": "烤串成熟后处理超时事件",
                "table_number": "A26",
                "grilled_skewer_location": 3,
                "abnormal_start_time": "2025-09-17 12:32:01",
                "abnormal_end_time": "2025-09-17 12:34:23"
            },
            {
                "date": "2025-09-17",
                "store_id": 14685,
                "store_name": "火星基地4号店",
                "store_address": "测试地址3",
                "abnormal_type": 2,
                "abnormal_type_name": "烤串不转",
                "table_number": "A26",
                "grilled_skewer_location": 3,
                "abnormal_start_time": "2025-09-17 12:32:01",
                "abnormal_end_time": "2025-09-17 12:34:23"
            },
            {
                "date": "2025-09-17",
                "store_id": 14685,
                "store_name": "火星基地5号店",
                "store_address": "测试地址3",
                "abnormal_type": 2,
                "abnormal_type_name": "烤串不转",
                "table_number": "A26",
                "grilled_skewer_location": 3,
                "abnormal_start_time": "2025-09-17 12:32:01",
                "abnormal_end_time": "2025-09-17 12:34:23"
            },
            {
                "date": "2025-09-17",
                "store_id": 14685,
                "store_name": "火星基地6号店",
                "store_address": "测试地址3",
                "abnormal_type": 1,
                "abnormal_type_name": "未识别烤串事件",
                "table_number": "A26",
                "grilled_skewer_location": 3,
                "abnormal_start_time": "2025-09-17 12:32:01",
                "abnormal_end_time": "2025-09-17 12:34:23"
            },
            {
                "date": "2025-09-17",
                "store_id": 14685,
                "store_name": "火星基地7号店",
                "store_address": "测试地址3",
                "abnormal_type": 1,
                "abnormal_type_name": "未识别烤串事件",
                "table_number": "A26",
                "grilled_skewer_location": 3,
                "abnormal_start_time": "2025-09-17 13:32:01",
                "abnormal_end_time": "2025-09-17 13:34:23"
            },
            {
                "date": "2025-09-17",
                "store_id": 699475,
                "store_name": "火星基地8号店",
                "store_address": "测试地址2",
                "abnormal_type": 3,
                "abnormal_type_name": "烤串成熟后处理超时事件",
                "table_number": "B02",
                "grilled_skewer_location": 5,
                "abnormal_start_time": "2025-09-17 14:02:01",
                "abnormal_end_time": "2025-09-17 14:04:23"
            },
            {
                "date": "2025-09-17",
                "store_id": 14685,
                "store_name": "火星基地9号店",
                "store_address": "测试地址3",
                "abnormal_type": 1,
                "abnormal_type_name": "未识别烤串事件",
                "table_number": "A26",
                "grilled_skewer_location": 3,
                "abnormal_start_time": "2025-09-17 15:32:01",
                "abnormal_end_time": "2025-09-17 15:34:23"
            },
            {
                "date": "2025-09-17",
                "store_id": 14685,
                "store_name": "火星基地10号店",
                "store_address": "测试地址3",
                "abnormal_type": 1,
                "abnormal_type_name": "未识别烤串事件",
                "table_number": "A26",
                "grilled_skewer_location": 3,
                "abnormal_start_time": "2025-09-17 15:32:01",
                "abnormal_end_time": "2025-09-17 15:34:23"
            }
        ],
        "total": 10
    }
   }
}

// 根据当前日期和偏移天数，返回 yyyy-MM-dd 格式
function formatDateWithOffset(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

// 获取指定日期，返回 yyyy-MM-dd 格式
// 参数：year(年), month(月), day(日)
// 如果不传参数，则返回当前日期
function getSpecifiedDate(year, month, day) {
  let date;
  if (year !== undefined && month !== undefined && day !== undefined) {
    // 月份从0开始，所以需要减1
    date = new Date(year, month - 1, day);
  } else {
    date = new Date();
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

export default mockData
