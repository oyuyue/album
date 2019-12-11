import { Reducer } from 'redux'
import { Photo } from 'types/entity'
import { PayloadAction } from 'types/store'
import {
  SET_RECOMMEND_PHOTOS,
  ADD_MORE_RECOMMEND_PHOTOS
} from 'store/constants'
import stateableAndPageable from 'store/hors/stateableAndPageable'
import { RootState } from '..'

type RecommendState = Photo[]
const recommendReducer: Reducer<RecommendState, PayloadAction> = (
  state = [],
  { type, payload }
) => {
  switch (type) {
    case SET_RECOMMEND_PHOTOS:
      return [...payload]
    case ADD_MORE_RECOMMEND_PHOTOS:
      return [...state, ...payload]
    default:
      return state
  }
}

export const selectRecommend = ({
  photo: {
    recommend: { status, hasMore, state }
  }
}: RootState) => ({ status, hasMore, content: state })

export default stateableAndPageable(recommendReducer, 'photo.recommend')
