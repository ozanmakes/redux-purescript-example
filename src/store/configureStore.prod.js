import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"

import { rootReducer } from "../Reducers.purs"

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
)(createStore)

export default function configureStore (initialState) {
  return finalCreateStore(rootReducer, initialState)
};
