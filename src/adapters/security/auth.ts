import token, {TokensType} from './jwt_token'
import store from '../store/store'
import action from '../store/authentication/authentication_action'
import {UserType} from '../../entities/user'

export interface AuthenticationType {
  isAuth: () => boolean
  getAuthUser: () => UserType | null
  logIn(username: string, password: string, persistent: boolean, callback?: VoidFunction): void
  logOut(callback?: VoidFunction): void
  loadToken: () => Promise<void>
}

/** load token from storage */
const loadToken = async (): Promise<void> => {
  try {
    const tokenExists: boolean = await token.exists()
    if (!tokenExists) {
      throw new Error('no token loaded')
    }
    const user: UserType | null = await token.getData()
    if (user) {
      store.dispatch(action.setAuthUser(user))
    }
  } catch (error: Error | any) {
    console.error('[adapters][security][auth]', 'loadToken', error)
    store.dispatch(action.removeAuthUser())
  }
}

/**
 * is user authenticated
 * @returns {boolean} authenticated
 */
const isAuth = (): boolean => {
  const {authState} = store.getState()
  if (authState.user) {
    return true
  }
  return false
}

/**
 * get authenticated user data
 * @returns {UserType | null} user data
 */
const getAuthUser = (): UserType | null => {
  const {authState} = store.getState()
  if (authState.user) {
    return authState.user
  }
  return null
}

/**
 * login user
 * @param {string} username user name
 * @param {string} password user password
 * @param {boolean} persistent is token persistent
 * @param {VoidFunction} [callback] callback after user login
 */
const logIn = (username: string, password: string, persistent: boolean = false, callback?: VoidFunction): void => {
  token
    .save(username, password, persistent)
    .then(({user}: {tokens: TokensType; user: UserType}) => {
      store.dispatch(action.setAuthUser(user))
    })
    .catch((error: Error | any) => console.error('[adapters][security][jwt_token]', 'logIn', error))
    .finally(() => {
      if (callback) {
        callback()
      }
    })
}

/**
 * logout user
 * @param  {VoidFunction} [callback] callback after user logout
 */
const logOut = (callback?: VoidFunction): void => {
  store.dispatch(action.removeAuthUser())
  token.remove()
  if (callback) {
    callback()
  }
}

const auth: AuthenticationType = {isAuth, getAuthUser, logIn, logOut, loadToken}

export default auth
