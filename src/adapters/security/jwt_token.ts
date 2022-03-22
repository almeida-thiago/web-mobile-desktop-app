import jwtDecode from 'jwt-decode'
import axios, {AxiosInstance, AxiosResponse} from 'axios'
import asyncStorage from '../storage/async_storage'
import {UserType} from '../../entities/user'

const tokenStorageKey: string = process.env.APP_STORAGE ? `@${process.env.APP_STORAGE}` : '@app_storage'

const httpAuthRequest: AxiosInstance = axios.create({
  baseURL: process.env.API_URL || '//localhost:5000',
})

export type TokensType = {
  access_token: string
  refresh_token: string
}

interface JwtTokenType {
  exists: () => Promise<boolean>
  save: (username: string, password: string, persistent?: boolean) => Promise<{tokens: TokensType; user: UserType}>
  get: () => Promise<TokensType | null>
  getData: () => Promise<UserType | null>
  remove: () => Promise<boolean>
}

const isExpired = (token: string): boolean => {
  const tokenData: any = jwtDecode(token)
  const expiration: number = new Date(tokenData.exp).getTime()
  const now: number = Math.floor(new Date().getTime() / 1000)
  return expiration < now ? true : false
}

const exists = (): Promise<boolean> =>
  new Promise<boolean>(async (resolve, reject) => {
    try {
      const tokens: TokensType | null = await asyncStorage.getStoreData(tokenStorageKey, true)
      if (!tokens) {
        throw new Error('no storage available')
      }
      if (!tokens.access_token || !tokens.refresh_token) {
        throw new Error('none tokens in storage')
      }
      if (isExpired(tokens.access_token) && isExpired(tokens.refresh_token)) {
        throw new Error('all tokens expired')
      }
      if (isExpired(tokens.access_token) && !isExpired(tokens.refresh_token)) {
        refresh()
          .then(() => resolve(true))
          .catch((error: Error | any) => {
            remove()
            throw new Error(error)
          })
      }
      if (isExpired(tokens.access_token)) {
        resolve(true)
      }
      throw new Error('access token expired')
    } catch (error: Error | any) {
      console.error('[adapters][security][jwt_token]', 'exists', error)
      reject(false)
    }
  })

const refresh = async (): Promise<void> =>
  new Promise<void>(async (resolve, reject) => {
    try {
      let tokens: TokensType | null = await asyncStorage.getStoreData(tokenStorageKey, true)
      if (!tokens) {
        throw new Error('none tokens in storage')
      }
      const queryParams: any = {refresh_token: tokens.refresh_token}
      const {data}: AxiosResponse = await httpAuthRequest.get('/v1/auth/token-renew', queryParams)
      if (!data.success) {
        throw new Error(data.payload.message)
      }
      tokens = {
        access_token: data.payload.access_token,
        refresh_token: data.payload.refresh_token,
      }
      asyncStorage.storeData(tokenStorageKey, tokens)
      resolve()
    } catch (error: Error | any) {
      console.error('[adapters][security][jwt_token]', 'refresh', error)
      reject(error)
    }
  })

/**
 * save auth token
 * @param {string} username username
 * @param {string} password password
 * @param {boolean} [persistent] is token persistent
 * @returns {{tokens: TokensType; user: UserType}}
 */
const save = (username: string, password: string, persistent: boolean = false): Promise<{tokens: TokensType; user: UserType}> =>
  new Promise<{tokens: TokensType; user: UserType}>(async (resolve, reject) => {
    try {
      const queryParams: any = {persistent}
      const {data}: AxiosResponse = await httpAuthRequest.post('/v1/auth', {username, password}, queryParams)
      if (!data.success) {
        throw new Error(data.payload.message)
      }
      const tokens: TokensType = {
        access_token: data.payload.access_token,
        refresh_token: data.payload.refresh_token,
      }
      asyncStorage.storeData(tokenStorageKey, tokens)
      const user: any = jwtDecode(tokens.access_token)
      resolve({tokens, user})
    } catch (error: Error | any) {
      console.error('[adapters][security][jwt_token]', 'save', error)
      reject(error)
    }
  })

/**
 * read auth token
 * @returns {boolean}
 */
const get = (): Promise<TokensType | null> =>
  new Promise<TokensType | null>(async resolve => {
    try {
      if (!exists()) {
        throw new Error('none data to show')
      }
      const tokens: TokensType = await asyncStorage.getStoreData(tokenStorageKey, true)
      resolve(tokens)
    } catch (error: Error | any) {
      console.error('[adapters][security][jwt_token]', 'get', error)
      resolve(null)
    }
  })

/**
 * read auth token data
 * @returns {UserType|null}
 */
const getData = (): Promise<UserType | null> =>
  new Promise<UserType | null>(async (resolve, reject) => {
    try {
      if (!exists()) {
        return resolve(null)
      }
      const tokens: TokensType = await asyncStorage.getStoreData(tokenStorageKey, true)
      const user: any = jwtDecode(tokens.access_token)
      resolve(user)
    } catch (error: Error | any) {
      console.error('[adapters][security][jwt_token]', 'getData', error)
      reject(error)
    }
  })

/**
 * delete auth token
 * @returns {boolean}
 */
const remove = (): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    try {
      asyncStorage.deleteStoreData(tokenStorageKey)
      resolve(true)
    } catch (error: Error | any) {
      console.error('[adapters][security][jwt_token]', 'remove', error)
      reject(error)
    }
  })

const token: JwtTokenType = {exists, save, get, getData, remove}

export default token
