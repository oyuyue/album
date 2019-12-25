import { Reducer } from 'redux'
import { PayloadAction } from 'types/store'
import { User } from 'types/entity'
import { SET_ACCESS_TOKEN, SET_MY_DETAILS } from 'store/constants'

interface AccountState {
  token: string
  isLogin: boolean
  details: User
}

const accountReducer: Reducer<AccountState, PayloadAction> = (
  state,
  { type, payload }
) => {
  switch (type) {
    case SET_ACCESS_TOKEN:
      return { ...state, token: payload }
    case SET_MY_DETAILS:
      return { ...state, user: payload }
    default:
      return state
  }
}

export default accountReducer
