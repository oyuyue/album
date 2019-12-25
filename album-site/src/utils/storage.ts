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
