import { combineReducers } from "redux"

import { postsBySubreddit, selectedSubreddit } from "./Reducers.purs"

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer
