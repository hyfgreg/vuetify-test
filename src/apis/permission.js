import request from '@/utils/request'

export const api = {
  getUserRoles(params) {
    return request({
      method: 'get',
      url: '/permissions_by_db/role/get_user_roles/',
      params: params
    })
  }
}
