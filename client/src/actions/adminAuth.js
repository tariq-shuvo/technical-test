import axios from 'axios'

import {setAlert} from './alert'
import {
  ADMIN_LOADED,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_CLEAR_PROFILE
} from './types'
import setAdminAuthToken from '../utils/setAdminAuthToken'

export const loadUserAdmin = () => async dispatch => {
  if (localStorage.secure_token) {
    setAdminAuthToken(localStorage.secure_token)
  }

  try {
    const res = await axios.get('/api/admin/auth')

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: ADMIN_AUTH_ERROR
    })
  }
}

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({email, password})

  try {
    const res = await axios.post('/api/admin/auth/login', body, config)

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUserAdmin())
  } catch (error) {
    const errors = error.response.data.error

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: ADMIN_LOGIN_FAIL
    })
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: ADMIN_CLEAR_PROFILE
  })
  dispatch({
    type: ADMIN_LOGOUT
  })
}
