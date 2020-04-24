import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Fuel from './confirmFuel'
import { getCurrentProfile } from '../../actions/profile'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])
  return (
    <Fragment>
      <Fuel quoteList={profile.quoteList} />
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
