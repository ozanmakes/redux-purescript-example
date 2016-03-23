import { combineReducers } from "redux"

import { visibilityFilter, todos, counter } from "./Reducers.purs"

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  counter
})

export default todoApp
