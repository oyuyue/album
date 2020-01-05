import { Reducer } from 'redux'
import { Photo } from 'types/entity'
import { PayloadAction } from 'types/store'
import { SET_EDIT_PHOTO } from 'store/constants'
import { RootState } from '..'

const EditReducer: Reducer<Photo, PayloadAction> = (
  state = {},
  { type, payload }
) => {
  switch (type) {
    case SET_EDIT_PHOTO:
      return { ...state, ...payload }
    default:
      return state
  }
}

export const selectEditPhoto = ({ photo: { edit } }: RootState) => edit

export default EditReducer
