import { Reducer } from 'redux'
import { Album } from 'types/entity'
import { PayloadAction } from 'types/store'
import { SET_EDIT_ALBUM } from 'store/constants'
import { RootState } from '..'

const EditReducer: Reducer<Album, PayloadAction> = (
  state = {},
  { type, payload }
) => {
  switch (type) {
    case SET_EDIT_ALBUM:
      return { ...state, ...payload }
    default:
      return state
  }
}

export const selectEditAlbum = ({ album: { edit } }: RootState) => edit

export default EditReducer
