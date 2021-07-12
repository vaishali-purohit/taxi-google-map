import React from 'react'
import { connect } from 'react-redux'

import empty from '../lib/assets/Taxi Icon_Gray.svg'

import occupied from '../lib/assets/Taxi_Blue_dark.svg'
import passenger from '../lib/assets/Passenger_Green_dark.svg'
import destination from '../lib/assets/Destination_Red_dark.svg'

import occupiedLight from '../lib/assets/Taxi_Blue_light.svg'
import passengerLight from '../lib/assets/Passenger_Green_light.svg'
import destinationLight from '../lib/assets/Destination_Red_light.svg'

import parcelDark from '../lib/assets/parcel_dark.svg'
import parcelLight from '../lib/assets/parcel_light.svg'

class MarkerList extends React.Component {
  render() {
    const { name, enabled } = this.props

    return (
      <div className='info-content'>
        <span>Legend</span>
        <div className='info'>
          <div className='taxiInfo'>
            <div>
              <img
                src={
                  name === 'service'
                    ? enabled
                      ? occupied
                      : occupiedLight
                    : enabled
                    ? destination
                    : destinationLight
                }
                alt=''
                height={name !== 'service' ? 30 : 'auto'}
              />
            </div>
            <div>
              <span>
                {name === 'service' ? 'Occupied Taxi' : 'Destination'}
              </span>
            </div>
          </div>
          <div className='taxiInfo'>
            <div>
              <img src={empty} alt='' />
            </div>
            <div>
              <span>
                {name === 'service' ? 'Empty Taxi' : 'Available Taxi'}
              </span>
            </div>
          </div>
          <div className='taxiInfo'>
            <div>
              <img src={enabled ? passenger : passengerLight} alt='' />
            </div>
            <div>
              <span>Passengers</span>
            </div>
          </div>
          <div className='taxiInfo'>
            <div>
              <img src={enabled ? parcelDark : parcelLight} alt='' />
            </div>
            <div>
              <span>Parcels</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.drawer.name,
  enabled: state.drawer.enabled,
})

export default connect(mapStateToProps, null)(MarkerList)
