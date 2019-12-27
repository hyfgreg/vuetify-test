import request from '@/utils/request'

export const api = {
  getAccountRecord(params) {
    return request({
      method: 'get',
      url: '/payment_account/account_record/',
      params: params
    })
  }
}
