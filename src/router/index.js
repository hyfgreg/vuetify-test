import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

// route的权限, 当没有meta或者meta.permission时, 表示该route不需要任何权限即可访问
// 常量路由，包含首页、auth
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
      menu: true,
      icon: 'home',
      title: '首页',
      ignoreAuth: true
    }
  }
]
// 异步路由，根据user的role对应的permissions和meta.permission配置来确定
const asyncRoutes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/About.vue'),
    meta: {
      menu: true,
      icon: 'pageview',
      title: '关于',
      permission: ['take_away'],
      ignoreAuth: false
    }
  },
  {
    path: '/test',
    name: 'test',
    children: [
      {
        path: 'index',
        name: 'test1',
        component: () => import('@/views/About.vue'),
        meta: {
          menu: true,
          icon: 'pageview',
          title: '测试1',
          permission: ['take_away'],
          ignoreAuth: true
        }
      }
    ],
    meta: {
      menu: true,
      icon: 'pageview',
      title: '测试',
      permission: ['take_away'],
      ignoreAuth: true
    }
  },
  {
    path: '/test2',
    name: 'test2',
    children: [
      {
        path: 'test22',
        name: 'test22',
        meta: {
          menu: true,
          icon: 'pageview',
          title: '测试22',
          permission: ['take_away'],
          ignoreAuth: true
        },
        children: [
          {
            path: 'index',
            name: 'test222',
            component: () => import('@/views/Test22Index.vue'),
            meta: {
              menu: true,
              icon: 'pageview',
              title: '测试222',
              permission: ['take_away']
            }
          }
        ]
      }
    ],
    meta: {
      menu: true,
      icon: 'pageview',
      title: '测试2',
      permission: ['take_away'],
      ignoreAuth: true
    }
  }
]

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
