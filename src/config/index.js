import Vue from 'vue'
import xmGlobalConfig from './xmGlobalConfig'

Vue.xmAppConfig = {
  storeModules: {},
  routes: {},
  menu: {},
  mutationMap: {},
  actionMap: {}
}

xmGlobalConfig.installedApps = [
  xmGlobalConfig.projectName
]
export default {}
