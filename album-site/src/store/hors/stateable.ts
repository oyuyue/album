import { Reducer } from 'react'
import { AnyAction } from 'redux'
import { get, isObject, isNumber } from 'lodash-es'

const DEFAULT_LAST_SUCCESS_TIME_TYPE = '@DEFAULT_LAST_SUCCESS_TIME_TYPE@'

export enum StateableStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
  INIT_ERROR = 'initError'
}

export default function stateable<S, A extends AnyAction>(
  reducer: Reducer<S, A>,
  path: string,
  loadDuration = 0,
  initStatus: StateableStatus = StateableStatus.SUCCESS
) {
  loadDuration *= 60000

  type NS = {
    status?: StateableStatus
    lastSuccessTime?: { [k: string]: number }
    errorMessage?: any
    state?: S
  }

  const SUCCESS = path + '__SUCCESS'
  const INIT_ERROR = path + '__INIT_ERROR'
  const ERROR = path + '__ERROR'
  const LOADING = path + '__LOADING'

  const newReducer: Reducer<NS, A> & {
    success: (successType?: string) => AnyAction & { successType: string }
    error: <T>(errorMessage?: T) => AnyAction & { errorMessage: T }
    loading: () => AnyAction
    initError: <T>(errorMessage?: T) => AnyAction & { errorMessage: T }
    can: (type?: string) => (state: any) => boolean
    getErrorMessage: (state: any) => any
  } = function(
    state = {
      status: initStatus,
      lastSuccessTime: {
        [DEFAULT_LAST_SUCCESS_TIME_TYPE]: 0
      }
    },
    action
  ) {
    switch (action.type) {
      case SUCCESS: {
        if (state.status === StateableStatus.SUCCESS) return state
        return {
          ...state,
          status: StateableStatus.SUCCESS,
          lastSuccessTime: Object.assign({}, state.lastSuccessTime, {
            [action.successType || DEFAULT_LAST_SUCCESS_TIME_TYPE]: Date.now()
          })
        }
      }
      case ERROR:
        if (state.status === StateableStatus.ERROR) return state
        return {
          ...state,
          status: StateableStatus.ERROR,
          errorMessage: action.errorMessage
        }
      case INIT_ERROR:
        if (state.status === StateableStatus.INIT_ERROR) return state
        return {
          ...state,
          status: StateableStatus.INIT_ERROR,
          errorMessage: action.errorMessage
        }
      case LOADING:
        if (state.status === StateableStatus.LOADING) return state
        return {
          ...state,
          status: StateableStatus.LOADING
        }
      default: {
        const newState = reducer(state.state, action)
        return newState === state.state ? state : { ...state, state: newState }
      }
    }
  }

  newReducer.error = errorMessage => ({ type: Error, errorMessage })
  newReducer.initError = errorMessage => ({ type: INIT_ERROR, errorMessage })
  newReducer.success = successType => ({ type: SUCCESS, successType })
  newReducer.loading = () => ({ type: LOADING })
  newReducer.can = (t = DEFAULT_LAST_SUCCESS_TIME_TYPE) => s => {
    let state = get(s, path)
    if (!isObject(state)) return true
    state = state as NS
    return (
      state.status !== StateableStatus.LOADING &&
      (isObject(state.lastSuccessTime)
        ? state.lastSuccessTime[t] && isNumber(state.lastSuccessTime[t])
          ? Date.now() - state.lastSuccessTime[t] > loadDuration
          : true
        : true)
    )
  }
  newReducer.getErrorMessage = s => {
    const state = get(s, path)
    return isObject(state) ? (state as any).errorMessage : state
  }

  return newReducer
}
