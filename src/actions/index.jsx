import {
  TOGGLE_HELP,
  TOGGLE_INFO,
  SPAWN_PASSENGER,
  PASSENGER_CREATED,
  CREATE_FAILED,
  GET_ENTITIES,
  ENTITIES_GOT,
  GET_FAILED,
  API,
  SHOW_INFO,
  SHOW_ROUTE,
  TOGGLE_ROUTES,
} from './types'
import { API_URL } from '../constants'

const passengerCreated = (json) => ({
  type: PASSENGER_CREATED,
  payload: json,
})

const createFailed = (error) => ({
  type: CREATE_FAILED,
  payload: error,
})

const entitiesGot = (entities) => ({
  type: ENTITIES_GOT,
  payload: entities,
})

const getFailed = (error) => ({
  type: GET_FAILED,
  payload: error,
})

export const toggleHelp = () => ({
  type: TOGGLE_HELP,
  payload: {},
})

export const toggleInfo = () => ({
  type: TOGGLE_INFO,
  payload: {},
})

export function showInfo() {
  return {
    type: SHOW_INFO,
    payload: this,
  }
}

export function showRoute() {
  return {
    type: SHOW_ROUTE,
    payload: this.route,
  }
}

export const toggleRoutes = () => ({
  type: TOGGLE_ROUTES,
  payload: {},
})

export function setLocation(position) {
  return {
    type: SPAWN_PASSENGER,
    payload: { position },
  }
}

function apiAction({
  url = '',
  method = 'GET',
  data = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = '',
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label,
    },
  }
}

export function setDestination(data) {
  return apiAction({
    url: API_URL,
    method: 'POST',
    data,
    onSuccess: passengerCreated,
    onFailure: createFailed,
    label: SPAWN_PASSENGER,
  })
}

export function getEntities() {
  return apiAction({
    url: API_URL,
    method: 'GET',
    onSuccess: entitiesGot,
    onFailure: getFailed,
    label: GET_ENTITIES,
  })
}
