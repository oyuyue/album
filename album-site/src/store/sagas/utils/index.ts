import { AnyAction } from 'redux'
import { call, put, select } from 'redux-saga/effects'
import {
  loading,
  done,
  error,
  changeList,
  changeListStatus
} from 'store/actions'
import { ListAction } from 'types/store'
import {
  selectReqParams,
  defaultReqParams,
  StatusType
} from 'store/reducers/list'

export function stateful<Fn extends (...args: any[]) => any>(fn: Fn) {
  return function* statefulGen(action: AnyAction) {
    try {
      yield put(loading(action.type))
      yield call(fn as any, action)
      yield put(done(action.type))
    } catch (err) {
      yield put(error(action.type))
      throw err
    }
  }
}

export function list<Fn extends (...args: any[]) => any>(
  fn: Fn,
  errHandler?: (err: Error) => void
) {
  return function* listGen(action: ListAction) {
    try {
      let reqParams = { ...defaultReqParams }
      if (action.loadMore) {
        reqParams = yield select(selectReqParams(action.type))
        reqParams.page += 1
      }
      const { totalElements, last } = yield call(fn as any, action, reqParams)
      yield put(
        changeList({
          [action.type]: {
            reqParams,
            totalElements,
            hasMore: !last,
            status: StatusType.SUCCESS
          }
        })
      )
    } catch (error) {
      yield put(
        changeListStatus({
          key: action.type,
          status: action.loadMore ? StatusType.ERROR : StatusType.INIT_ERROR
        })
      )
      if (errHandler) {
        errHandler(error)
      } else {
        throw error
      }
    }
  }
}
