import { Reducer } from 'redux'
import { PayloadAction } from 'types/store'
import { CHANGE_LIST } from 'store/constants'
import { RootState } from '..'

export enum StatusType {
  INIT_ERROR,
  ERROR,
  SUCCESS
}

type ReqParams = {
  page: number
  size: number
  sort: string
}

type StateState = {
  [key: string]: {
    reqParams: ReqParams
    hasMore: boolean
    totalElements: number
    status: StatusType
  }
}

export const defaultReqParams = {
  page: 0,
  size: 12
}

const listReducer: Reducer<StateState, PayloadAction> = (
  state = {},
  { type, payload }
) => {
  switch (type) {
    case CHANGE_LIST:
      return { ...state, ...payload }
    default:
      return state
  }
}

export const selectReqParams = (key: string) => ({ list }: RootState) => {
  const res = list[key]
  if (res && res.reqParams) return res.reqParams
  return { ...defaultReqParams }
}

export default listReducer
