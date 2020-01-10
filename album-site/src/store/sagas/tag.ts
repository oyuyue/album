import { takeLeading, call, put } from 'redux-saga/effects'
import { fetchTags } from 'api'
import { FETCH_TAGS } from '../constants'
import { setTags } from '../actions'
import { stateful } from './utils'

function* getTags() {
  const res = yield call(fetchTags)
  yield put(setTags(res))
}

export default function*() {
  yield takeLeading(FETCH_TAGS, stateful(getTags))
}
