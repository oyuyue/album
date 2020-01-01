import { combineReducers } from 'redux'
import browse from './browse'
import detail from './detail'
import edit from './edit'

export default combineReducers({
  browse,
  detail,
  edit
})
