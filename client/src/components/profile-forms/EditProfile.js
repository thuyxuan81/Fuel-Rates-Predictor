import React, { useState, Fragment, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  })

  useEffect(() => {
    getCurrentProfile()

    setFormData({
      name: loading || !profile.name ? '' : profile.name,
      address1: loading || !profile.address1 ? '' : profile.address1,
      address2: loading || !profile.address2 ? '' : profile.address2,
      city: loading || !profile.city ? '' : profile.city,
      state: loading || !profile.state ? '' : profile.state,
      zipcode: loading || !profile.zipcode ? '' : profile.zipcode,
    })
  }, [loading])

  const { name, address1, address2, city, state, zipcode } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    createProfile(formData, history, true)
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Full Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Address 1'
            name='address1'
            value={address1}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Address 2'
            name='address2'
            value={address2}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* City'
            name='city'
            value={city}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div class='form-group'>
          <select name='state' value={state} onChange={(e) => onChange(e)}>
            <option value='0'>* Select State</option>
            <option value='AL'>AL</option>
            <option value='AK'>AK</option>
            <option value='AZ'>AZ</option>
            <option value='AR'>AR</option>
            <option value='CA'>CA</option>
            <option value='CO'>CO</option>
            <option value='CT'>CT</option>
            <option value='DE'>DE</option>
            <option value='FL'>FL</option>
            <option value='GA'>GA</option>
            <option value='HI'>HI</option>
            <option value='ID'>ID</option>
            <option value='IL'>IL</option>
            <option value='IN'>IN</option>
            <option value='IA'>IA</option>
            <option value='KS'>KS</option>
            <option value='KY'>KY</option>
            <option value='LA'>LA</option>
            <option value='ME'>ME</option>
            <option value='MD'>MD</option>
            <option value='MA'>MA</option>
            <option value='MI'>MI</option>
            <option value='MN'>MN</option>
            <option value='MS'>MS</option>
            <option value='MO'>MO</option>
            <option value='MT'>MT</option>
            <option value='NE'>NE</option>
            <option value='NV'>NV</option>
            <option value='NH'>NH</option>
            <option value='NJ'>NJ</option>
            <option value='NM'>NM</option>
            <option value='NY'>NY</option>
            <option value='NC'>NC</option>
            <option value='ND'>ND</option>
            <option value='OH'>OH</option>
            <option value='OK'>OK</option>
            <option value='OR'>OR</option>
            <option value='PA'>PA</option>
            <option value='RI'>RI</option>
            <option value='SC'>SC</option>
            <option value='SD'>SD</option>
            <option value='TN'>TN</option>
            <option value='TX'>TX</option>
            <option value='UT'>UT</option>
            <option value='VT'>VT</option>
            <option value='VA'>VA</option>
            <option value='WA'>WA</option>
            <option value='WV'>WV</option>
            <option value='WI'>WI</option>
            <option value='WY'>WY</option>
          </select>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Zipcode'
            name='zipcode'
            value={zipcode}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
)
