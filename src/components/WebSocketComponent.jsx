/* eslint-disable camelcase */
import React from 'react'
import { connect } from 'react-redux'
import MarkerComponent from './MarkerComponent'
import {
  infoValue,
  locationValue,
  driverInfo,
  passengerInfo,
  declinedProposal,
  acceptProposal,
  passengerReached,
  journeyEnd,
  routePath,
  movingRoute,
} from '../actions/info.actions'

class WebSocketComponent extends React.Component {
  componentDidMount() {
    this.ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)

    this.ws.onmessage = (e) => {
      const value = JSON.parse(e.data)
      this.setData(value)
    }

    this.ws.onerror = (e) => {
      console.log('On Error', e)
    }
  }

  setData = (value) => {
    const {
      infoValue,
      locationValue,
      driverInfo,
      passengerInfo,
      declinedProposal,
      acceptProposal,
      passengerReached,
      journeyEnd,
      routePath,
      movingRoute,
    } = this.props

    if (value.stage === 'Location') {
      locationValue(
        value.data.current_position,
        value.id,
        value.data.address,
        value.data.type,
        value.data.journey_id,
        value.data.next_pos,
      )
      movingRoute(value.data.current_position, value.data.journey_id)
    } else infoValue(value)

    if (value.stage === 'Request Received') {
      driverInfo(
        [value.data.lat, value.data.lon],
        value.id,
        value.dialogue_reference,
      )
    } else if (value.stage === 'Proposal Received') {
      driverInfo([value.lat, value.lon], value.id, value.dialogue_reference)
    } else if (
      value.stage === 'Response Received' ||
      value.stage === 'Sending Proposal'
    ) {
      passengerInfo(
        [value.data.pickup],
        [value.data.dropoff],
        value.journey_id,
        value.id,
        value.data.name,
        value.dialogue_reference,
      )
    } else if (value.stage === 'Declined') {
      declinedProposal(value.dialogue_reference)
    } else if (value.stage === 'Accept Received') {
      acceptProposal(value.dialogue_reference)
    } else if (value.stage === 'Handshake sent') {
      passengerReached(value.dialogue_reference)
    } else if (
      value.stage === 'Journey end' ||
      value.stage === 'Journey complete'
    ) {
      journeyEnd(value.data.journey_id, value.dialogue_reference)
    } else if (value.stage === 'Polyline') {
      routePath(value.data.journey_id, value.directions)
    }
  }

  render() {
    const { driver_location } = this.props
    return (
      <MarkerComponent
        {...this.props}
        locations={driver_location}
        type='Driver'
      />
    )
  }
}

const mapStateToProps = (state) => ({
  driver_location: state.info.driver_location,
})

const mapDispatchToProps = {
  infoValue,
  locationValue,
  driverInfo,
  passengerInfo,
  declinedProposal,
  acceptProposal,
  passengerReached,
  journeyEnd,
  routePath,
  movingRoute,
}

export default connect(mapStateToProps, mapDispatchToProps)(WebSocketComponent)
