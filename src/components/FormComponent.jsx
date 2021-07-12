import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import DropdownComponent from './DropdownComponent'

class FormComponent extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target.elements
    console.log('form values:------', form)
  }

  handleGroup = (icon, values, key) => (
    <Form.Group
      as={Row}
      key={key}
      controlId='formHorizontalEmail'
      className='m-0'
    >
      <Form.Label column sm={1} xs={1}>
        <img src={icon} alt='latitude' />
      </Form.Label>
      <Col className='pdl-36' style={{ marginTop: '5px' }}>
        <DropdownComponent dropValues={values} head={key} />
      </Col>
    </Form.Group>
  )

  render() {
    const { heading, values, type } = this.props

    return (
      <div className='searchBox'>
        <span>{heading}</span>
        <Form onSubmit={this.handleSubmit} className='formwrapper'>
          {values.map((data) =>
            this.handleGroup(data.icon, data.values, data.key),
          )}
          <Row className='formComp'>
            <Col
              xs={type === 'trip' ? 12 : 6}
              style={type !== 'trip' ? { paddingRight: 0 } : {}}
            >
              <Button variant='primary' className='submit-btn'>
                Clear
              </Button>
            </Col>
            <Col
              xs={type === 'trip' ? 12 : 6}
              style={type === 'taxi' ? { paddingLeft: 6 } : {}}
            >
              <Button
                variant='primary'
                className={
                  type === 'taxi' ? 'submit-btn holdColor' : 'submit-btn'
                }
              >
                {type === 'taxi' ? 'Create' : 'Select Position'}
              </Button>
            </Col>
            {type === 'trip' && (
              <Col xs={12}>
                <Button variant='primary' className='submit-btn'>
                  Confirm
                </Button>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    )
  }
}

export default connect(null, null)(FormComponent)
