/* eslint-disable camelcase */
export const INFO_VALUE = 'actions/info/INFO_VALUE'
export const LOCATION_VALUE = 'actions/info/LOCATION_VALUE'
export const DRIVER_INFO = 'actions/info/DRIVER_INFO'
export const PASSENGER_INFO = 'actions/info/PASSENGER_INFO'
export const DECLINED_PROPOSAL = 'actions/info/DECLINED_PROPOSAL'
export const ACCEPT_PROPOSAL = 'actions/info/ACCEPT_PROPOSAL'
export const DRIVER_MOVE = 'actions/info/DRIVER_MOVE'
export const PASSENGER_REACHED = 'actions/info/PASSENGER_REACHED'
export const JOURNEY_END = 'actions/info/JOURNEY_END'
export const POPUP_WINDOW = 'actions/info/POPUP_WINDOW'
export const ROUTE_PATH = 'actions/info/ROUTE_PATH'
export const MOVING_ROUTE = 'actions/info/MOVING_ROUTE'
export const DUMP_ID = 'actions/info/DUMP_ID'

export const infoValue = (value) => ({
  type: INFO_VALUE,
  payload: { value },
})

export const locationValue = (
  position,
  driver_id,
  passenger_id,
  type,
  journey_id,
  next_position,
) => ({
  type: LOCATION_VALUE,
  payload: {
    position,
    driver_id,
    passenger_id,
    type,
    journey_id,
    next_position,
  },
})

export const driverInfo = (position, id, unique_id) => ({
  type: DRIVER_INFO,
  payload: { position, id, unique_id },
})

export const passengerInfo = (
  passenger_location,
  destination_location,
  journey_id,
  id,
  name,
  unique_id,
) => ({
  type: PASSENGER_INFO,
  payload: {
    passenger_location,
    destination_location,
    journey_id,
    id,
    name,
    unique_id,
  },
})

export const declinedProposal = (unique_id) => ({
  type: DECLINED_PROPOSAL,
  payload: { unique_id },
})

export const acceptProposal = (unique_id) => ({
  type: ACCEPT_PROPOSAL,
  payload: { unique_id },
})

export const driverMove = (unique_id) => ({
  type: DRIVER_MOVE,
  payload: { unique_id },
})

export const passengerReached = (unique_id) => ({
  type: PASSENGER_REACHED,
  payload: { unique_id },
})

export const journeyEnd = (journey_id, unique_id) => ({
  type: JOURNEY_END,
  payload: { journey_id, unique_id },
})

export const popupwindow = (journey_id, modalshow) => ({
  type: POPUP_WINDOW,
  payload: { journey_id, modalshow },
})

export const routePath = (journey_id, directions) => ({
  type: ROUTE_PATH,
  payload: { journey_id, directions },
})

export const movingRoute = (position, journey_id) => ({
  type: MOVING_ROUTE,
  payload: { position, journey_id },
})

export const dumpIds = (ids) => ({
  type: DUMP_ID,
  payload: {
    ids,
  },
})
