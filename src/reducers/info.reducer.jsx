/* eslint-disable no-nested-ternary */
import {
  INFO_VALUE,
  LOCATION_VALUE,
  DRIVER_INFO,
  PASSENGER_INFO,
  DECLINED_PROPOSAL,
  ACCEPT_PROPOSAL,
  PASSENGER_REACHED,
  JOURNEY_END,
  POPUP_WINDOW,
  ROUTE_PATH,
  MOVING_ROUTE,
  DUMP_ID,
} from '../actions/info.actions'

const initialState = {
  value: [],
  driver_location: [
    {
      position: [],
      driver_id: 0,
      passenger_id: 0,
      type: '',
      journey_id: 0,
      next_position: [],
      carriage_license: '',
    },
  ],
  journey_location: [
    {
      driver_id: 0,
      passenger_id: 0,
      journey_id: 0,
      driver_location: [],
      passenger_location: [],
      destination_location: [],
      name: null,
      unique_id: [],
      carriage_license: '',
    },
  ],
  change_state: [
    {
      show: false,
      passenger_reached: false,
      destination_reached: false,
      unique_id: [],
    },
  ],
  modalshow: false,
  activemarker: {},
  routes: [
    {
      journey_id: 0,
      directions: [],
    },
  ],
  idleDrivers: [],
  dumpedIds: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INFO_VALUE:
      if (action.payload.value.stage === 'searching') {
        const found = state.value.some(
          (el) => el.id === action.payload.value.id,
        )
        if (found)
          return {
            ...state,
          }
      }
      return {
        ...state,
        value: [...state.value, action.payload.value],
      }

    case LOCATION_VALUE: {
      const found = state.driver_location.some(
        (el) =>
          el.journey_id === action.payload.journey_id ||
          el.driver_id === action.payload.driver_id,
      )

      if (!found)
        return {
          ...state,
          driver_location: [
            ...state.driver_location,
            {
              position: action.payload.position,
              driver_id: action.payload.driver_id,
              passenger_id: action.payload.passenger_id,
              type: action.payload.type,
              journey_id: action.payload.journey_id,
              next_position: action.payload.next_position,
            },
          ],
          idleDrivers: state.idleDrivers.reduce((valid, data) => {
            if (!(data === action.payload.journey_id)) valid.push(data)
            return valid
          }, []),
        }

      return {
        ...state,
        driver_location: state.driver_location.map((data) =>
          data.journey_id === action.payload.journey_id
            ? {
                position: action.payload.position,
                driver_id: action.payload.driver_id,
                passenger_id: action.payload.passenger_id,
                type: action.payload.type,
                journey_id: action.payload.journey_id,
                next_position: action.payload.next_position,
              }
            : data.driver_id === action.payload.driver_id
            ? {
                position: action.payload.position,
                passenger_id: action.payload.passenger_id,
                type: action.payload.type,
                journey_id: action.payload.journey_id,
                next_position: action.payload.next_position,
              }
            : data,
        ),
        idleDrivers: state.idleDrivers.reduce((valid, data) => {
          if (!(data === action.payload.journey_id)) valid.push(data)
          return valid
        }, []),
      }
    }

    case DRIVER_INFO: {
      const found = state.journey_location.some(
        (el) =>
          el.unique_id[0] === action.payload.unique_id[0] &&
          el.unique_id[1] === action.payload.unique_id[1],
      )
      if (!found)
        return {
          ...state,
          journey_location: [
            ...state.journey_location,
            {
              driver_id: 0,
              driver_location: action.payload.position,
              passenger_id: action.payload.id,
              journey_id: 0,
              passenger_location: [],
              destination_location: [],
              name: null,
              unique_id: action.payload.unique_id,
            },
          ],
          change_state: [
            ...state.change_state,
            {
              show: false,
              passenger_reached: false,
              destination_reached: false,
              unique_id: action.payload.unique_id,
            },
          ],
        }

      return {
        ...state,
        journey_location: state.journey_location.map((data, index) =>
          data.driver_id === action.payload.driver_id
            ? {
                ...state.journey_location[index],
                passenger_id: action.payload.id,
                driver_location: action.payload.position,
                unique_id: action.payload.unique_id,
              }
            : data,
        ),
        change_state: state.change_state.map((data, index) =>
          data.unique_id[0] === action.payload.unique_id[0] &&
          data.unique_id[1] === action.payload.unique_id[1]
            ? {
                ...state.change_state[index],
                unique_id: action.payload.unique_id,
              }
            : data,
        ),
      }
    }

    case PASSENGER_INFO: {
      return {
        ...state,
        journey_location: state.journey_location.map((data, index) =>
          data.unique_id[0] === action.payload.unique_id[0] &&
          data.unique_id[1] === action.payload.unique_id[1]
            ? {
                ...state.journey_location[index],
                driver_id: action.payload.id,
                destination_location: action.payload.destination_location[0],
                passenger_location: action.payload.passenger_location[0],
                journey_id: action.payload.journey_id,
                name: action.payload.name,
              }
            : data,
        ),
        idleDrivers: [...state.idleDrivers, action.payload.journey_id],
      }
    }

    case DECLINED_PROPOSAL: {
      return {
        ...state,
        journey_location: state.journey_location.reduce((valid, data) => {
          if (
            !(
              data.unique_id[0] === action.payload.unique_id[0] &&
              data.unique_id[1] === action.payload.unique_id[1]
            )
          )
            valid.push(data)
          return valid
        }, []),
        change_state: state.change_state.reduce((valid, data) => {
          if (
            !(
              data.unique_id[0] === action.payload.unique_id[0] &&
              data.unique_id[1] === action.payload.unique_id[1]
            )
          )
            valid.push(data)
          return valid
        }, []),
      }
    }

    case ACCEPT_PROPOSAL: {
      return {
        ...state,
        change_state: state.change_state.map((data, index) =>
          data.unique_id[0] === action.payload.unique_id[0] &&
          data.unique_id[1] === action.payload.unique_id[1]
            ? {
                ...state.change_state[index],
                show: true,
              }
            : data,
        ),
      }
    }

    case PASSENGER_REACHED: {
      return {
        ...state,
        change_state: state.change_state.map((data, index) =>
          data.unique_id[0] === action.payload.unique_id[0] &&
          data.unique_id[1] === action.payload.unique_id[1]
            ? {
                ...state.change_state[index],
                passenger_reached: true,
              }
            : data,
        ),
      }
    }

    case JOURNEY_END: {
      return {
        ...state,
        journey_location: state.journey_location.filter(
          (data) => data.journey_id !== action.payload.journey_id,
        ),
        driver_location: state.driver_location.map((data, index) =>
          data.journey_id === action.payload.journey_id
            ? {
                ...state.driver_location[index],
                passenger_id: 0,
                journey_id: 0,
                next_position: [],
                carriage_license: '',
                type: 'pickup',
              }
            : data,
        ),
        routes: state.routes.filter(
          (data) => data.journey_id !== action.payload.journey_id,
        ),
        change_state: state.change_state.reduce((valid, data) => {
          if (
            !(
              data.unique_id[0] === action.payload.unique_id[0] &&
              data.unique_id[1] === action.payload.unique_id[1]
            )
          )
            valid.push(data)
          return valid
        }, []),
      }
    }

    case POPUP_WINDOW: {
      const data = state.journey_location.filter(
        (data) => data.journey_id === action.payload.journey_id,
      )

      return {
        ...state,
        modalshow: action.payload.modalshow,
        activemarker: data[0],
      }
    }

    case ROUTE_PATH: {
      const positions = []

      action.payload.directions.map((data) =>
        data.map((value) => positions.push({ lat: value[0], lng: value[1] })),
      )

      return {
        ...state,
        routes: [
          ...state.routes,
          {
            journey_id: action.payload.journey_id,
            directions: positions,
          },
        ],
      }
    }

    case MOVING_ROUTE:
      return {
        ...state,
        routes: state.routes.map((data) => {
          if (data.journey_id === action.payload.journey_id) {
            const val = data.directions.reduce((route, pos) => {
              if (
                !(
                  pos.lat === action.payload.position[0] &&
                  pos.lng === action.payload.position[1]
                )
              )
                route.push(pos)
              return route
            }, [])
            return { ...data, directions: val }
          }
          return data
        }),
      }

    case DUMP_ID:
      return {
        ...state,
        dumpedIds: action.payload.ids,
      }

    default:
      return state
  }
}
