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
import { search as searchApi } from 'api'
import { KeyAction } from 'types/store'

export default function*() {
  yield 1
}
