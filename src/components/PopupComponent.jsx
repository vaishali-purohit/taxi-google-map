import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { popupwindow } from '../actions/info.actions'

// const passengerHeadings = [
//   {
//     key: "passenger_location",
//     label: "currentLocationLat",
//     type: "passenger"
//   },
//   {
//     key: "passenger_location",
//     label: "currentLocationLong",
//     type: "passenger"
//   },
//   {
//     key: "destination_location",
//     label: "endLocationLat",
//     type: "passenger"
//   },
//   {
//     key: "destination_location",
//     label: "endLocationLong",
//     type: "passenger"
//   },
//   {
//     key: "type",
//     label: "type",
//     type: "passenger"
//   },
//   {
//     key: "name",
//     label: "name",
//     type: "passenger"
//   }
// ];

class PopupComponent extends React.Component {
  render() {
    const { popupwindow, modalshow, activemarker, enabled } = this.props

    if (modalshow)
      return (
        <Modal
          {...this.props}
          show={modalshow}
          onHide={() => popupwindow({}, false)}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
          className={enabled ? 'darkPopup' : 'lightPopup'}
        >
          <Modal.Header>
            <Row style={{ width: '100%' }}>
              <Col>
                <h3>Passenger Info</h3>
              </Col>
              <Col style={{ textAlign: 'end' }}>Wallet Address</Col>
            </Row>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <span>currentLocationLat</span>
              </Col>
              <Col style={{ textAlign: 'end' }}>
                <span>{activemarker.passenger_location[0]}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>currentLocationLong</span>
              </Col>{' '}
              <Col style={{ textAlign: 'end' }}>
                <span>{activemarker.passenger_location[1]}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span> endLocationLat</span>
              </Col>{' '}
              <Col style={{ textAlign: 'end' }}>
                <span>{activemarker.destination_location[0]}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>endLocationLong</span>
              </Col>{' '}
              <Col style={{ textAlign: 'end' }}>
                <span>{activemarker.destination_location[0]}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>type</span>
              </Col>{' '}
              <Col style={{ textAlign: 'end' }}>
                <span>Passenger</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>name</span>
              </Col>{' '}
              <Col style={{ textAlign: 'end' }}>
                <span>{activemarker.name}</span>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => popupwindow({}, false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    return ''
  }
}

const mapStateToProps = (state) => ({
  modalshow: state.info.modalshow,
  activemarker: state.info.activemarker,
  enabled: state.drawer.enabled,
})

const mapDispatchToProps = {
  popupwindow,
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupComponent)
