import { Reducer } from 'redux'
import { PayloadAction } from 'types/store'
import { User } from 'types/entity'
import { SET_MY_DETAILS, UNSET_MY_DETAILS } from 'store/constants'
import { RootState } from '..'

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
      return { ...state, logged: true, details: payload }
    case UNSET_MY_DETAILS:
      return { ...state, logged: false, details: {} }
    default:
      return state
  }
}

export const isLogged = ({ account: { logged } }: RootState) => logged
export const selectMyUsername = ({
  account: {
    details: { username }
  }
}: RootState) => username
export const selectMyAvatar = ({
  account: {
    details: { avatarUrl }
  }
}: RootState) => avatarUrl
export const selectMyEmail = ({
  account: {
    details: { email }
  }
}: RootState) => email
export const selectMyDetails = ({ account: { details } }: RootState) => details

export default accountReducer
