import { combineReducers } from 'redux'
import recommend from './recommend'
import browse from './browse'
import edit from './edit'

export default combineReducers({
  browse,
  recommend,
  edit
})
