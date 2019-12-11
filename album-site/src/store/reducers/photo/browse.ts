import { Reducer } from 'redux'
import {
  SET_PHOTOS,
  ADD_MORE_PHOTOS,
  CHANGE_PHOTO_REQUEST_PARAMS
} from 'store/constants'
import { Photo } from 'types/entity'
import { PayloadAction } from 'types/store'
import stateableAndPageable from 'store/hors/stateableAndPageable'
import { RootState } from '..'

interface PhotoState {
  content: Photo[]
  reqParams: { tags?: string[] }
}

const browseReducer: Reducer<PhotoState, PayloadAction> = (
  state = {
    reqParams: { tags: [] },
    content: []
  },
  { type, payload }
) => {
  switch (type) {
    case SET_PHOTOS:
      return { ...state, content: [...payload] }
    case ADD_MORE_PHOTOS:
      return { ...state, content: [...state.content, ...payload] }
    case CHANGE_PHOTO_REQUEST_PARAMS:
      return { ...state, reqParams: { ...state.reqParams, ...payload } }
    default:
      return state
  }
}

export const selectReqParams = ({
  photo: {
    browse: {
      state: { reqParams }
    }
  }
}: RootState) => reqParams

export const selectPhotos = ({
  photo: {
    browse: {
      status,
      hasMore,
      state: { content }
    }
  }
}: RootState) => ({ status, hasMore, content })

export default stateableAndPageable(browseReducer, 'photo.browse')
