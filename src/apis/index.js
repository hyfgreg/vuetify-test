import { api as permission } from './permission'
import { api as auth } from './auth'

export const api = {
  ...permission,
  ...auth
}
