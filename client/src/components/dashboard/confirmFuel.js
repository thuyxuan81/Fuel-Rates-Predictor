import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteFuel } from '../../actions/profile'

const confirmFuel = ({ quoteList, deleteFuel }) => {
  const fuel =
    quoteList &&
    quoteList.slice(0, 1).map((f) => (
      <tr key={f._id}>
        <td>{f.gallons}</td>
        <td>{f.deliveryAddress + ' ' + f.deliveryAddress2}</td>
        <td>{f.deliveryDate}</td>
        <td>${f.suggestedPrice}</td>
        <td>${f.totalPrice}</td>
        <td>
          <Link to='/dashboard' class='btn btn-light'>
            Confirm
          </Link>
        </td>
        <td>
          <button onClick={() => deleteFuel(f._id)} className='btn btn-danger'>
            Cancel
          </button>
        </td>
      </tr>
    ))
  return (
    <Fragment>
      <h2 className='my-2'>Your Quote</h2>
      <table className='table'>
        <thread>
          <tr>
            <th>Gallons</th>
            <th className='hide-sm'>Delivery Address</th>
            <th className='hide-sm'>Delivery Date</th>
            <th className='hide-sm'>Suggested Price</th>
            <th className='hide-sm'>Total</th>
            <th />
            <th />
          </tr>
          <tbody>{fuel}</tbody>
        </thread>
      </table>
    </Fragment>
  )
}

confirmFuel.propTypes = {
  quoteList: PropTypes.array.isRequired,
  deleteFuel: PropTypes.func.isRequired,
}

export default connect(null, { deleteFuel })(confirmFuel)
