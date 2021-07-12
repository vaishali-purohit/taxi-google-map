import { CENTER_MAP_SUCCESS } from '../actions/marker.actions'

const initialState = {
  lat: 37.774929,
  lng: -122.419416,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CENTER_MAP_SUCCESS:
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
      }

    default:
      return state
  }
}
