import { api as permission } from './permission'
import { api as auth } from './auth'
import { api as payment_account } from './payment_account'

export const api = {
  ...permission,
  ...auth,
  ...payment_account
}
