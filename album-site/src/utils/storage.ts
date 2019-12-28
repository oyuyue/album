export function getItem(key: string): any {
  let res = localStorage.getItem(key)
  if (res == null) return res
  try {
    res = JSON.parse(res)
  } catch (error) {}
  return res
}

export function setItem(key: string, value: any): void {
  try {
    value = JSON.stringify(value)
  } catch (error) {}
  localStorage.setItem(key, value)
}

let tokenCache = ''
export function setAccessToken(token: string): void {
  if (!token) return
  tokenCache = token
  localStorage.setItem('access_token', token)
}

export function getAccessToken(): string {
  if (tokenCache) return tokenCache
  tokenCache = localStorage.getItem('access_token')
  return tokenCache
}
