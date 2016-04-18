import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import DevTools from "../containers/DevTools"
import actionTransformer from "../store/actionTransformer"

import { rootReducer } from "Reducers.purs"

const loggerMiddleware = createLogger({
  level: "info",
  collapsed: true,
  actionTransformer
})

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  DevTools.instrument()
)(createStore)

export default function configureStore (initialState) {
  const store = finalCreateStore(rootReducer, initialState)
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept("Reducers.purs", () =>
                      store.replaceReducer(require("Reducers.purs").default))
  }

  return store
}
