import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import store from '../store/store'
import action from '../store/messenger/messenger_action'
import token, {TokensType} from '../security/jwt_token'

export type HttpResponseType = {
  success: boolean
  payload:
    | any
    | {
        code: number
        message: string
        details: string
      }
}

const httpRequest: AxiosInstance = axios.create({
  baseURL: process.env.API_URL || '//localhost:5000',
})

export interface HttpRequestType {
  read: (path: string, queryParams?: object) => Promise<HttpResponseType>
  add: (path: string, data: object, queryParams?: object) => Promise<HttpResponseType>
  edit: (path: string, id: string | number, data: object, queryParams?: object) => Promise<HttpResponseType>
  remove: (path: string, id: string | number, queryParams?: object) => Promise<void>
}

httpRequest.interceptors.request.use(async (request: AxiosRequestConfig) => {
  try {
    const tokens: TokensType | null = await token.get()
    if (tokens && tokens.access_token) {
      request.headers!.Authorization = `Bearer ${tokens.access_token}`
    }
  } catch (error: Error | any) {
    console.error('[adapters][http][http_request_handler]', 'httpRequest', error)
  } finally {
    return request
  }
})

httpRequest.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: Error) => {
    store.dispatch(
      action.newMessage({
        type: 'danger',
        text: error.message,
      }),
    )
    return Promise.reject(error)
  },
)

const read = (path: string, queryParams: object = {}): Promise<HttpResponseType> =>
  new Promise<HttpResponseType>(async (resolve, reject) => {
    try {
      const configs: AxiosRequestConfig = {
        params: {...queryParams},
      }
      const response: AxiosResponse = await httpRequest.get(path, configs)
      resolve(response.data)
    } catch (error: Error | any) {
      console.error('[adapters][http][http_request_handler]', 'read', error)
      reject(error)
    }
  })

const add = (path: string, data: object, queryParams: object = {}): Promise<HttpResponseType> =>
  new Promise<HttpResponseType>(async (resolve, reject) => {
    try {
      const configs: AxiosRequestConfig = {
        params: {...queryParams},
      }
      const response: AxiosResponse = await httpRequest.post(path, data, configs)
      resolve(response.data)
    } catch (error: Error | any) {
      console.error('[adapters][http][http_request_handler]', 'add', error)
      reject(error)
    }
  })

const edit = (path: string, id: string | number, data: object, queryParams: object = {}): Promise<HttpResponseType> =>
  new Promise<HttpResponseType>(async (resolve, reject) => {
    try {
      const configs: AxiosRequestConfig = {
        params: {...queryParams},
      }
      const response: AxiosResponse = await httpRequest.put(`${path}/${id}`, data, configs)
      resolve(response.data)
    } catch (error: Error | any) {
      console.error('[adapters][http][http_request_handler]', 'edit', error)
      reject(error)
    }
  })

const remove = (path: string, id: string | number, queryParams: object = {}) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      const configs: AxiosRequestConfig = {
        params: {...queryParams},
      }
      await httpRequest.delete(`${path}/${id}`, configs)
      resolve()
    } catch (error: Error | any) {
      console.error('[adapters][http][http_request_handler]', 'remove', error)
      reject(error)
    }
  })

const http: HttpRequestType = {read, add, edit, remove}

export default http
