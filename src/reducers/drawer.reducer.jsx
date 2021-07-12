import {
  DRAWER_VALUE,
  SELECTED_TAB,
  SELECTED_BUTTON,
  TOGGLE_SWICTH,
} from '../actions/drawer.actions'
import Aubergine from '../lib/styles/aubergine.json'
import Standard from '../lib/styles/standard.json'

const initialState = {
  open: false,
  position: 'left',
  noOverlay: false,
  selectedTab: 'search',
  name: 'service',
  buttonName: 'next',
  enabled: false,
  theme: Standard,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DRAWER_VALUE:
      return {
        ...state,
        open: action.payload.open,
        position: action.payload.position,
        noOverlay: action.payload.noOverlay,
        selectedTab: action.payload.selectedTab,
      }

    case SELECTED_TAB:
      return {
        ...state,
        name: action.payload.name,
      }

    case SELECTED_BUTTON:
      return {
        ...state,
        buttonName: action.payload.button,
      }

    case TOGGLE_SWICTH:
      return {
        ...state,
        enabled: action.payload.value,
        theme: action.payload.value ? Aubergine : Standard,
      }

    default:
      return state
  }
}
