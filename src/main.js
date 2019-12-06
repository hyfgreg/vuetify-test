import Vue from 'vue'
import App from './App.vue'
// eslint-disable-next-line no-unused-vars
import config from './config'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import xmCommon from './plugins/xm-common'

import './permission' // permission control

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  xmCommon,
  render: h => h(App)
}).$mount('#app')
