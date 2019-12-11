import { takeLeading, call, put, select } from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'
import { fetchTags } from 'api'
import { FETCH_TAGS } from '../constants'
import tag from '../reducers/tag'
import { setTags } from '../actions'

export default function*() {
  yield takeLeading(FETCH_TAGS, function*() {
    try {
      if (yield select(tag.can())) {
        yield put(tag.loading())
        const res = yield call(fetchTags)
        yield put(batchActions([tag.success(), setTags(res)]))
      }
    } catch (error) {
      yield put(tag.error(error))
    }
  })
}
