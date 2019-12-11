export const makeAC = (type: string) => () => ({ type })
export const makePAC = <T = any>(type: string) => (payload: T) => ({
  type,
  payload
})
export const makeKAC = <T extends string = string, P = any>(type: string) => (
  key: T,
  payload: P
) => ({
  type,
  key,
  payload
})
