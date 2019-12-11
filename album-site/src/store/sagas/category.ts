import { takeLeading, call, put, select } from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'
import { fetchCategories } from 'api'
import { FETCH_CATEGORIES } from '../constants'
import category from '../reducers/category'
import { setCategories } from '../actions'

export default function*() {
  yield takeLeading(FETCH_CATEGORIES, function*() {
    try {
      if (yield select(category.can())) {
        yield put(category.loading())
        const res = yield call(fetchCategories)
        yield put(batchActions([category.success(), setCategories(res)]))
      }
    } catch (error) {
      yield put(category.error(error))
    }
  })
}
