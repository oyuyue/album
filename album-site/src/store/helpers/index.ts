import { ListAction } from 'types/store'

export const makeAC = (type: string) => () => ({ type })
export const makePAC = <T = any>(type: string) => (payload: T) => ({
  type,
  payload
})
export const makeKAC = <T extends string = string, P = any>(type: string) => (
  key: T,
  payload?: P
) => ({
  type,
  key,
  payload
})

export const makeLAC = <T = any>(type: string) => {
  function ac(loadMore = false, payload?: T): ListAction {
    return { type, loadMore, payload }
  }
  ac.type = type
  return ac
}
