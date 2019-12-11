import { Reducer } from 'redux'
import { SET_TAGS } from 'store/constants'
import stateable from 'store/hors/stateable'
import { Tag } from 'types/entity'
import { PayloadAction } from 'types/store'
import { RootState } from '..'

type TagState = Tag[]

const tagReducer: Reducer<TagState, PayloadAction> = (state = [], action) => {
  switch (action.type) {
    case SET_TAGS:
      return [...action.payload]
    default:
      return state
  }
}

export const selectTag = ({ tag: { status, state } }: RootState) => ({
  status,
  content: state
})

export default stateable(tagReducer, 'tag')
