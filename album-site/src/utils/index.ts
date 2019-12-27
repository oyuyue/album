import { AnyAction } from 'redux'
import { isString, isFunction, omitBy, isNil, isObject } from 'lodash-es'
import { apiPrefix } from 'config'
import { getAccessToken } from './storage'

const images = [
  "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23180d1c' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%23261431' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23351947' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%23451e5e' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23552277' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E\"",
  "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23AE9' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E\"",
  "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2380F'/%3E%3Cstop offset='1' stop-color='%23f40'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23ffffff' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E\"",
  "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 20 20'%3E%3Cg %3E%3Cpolygon fill='%23242' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%23242' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E\"",
  "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23DCEFFA' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E\"",
  "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Ccircle fill='%2306B' cx='45' cy='45' r='10'/%3E%3Cg fill='%23800' fill-opacity='1'%3E%3Ccircle cx='0' cy='90' r='10'/%3E%3Ccircle cx='90' cy='90' r='10'/%3E%3Ccircle cx='90' cy='0' r='10'/%3E%3Ccircle cx='0' cy='0' r='10'/%3E%3C/g%3E%3C/svg%3E\""
]

export function randomImage(): string {
  return images[Math.floor(Math.random() * images.length)]
}

export function stringifyQuery(query: Record<string, any>): string {
  return isObject(query)
    ? '?' + new URLSearchParams(omitBy(query, isNil)).toString()
    : ''
}

export function request(
  url: string,
  method = 'GET',
  payload?: any,
  returnType: keyof Response = 'json',
  fetchConfig?: RequestInit
): Promise<Response | any> {
  method = method.toUpperCase()

  return fetch(
    apiPrefix + url + (method === 'GET' ? stringifyQuery(payload) : ''),
    Object.assign(
      {
        credentials: 'same-origin'
      },
      fetchConfig,
      {
        method,
        body: method === 'GET' ? undefined : JSON.stringify(payload),
        headers: Object.assign(
          method === 'GET' ? {} : { 'Content-Type': 'application/json' },
          fetchConfig ? fetchConfig.headers : undefined,
          { 'X-Auth-Token': getAccessToken() }
        )
      }
    )
  ).then(res =>
    returnType
      ? isFunction(res[returnType])
        ? (res[returnType] as Function)()
        : res[returnType]
      : res
  )
}

export function get(url: string, payload?: any): ReturnType<typeof request> {
  return request(url, 'GET', payload)
}

export function post(url: string, payload?: any): ReturnType<typeof request> {
  return request(url, 'POST', payload)
}

export function makeActionCreator<T extends AnyAction>(
  type: string,
  ...keys: string[]
) {
  return function(...args: any[]): T {
    const action: AnyAction = { type }
    keys.forEach((k, i) => (action[k] = args[i]))
    return action as T
  }
}

export function readableTimeFormatter(time: number | string): string {
  if (isString(time)) time = parseInt(time, 10)
  const date = new Date(time)
  const diff = ~~((Date.now() - date.getTime()) / 1000)

  const year = Math.floor(diff / 31536000)
  if (year > 0) return year + '年前'

  const month = Math.floor(diff / 2592000)
  if (month > 0) return month + '月前'

  const week = Math.floor(diff / 604800)
  if (week > 0) return week + '星期前'

  const day = Math.floor(diff / 86400)
  if (day > 0) return day + '天前'

  const hours = Math.floor(diff / 3600)
  if (hours > 0) return hours + '小时前'

  const minutes = Math.floor(diff / 60)
  if (minutes > 0) return minutes + '分钟前'

  return diff + '秒前'
}

export function shallowArrayCompare(a: any[], b: any[]): boolean {
  if (a == b) return true
  if (!Array.isArray(a) || !Array.isArray(b)) return false
  if (a.length !== b.length) return false
  return a.every(i => b.includes(i))
}

export function insertBetween(arr: any[], ele: any): any[] {
  if (!arr.length) return []
  return arr.reduce((arr, cur, i) => {
    arr.push(cur)
    if (i < arr.length - 1) arr.push(ele)
    return arr
  }, [])
}

export function mimeCheck(mime: string, toCheck: string): boolean {
  if (!mime || mime === '*' || mime === '*/*') return true
  if (!toCheck) return false
  const [et, ev] = mime.split('/')
  const [t, v] = toCheck.split('/')
  if (et !== t) return false
  if (ev === '*') return true
  return ev === v
}
