import { Reducer } from 'redux'
import { SET_CATEGORIES } from 'store/constants'
import stateable from 'store/hors/stateable'
import { Category } from 'types/entity'
import { PayloadAction } from 'types/store'
import { RootState } from '..'

type CategoryState = Category[]
const categoryReducer: Reducer<CategoryState, PayloadAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return [...action.payload]
    default:
      return state
  }
}

export const selectCategory = ({ category: { status, state } }: RootState) => ({
  status,
  content: state
})

export default stateable(categoryReducer, 'category')
