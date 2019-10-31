const sessionKey = '@danone'
const userKey = `${sessionKey}/user`
const tokenKey = `${sessionKey}/token`
const refreshTokenKey = `${sessionKey}/refresh-token`

// Read section

export const isUserLoggedIn = () => getToken()

export const isSuperUserLoggedIn = () => isUserLoggedIn() && getUserInfo().is_super_user

const getUserInfo = () => getCacheObject(userKey)

export const getToken = () => getCacheString(tokenKey)

export const getRefreshToken = () => getCacheString(refreshTokenKey)

export const cacheReducerReader = () => {
  const cachedReducers = {}

  const cachedUser = getUserInfo()
  if (cachedUser) cachedReducers['user'] = cachedUser

  return cachedReducers
}

// Writte section

export const saveLocalUserInfo = (user, token, refreshToken) => {
  saveObject(userKey, user)
  saveToken(token)
  saveRefreshToken(refreshToken)
}

export const clearLocalUserInfo = () => {
  localStorage.removeItem(userKey)
  localStorage.removeItem(tokenKey)
  localStorage.removeItem(refreshTokenKey)
}

export const saveToken = token => saveString(tokenKey, token)

export const saveRefreshToken = refreshToken => saveString(refreshTokenKey, refreshToken)

// Utils

const saveString = (key, string) => localStorage.setItem(key, string)

const getCacheString = key => localStorage.getItem(key)

const saveObject = (key, object) => localStorage.setItem(key, JSON.stringify(object))

const getCacheObject = key => JSON.parse(localStorage.getItem(key))
