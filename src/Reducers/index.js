import { usersDetailsReducer } from './UsersDetail'
import { queriesDetailsReducer } from './QueriesDetail'
import { currentUserDetailsReducer } from './currentUserDetail'
import { currentPostDetailsReducer } from './currentPostDetail'

import { combineReducers } from 'redux'

export const allReducers = combineReducers({
  userDetail: usersDetailsReducer,
  queryResult: queriesDetailsReducer,
  currentUser: currentUserDetailsReducer,
  currentPost: currentPostDetailsReducer,
})