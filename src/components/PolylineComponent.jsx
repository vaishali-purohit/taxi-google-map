/* eslint-disable camelcase */
import React from 'react'
import { Polyline } from 'react-google-maps'
import { connect } from 'react-redux'

class PolylineComponent extends React.Component {
  foundFilter = (location) => {
    const {
      idleDrivers,
      filterByGoneSilent,
      filterByCurrentlyWorking,
    } = this.props
    const found = idleDrivers.some((el) => el === location.journey_id)
    if (filterByGoneSilent && found) return true
    if (filterByCurrentlyWorking && !found) return true
    return false
  }

  handleRoute = (location) => {
    const {
      filterByLocation,
      filterByUniqueId,
      filterByCarriageLicense,
      dumpedIds,
    } = this.props

    if (filterByLocation || filterByUniqueId || filterByCarriageLicense) {
      const found = dumpedIds.some((el) => el === location.journey_id)
      return found
    }
    return this.foundFilter(location)
  }

  render() {
    const { journey_location, routes, change_state } = this.props

    return routes.map(
      (location) =>
        this.handleRoute(location) &&
        journey_location.map((data) => {
          const changeState = change_state.filter(
            (data1) =>
              data1.unique_id[0] === data.unique_id[0] &&
              data1.unique_id[1] === data.unique_id[1],
          )
          return location.journey_id === data.journey_id &&
            changeState[0].show ? (
            <Polyline
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...this.props}
              key={location.journey_id}
              geodesic
              path={location.directions}
              options={{
                strokeColor: '#708090',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          ) : (
            ''
          )
        }),
    )
  }
}

const mapStateToProps = (state) => ({
  journey_location: state.info.journey_location,
  routes: state.info.routes,
  change_state: state.info.change_state,
  filterByGoneSilent: state.pick.filterByGoneSilent,
  filterByCurrentlyWorking: state.pick.filterByCurrentlyWorking,
  idleDrivers: state.info.idleDrivers,
  filterByLocation: state.pick.filterByLocation,
  filterByUniqueId: state.pick.filterByUniqueId,
  filterByCarriageLicense: state.pick.filterByCarriageLicense,
  dumpedIds: state.info.dumpedIds,
})

export default connect(mapStateToProps, null)(PolylineComponent)
