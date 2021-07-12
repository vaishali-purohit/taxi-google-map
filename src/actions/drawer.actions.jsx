export const DRAWER_VALUE = 'actions/drawers/DRAWER_VALUE'
export const SELECTED_TAB = 'actions/drawers/SELECTED_TAB'
export const SELECTED_BUTTON = 'actions/drawers/SELECTED_BUTTON'
export const TOGGLE_SWICTH = 'actions/drawers/TOGGLE_SWICTH'

export const drawers = (open, position, noOverlay, selectedTab) => ({
  type: DRAWER_VALUE,
  payload: { open, position, noOverlay, selectedTab },
})

export const selectedTab = (name) => ({
  type: SELECTED_TAB,
  payload: { name },
})

export const selectedButton = (button) => ({
  type: SELECTED_BUTTON,
  payload: { button },
})

export const toggleSwitch = (value) => ({
  type: TOGGLE_SWICTH,
  payload: { value },
})
