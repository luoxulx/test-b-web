import Cookies from 'js-cookie'

const TokenKey = '14k_manager_web_token'
const userInfoKey = '14k_manager_web_user_info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 / 24 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.get(userInfoKey)
}

export function setUserInfo(data) {
  return Cookies.set(userInfoKey, data, { expires: 1 / 24 })
}

export function removeUserInfo() {
  return Cookies.remove(userInfoKey)
}
