import { Reducer } from 'redux'
import { PayloadAction } from 'types/store'
import { CHANGE_STATE } from 'store/constants'
import { RootState } from '..'

export enum StateType {
  LOADING,
  ERROR,
  DONE
}

type StateState = { [key: string]: StateType }
const stateReducer: Reducer<StateState, PayloadAction> = (
  state = {},
  { type, payload }
) => {
  switch (type) {
    case CHANGE_STATE:
      return { ...state, ...payload }
    default:
      return state
  }
}

export const selectState = (key: string) => ({ state }: RootState) => state[key]
export const isLoading = (key: string) => ({ state }: RootState) =>
  state[key] === StateType.LOADING
export const isError = (key: string) => ({ state }: RootState) =>
  state[key] === StateType.ERROR
export const isDone = (key: string) => ({ state }: RootState) =>
  state[key] === StateType.DONE

export default stateReducer
