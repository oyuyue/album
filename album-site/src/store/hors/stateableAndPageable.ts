import { Reducer } from 'react'
import { AnyAction } from 'redux'
import { get, isObject } from 'lodash-es'
import { PayloadAction, Pageable } from 'types/store'
import stateable, { StateableStatus } from './stateable'

export default function stateableAndPageable<S, A extends AnyAction>(
  reducer: Reducer<S, A>,
  path: string,
  loadDuration?: number,
  initStatus?: StateableStatus,
  pageSize = 12
) {
  const stateableReducer = stateable(reducer, path, loadDuration, initStatus)

  type NS = {
    hasMore?: boolean
    page?: number
    total?: number
    sort?: string
    size?: number
  } & ReturnType<typeof stateableReducer>

  const SET = path + '__SET'
  const SET_TOTAL = path + '__SET_TOTAL'
  const SET_SORT = path + '__SET_SORT'
  const SET_PAGE = path + '__SET_PAGE'
  const SET_SIZE = path + '__SET_SIZE'
  const SET_HAS_MORE = path + '__SET_HAS_MORE'
  const INC_PAGE = path + '__INC_PAGE'
  const DEC_PAGE = path + '__DEC_PAGE'

  const initState = {
    hasMore: true,
    page: 0,
    total: Number.MAX_VALUE,
    size: pageSize
  }

  const newReducer: Reducer<NS, A> & {
    set: (state: NS) => PayloadAction
    setTotal: (total: NS['total']) => PayloadAction
    setSort: (sort: NS['sort']) => PayloadAction
    setPage: (page: NS['page']) => PayloadAction
    setSize: (size: NS['size']) => PayloadAction
    setHasMore: (hasMore: NS['hasMore']) => PayloadAction
    incPage: () => AnyAction
    dncPage: () => AnyAction
    canFetchMore: (state: any) => boolean
    getReqParams: (
      useInit?: boolean,
      incPage?: number
    ) => (state: any) => Pageable
    success: typeof stateableReducer.success
    error: typeof stateableReducer.error
    loading: typeof stateableReducer.loading
    initError: typeof stateableReducer.initError
    can: typeof stateableReducer.can
    getErrorMessage: typeof stateableReducer.getErrorMessage
  } = (state = initState, action) => {
    switch (action.type) {
      case SET:
        return { ...state, ...action.payload }
      case SET_TOTAL:
        return { ...state, total: action.payload }
      case SET_SORT:
        return { ...state, sort: action.payload }
      case SET_PAGE:
        return { ...state, page: action.payload }
      case SET_SIZE:
        return { ...state, size: action.payload }
      case SET_HAS_MORE:
        return { ...state, hasMore: action.payload }
      case INC_PAGE:
        return { ...state, page: ++state.page }
      case DEC_PAGE:
        return { ...state, page: --state.page }
      default: {
        const newState = stateableReducer(state, action)
        return Object.is(state.state, newState.state) &&
          Object.is(state.lastSuccessTime, newState.lastSuccessTime) &&
          Object.is(state.errorMessage, newState.errorMessage) &&
          Object.is(state.status, newState.status)
          ? state
          : { ...state, ...newState }
      }
    }
  }

  newReducer.set = payload => ({ type: SET, payload })
  newReducer.setTotal = payload => ({ type: SET_TOTAL, payload })
  newReducer.setSort = payload => ({ type: SET_SORT, payload })
  newReducer.setPage = payload => ({ type: SET_PAGE, payload })
  newReducer.setSize = payload => ({ type: SET_SIZE, payload })
  newReducer.setHasMore = payload => ({ type: SET_HAS_MORE, payload })
  newReducer.incPage = () => ({ type: INC_PAGE })
  newReducer.dncPage = () => ({ type: DEC_PAGE })
  newReducer.canFetchMore = (s: any) => {
    const state = get(s, path)
    if (!isObject(state)) return true
    return (
      (state as NS).hasMore && (state as NS).status !== StateableStatus.LOADING
    )
  }
  newReducer.getReqParams = (useInit = false, incPage = 0) => s => {
    let state = useInit ? initState : get(s, path)
    if (!isObject(state)) state = initState
    return {
      page: state.page + (useInit ? 0 : incPage),
      size: state.size,
      sort: state.sort
    }
  }
  newReducer.success = stateableReducer.success
  newReducer.error = stateableReducer.error
  newReducer.loading = stateableReducer.loading
  newReducer.initError = stateableReducer.initError
  newReducer.can = stateableReducer.can
  newReducer.getErrorMessage = stateableReducer.getErrorMessage

  return newReducer
}
