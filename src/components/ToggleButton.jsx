/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toggleSwitch } from '../actions/drawer.actions'

class ToggleSwitch extends React.Component {
  handleChange = () => {
    const { toggleSwitch, enabled } = this.props
    toggleSwitch(!enabled)
  }

  render() {
    const { enabled } = this.props
    return (
      <Form>
        <Form.Check
          type='switch'
          id='custom-switch'
          label=''
          checked={enabled}
          onChange={this.handleChange}
        />
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  enabled: state.drawer.enabled,
})

const mapDispatchToProps = {
  toggleSwitch,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleSwitch)
