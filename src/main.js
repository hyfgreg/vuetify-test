import Vue from 'vue'
import App from './App.vue'
import GlobalMixin from '@/mixins/global'

// eslint-disable-next-line no-unused-vars
import config from './config'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// eslint-disable-next-line no-unused-vars
import vueSnotify from './plugins/vue-snotify'
// eslint-disable-next-line no-unused-vars
import progress from './plugins/progress'

import './permission' // permission control

Vue.config.productionTip = false

Vue.mixin(GlobalMixin)

new Vue({
  router,
  store,
  vuetify,
  // xmCommon,
  render: h => h(App)
}).$mount('#app')
