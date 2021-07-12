import {
  SPAWN_PASSENGER,
  ENTITIES_GOT,
  GET_FAILED,
  API_START,
  API_END,
  PASSENGER_CREATED,
  CREATE_FAILED,
  SHOW_INFO,
  TOGGLE_INFO,
  SHOW_ROUTE,
} from '../actions/types'

const initialState = {
  drivers: [],
  passengers: [],
  contracts: [],
  creating: {},
  isPostingPassenger: false,
  step: 0,
  error: false,
  getFailed: false,
  highlighted: null,
  route: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SPAWN_PASSENGER:
      return {
        ...state,
        step: 1,
        creating: action.payload,
      }
    case API_START:
      if (action.payload === SPAWN_PASSENGER) {
        return {
          ...state,
          isPostingPassenger: true,
        }
      }
      return state

    case API_END:
      if (action.payload === SPAWN_PASSENGER) {
        return {
          ...state,
          isPostingPassenger: false,
        }
      }
      return state

    case PASSENGER_CREATED:
      return {
        ...state,
        passengers: [...state.passengers, action.payload],
        step: 0,
        creating: {},
        error: false,
      }
    case CREATE_FAILED:
      return {
        ...state,
        step: 0,
        creating: {},
        error: action.payload,
      }
    case ENTITIES_GOT:
      return {
        ...state,
        passengers: action.payload.passengers,
        drivers: action.payload.drivers,
        contracts: action.payload.contracts,
      }
    case GET_FAILED:
      return {
        ...state,
        error: 'Failed to retrieve entities. Please refresh the page',
        getFailed: true,
      }
    case SHOW_INFO:
      return {
        ...state,
        highlighted: action.payload.key,
        route: null,
      }
    case SHOW_ROUTE:
      return {
        ...state,
        route: action.payload,
      }
    case TOGGLE_INFO:
      return {
        ...state,
        highlighted: null,
        route: null,
      }
    default:
      return state
  }
}
