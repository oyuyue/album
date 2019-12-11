import { combineReducers } from 'redux'
import recommend from './recommend'
import browse from './browse'

export default combineReducers({
  browse,
  recommend
})
