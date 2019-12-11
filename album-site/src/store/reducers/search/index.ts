import { Reducer } from 'react'
import { KeyAction } from 'types/store'
import {
  CHANGE_SEARCH_REQUEST_PARAMS,
  SET_SEARCH,
  ADD_MORE_SEARCH
} from 'store/constants'
import { Photo, User, Album } from 'types/entity'
import stateableAndPageable from 'store/hors/stateableAndPageable'
import { RootState } from '..'

export enum SearchKey {
  PHOTOS = 'photos',
  ALBUMS = 'albums',
  USERS = 'users'
}

export type SearchState = {
  reqParams: { term: string }
  photos: Photo[]
  users: User[]
  albums: Album[]
}

const searchReducer: Reducer<SearchState, KeyAction<SearchKey>> = (
  state = {
    reqParams: {
      term: ''
    },
    photos: [],
    users: [],
    albums: []
  },
  { type, payload, key }
) => {
  switch (type) {
    case CHANGE_SEARCH_REQUEST_PARAMS:
      return { ...state, reqParams: { ...state.reqParams, ...payload } }
    case SET_SEARCH:
      return {
        ...state,
        [key]: [...payload]
      }
    case ADD_MORE_SEARCH:
      return {
        ...state,
        [key]: [...state[key], ...payload]
      }
    default:
      return state
  }
}

export const selectReqParams = ({
  search: {
    state: { reqParams }
  }
}: RootState) => reqParams

export const selectContent = (key: SearchKey) => ({
  search: { state }
}: RootState) => state[key]

export default stateableAndPageable(searchReducer, 'search')
