import { Reducer } from 'react'
import { PayloadAction } from 'types/store'
import { Photo, User } from 'types/entity'

export type SearchState = {
  photos: Photo[]
  users: User[]
}

const searchReducer: Reducer<SearchState, PayloadAction> = (
  state = {
    photos: [],
    users: []
  },
  { type, payload }
) => {
  switch (type) {
    default:
      return state
  }
}

export default searchReducer
