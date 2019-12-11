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
import { SEARCH, SEARCH_MORE } from 'store/constants'
import { changeSearchParams, setSearch, addMoreSearch } from 'store/actions'
import { search as searchApi } from 'api'
import search, { selectReqParams, SearchKey } from 'store/reducers/search'
import { KeyAction } from 'types/store'

function* searchSaga() {
  let loadMoreTask = null
  let lastTask = null
  while (true) {
    loadMoreTask = yield fork(function*() {
      yield takeLeading<KeyAction<SearchKey>>(SEARCH_MORE, function*({ key }) {
        try {
          if (search.canFetchMore) {
            const params = yield select(search.getReqParams(false, 1))
            const reqParams = yield select(selectReqParams)
            yield put(search.loading())
            const res = yield call(searchApi, Object.assign(params, reqParams))
            yield put(
              batchActions([
                search.success(),
                addMoreSearch(key, res),
                search.set({ page: params.page, size: params.size })
              ])
            )
          }
        } catch (error) {
          search.error(error)
        }
      })
    })
    const { payload, key } = yield take<KeyAction>(SEARCH)
    if (loadMoreTask) yield cancel(loadMoreTask)
    if (lastTask) yield cancel(lastTask)
    lastTask = yield fork(function*() {
      try {
        const params = yield select(search.getReqParams(true))
        yield put(search.loading())
        const res = yield call(searchApi, Object.assign(params, payload))
        yield put(
          batchActions([
            search.success(),
            setSearch(key, res),
            changeSearchParams({ term: params.term }),
            search.set({
              page: params.page,
              size: params.size,
              sort: params.sort
            })
          ])
        )
      } catch (error) {
        yield put(search.initError(error))
      }
    })
  }
}

export default function*() {
  yield fork(searchSaga)
}
