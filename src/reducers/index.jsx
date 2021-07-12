import { combineReducers } from 'redux'
import map from './map'
import drawer from './drawer.reducer'
import info from './info.reducer'
import pick from './pick.reducer'
import marker from './marker.reducer'

const appReducer = combineReducers({
  map,
  drawer,
  info,
  pick,
  marker,
})

export default appReducer
