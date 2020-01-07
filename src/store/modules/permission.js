import Vue from 'vue'
import { api } from '@/apis'
import { asyncRoutes, constantRoutes, resetRouter } from '@/router'
// import originMenu from '@/menu'

function hasMenuPermission(routes, menu) {
  return routes.some(route => route.name === menu.to.name)
}

// eslint-disable-next-line no-unused-vars
function filterAsyncMenu(routes, menus) {
  const ret = []
  menus.forEach(menu => {
    if (menu.children) {
      const { children } = { ...menu }
      const tmp = { ...menu }
      tmp.children = filterAsyncMenu(routes, children)
      if (tmp.children.length > 0) {
        ret.push(tmp)
      }
    } else {
      if (hasMenuPermission(routes, menu)) {
        ret.push(menu)
      }
    }
  })
  return ret
}

function generateMenusFromRoutes(routes) {
  const ret = []
  routes.forEach(route => {
    const menuForOneRoute = {}
    if (route.meta && route.meta.menu) {
      menuForOneRoute.title = route.meta.title || false
      menuForOneRoute.icon = route.meta.icon || false
      menuForOneRoute.path = route.path || 'no-path'
      menuForOneRoute.name = route.name || 'no-name'
      if (
        route.children &&
        Array.isArray(route.children) &&
        route.children.length > 0
      ) {
        menuForOneRoute.children = generateMenusFromRoutes(route.children)
      }
      ret.push(menuForOneRoute)
    }
  })
  return ret
}

// 忽略之前用的meta.ignoreAuth, 只要没有meta.permission即认为不需要权限即可访问
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permission) {
    return permissions.some(permission =>
      route.meta.permission.includes(permission)
    )
  }
  return true
}

export function filterAsyncRoutes(routes, permissions) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  _roles: null, // 初步只用permissions来判断是否有权限，_roles的原始数据保留
  roles: null,
  permissions: null,
  roleError: false,
  routes: [],
  addRoutes: [], // 判断permission后新增的routes
  menus: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ITEM(state, payload) {
    state[payload.key] = payload.value
  }
}

const actions = {
  getRoles({ commit }) {
    if (!Vue.xmGlobalConfig.frontendPermissionsEnable) {
      return new Promise((resolve) => {
        const roles = []
        const permissions = []
        commit('SET_ROLES', roles)
        commit('SET_PERMISSIONS', permissions)
        resolve({ roles, permissions })
      })
    }
    return new Promise((resolve, reject) => {
      api
        .getUserRoles({ extras: 'frontend_permission' })
        .then(res => {
          const permissions = []
          const roles = []
          commit('SET_ITEM', { key: '_roles', value: res.data })
          res.data.forEach(role => {
            if (!roles.includes(role.name)) {
              roles.push(role.name)
            }
            role['frontend_permission'].forEach(permission => {
              if (!permissions.includes(permission.name)) {
                permissions.push(permission.name)
              }
            })
          })
          commit('SET_ROLES', roles)
          commit('SET_PERMISSIONS', permissions)
          resolve({ roles, permissions })
        })
        .catch(err => {
          commit('SET_ITEM', { key: 'roleError', value: true })
          reject(err)
        })
    })
  },
  generateRoutes({ commit }, { roles, permissions }) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  generateMenus({ commit, state }) {
    return new Promise(resolve => {
      const accessedMenus = generateMenusFromRoutes(state.routes)
      commit('SET_ITEM', { key: 'menus', value: accessedMenus })
      resolve(accessedMenus)
    })
  },
  reset({ commit }) {
    return new Promise(resolve => {
      const state = {
        _roles: null,
        roles: null,
        permissions: null,
        roleError: false,
        routes: [],
        addRoutes: [],
        menus: []
      }
      for (const key in state) {
        commit('SET_ITEM', { key: key, value: state[key] })
      }
      resolve()
    })
  },
  resetRouter() {
    resetRouter()
  }
}

const getters = {
  roleInited(state) {
    return Boolean(state.permissions)
  },
  menus(state) {
    return state.menus
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
