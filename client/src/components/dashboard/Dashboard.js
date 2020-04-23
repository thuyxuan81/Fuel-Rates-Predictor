import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Fuel from './FuelQuote'
import { getCurrentProfile } from '../../actions/profile'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'> Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {profile && profile.name}
      </p>
      <p className='lead'>
        <i className='fas fa-user' /> Address: {profile && profile.address1}{' '}
        {profile && profile.address2} {profile && profile.city}{' '}
        {profile && profile.state} {profile && profile.zipcode}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Fuel quoteList={profile.quoteList} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please create one!</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
