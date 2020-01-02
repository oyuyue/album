import {
  takeLeading,
  select,
  call,
  put,
  fork,
  take,
  all,
  cancel
} from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'
import {
  FETCH_MORE_USER_STUFFS,
  FETCH_USER_STUFFS,
  FETCH_USER,
  CHANGE_USER_PROFILE,
  FETCH_USER_ALBUMS
} from 'store/constants'
import {
  addMoreUserStuffs,
  setUserStuffs,
  setUser,
  fetchMyDetails,
  setUserAlbums
} from 'store/actions'
import {
  fetchUserPhotos,
  fetchUserAlbums,
  fetchUser,
  updateMyProfile
} from 'api'
import user, { UserKey, selectUserUsername } from 'store/reducers/user'
import { KeyAction, PayloadAction, ListAction } from 'types/store'
import { ReqParams } from 'store/reducers/list'
import { uploadImage } from './upload'
import { stateful, list } from './utils'

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
  let res = {}
  try {
    res = yield call(fetchUser, payload)
  } catch (error) {
  } finally {
    yield put(setUser(res))
  }
}

function* changeUserProfile({
  payload: { bannerFile, avatarFile, resolve, reject, ...rest }
}: PayloadAction) {
  try {
    const [banner, avatar] = yield all([
      uploadImage(bannerFile),
      uploadImage(avatarFile)
    ])

    if (banner) rest.bannerUrl = banner
    if (avatar) rest.avatarUrl = avatar

    yield call(updateMyProfile, rest)
    yield put(fetchMyDetails())
    resolve(true)
  } catch (error) {
    console.error('update user profile error', error)
    reject(error)
  }
}

function* fetchUserAlbumsSaga(
  { payload, loadMore }: ListAction,
  reqParams: ReqParams
) {
  const username = yield select(selectUserUsername)
  const res = yield call(fetchUserAlbums, username, {
    ...reqParams,
    ...payload
  })
  yield put(setUserAlbums(loadMore, res.content))
  return res
}

export default function*() {
  yield fork(userStuffSaga)
  yield takeLeading(FETCH_USER, fetchDetail)
  yield takeLeading(CHANGE_USER_PROFILE, stateful(changeUserProfile))
  yield takeLeading(FETCH_USER_ALBUMS, list(fetchUserAlbumsSaga))
}
