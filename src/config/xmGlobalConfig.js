// config用于配置第三方库和无依赖的配置,  config 应该早于任何自己的代码导入, 包括store, router, common里代码

import Vue from 'vue'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vue-snotify/styles/material.css'

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
