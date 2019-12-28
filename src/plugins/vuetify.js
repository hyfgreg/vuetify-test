import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/lib/locale/zh-Hans'

Vue.use(Vuetify, {
  lang: {
    locales: { 'zh-Hans': zhHans },
    current: 'zh-Hans'
  }
})

export default new Vuetify({})
