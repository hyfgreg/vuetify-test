import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login'),
    meta: {
      ignoreAuth: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      ignoreAuth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      ignoreAuth: false
    }
  }
]

// 固定的路由，包括HelloWorld和xm-common的路由
// loadApp(constantRoutes, 'routes', constantAppList)
const asyncRoutes = []

// const appList = [...Vue.xmGlobalConfig.installedApps].filter(
//   item => !constantAppList.includes(item)
// )

// '异步'路由，需要根据用户的权限判断具体采用哪些路由
// loadApp(asyncRoutes, 'routes', appList)

// 暂时没有专门设计的404页面，用HelloWorld替代
asyncRoutes.push({ path: '*', redirect: '/', hidden: true })

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export { asyncRoutes, constantRoutes, resetRouter }
export default router
