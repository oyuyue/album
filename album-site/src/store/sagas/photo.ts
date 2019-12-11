import {
  takeLeading,
  call,
  put,
  select,
  fork,
  take,
  cancel
} from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'
import { fetchPhotos } from 'api'
import browse, { selectReqParams } from 'store/reducers/photo/browse'
import recommend from 'store/reducers/photo/recommend'
import {
  FETCH_PHOTOS,
  FETCH_RECOMMEND_PHOTS,
  FETCH_MORE_RECOMMEND_PHOTS,
  FETCH_MORE_PHOTOS
} from 'store/constants'
import {
  setPhotos,
  addMorePhotos,
  changePhotoParams,
  addMoreRecommendPhotos,
  setRecommendPhotos
} from 'store/actions'
import { PayloadAction } from 'types/store'

function* fetchRecommend() {
  let loadMoreTask = null
  let lastTask = null
  while (true) {
    loadMoreTask = yield fork(function*() {
      yield takeLeading(FETCH_MORE_RECOMMEND_PHOTS, function*() {
        try {
          if (recommend.canFetchMore) {
            const params = yield select(recommend.getReqParams(false, 1))
            yield put(recommend.loading())
            const res = yield call(fetchPhotos, params)
            yield put(
              batchActions([
                recommend.success(),
                addMoreRecommendPhotos(res),
                recommend.set({ page: params.page, size: params.size })
              ])
            )
          }
        } catch (error) {
          yield put(recommend.error(error))
        }
      })
    })
    yield take(FETCH_RECOMMEND_PHOTS)
    if (loadMoreTask) yield cancel(loadMoreTask)
    if (lastTask) yield cancel(lastTask)
    lastTask = yield fork(function*() {
      try {
        const params = yield select(recommend.getReqParams(true))
        yield put(recommend.loading())
        const res = yield call(fetchPhotos, params)
        yield put(
          batchActions([
            recommend.success(),
            setRecommendPhotos(res),
            recommend.set({ page: params.page, size: params.size })
          ])
        )
      } catch (error) {
        recommend.initError(error)
      }
    })
  }
}

function* fetchBrowse() {
  let loadMoreTask = null
  let lastTask = null
  while (true) {
    loadMoreTask = yield fork(function*() {
      yield takeLeading(FETCH_MORE_PHOTOS, function*() {
        try {
          if (browse.canFetchMore) {
            const params = yield select(browse.getReqParams(false, 1))
            const reqParams = yield select(selectReqParams)
            yield put(browse.loading())
            const res = yield call(
              fetchPhotos,
              Object.assign(params, reqParams)
            )
            yield put(
              batchActions([
                browse.success(),
                addMorePhotos(res),
                browse.set({ page: params.page, size: params.size })
              ])
            )
          }
        } catch (error) {
          browse.error(error)
        }
      })
    })
    const { payload } = yield take<PayloadAction>(FETCH_PHOTOS)
    if (loadMoreTask) yield cancel(loadMoreTask)
    if (lastTask) yield cancel(lastTask)
    lastTask = yield fork(function*() {
      try {
        const params = yield select(browse.getReqParams(true))
        yield put(browse.loading())
        const res = yield call(fetchPhotos, Object.assign(params, payload))
        yield put(
          batchActions([
            browse.success(),
            setPhotos(res),
            changePhotoParams({ tags: params.tags }),
            browse.set({
              page: params.page,
              size: params.size,
              sort: params.sort
            })
          ])
        )
      } catch (error) {
        yield put(browse.initError(error))
      }
    })
  }
}

export default function*() {
  yield fork(fetchRecommend)
  yield fork(fetchBrowse)
}
