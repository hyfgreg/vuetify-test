import 'vue-snotify/styles/material.css'
import Vue from 'vue'
import Snotify from 'vue-snotify'
// import 'vue-snotify/styles/material.css'

Vue.use(Snotify, {
  toast: {
    position: 'rightTop', // 出现的位置
    timeout: 1000 // 出现的时间
  }
})

export default {}
