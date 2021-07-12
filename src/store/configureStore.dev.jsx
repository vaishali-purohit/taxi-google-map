import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createRootReducer from '../reducers'

const configureStore = (initialState) => {
  const middleware = []
  const enhancers = []

  const logger = createLogger({
    level: 'info',
    diff: true,
    collapsed: true,
  })

  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger)
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  const store = createStore(createRootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default),
    )
  }

  return store
}

export default { configureStore }
