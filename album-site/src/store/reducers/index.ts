import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import banner from './banner'
import photo from './photo'
import tag from './tag'
import search from './search'
import user from './user'
import ui from './ui'
import account from './account'
import state from './state'
import list from './list'

export type RootState = {
  router: RouterState
  banner: ReturnType<typeof banner>
  photo: ReturnType<typeof photo>
  tag: ReturnType<typeof tag>
  search: ReturnType<typeof search>
  user: ReturnType<typeof user>
  ui: ReturnType<typeof ui>
  account: ReturnType<typeof account>
  state: ReturnType<typeof state>
  list: ReturnType<typeof list>
}

export default function createRootReducers(history: History) {
  return combineReducers<RootState>({
    router: connectRouter(history),
    banner,
    photo,
    tag,
    search,
    user,
    ui,
    account,
    state,
    list
  })
}
