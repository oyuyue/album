import { Reducer } from 'redux'
import { PayloadAction } from 'types/store'
import { User } from 'types/entity'
import { SET_MY_DETAILS, UNSET_MY_DETAILS } from 'store/constants'

interface AccountState {
  logged: boolean
  details: User
}

const accountReducer: Reducer<AccountState, PayloadAction> = (
  state = {
    logged: false,
    details: {}
  },
  { type, payload }
) => {
  switch (type) {
    case SET_MY_DETAILS:
      return { ...state, logged: true, user: payload }
    case UNSET_MY_DETAILS:
      return { ...state, logged: false, user: {} }
    default:
      return state
  }
}

export default accountReducer
