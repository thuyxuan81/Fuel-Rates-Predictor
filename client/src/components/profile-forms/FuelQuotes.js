import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addFuel } from '../../actions/profile'

const FuelQuotes = ({ addFuel, history }) => {
  const [formData, setFormData] = useState({
    gallons: '',
    deliveryDate: '',
  })

  const { gallons, deliveryDate } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <Fragment>
      <h1 className='large text-primary'>Fuel Quotes</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Please provide information for a
        quote
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault()
          addFuel(formData, history)
        }}
      >
        <div className='form-group'>
          <input
            type='number'
            placeholder='* Number of Gallons'
            name='gallons'
            value={gallons}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <h4>* Delivery Date</h4>
          <input
            type='date'
            name='deliveryDate'
            min='2020-04-24'
            max='2050-01-01'
            value={deliveryDate}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='submit'
          value='Get Quote'
          className='btn btn-primary my-1'
        />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

FuelQuotes.propTypes = {
  addFuel: PropTypes.func.isRequired,
}

export default connect(null, { addFuel })(withRouter(FuelQuotes))
