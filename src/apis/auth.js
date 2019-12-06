import request from '@/utils/request'

export const api = {
  // 登录
  login: data =>
    request({
      method: 'post',
      url: '/auth/auth/password_login/',
      data: data,
      ignoreAuth: true
    }),

  // 更改密码
  changePassword: data =>
    request({
      method: 'post',
      url: '/auth/auth/change_password/',
      data: data
    }),
  // 获取权限列表
  getAllPermissions: data =>
    request({
      method: 'get',
      url: '/auth/auth/get_all_permissions',
      data: data
    })
}
