// 全局公用mixin, 都以GM作为前缀, Global Mixin
import { toBool } from '@/utils/toBool'
import { strftimeDisplay, strfdate } from '@/utils/datetime'

export default {
  filters: {
    GM_longStrSplit(value, splitLength = 4, delimiter = ' ') {
      try {
        const new_value = String(value)
        let start = 0
        const ret = []
        while (start < new_value.length) {
          ret.push(new_value.substring(start, start + splitLength))
          start += splitLength
        }
        return ret.join(delimiter)
      } catch (e) {
        console.log(e)
        return value
      }
    },
    GM_timeFormat(value) {
      if (value) {
        if (typeof value === 'string' && value.indexOf('+') === -1) {
          value = value + '+08:00'
        }
        const date = new Date(value)
        return strftimeDisplay(date)
      } else {
        return null
      }
    },
    GM_dataFormat(value) {
      if (value) {
        const date = new Date(value)
        return strfdate(date)
      } else {
        return null
      }
    },
    GM_floatFormat(value, bit) {
      if (bit === undefined) {
        bit = 2
      }
      if (isNaN(value)) {
        return 0
      }
      return Number(value).toFixed(bit)
    },
    GM_boolIconFormat(value) {
      return value ? 'check_circle' : 'block'
    },
    GM_fenToYuan(value) {
      return `¥ ${value / 100} 元`
    }
  },
  computed: {
    // auth info
    GM_authInfo() {
      return this.$store.state['auth'].authInfo
    },
    GM_all_permissions() {
      return this.$store.state['auth'].all_permissions
    },
    GM_username() {
      return this.GM_authInfo.username
    },
    GM_isLogin() {
      return this.GM_username !== null
    }
  },
  methods: {
    GM_toBool: toBool,
    GM_hasPermission(permission) {
      return this.GM_all_permissions.permission === true
    },
    GM_yuanToFen(value) {
      return Number(value) * 100
    }
  }
}
