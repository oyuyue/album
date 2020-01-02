import { Reducer } from 'redux'
import { PayloadAction } from 'types/store'
import { CHANGE_LIST, CHANGE_LIST_STATUS } from 'store/constants'
import { RootState } from '..'

export enum StatusType {
  INIT_ERROR,
  ERROR,
  SUCCESS
}

export type ReqParams = {
  page: number
  size: number
  sort?: string
}

type StateState = {
  [key: string]: {
    reqParams: ReqParams
    hasMore: boolean
    totalElements: number
    status: StatusType
  }
}

export const defaultReqParams: ReqParams = {
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
    case CHANGE_LIST_STATUS:
      return {
        ...state,
        [payload.key]: { ...state[payload.key], status: payload.status }
      }
    default:
      return state
  }
}

export const selectReqParams = (key: string) => ({ list }: RootState) => {
  const res = list[key]
  if (res && res.reqParams) return res.reqParams
  return { ...defaultReqParams }
}

export const hasMore = (key: string) => ({ list }: RootState) => {
  const res = list[key]
  if (!res || res.hasMore == null) return true
  return res.hasMore
}

export const isListError = (key: string) => ({ list }: RootState) => {
  const res = list[key]
  if (!res) return false
  return res.status === StatusType.ERROR
}

export const isListInitError = (key: string) => ({ list }: RootState) => {
  const res = list[key]
  if (!res) return false
  return res.status === StatusType.INIT_ERROR
}

export default listReducer
