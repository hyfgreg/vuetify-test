// 这个文件只应该被main.js import
import Vue from 'vue'
import Vuex from 'vuex'

import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'
import { getters } from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  state,
  mutations,
  getters,
  debug,
  actions,
  modules: { ...modules }
})
