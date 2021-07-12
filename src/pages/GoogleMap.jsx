import React from 'react'
import { connect } from 'react-redux'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
} from 'react-google-maps'
import { compose, withProps } from 'recompose'
import MarkerComponent from '../components/MarkerComponent'
import Standard from '../lib/styles/standard.json'
import PopupComponent from '../components/PopupComponent'
import PolylineComponent from '../components/PolylineComponent'
import WebSocketComponent from '../components/WebSocketComponent'
import { cords } from '../actions/pick.actions'
import { mapcenter } from '../actions/marker.actions'

class GoogleMapPage extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      newTheme: Standard,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { newTheme } = this.state

    if (nextProps.theme !== newTheme) {
      this.setState({ newTheme: nextProps.theme }, () =>
        this.mapRef.forceUpdate(),
      )
    }
  }

  handleCords = (lat, lng) => {
    const { cords } = this.props

    cords(lat, lng)
  }

  handle = () => {
    const { mapcenter } = this.props
    mapcenter(
      this.mapRef.getCenter().toJSON().lat,
      this.mapRef.getCenter().toJSON().lng,
    )
  }

  render() {
    const {
      getFailed,
      google,
      journey_location,
      checked,
      latitude,
      longitude,
      lat,
      long,
    } = this.props
    const { newTheme } = this.state

    if (getFailed) {
      clearInterval(this.interval)
    }

    return (
      <GoogleMap
        ref={(ref) => (this.mapRef = ref)}
        className='map'
        google={google}
        defaultZoom={12}
        defaultCenter={{ lat: latitude, lng: longitude }}
        center={{ lat: latitude, lng: longitude }}
        options={{
          styles: newTheme,
          zoomControlOptions: { position: 9 },
          streetViewControl: false,
          mapTypeControl: false,
        }}
        onClick={(event) =>
          checked && this.handleCords(event.latLng.lat(), event.latLng.lng())
        }
        onDragEnd={this.handle}
      >
        <MarkerComponent locations={journey_location} type='Passenger' />
        <MarkerComponent locations={journey_location} type='Parcel' />
        <WebSocketComponent />
        <PopupComponent />
        <PolylineComponent />
        {checked && (
          <Circle
            center={{
              lat: parseFloat(lat),
              lng: parseFloat(long),
            }}
            radius={3000}
            options={{
              strokeColor: '#ff0000',
              strokeOpacity: 0.3,
              fillColor: '#ff0000',
            }}
          />
        )}
      </GoogleMap>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.map,
  theme: state.drawer.theme,
  journey_location: state.info.journey_location,
  checked: state.pick.checked,
  latitude: state.marker.lat,
  longitude: state.marker.lng,
  lat: state.pick.lat,
  long: state.pick.lng,
})

const mapDispatchToProps = {
  cords,
  mapcenter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
  )(GoogleMapPage),
)
