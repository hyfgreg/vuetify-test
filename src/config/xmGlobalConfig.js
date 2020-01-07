// config用于配置第三方库和无依赖的配置,  config 应该早于任何自己的代码导入, 包括store, router, common里代码

import Vue from 'vue'

export const eventHub = new Vue()
Vue.prototype.$eventHub = eventHub // 用于组件之间发emit事件, 无store和router

const debug = process.env.NODE_ENV !== 'production'
console.log(debug)

function getBaseUrl() {
  let baseURL
  if (process.env.DEPLOY_ENV === 'docker') {
    baseURL = window.location.origin
  } else {
    baseURL = debug ? '//xpos-api.test.xmov.ai/' : '//xpos-api.test.xmov.ai/'
  }
  return baseURL
}

const xmGlobalConfig = {
  // institution_id: institutionID,

  // progress颜色配置
  progress: {
    enable: true
  },

  appBarTitle: 'Xmov' || process.env.VUE_APP_projectName, // 修改Xmov为实际的项目app bar title，显示大写字母
  sideBar: true, // 是否启用侧边栏

  frontendPermissionsEnable: true, // 启用frontendPermissions, 需要后台安装permissions_by_db

  projectName: process.env.VUE_APP_projectName,
  projectTokenName: process.env.VUE_APP_projectName + '_token',
  eventHub: eventHub,
  notifyOnError: debug,
  httpOption: {
    baseURL: getBaseUrl()
  }
  // httpCommonParams: { institution_id: institutionID },
  // httpCommonData: { institution_id: institutionID }
}

Vue.prototype.$xmGlobalConfig = xmGlobalConfig
Vue.xmGlobalConfig = xmGlobalConfig

export default xmGlobalConfig
