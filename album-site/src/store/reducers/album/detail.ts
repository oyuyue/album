import { Reducer } from 'redux'
import { Album, Photo } from 'types/entity'
import {
  SET_ALBUM_PHOTOS,
  ADD_MORE_ALBUM_PHOTOS,
  SET_ALBUM
} from 'store/constants'
import { PayloadAction } from 'types/store'
import stateableAndPageable from 'store/hors/stateableAndPageable'

interface DetailState {
  detail: Album
  photos: Photo[]
}

const DetailReducer: Reducer<DetailState, PayloadAction> = (
  state = {
    detail: {},
    photos: []
  },
  { type, payload }
) => {
  switch (type) {
    case SET_ALBUM:
      return { ...state, detail: { ...state.detail, ...payload } }
    case SET_ALBUM_PHOTOS:
      return {
        ...state,
        photos: [...payload]
      }
    case ADD_MORE_ALBUM_PHOTOS:
      return {
        ...state,
        photos: [...state.photos, ...payload]
      }
    default:
      return state
  }
}

export default stateableAndPageable(DetailReducer, 'album.detail')
