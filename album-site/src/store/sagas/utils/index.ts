import { AnyAction } from 'redux'
import { call, put } from 'redux-saga/effects'
import { loading, done, error } from 'store/actions'

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
