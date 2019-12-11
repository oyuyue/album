import { takeLeading, call, put, select } from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'
import { fetchBanners } from 'api'
import { FETCH_BANNERS } from '../constants'
import banner from '../reducers/banner'
import { setBanners } from '../actions'

export default function*() {
  yield takeLeading(FETCH_BANNERS, function*() {
    try {
      if (select(banner.can())) {
        yield put(banner.loading())
        const res = yield call(fetchBanners)
        yield put(batchActions([banner.success(), setBanners(res)]))
      }
    } catch (error) {
      yield put(banner.error(error))
    }
  })
}
