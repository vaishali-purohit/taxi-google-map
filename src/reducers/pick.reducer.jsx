import {
  PICK_CORDS_SUCCESS,
  CORDS_VALUE,
  DROPDOWN_FILTER_SEARCH,
  DROPDOWN_FILTER_CLASS,
  LICENSE_ID,
} from '../actions/pick.actions'

const initialState = {
  checked: false,
  lat: 0,
  lng: 0,
  filterByUniqueId: false,
  filterByLocation: false,
  filterByCarriageLicense: false,
  filterByGoneSilent: true,
  filterByCurrentlyWorking: true,
  uniqueId: '',
  carriageLicenseId: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PICK_CORDS_SUCCESS:
      return {
        ...state,
        checked: action.payload.checked,
      }

    case CORDS_VALUE:
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
      }

    case DROPDOWN_FILTER_SEARCH:
      return {
        ...state,
        filterByUniqueId: action.payload.filterByUniqueId,
        filterByLocation: action.payload.filterByLocation,
        filterByCarriageLicense: action.payload.filterByCarriageLicense,
        uniqueId: action.payload.filterByUniqueId ? state.uniqueId : '',
        carriageLicenseId: action.payload.filterByLocation
          ? state.carriageLicenseId
          : '',
      }

    case DROPDOWN_FILTER_CLASS:
      return {
        ...state,
        filterByGoneSilent: action.payload.filterByGoneSilent,
        filterByCurrentlyWorking: action.payload.filterByCurrentlyWorking,
      }

    case LICENSE_ID:
      return {
        ...state,
        uniqueId: action.payload.uniqueId,
        carriageLicenseId: action.payload.carriageLicenseId,
      }

    default:
      return state
  }
}
