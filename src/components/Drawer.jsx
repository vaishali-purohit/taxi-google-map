/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import ReactDrawer from 'react-drawer'
import { connect } from 'react-redux'
import { drawers } from '../actions/drawer.actions'
import LeftDrawer from './LeftDrawer'

class DrawerComponent extends React.Component {
  openDrawer = () => {
    const { drawers, selectedTab } = this.props
    drawers(true, 'left', true, selectedTab)
  }

  closeDrawer = () => {
    const { drawers } = this.props
    drawers(false, 'left', true, 'search')
  }

  render() {
    const { open, noOverlay, display } = this.props

    return (
      <div
        className={
          open || display === 'right'
            ? `${display}Drawer`
            : `hide ${display}Drawer`
        }
      >
        {display === 'left' && (
          <div>
            <i
              type='button'
              onClick={!open ? this.openDrawer : this.closeDrawer}
              disabled={open && !noOverlay}
              className={
                !open ? 'fas fa-caret-square-right' : 'fas fa-caret-square-left'
              }
            />
          </div>
        )}
        <div
          className={
            open || display === 'right'
              ? `${display}Drawer-values`
              : 'displayNot'
          }
        >
          <ReactDrawer open={open} position={display} noOverlay={noOverlay}>
            <LeftDrawer />
          </ReactDrawer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.drawer.open,
  position: state.drawer.position,
  noOverlay: state.drawer.noOverlay,
  selectedTab: state.drawer.selectedTab,
})

const mapDispatchToProps = {
  drawers,
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent)
