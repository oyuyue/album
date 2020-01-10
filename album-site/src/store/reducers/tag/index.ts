import { Reducer } from 'redux'
import { SET_TAGS } from 'store/constants'
import { Tag } from 'types/entity'
import { PayloadAction } from 'types/store'
import { RootState } from '..'

type TagState = Tag[]

const tagReducer: Reducer<TagState, PayloadAction> = (
  state = [],
  { type, payload }
) => {
  switch (type) {
    case SET_TAGS:
      return [...payload]
    default:
      return state
  }
}

export const selectTags = ({ tag }: RootState) => tag

export default tagReducer
