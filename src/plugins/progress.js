import Vue from 'vue'

const progress = {
  install(Vue, options) {
    const progress = {
      start() {
        Vue.prototype.$eventHub.$emit('progressStart')
      },
      done() {
        Vue.prototype.$eventHub.$emit('progressDone')
      }
    }
    Vue.prototype.$progress = progress
  }
}

Vue.use(progress)

