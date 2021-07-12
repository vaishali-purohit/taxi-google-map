/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { connect } from 'react-redux'
import FormComponent from './FormComponent'

import taxiWhite from '../lib/assets/Taxi Icon_White.svg'
import passenger from '../lib/assets/Passenger Icon_White.svg'
import fuel from '../lib/assets/Fuel Icon.svg'

import taxiBlue from '../lib/assets/Taxi_white_light.svg'
import passengerBlue from '../lib/assets/Passenger_white_light.svg'
import fuelBlue from '../lib/assets/Fuel_white_light.svg'

import destination from '../lib/assets/Destination Icon_white.svg'
import destinationBlue from '../lib/assets/Destination Icon_Blue.svg'

import TableComponent from './TableComponent'
import { selectedTab } from '../actions/drawer.actions'

class LeftDrawer extends React.Component {
  handleClick = (value) => {
    const { selectedTab } = this.props
    selectedTab(value)
  }

  render() {
    const { enabled, name } = this.props

    const taxiType = [
      {
        key: 'Vehicle Type',
        icon: enabled ? taxiWhite : taxiBlue,
        values: ['Luxury', 'Mini van', 'Standard', 'Shared'],
        type: 'taxi',
      },
      {
        key: 'Fuel Type',
        icon: enabled ? fuel : fuelBlue,
        values: ['Petrol', 'Diesel', 'Electric'],
        type: 'taxi',
      },
      {
        key: 'Max Passengers',
        icon: enabled ? passenger : passengerBlue,
        values: [7, 8, 9],
        type: 'taxi',
      },
    ]

    const tripType = [
      {
        key: 'Destination',
        icon: enabled ? destination : destinationBlue,
        values: [1, 2, 3],
        type: 'trip',
      },
      {
        key: 'Vehicle Type',
        icon: enabled ? taxiWhite : taxiBlue,
        values: ['Luxury', 'Mini van', 'Standard', 'Shared'],
        type: 'trip',
      },
      {
        key: 'Max Passengers',
        icon: enabled ? passenger : passengerBlue,
        values: [7, 8, 9],
        type: 'trip',
      },
    ]

    const tableHeadings = [
      {
        key: 'taxi_number',
        label: 'Number',
        type: 'taxi',
      },
      {
        key: 'car_type',
        label: 'Car type',
        type: 'taxi',
      },
    ]

    return (
      <div className='search-content'>
        <div className='heading'>
          <span
            onClick={() => this.handleClick('service')}
            className={(name === 'service' && 'selected').toString()}
          >
            Service Provider
          </span>
          |
          <span
            onClick={() => this.handleClick('passenger')}
            className={(name === 'passenger' && 'selected').toString()}
          >
            Passenger
          </span>
        </div>
        <div>
          {name === 'passenger' ? (
            <div className='form-value trip'>
              <FormComponent
                heading='Create Trip'
                values={tripType}
                type='trip'
              />
            </div>
          ) : (
            <div className='form-value'>
              <FormComponent
                heading='Create Taxi'
                values={taxiType}
                type='taxi'
              />
              <TableComponent
                head='Taxi Fleet'
                headings={tableHeadings}
                type='taxi'
                rowData={[]}
                emptyText="No Taxi's to show"
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapstateToProps = (state) => ({
  name: state.drawer.name,
  enabled: state.drawer.enabled,
})

const mapDispatchToProps = {
  selectedTab,
}

export default connect(mapstateToProps, mapDispatchToProps)(LeftDrawer)
