import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'

const AdminPrivateRoute = ({
  component: Component,
  auth: {isAuthenticated, loading},
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/admin/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

AdminPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.admin_auth
})

export default connect(mapStateToProps)(AdminPrivateRoute)
