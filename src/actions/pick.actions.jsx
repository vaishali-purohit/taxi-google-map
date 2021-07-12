export const PICK_CORDS_SUCCESS = 'actions/pick/PICK_CORDS_SUCCESS'
export const CORDS_VALUE = 'action/pick/CORDS_VALUE'
export const DROPDOWN_FILTER_SEARCH = 'action/pick/DROPDOWN_FILTER_SEARCH'
export const DROPDOWN_FILTER_CLASS = 'action/pick/DROPDOWN_FILTER_CLASS'
export const LICENSE_ID = 'action/pick/LICENSE_ID'

export const pick = (checked) => ({
  type: PICK_CORDS_SUCCESS,
  payload: { checked },
})

export const cords = (lat, lng) => ({
  type: CORDS_VALUE,
  payload: { lat, lng },
})

export const filterSearch = (
  filterByLocation,
  filterByUniqueId,
  filterByCarriageLicense,
) => ({
  type: DROPDOWN_FILTER_SEARCH,
  payload: {
    filterByUniqueId,
    filterByLocation,
    filterByCarriageLicense,
  },
})

export const filterClass = (filterByGoneSilent, filterByCurrentlyWorking) => ({
  type: DROPDOWN_FILTER_CLASS,
  payload: {
    filterByGoneSilent,
    filterByCurrentlyWorking,
  },
})

export const licenseID = (uniqueId, carriageLicenseId) => ({
  type: LICENSE_ID,
  payload: {
    uniqueId,
    carriageLicenseId,
  },
})
