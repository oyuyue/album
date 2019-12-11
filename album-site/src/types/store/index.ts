import { Action } from 'redux'

export interface Pageable {
  page: number
  size: number
  sort?: string
}

export interface PayloadAction<T = any> extends Action {
  payload?: T
}

export interface PageableAction<T = any> extends Action {
  reqParams?: T
  isReset?: boolean
}

export interface KeyAction<T extends string = string> extends PayloadAction {
  key?: T
}
