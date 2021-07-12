/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { connect } from 'react-redux'
import { CaretDownFill } from 'react-bootstrap-icons'

class DialogueBox extends React.Component {
  dialogue = (data, index) => {
    const { enabled } = this.props

    if (data.stage === 'searching')
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            Passenger:
          </p>
          <div className='status-info'>
            <p>Status: {data.stage || '????'}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (
      data.stage === 'Sending Proposal' ||
      (data.stage === 'Response Received' && data.data)
    )
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            {data.stage}:
          </p>
          <div className='status-info'>
            <p>
              Drop-off Location:{data.data.dropoff[0] || 0},
              {data.data.dropoff[1] || 0}
            </p>
            <p>Name:{data.data.name || '????'}</p>
            <p>Passengers:{data.data.passengers || '????'}</p>
            <p>
              Pick-up Location:{data.data.pickup[0] || 0},
              {data.data.pickup[1] || 0}
            </p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'Proposal Received' && data.data)
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            Data Received:
          </p>
          <div className='status-info'>
            <p>Price: {data.data.price || '????'}</p>
            <p>Currency: {data.data.currency_id || '????'}</p>
            <p>Pick up time: {data.data.pickup_time || '????'}</p>
            <p>Journey time: {data.data.journey_time || '????'}</p>
          </div>
        </div>
      )

    if (data.stage === 'Request Received' && data.data)
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            Data Received:
          </p>{' '}
          <div className='status-info'>
            <p>Carriage license: ????</p>
            <p>Country: {data.data.country || '????'}</p>
            <p>City: {data.data.city || '????'}</p>
            <p>
              Current Position: {data.data.lat || 0},{data.data.lon || 0}
            </p>

            <p>Status: {data.data.available ? 'Available' : 'Not Available'}</p>

            <p>vehicle: {data.data.vehicle || '????'}</p>
            <p>Maximum passenger count: {data.data.passenger_count || 0}</p>
          </div>
        </div>
      )

    if (data.stage === 'Declined')
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            {data.stage}:
          </p>{' '}
          <div className='status-info'>
            <p>
              Status: {data.stage || '????'}
              {data.counterparty && ` From ${data.counterparty}`}
            </p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'Accept Received' && data.data)
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            Accept:
          </p>{' '}
          <div className='status-info'>
            <p>
              Status: {data.stage || '????'}
              {data.counterparty && ` From ${data.counterparty}`}
            </p>
            <p>Pick up time: {data.data.pickup_time}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'Deploying Contract')
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            {data.stage}:
          </p>{' '}
          <div className='status-info'>
            <p>
              Status: {data.stage || '????'}
              {data.counterparty && ` From ${data.counterparty}`}
            </p>
            <p>Address:{data.data.address || '????'}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'deploying contract')
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            {data.stage}:
          </p>{' '}
          <div className='status-info'>
            <p>Tx id:{data.tx_digest || '????'}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'Match Accept Received')
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            {data.stage}:
          </p>{' '}
          <div className='status-info'>
            <p>Address:{data.data.address || '????'}</p>
            <p>Amount:{data.data.amount || '????'}</p>
            <p>Journey id:{data.data.journey_id || '????'}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'Sent funds to contract')
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            {data.stage}:
          </p>{' '}
          <div className='status-info'>
            <p>Contract Address:{data.contract_address || '????'}</p>
            <p>Address:{data.data.address || '????'}</p>
            <p>Amount:{data.data.amount || '????'}</p>
            <p>Journey id:{data.data.journey_id || '????'}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'Journey complete' && data.data)
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            {data.stage}:
          </p>{' '}
          <div className='status-info'>
            <p>Journey ID: {data.data.journey_id || '????'}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'Journey end' && data.data)
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            {data.stage}:
          </p>{' '}
          <div className='status-info'>
            <p>Journey ID: {data.data.journey_id || '????'}</p>
            <p>Handshake: {data.data.handshake || '????'}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'Driver requests funds to be released')
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            {data.stage}:
          </p>{' '}
          <div className='status-info'>
            <p>
              Status: {data.stage || '????'}
              {data.counterparty && ` From ${data.counterparty}`}
            </p>
            <p>Handshake:{data.data.handshake || '????'}</p>
            <p>Journey id:{data.data.journey_id || '????'}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    if (data.stage === 'Release Funds Received')
      return (
        <div key={index}>
          <p>
            <CaretDownFill />
            Data:
          </p>{' '}
          <div className='status-info'>
            <p>Address:{data.data.address || '????'}</p>
            <p>Message:{data.data.message || '????'}</p>
            <p style={{ color: enabled ? 'teal' : '#5887da' }}>
              ID:{data.id || '????'}
            </p>
          </div>
        </div>
      )

    return ''
  }

  render() {
    const { info, enabled } = this.props

    if (info.length)
      return (
        <div className='scrollbar'>
          {info.map((location, index) => this.dialogue(location, index))}
        </div>
      )
    return (
      <h5
        style={{
          color: enabled ? 'darkgray' : 'grey',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        No Communication
      </h5>
    )
  }
}

const mapStateToProps = (state) => ({
  enabled: state.drawer.enabled,
  info: state.info.value,
})

export default connect(mapStateToProps, null)(DialogueBox)
