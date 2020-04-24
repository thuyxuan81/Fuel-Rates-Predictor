import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const FuelQuote = ({ quoteList }) => {
  const fuel =
    quoteList &&
    quoteList.map((f) => (
      <tr key={f._id}>
        <td>{f.gallons}</td>
        <td>{f.deliveryAddress + ' ' + f.deliveryAddress2}</td>
        <td>{f.deliveryDate}</td>
        <td>${f.suggestedPrice}</td>
        <td>${f.totalPrice}</td>
      </tr>
    ))
  return (
    <Fragment>
      <h2 className='my-2'>Fuel Quote History</h2>
      <table className='table'>
        <thread>
          <tr>
            <th>Gallons</th>
            <th className='hide-sm'>Delivery Address</th>
            <th className='hide-sm'>Delivery Date</th>
            <th className='hide-sm'>Suggested Price</th>
            <th className='hide-sm'>Total</th>
          </tr>
          <tbody>{fuel}</tbody>
        </thread>
      </table>
    </Fragment>
  )
}

FuelQuote.propTypes = {
  quoteList: PropTypes.array.isRequired,
}

export default connect(null, {})(FuelQuote)
