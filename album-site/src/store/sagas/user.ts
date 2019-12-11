import {
  takeLeading,
  select,
  call,
  put,
  fork,
  take,
  cancel
} from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'
import {
  FETCH_MORE_USER_STUFFS,
  FETCH_USER_STUFFS,
  FETCH_USER
} from 'store/constants'
import { addMoreUserStuffs, setUserStuffs, setUser } from 'store/actions'
import { fetchUserPhotos, fetchUserAlbums, fetchUser } from 'api'
import user, { UserKey } from 'store/reducers/user'
import { KeyAction, PayloadAction } from 'types/store'

function* userStuffSaga() {
  let loadMoreTask = null
  let lastTask = null
  while (true) {
    loadMoreTask = yield fork(function*() {
      yield takeLeading<
        KeyAction<UserKey>
      >(FETCH_MORE_USER_STUFFS, function*({ key, payload }) {
        try {
          if (user.canFetchMore) {
            const params = yield select(user.getReqParams(false, 1))
            yield put(user.loading())
            const res = yield call(
              key === UserKey.ALBUMS ? fetchUserAlbums : fetchUserPhotos,
              Object.assign(params, payload)
            )
            yield put(
              batchActions([
                user.success(),
                addMoreUserStuffs(key, res),
                user.set({ page: params.page, size: params.size })
              ])
            )
          }
        } catch (error) {
          user.error(error)
        }
      })
    })
    const { key, payload } = yield take<KeyAction<UserKey>>(FETCH_USER_STUFFS)
    if (loadMoreTask) yield cancel(loadMoreTask)
    if (lastTask) yield cancel(lastTask)
    lastTask = yield fork(function*() {
      try {
        const params = yield select(user.getReqParams(true))
        yield put(user.loading())
        const res = yield call(
          key === UserKey.ALBUMS ? fetchUserAlbums : fetchUserPhotos,
          Object.assign(params, payload)
        )
        yield put(
          batchActions([
            user.success(),
            setUserStuffs(key, res),
            user.set({
              page: params.page,
              size: params.size,
              sort: params.sort
            })
          ])
        )
      } catch (error) {
        yield put(user.initError(error))
      }
    })
  }
}

function* fetchDetail({ payload }: PayloadAction) {
  try {
    const res = yield call(fetchUser, payload)
    yield put(setUser(res))
  } catch (error) {}
}

export default function*() {
  yield fork(userStuffSaga)
  yield takeLeading(FETCH_USER, fetchDetail)
}
