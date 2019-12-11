import { Reducer } from 'redux'
import { KeyAction } from 'types/store'
import { User, Photo, Album } from 'types/entity'
import {
  SET_USER,
  SET_USER_STUFFS,
  ADD_MORE_USER_STUFFS
} from 'store/constants'
import stateableAndPageable from 'store/hors/stateableAndPageable'

export enum UserKey {
  PHOTOS = 'photos',
  ALBUMS = 'albums',
  ALBUM_PHOTOS = 'albumPhotos',
  FAVORITES = 'favorites'
}

interface UserState {
  detail: User
  photos: Photo[]
  albums: Album[]
  albumPhotos: Photo[]
  favorites: Photo[]
  settings: {}
}

const userReducer: Reducer<UserState, KeyAction<UserKey>> = (
  state = {
    detail: {},
    photos: [],
    albums: [],
    albumPhotos: [],
    favorites: [],
    settings: {}
  },
  { type, payload, key }
) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: { ...payload } }
    case SET_USER_STUFFS:
      return { ...state, [key]: [...payload] }
    case ADD_MORE_USER_STUFFS:
      return { ...state, [key]: [...state[key], ...payload] }
    default:
      return state
  }
}

export default stateableAndPageable(userReducer, 'user')
