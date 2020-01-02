import { Reducer } from 'redux'
import { ListAction } from 'types/store'
import { User, Photo, Album } from 'types/entity'
import { SET_USER, SET_USER_ALBUMS } from 'store/constants'
import { RootState } from '..'

export enum UserKey {
  PHOTOS = 'photos',
  ALBUMS = 'albums',
  ALBUM_PHOTOS = 'albumPhotos',
  FAVORITES = 'favorites'
}

interface UserState {
  details: User
  photos: Photo[]
  albums: Album[]
  albumPhotos: Photo[]
  favorites: Photo[]
  settings: {}
}

const userReducer: Reducer<UserState, ListAction> = (
  state = {
    details: {},
    photos: [],
    albums: [],
    albumPhotos: [],
    favorites: [],
    settings: {}
  },
  { type, payload, loadMore }
) => {
  switch (type) {
    case SET_USER:
      return { ...state, details: { ...payload } }
    case SET_USER_ALBUMS:
      return {
        ...state,
        albums: loadMore ? [...state.albums, ...payload] : [...payload]
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

export const selectUserAlbums = ({ user: { albums } }: RootState) => albums

export default userReducer
