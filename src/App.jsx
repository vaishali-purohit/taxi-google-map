import React from 'react'
import { connect } from 'react-redux'
import GoogleMap from './pages/GoogleMap'
import Header from './pages/Header'
import MarkerList from './pages/MarkerList'
import Drawer from './components/Drawer'
import { drawers } from './actions/drawer.actions'

class App extends React.Component {
  componentDidMount() {
    const { drawers } = this.props
    drawers(false, 'left', true, 'search')
  }

  render() {
    const { open, enabled, checked } = this.props

    return (
      <div className={enabled ? 'darkMode' : 'lightMode'}>
        <Header />
        <div className='App'>
          <Drawer display='left' />
          <div className={open ? 'mapMarker' : 'fullscreen mapmarker'}>
            <GoogleMap />
            <MarkerList />
            {checked && (
              <div className='infoPick'>
                <span>
                  This is a info alert — you can pick lat/lng position!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.drawer.open,
  enabled: state.drawer.enabled,
  checked: state.pick.checked,
})

const mapDispatchToProps = {
  drawers,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
