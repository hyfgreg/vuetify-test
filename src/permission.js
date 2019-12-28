import Vue from 'vue'
import router from './router'
import store from './store'

const config = Vue.prototype.$xmGlobalConfig

router.beforeEach(async(to, from, next) => {
  // start progress bar
  if (config.progress && config.progress.enable) Vue.prototype.$progress.start()

  // 判断是否登录, 如果未登录, 则跳转到登录页面
  const authInfo = store.state['auth'].authInfo
  const user = authInfo ? authInfo.user_id : null

  if (user !== null) {
    if (to.path === '/login') {
      next({ name: 'home' })
      return
    }
    // 检查权限是否初始化，未初始化先初始化权限
    const hasRoles =
      store.getters['permission/roleInited'] &&
      !store.state.permission['roleError']

    if (hasRoles) {
      next()
      return
    } else {
      try {
        const { roles, permissions } = await store.dispatch(
          'permission/getRoles'
        )
        const accessRoutes = await store.dispatch('permission/generateRoutes', {
          roles,
          permissions
        })
        router.addRoutes(accessRoutes)

        await store.dispatch('permission/generateMenus')
        next({ ...to, replace: true })
        return
      } catch (err) {
        console.log(err)
        Vue.prototype.$snotify.error('查询权限出错')
        store.commit('auth/authInfoSetter', {
          user_id: null,
          key: null,
          username: null
        })
        next(`/login?redirect=${to.path}`)
        return
      }
    }
  } else {
    // 未登录
    if (to.meta && to.meta.ignoreAuth) {
      // 可以匿名访问
      next()
      return
    } else {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  if (config.progress && config.progress.enable) Vue.prototype.$progress.done()
})
