import { spawn, all, call } from 'redux-saga/effects'
import banner from './banner'
import photo from './photo'
import album from './album'
import tag from './tag'
import category from './category'
import search from './search'
import user from './user'
import account from './account'

export default function*() {
  yield all(
    [photo, banner, album, tag, category, search, user, account].map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (error) {
            console.error(error)
          }
        }
      })
    )
  )
}
