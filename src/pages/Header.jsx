import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Search, Filter } from 'react-bootstrap-icons'
import { Navbar, Nav, Col } from 'react-bootstrap'
import { drawers } from '../actions/drawer.actions'
import Logo from '../lib/assets/taxi.png'
import ToggleButton from '../components/ToggleButton'
import DropdownComponent from '../components/DropdownComponent'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
    }
  }

  handleClick = (value) => {
    const { drawers } = this.props
    drawers(true, 'left', true, value)
  }

  handleDropdown = () => {
    const { dropdown } = this.state
    this.setState({ dropdown: !dropdown })
  }

  render() {
    const { dropdown } = this.state

    return (
      <Navbar sticky='top' bg='dark' variant='dark'>
        <Col>
          <Navbar.Brand>
            <img alt='' src={Logo} className='width-20' />
          </Navbar.Brand>
        </Col>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Col className='demo'>
          <Navbar className='justify-content-center' style={{ color: 'white' }}>
            Decentralised Driver Demo
          </Navbar>
        </Col>
        <Col>
          <Navbar.Collapse
            id='basic-navbar-nav'
            className='justify-content-end'
          >
            <Nav>
              <ToggleButton />
            </Nav>
            <Nav style={{ marginRight: 38 }}>
              <Nav.Link onClick={() => this.handleDropdown()}>
                <Filter />
                &nbsp;Filter By
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => this.handleClick('search')}>
                <Search />
                &nbsp;Search
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {dropdown && (
            <DropdownComponent
              dropValues={['By Search', 'By Classification']}
              head='filter'
            />
          )}
        </Col>
      </Navbar>
    )
  }
}

const mapDispatchToProps = {
  drawers,
}

export default connect(null, mapDispatchToProps)(Header)
