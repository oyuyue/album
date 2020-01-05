import { Reducer } from 'redux'
import { ListAction } from 'types/store'
import { User, Photo } from 'types/entity'
import { SET_USER, SET_USER_PHOTOS } from 'store/constants'
import { RootState } from '..'

export enum UserKey {
  PHOTOS = 'photos',
  FAVORITES = 'favorites'
}

interface UserState {
  details: User
  photos: Photo[]
  albumPhotos: Photo[]
  favorites: Photo[]
  settings: {}
}

const userReducer: Reducer<UserState, ListAction> = (
  state = {
    details: {},
    photos: [],
    albumPhotos: [],
    favorites: [],
    settings: {}
  },
  { type, payload, loadMore }
) => {
  switch (type) {
    case SET_USER:
      return { ...state, details: { ...payload } }
    case SET_USER_PHOTOS:
      return {
        ...state,
        photos: loadMore ? [...state.photos, ...payload] : [...payload]
      }
    default:
      return state
  }
}

export const selectUserUsername = ({
  user: {
    details: { username }
  }
}: RootState) => username

export const selectUserPhotos = ({ user: { photos } }: RootState) => photos

export default userReducer
