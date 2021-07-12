import { createStore, applyMiddleware } from 'redux'
import createRootReducer from '../reducers'

const enhancer = applyMiddleware()

const configureStore = (initialState) =>
  createStore(createRootReducer, initialState, enhancer)

export default { configureStore }
