import {
  takeLeading,
  call,
  put,
  select,
  fork,
  cancel,
  take
} from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'
import { fetchAlbums, fetchAlbum, fetchPhotos } from 'api'
import browse, { selectReqParams } from 'store/reducers/album/browse'
import detail from 'store/reducers/album/detail'
import {
  FETCH_MORE_ALBUMS,
  FETCH_ALBUMS,
  FETCH_MORE_ALBUM_PHOTOS,
  FETCH_ALBUM,
  FETCH_ALBUM_PHOTOS
} from 'store/constants'
import {
  addMoreAlbums,
  setAlbums,
  changeAlbumsParams,
  setAlbum,
  addMoreAlbumPhotos,
  setAlbumPhotos
} from 'store/actions'
import { PayloadAction } from 'types/store'

function* fetchBrowse() {
  let loadMoreTask = null
  let lastTask = null
  while (true) {
    loadMoreTask = yield fork(function*() {
      yield takeLeading(FETCH_MORE_ALBUMS, function*() {
        try {
          if (browse.canFetchMore) {
            const params = yield select(browse.getReqParams(false, 1))
            const reqParams = yield select(selectReqParams)
            yield put(browse.loading())
            const res = yield call(
              fetchAlbums,
              Object.assign(params, reqParams)
            )
            yield put(
              batchActions([
                browse.success(),
                addMoreAlbums(res),
                browse.set({ page: params.page, size: params.size })
              ])
            )
          }
        } catch (error) {
          browse.error(error)
        }
      })
    })
    const { payload } = yield take<PayloadAction>(FETCH_ALBUMS)
    if (loadMoreTask) yield cancel(loadMoreTask)
    if (lastTask) yield cancel(lastTask)
    lastTask = yield fork(function*() {
      try {
        const params = yield select(browse.getReqParams(true))
        yield put(browse.loading())
        const res = yield call(fetchAlbums, Object.assign(params, payload))
        yield put(
          batchActions([
            browse.success(),
            setAlbums(res),
            changeAlbumsParams({ tags: params.tags }),
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

function* fetchDetailPhotos() {
  let loadMoreTask = null
  let lastTask = null
  while (true) {
    loadMoreTask = yield fork(function*() {
      yield takeLeading<
        PayloadAction
      >(FETCH_MORE_ALBUM_PHOTOS, function*({ payload }) {
        try {
          if (detail.canFetchMore) {
            const params = yield select(detail.getReqParams(false, 1))
            yield put(detail.loading())
            const res = yield call(fetchPhotos, Object.assign(params, payload))
            yield put(
              batchActions([
                detail.success(),
                addMoreAlbumPhotos(res),
                detail.set({ page: params.page, size: params.size })
              ])
            )
          }
        } catch (error) {
          detail.error(error)
        }
      })
    })
    const { payload } = yield take<PayloadAction>(FETCH_ALBUM_PHOTOS)
    if (loadMoreTask) yield cancel(loadMoreTask)
    if (lastTask) yield cancel(lastTask)
    lastTask = yield fork(function*() {
      try {
        const params = yield select(detail.getReqParams(true))
        yield put(detail.loading())
        const res = yield call(fetchPhotos, Object.assign(params, payload))
        yield put(
          batchActions([
            detail.success(),
            setAlbumPhotos(res),
            detail.set({
              page: params.page,
              size: params.size,
              sort: params.sort
            })
          ])
        )
      } catch (error) {
        yield put(detail.initError(error))
      }
    })
  }
}

function* fetchDetail({ payload }: PayloadAction) {
  try {
    const res = yield call(fetchAlbum, payload)
    yield put(setAlbum(res))
  } catch (error) {}
}

export default function*() {
  yield fork(fetchBrowse)
  yield fork(fetchDetailPhotos)
  yield takeLeading(FETCH_ALBUM, fetchDetail)
}
