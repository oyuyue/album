import { RootState } from 'store/reducers'
import { User } from 'types/entity'

export default function selectUserDetails({
  account: { details: myDetails, logged },
  user: { details }
}: RootState): User & { logged?: boolean } {
  if (logged && myDetails.username === details.username) {
    return { ...myDetails, logged: true }
  }
  return details
}
