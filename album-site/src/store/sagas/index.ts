import { spawn } from 'redux-saga/effects'
import banner from './banner'
import photo from './photo'
import album from './album'
import tag from './tag'
import category from './category'
import search from './search'
import user from './user'
import account from './account'

export default function*() {
  yield spawn(photo)
  yield spawn(banner)
  yield spawn(album)
  yield spawn(tag)
  yield spawn(category)
  yield spawn(search)
  yield spawn(user)
  yield spawn(account)
}
