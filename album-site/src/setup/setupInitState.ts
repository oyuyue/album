import { Store } from 'redux'
import { getItem } from 'utils/storage'
import { setAccessToken, fetchMyDetails, fetchAccessToken } from 'store/actions'

export default function({ dispatch }: Store): void {
  const token = getItem('access_token')
  if (token) {
    dispatch(setAccessToken(token))
    dispatch(fetchMyDetails())
  } else {
    dispatch(fetchAccessToken())
  }
}
