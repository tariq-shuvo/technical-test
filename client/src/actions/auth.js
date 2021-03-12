import axios from 'axios'

import {setAlert} from './alert'
import {
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOADED,
  USER_AUTH_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_CLEAR_PROFILE
} from './types'
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/user/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: USER_AUTH_ERROR
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
    const res = await axios.post('/api/user/auth/login', body, config)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.error

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: USER_LOGIN_FAIL
    })
  }
}

// Register User
export const register = ({name, email, phone, password, confirm_password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({name, email, phone, password, confirm_password})

  try {
    const res = await axios.post('/api/user', body, config)

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: USER_REGISTER_FAIL
    })
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: USER_CLEAR_PROFILE
  })
  dispatch({
    type: USER_LOGOUT
  })
}
