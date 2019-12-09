// http库 xmHTTPClient, 根据url和配置判断是否需要加上auth信息

import axios from 'axios'
import Vue from 'vue'

const ErrorReasonMap = {
  999: '请稍后再试(999)',
  998: '数据异常(998)',
  997: '数据异常(997)',
  // 992: '请求参数类型错误(992)',
  // 993: '请求参数类型错误(993)',
  995: '认证信息错误(995)',
  994: '无访问权限(994)',
  990: '登录错误(990)'
}

function initClient(config) {
  // 配置config.ignoreAuth将不带上认证信息
  const token = config.projectTokenName
  const httpOption = config.httpOption
  const eventHub = config.eventHub
  const client = axios.create(httpOption)
  const httpCommonParams = config.httpCommonParams || {}
  const httpCommonData = config.httpCommonData || {}
  const notifyOnError = config.notifyOnError || false
  client.interceptors.request.use(_config => {
    // 在访问域名等于baseURL或者域名为空(默认为baseURL) 时候, 添加auth
    if (
      !_config.ignoreAuth &&
      (_config.url.indexOf(httpOption.baseURL) === 0 ||
        !_config.url.includes('http'))
    ) {
      // 如果action中需要使用xmHttp的话, 从store获取会造成循环依赖
      // let authInfo = store.state.auth.authInfo
      const authInfo = JSON.parse(localStorage.getItem(token))

      if (!authInfo || !authInfo.user_id) {
        return Promise.reject(new Error('请先登录'))
      } else {
        _config.params = Object.assign(
          {},
          _config.params,
          {
            user_id: authInfo.user_id,
            key: authInfo.key
          },
          httpCommonParams
        )
        _config.data = Object.assign({}, _config.data, httpCommonData)
        return _config
      }
    }
    return _config
  })

  client.interceptors.response.use(
    response => {
      console.log(response)
      return response
    },
    error => {
      console.log(error)
      let status = null
      const notifyId = 'http401'
      if (error.response) {
        status = error.response.status
      }

      if (status === 401) {
        if (!eventHub.$snotify.get(notifyId)) {
          eventHub.$snotify.error('认证信息过期, 请重新登录', '警告', {
            id: notifyId,
            timeout: null
          })
        }
        localStorage.removeItem(token)
        setTimeout(window.location.reload.bind(window.location), 2000)
        return new Promise(() => {})
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error_code
      ) {
        console.log(error.response.data.error_reason)
        if (notifyOnError) {
          eventHub.$snotify.error(
            ErrorReasonMap[error.response.data.error_code] ||
              error.response.data.error_reason,
            '服务请求错误'
          )
        }
      }
      return Promise.reject(error)
    }
  )
  return client
}

export default initClient(Vue.xmGlobalConfig)
