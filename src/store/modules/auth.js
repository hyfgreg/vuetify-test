import Vue from 'vue'
import { toBool } from '@/utils/toBool'
import { api } from '@/apis'

const TOKEN = Vue.xmGlobalConfig.projectTokenName

let authInfo = JSON.parse(localStorage.getItem(TOKEN))

if (!authInfo || !authInfo.user_id) {
  authInfo = {
    user_id: null,
    key: null,
    username: null
  }
}

const state = {
  authInfo: authInfo,
  all_permissions: {}
}

const actions = {
  authInfoSetter: (context, payload) => {
    if (toBool(payload) && toBool(payload.user_id)) {
      context.commit('authInfoSetter', payload)
      localStorage.setItem(TOKEN, JSON.stringify(payload))
    } else {
      const authInfo = {
        user_id: null,
        key: null,
        username: null
      }
      context.commit('authInfoSetter', authInfo)
      localStorage.removeItem(TOKEN)
    }
  },
  permissionsSetter: (context) => {
    if (context.state.authInfo && context.state.authInfo.user_id) {
      api
        .getAllPermissions()
        .then(response => {
          context.commit('permissionsSetter', response.data)
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      context.commit('permissionsSetter', {})
    }
  }
}

const mutations = {
  authInfoSetter: (state, payload) => {
    state.authInfo = payload
  },
  permissionsSetter: (state, payload) => {
    state.all_permissions = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
