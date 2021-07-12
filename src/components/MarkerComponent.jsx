/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { Marker } from 'react-google-maps'

import empty from '../lib/assets/Taxi Icon_Gray.svg'

import occupied from '../lib/assets/Taxi_Blue_dark.svg'
import passenger from '../lib/assets/Passenger_Green_dark.svg'
import destination from '../lib/assets/Destination_Red_dark.svg'

import occupiedLight from '../lib/assets/Taxi_Blue_light.svg'
import passengerLight from '../lib/assets/Passenger_Green_light.svg'
import destinationLight from '../lib/assets/Destination_Red_light.svg'

import parcelDark from '../lib/assets/parcel_dark.svg'
import parcelLight from '../lib/assets/parcel_light.svg'

import { popupwindow, dumpIds } from '../actions/info.actions'

import distanceMarker from '../util/distance'

const colorFillClass = {
  taxi_available: empty,
  taxi_occupied_dark: occupied,
  taxi_occupied_light: occupiedLight,
  passenger_dark: passenger,
  passenger_light: passengerLight,
  destination_dark: destination,
  destination_light: destinationLight,
  parcel_dark: parcelDark,
  parcel_light: parcelLight,
}

const iconModel = {
  anchor: [13, 13],
  scaledSize: [26, 26],
  url: '',
}

class MarkerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      journeyIds: [],
    }
  }

  onMarker = (location, index) => {
    const { props } = this

    return (
      <Marker
        key={location.journey_id + index}
        id={location.journey_id + index}
        title={location.type}
        position={{
          lat: parseFloat(location.position[0]),
          lng: parseFloat(location.position[1]),
        }}
        {...props}
        icon={{
          ...iconModel,
          ...{
            anchor: new window.google.maps.Point(...iconModel.anchor),
            scaledSize: new window.google.maps.Size(...iconModel.scaledSize),
            url: this.chooseMarkerIcon(location.type),
          },
        }}
        onClick={() => this.handleClick(location)}
      />
    )
  }

  chooseMarkerIcon = (locationType) => {
    const { enabled, type } = this.props

    if (type === 'Driver' && locationType === 'pickup')
      return colorFillClass.taxi_available
    if (type === 'Driver' && locationType === 'destination') {
      if (enabled) return colorFillClass.taxi_occupied_dark
      return colorFillClass.taxi_occupied_light
    }

    if (locationType === 'driver') {
      return colorFillClass.taxi_available
    }

    if (locationType === 'destination') {
      if (enabled) return colorFillClass.destination_dark
      return colorFillClass.destination_light
    }

    if (locationType === 'passenger') {
      if (enabled) return colorFillClass.passenger_dark
      return colorFillClass.passenger_light
    }

    if (locationType === 'parcel') {
      if (enabled) return colorFillClass.parcel_dark
      return colorFillClass.parcel_light
    }

    return colorFillClass.taxi_available
  }

  handleClick = (location) => {
    const { popupwindow } = this.props

    if (location.type === 'passenger') {
      return popupwindow(location.journey_id, true)
    }

    return ''
  }

  foundFilter = (location) => {
    const { idleDrivers, filterByGoneSilent, filterByCurrentlyWorking } =
      this.props
    const found = idleDrivers.some((el) => el === location.journey_id)

    if ((filterByGoneSilent && found) || (filterByCurrentlyWorking && !found)) {
      return true
    }

    return false
  }

  searchFilter = (location, type, journeyIds) => {
    const {
      filterByLocation,
      filterByUniqueId,
      filterByCarriageLicense,
      latitude,
      longitude,
      carriageLicenseId,
      uniqueId,
    } = this.props

    let locationIsFiltered = false
    let uniqueIdIsFiltered = false
    let carriageLicenseIsFiltered = false
    let found = journeyIds.some((el) => el === location.journey_id)

    if (type === 'Driver') {
      found = distanceMarker(
        { lat: location.position[0], lng: location.position[1] },
        { lat: latitude, lng: longitude },
        3,
      )
    }

    if (filterByLocation && found) {
      locationIsFiltered = true
    }

    if (filterByUniqueId && uniqueId === location.driver_id) {
      uniqueIdIsFiltered = true
    }

    if (
      filterByCarriageLicense &&
      carriageLicenseId === location.carriage_licence
    ) {
      carriageLicenseIsFiltered = true
    }

    if (filterByLocation && filterByUniqueId && filterByCarriageLicense) {
      return (
        locationIsFiltered && uniqueIdIsFiltered && carriageLicenseIsFiltered
      )
    }

    if (filterByLocation && filterByCarriageLicense) {
      return locationIsFiltered && carriageLicenseIsFiltered
    }

    if (filterByLocation && filterByUniqueId) {
      return locationIsFiltered && uniqueIdIsFiltered
    }

    if (filterByUniqueId && filterByCarriageLicense) {
      return uniqueIdIsFiltered && carriageLicenseIsFiltered
    }

    return locationIsFiltered || uniqueIdIsFiltered || carriageLicenseIsFiltered
  }

  renderDriverMarkers() {
    const {
      locations,
      filterByLocation,
      filterByUniqueId,
      filterByCarriageLicense,
      dumpedIds,
    } = this.props
    const { journeyIds } = this.state

    return (
      <span>
        {locations.map((location, index) => {
          if (filterByLocation || filterByUniqueId || filterByCarriageLicense) {
            const found = journeyIds.some((el) => el === location.journey_id)

            if (this.searchFilter(location, 'driver', journeyIds)) {
              if (!found) {
                this.setState({
                  journeyIds: [...journeyIds, location.journey_id],
                })
              }

              if (journeyIds.length !== dumpedIds.length) {
                dumpIds(journeyIds)
              }

              return this.onMarker(location, index)
            }

            if (found) {
              this.setState({
                journeyIds: journeyIds.filter((e) => e !== location.journey_id),
              })
            }

            if (journeyIds.length !== dumpedIds.length) {
              dumpIds(journeyIds)
            }

            return ''
          }

          if (this.foundFilter(location)) {
            return this.onMarker(location, index)
          }

          return ''
        })}
      </span>
    )
  }

  renderPassengerMarkers() {
    const {
      locations,
      change_state,
      filterByLocation,
      filterByUniqueId,
      filterByCarriageLicense,
      dumpedIds,
    } = this.props
    let show = false

    const markerArray = locations.map((location, index) => {
      if (location.name && location.name !== 'parcel') {
        const internalMarkers = []

        if (filterByLocation || filterByUniqueId || filterByCarriageLicense) {
          if (this.searchFilter(location, 'passenger', dumpedIds)) {
            show = true
          }
        } else if (this.foundFilter(location)) show = true

        if (show) {
          const changeState = change_state.filter(
            (data) =>
              data.unique_id[0] === location.unique_id[0] &&
              data.unique_id[1] === location.unique_id[1],
          )

          if (changeState[0].show) {
            if (!changeState[0].passenger_reached) {
              const data = {
                position: location.passenger_location,
                journey_id: location.journey_id,
                type: 'passenger',
              }

              internalMarkers.push(this.onMarker(data, index + 2))
            }

            if (!changeState[0].destination_reached) {
              const data = {
                position: location.destination_location,
                journey_id: location.journey_id,
                type: 'destination',
              }

              internalMarkers.push(this.onMarker(data, index + 3))
            }

            return internalMarkers
          }
        }

        return internalMarkers
      }
    })

    return markerArray
  }

  renderParcelMarkers() {
    const {
      locations,
      change_state,
      filterByLocation,
      filterByUniqueId,
      filterByCarriageLicense,
      dumpedIds,
    } = this.props
    let show = false

    const markerArray = locations.map((location, index) => {
      const internalMarkers = []

      if (location.name && location.name === 'parcel') {
        if (filterByLocation || filterByUniqueId || filterByCarriageLicense) {
          if (this.searchFilter(location, 'parcel', dumpedIds)) {
            show = true
          }
        } else if (this.foundFilter(location)) show = true

        if (show) {
          const changeState = change_state.filter(
            (data) =>
              data.unique_id[0] === location.unique_id[0] &&
              data.unique_id[1] === location.unique_id[1],
          )

          if (changeState[0].show) {
            if (!changeState[0].passenger_reached) {
              const data = {
                position: location.passenger_location,
                journey_id: location.journey_id,
                type: 'parcel',
              }

              internalMarkers.push(this.onMarker(data, index + 2))
            }

            return internalMarkers
          }
        }
      }

      return internalMarkers
    })

    return markerArray
  }

  render() {
    const { type } = this.props

    if (type === 'Driver') {
      return this.renderDriverMarkers()
    }

    if (type === 'Passenger') {
      return this.renderPassengerMarkers()
    }

    if (type === 'Parcel') {
      return this.renderParcelMarkers()
    }

    return null
  }
}

const mapStateToProps = (state) => ({
  enabled: state.drawer.enabled,
  change_state: state.info.change_state,

  filterByUniqueId: state.pick.filterByUniqueId,
  filterByLocation: state.pick.filterByLocation,
  filterByCarriageLicense: state.pick.filterByCarriageLicense,
  filterByGoneSilent: state.pick.filterByGoneSilent,
  filterByCurrentlyWorking: state.pick.filterByCurrentlyWorking,

  latitude: state.pick.lat,
  longitude: state.pick.lng,
  uniqueId: state.pick.uniqueId,
  carriageLicenseId: state.pick.carriageLicenseId,
  idleDrivers: state.info.idleDrivers,
  dumpedIds: state.info.dumpedIds,
})

const mapDispatchToProps = {
  popupwindow,
  dumpIds,
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerComponent)
