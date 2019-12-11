import { Reducer } from 'redux'
import { SET_BANNERS } from 'store/constants'
import stateable, { StateableStatus } from 'store/hors/stateable'
import { Banner } from 'types/entity'
import { PayloadAction } from 'types/store'
import { RootState } from '..'

type BannerState = Banner[]

const bannerReducer: Reducer<BannerState, PayloadAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case SET_BANNERS:
      return action.payload
    default:
      return state
  }
}

export const selectBanner = ({ banner }: RootState) => banner

export default stateable(bannerReducer, 'banner', 10, StateableStatus.LOADING)
