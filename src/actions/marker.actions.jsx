export const CENTER_MAP_SUCCESS = 'actions/marker/CENTER_MAP_SUCCESS'

export const mapcenter = (lat, lng) => ({
  type: CENTER_MAP_SUCCESS,
  payload: { lat, lng },
})
