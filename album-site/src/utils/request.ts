import { isFunction, isObject } from 'lodash-es'
import { apiPrefix } from 'config'
import { getAccessToken } from './storage'
import { stringifyQuery } from './index'

function hasBody(method: string): boolean {
  return method === 'POST' || method === 'PUT' || method === 'PATCH'
}

function getReqUrl(
  url: string,
  method: string,
  payload?: Record<string, any>
): string {
  url = apiPrefix + url
  if (!payload || hasBody(method)) return url
  return url + (isObject(payload) ? stringifyQuery(payload) : payload)
}

function getHeadersAndBody(
  method: string,
  payload?: Record<string, any>,
  header?: Record<string, any>
) {
  const headers = {
    ...header,
    'X-Auth-Token': getAccessToken(),
    'Content-Type': 'application/json'
  }

  let body: any = payload
  if (hasBody(method) && payload) {
    if (payload instanceof URLSearchParams) {
      header['Content-Type'] = 'application/x-www-form-urlencoded'
    } else if (payload instanceof FormData) {
      delete headers['Content-Type']
    } else if (typeof payload !== 'string') {
      try {
        body = JSON.stringify(payload)
      } catch (error) {}
    }
  }

  return {
    headers,
    body
  }
}

function responseReturn(res: Response, key?: keyof Response) {
  if (key) {
    if (isFunction(res[key])) return (res[key] as Function)()
    return Promise.resolve(res[key])
  }

  const len = res.headers.get('content-length')
  if (parseInt(len) === 0) return Promise.resolve({})

  const type = res.headers.get('content-type')
  if (type && type.startsWith('application/json')) return res.json()
  return res.text()
}

export function request(
  url: string,
  method = 'GET',
  {
    payload,
    headers,
    returnType,
    rawResponse = false,
    fetchConfig
  }: {
    payload?: any
    headers?: Record<string, any>
    returnType?: keyof Response
    rawResponse?: boolean
    fetchConfig?: RequestInit
  }
): Promise<Response | any> {
  method = method.toUpperCase()

  return fetch(getReqUrl(url, method, payload), {
    credentials: 'same-origin',
    method,
    ...getHeadersAndBody(method, payload, headers),
    ...fetchConfig
  })
    .then(res => {
      if (res.status < 200 || res.status >= 400) return Promise.reject(res)
      if (rawResponse) return res
      return responseReturn(res, returnType)
    })
    .catch(err => {
      if (rawResponse) return Promise.reject(err)
      return responseReturn(err, returnType).then((data: any) => {
        console.log(data)
        return Promise.reject(data)
      })
    })
}

export function get(url: string, payload?: any): ReturnType<typeof request> {
  return request(url, 'GET', { payload })
}

export function post(url: string, payload?: any): ReturnType<typeof request> {
  return request(url, 'POST', { payload })
}
