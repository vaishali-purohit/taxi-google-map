/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { selectedButton } from '../actions/drawer.actions'
import { showRoute } from '../actions'
import { format, EXPLORER_URL, formatTx } from '../constants'
import back from '../lib/assets/back.png'
import next from '../lib/assets/next.png'
import expandDark from '../lib/assets/Expand_Dark.svg'
import expandLight from '../lib/assets/Expand_Light.svg'

class TableComponent extends React.Component {
  handleClick = (value) => {
    const { selectedButton } = this.props
    selectedButton(value)
  }

  compileHeader = (headings) => {
    const { buttonName, type } = this.props
    return (
      <thead>
        <tr>
          {buttonName === 'back' && type === 'contract' && (
            <img
              src={back}
              alt='back'
              onClick={() => this.handleClick('next')}
            />
          )}
          {headings.map((heading) =>
            !heading.label ? (
              <th key={heading.label} style={{ width: 76 }}>
                {heading.label}
              </th>
            ) : (
              <th key={heading.label}>{heading.label}</th>
            ),
          )}
          {buttonName === 'next' && type === 'contract' && (
            <th style={{ padding: 0, paddingBottom: 5 }}>
              <img
                src={next}
                alt='next'
                onClick={() => this.handleClick('back')}
              />
            </th>
          )}
        </tr>
      </thead>
    )
  }

  renderData = (data, heading) => {
    if (
      heading.key === 'driverId' ||
      heading.key === 'transactionId' ||
      heading.key === 'cost'
    )
      return <td key={heading.key}> {format(data[heading.key])} </td>

    if (heading.key === 'tx_url')
      return (
        <td key={heading.key}>
          <a
            title={data[heading.key]}
            href={EXPLORER_URL + data[heading.key]}
            target='_blank'
            rel='noopener noreferrer'
          >
            {formatTx(data[heading.key] ? `0x${data[heading.key]}` : false)}
          </a>
        </td>
      )

    if (heading.key === 'geometry')
      return (
        <td>
          <button
            className='show-route'
            onClick={showRoute.bind({ route: data[heading.key] })}
          >
            Route
          </button>
        </td>
      )

    return <td key={heading.key}> {data[heading.key]} </td>
  }

  renderCell = (data, heading) => this.renderData(data, heading)

  renderRow = (row, index) => {
    const { headings } = this.props
    return (
      <tr key={index}>
        {headings.map((heading) => this.renderCell(row, heading))}
      </tr>
    )
  }

  compileBody = () => {
    const { rowData, emptyText } = this.props
    return (
      <tbody>
        {!rowData.length && (
          <tr key='no content'>
            <td style={{ fontWeight: 'bold' }} colSpan={3}>
              {emptyText}
            </td>
          </tr>
        )}
        {rowData.map(this.renderRow)}
      </tbody>
    )
  }

  render() {
    const { headings, type, head, enabled } = this.props
    return (
      <div className={`table-responsive ${type}`} style={{ paddingTop: 15 }}>
        {type === 'contract' && (
          <img
            src={enabled ? expandDark : expandLight}
            alt='expand'
            className='expand-button'
          />
        )}
        <span
          style={type === 'contract' ? { marginRight: 12 } : { marginRight: 0 }}
        >
          {head}
        </span>
        <br />
        <div className='scrollbar'>
          <Table className='table-container'>
            {this.compileHeader(headings)}
            {this.compileBody()}
          </Table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  buttonName: state.drawer.buttonName,
  enabled: state.drawer.enabled,
})

const mapDispatchToProps = {
  selectedButton,
  showRoute,
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent)
