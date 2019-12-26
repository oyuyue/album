import { Store } from 'redux'
import { getAccessToken } from 'utils/storage'
import { fetchMyDetails, fetchToken } from 'store/actions'

export default function({ dispatch }: Store): void {
  dispatch(fetchToken())
  if (getAccessToken()) dispatch(fetchMyDetails())
}
