/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { connect } from 'react-redux'
import { Form, Dropdown, Button, Row, Col } from 'react-bootstrap'
import {
  filterSearch,
  filterClass,
  pick,
  cords,
  licenseID,
} from '../actions/pick.actions'

class DropdownComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkboxesSearch: [
        {
          id: 1,
          label: 'Location',
          value: 'location_select',
          checked: props.filterByLocation,
        },
        {
          id: 2,
          label: 'Unique ID',
          value: 'uniqueId_select',
          checked: props.filterByUniqueId,
        },
        {
          id: 3,
          label: 'Carriage License',
          value: 'carriageLicense_select',
          checked: props.filterByCarriageLicense,
        },
      ],
      checkboxesClass: [
        {
          id: 4,
          label: "Those who haven't posted a message in a while",
          value: 'notPost_select',
          checked: props.filterByGoneSilent,
        },
        {
          id: 5,
          label: 'Those on a job',
          value: 'onJob_select',
          checked: props.filterByCurrentlyWorking,
        },
      ],
      search: true,
      classification: false,
      uniqueId: '',
      carriageLicenseId: '',
      errors: [],
    }
  }

  handleOnchange = (id, type) => {
    const { checkboxesSearch, checkboxesClass } = this.state
    const { pick, cords } = this.props

    if (type === 'search') {
      const elementsIndex = checkboxesSearch.findIndex(
        (element) => element.id === id,
      )
      const newArray = [...checkboxesSearch]

      if (elementsIndex === 0) {
        pick(false)
        cords(null, null)
      }

      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        checked: !newArray[elementsIndex].checked,
      }

      newArray.map((data) => {
        if (!data.checked && data.id === 2) this.setState({ uniqueId: '' })
        if (!data.checked && data.id === 3)
          this.setState({ carriageLicenseId: '' })
        return ''
      })
      return this.setState({ checkboxesSearch: newArray })
    }
    const elementsIndex = checkboxesClass.findIndex(
      (element) => element.id === id,
    )
    const newArray = [...checkboxesClass]

    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      checked: !newArray[elementsIndex].checked,
    }

    return this.setState({ checkboxesClass: newArray })
  }

  handleToggle = () => {
    const { pick } = this.props
    return pick(true)
  }

  handleChangeValue = (e, type) => {
    if (type === 'uniqueId') return this.setState({ uniqueId: e.target.value })
    return this.setState({ carriageLicenseId: e.target.value })
  }

  showCheckbox = (data, type) => {
    const {
      longitude,
      latitude,
      checked,
      uniqueId,
      carriageLicenseId,
    } = this.props
    const { errors } = this.state

    return (
      <div key={data.id}>
        <Form.Check
          style={{ top: 0, right: 0, paddingBottom: 6 }}
          type='checkbox'
          checked={data.checked}
          value={data.value}
          onChange={() => this.handleOnchange(data.id, type)}
          label={data.label}
          key={data.id}
        />
        {data.checked && data.label === 'Location' && (
          <div style={{ padding: 16 }}>
            <Form.Control
              size='sm'
              type='text'
              name='latitude'
              placeholder='latitude'
              required
              defaultValue={(checked && latitude) || ''}
            />
            <Form.Control
              size='sm'
              type='text'
              name='longitude'
              placeholder='longitude'
              required
              defaultValue={(checked && longitude) || ''}
            />
            <Button
              variant='primary'
              className='submit-btn'
              onClick={this.handleToggle}
            >
              Select Position
            </Button>
            {errors[0] && (
              <span className='help-block'>Not a valid lat/lng</span>
            )}
          </div>
        )}
        {data.checked && data.label === 'Unique ID' && (
          <div style={{ padding: 16 }}>
            <Form.Control
              size='sm'
              type='text'
              name='Unique ID'
              placeholder='Unique ID'
              required
              defaultValue={uniqueId || ''}
              onChange={(e) => this.handleChangeValue(e, 'uniqueId')}
            />
            {errors[1] && (
              <span className='help-block'>Not a valid unique id</span>
            )}
          </div>
        )}
        {data.checked && data.label === 'Carriage License' && (
          <div style={{ padding: 16 }}>
            <Form.Control
              size='sm'
              type='text'
              name='Carriage License'
              placeholder='Carriage License'
              required
              defaultValue={carriageLicenseId || ''}
              onChange={(e) => this.handleChangeValue(e, 'carriageLicenseId')}
            />
            {errors[2] && (
              <span className='help-block'>Not a valid carriage license</span>
            )}
          </div>
        )}
      </div>
    )
  }

  applyChanges = async (type) => {
    const {
      filterSearch,
      filterClass,
      licenseID,
      longitude,
      latitude,
      pick,
    } = this.props
    const {
      checkboxesSearch,
      checkboxesClass,
      uniqueId,
      carriageLicenseId,
    } = this.state
    const dataError = []

    await checkboxesSearch.map((data) => {
      const findError = {
        1: !!(data.checked && (!latitude || !longitude)),
        2: !!(data.checked && !uniqueId),
        3: !!(data.checked && !carriageLicenseId),
      }
      const error = findError[data.id]

      return dataError.push(error)
    })

    this.setState({ errors: dataError })

    if (!dataError.includes(true)) {
      licenseID(uniqueId, carriageLicenseId)

      if (type === 'search') {
        pick(false)
        const result = checkboxesSearch.map(({ checked }) => checked)
        return filterSearch(...result)
      }
      const result = checkboxesClass.map(({ checked }) => checked)
      return filterClass(...result)
    }
  }

  changeState = (data) => {
    if (data === 'search')
      return this.setState({ search: true, classification: false })
    return this.setState({ search: false, classification: true })
  }

  render() {
    const { dropValues, head, enabled } = this.props
    const {
      checkboxesSearch,
      search,
      classification,
      checkboxesClass,
    } = this.state

    if (head === 'filter')
      return (
        <Dropdown.Menu
          show
          className={enabled ? 'darkMode filter' : 'lightMode filter'}
        >
          <Row>
            <Col xs={5}>
              <Dropdown.Item
                key='by_search'
                href='#'
                onClick={() => this.changeState('search')}
              >
                By Search
              </Dropdown.Item>
              <Dropdown.Item
                key='by_classification'
                href='#'
                onClick={() => this.changeState('classification')}
              >
                By Classification
              </Dropdown.Item>
            </Col>
            <div className='vl' />
            {!search && !classification && (
              <div style={{ padding: '4%', color: 'darkgray' }}>
                Click on any filter option
              </div>
            )}
            {search && (
              <Col>
                <div className='formwrapper'>
                  {checkboxesSearch.map((data) =>
                    this.showCheckbox(data, 'search'),
                  )}{' '}
                  <Button
                    variant='primary'
                    className='submit-btn holdColor'
                    onClick={() => this.applyChanges('search')}
                    style={{ width: '88%', marginLeft: 15 }}
                  >
                    Apply
                  </Button>
                </div>
              </Col>
            )}
            {classification && (
              <Col className='formwrapper'>
                {checkboxesClass.map((data) =>
                  this.showCheckbox(data, 'class'),
                )}{' '}
                <Button
                  variant='primary'
                  className='submit-btn holdColor'
                  onClick={() => this.applyChanges('class')}
                  style={{ width: '88%', marginLeft: 15 }}
                >
                  Apply
                </Button>
              </Col>
            )}
          </Row>
        </Dropdown.Menu>
      )

    return (
      <Form.Group controlId='exampleForm.ControlSelect1'>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            {head}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {dropValues.map((values) => (
              <Dropdown.Item key={values} href='#'>
                {values}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
    )
  }
}

const mapStateToProps = (state) => ({
  filterByUniqueId: state.pick.filterByUniqueId,
  filterByLocation: state.pick.filterByLocation,
  filterByCarriageLicense: state.pick.filterByCarriageLicense,
  filterByGoneSilent: state.pick.filterByGoneSilent,
  filterByCurrentlyWorking: state.pick.filterByCurrentlyWorking,
  enabled: state.drawer.enabled,
  latitude: state.pick.lat,
  longitude: state.pick.lng,
  checked: state.pick.checked,
  uniqueId: state.pick.uniqueId,
  carriageLicenseId: state.pick.carriageLicenseId,
})

const mapDispatchToProps = {
  filterSearch,
  filterClass,
  pick,
  cords,
  licenseID,
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownComponent)
