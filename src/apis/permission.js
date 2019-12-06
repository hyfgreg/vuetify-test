import { xmHTTPClient as _ } from 'xm-common'

export const api = {
  getUserRoles(params) {
    return _({
      method: 'get',
      url: '/permissions_by_db/role/get_user_roles/',
      params: params
    })
  }
}
