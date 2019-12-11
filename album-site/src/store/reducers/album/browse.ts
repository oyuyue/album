import { Reducer } from 'redux'
import {
  SET_ALBUMS,
  ADD_MORE_ALBUMS,
  CHANGE_ALBUM_REQUEST_PARAMS
} from 'store/constants'
import { Album } from 'types/entity'
import { PayloadAction } from 'types/store'
import stateableAndPageable from 'store/hors/stateableAndPageable'
import { RootState } from '..'

interface BrowseState {
  reqParams: { tags?: string[] }
  content: Album[]
}

const browseReducer: Reducer<BrowseState, PayloadAction> = (
  state = {
    reqParams: { tags: [] },
    content: []
  },
  { type, payload }
) => {
  switch (type) {
    case SET_ALBUMS:
      return { ...state, content: [...payload] }
    case ADD_MORE_ALBUMS:
      return { ...state, content: [...state.content, ...payload] }
    case CHANGE_ALBUM_REQUEST_PARAMS:
      return {
        ...state,
        reqParams: { ...state.reqParams, ...payload }
      }
    default:
      return state
  }
}

export const selectReqParams = ({
  album: {
    browse: {
      state: { reqParams }
    }
  }
}: RootState) => reqParams

export const selectAlbums = ({
  album: {
    browse: {
      status,
      hasMore,
      state: { content }
    }
  }
}: RootState) => ({ status, hasMore, content })

export default stateableAndPageable(browseReducer, 'album.browse')
