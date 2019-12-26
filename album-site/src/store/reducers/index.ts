import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import banner from './banner'
import photo from './photo'
import album from './album'
import tag from './tag'
import category from './category'
import search from './search'
import user from './user'
import ui from './ui'
import account from './account'

export type RootState = {
  router: RouterState
  banner: ReturnType<typeof banner>
  photo: ReturnType<typeof photo>
  album: ReturnType<typeof album>
  tag: ReturnType<typeof tag>
  category: ReturnType<typeof category>
  search: ReturnType<typeof search>
  user: ReturnType<typeof user>
  ui: ReturnType<typeof ui>
  account: ReturnType<typeof account>
}

export default function createRootReducers(history: History) {
  return combineReducers<RootState>({
    router: connectRouter(history),
    banner,
    photo,
    album,
    tag,
    category,
    search,
    user,
    ui,
    account
  })
}
