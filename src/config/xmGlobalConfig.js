// config用于配置第三方库和无依赖的配置,  config 应该早于任何自己的代码导入, 包括store, router, common里代码

import Vue from 'vue'
// import Vuetify from 'vuetify'
// import zhHans from 'vuetify/lib/locale/zh-Hans'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import snotify from 'vue-snotify'
// import URI from 'urijs'

// import 'vuetify/dist/vuetify.min.css'
// import 'vue-snotify/styles/simple.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

// const uri = new URI()
// export const institutionID = uri.search(true)['i']

// 框架
// Vue.use(Vuetify, {
//   lang: {
//     locales: { 'zh-Hans': zhHans },
//     current: 'zh-Hans'
//   }
// })

// ajax插件
// Vue.use(VueAxios, axios)

// toast插件
// Vue.use(snotify, {
//   toast: {
//     position: 'rightTop', // 出现的位置s
//     timeout: 1000, // 出现的时间
//     showProgressBar: false
//   }
// })

export const eventHub = new Vue()
// Vue.prototype.$urijs = URI
Vue.prototype.$eventHub = eventHub // 用于组件之间发emit事件, 无store和router

const debug = process.env.NODE_ENV !== 'production'
console.log(debug)

function getBaseUrl() {
  let baseURL
  if (process.env.DEPLOY_ENV === 'docker') {
    baseURL = window.location.origin
  } else {
    // baseURL = debug ? "//127.0.0.1:8000/" : "//xpos-api.test.xmov.ai/"
    baseURL = debug ? '//xpos-api.test.xmov.ai/' : '//xpos-api.test.xmov.ai/'
    // baseURL = debug ? 'http://192.168.89.229:8000/' : 'http://xpos-api.test.xmov.ai/'
    // baseURL = debug ? "//192.168.91.33:8000/" : "//xpos-api.test.xmov.ai/"
    // baseURL = debug ? "//xpos-api-101.xmov.ai/" : "//xpos-api.xmov.ai/"
    // baseURL = debug ? "//xpos-api.xmov.ai/" : "//xpos-api.xmov.ai/"
    // baseURL = 'http://xpos-api.xmov.ai/'
    // baseURL = 'http://47.100.253.157/'
  }
  return baseURL
}

const xmGlobalConfig = {
  // institution_id: institutionID,
  projectName: process.env.VUE_APP_projectName,
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
