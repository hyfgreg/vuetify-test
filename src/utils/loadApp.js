import Vue from 'vue'

const loadAppArray = function(base, loadType, appList) {
  if (appList === undefined) {
    appList = Vue.xmGlobalConfig.installedApps
  }
  for (const app of appList) {
    if (Vue.xmAppConfig[loadType][app] !== undefined) {
      base.push.apply(base, Vue.xmAppConfig[loadType][app])
    }
  }
}

const loadAppObject = function(base, loadType, appList) {
  if (appList === undefined) {
    appList = Vue.xmGlobalConfig.installedApps
  }
  for (const app of appList) {
    if (Vue.xmAppConfig[loadType][app] !== undefined) {
      Object.assign(base, Vue.xmAppConfig[loadType][app])
    }
  }
}

export const loadApp = function(base, loadType, appList) {
  if (Array.isArray(base)) {
    loadAppArray(base, loadType, appList)
  } else {
    loadAppObject(base, loadType, appList)
  }
}
