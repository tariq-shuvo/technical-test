import axios from 'axios'
import {setAlert} from './alert'
import {
  GET_FOOD_MENU,
  ADD_FOOD_MENU,
  UPDATE_FOOD_MENU,
  FOOD_MENU_ERROR
} from './types'

import setAdminAuthToken from '../utils/setAdminAuthToken'

// GET Posts
export const getFoods = () => async dispatch => {
  try {
    const res = await axios.get('/api/menu/list')

    dispatch({
      type: GET_FOOD_MENU,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: FOOD_MENU_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// GET Posts
export const getActiveFoods = () => async dispatch => {
  if (localStorage.secure_token) {
    setAdminAuthToken(localStorage.secure_token)
  } 
  try {
    const res = await axios.get('/api/menu/list/active')

    dispatch({
      type: GET_FOOD_MENU,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: FOOD_MENU_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Add New Post
export const addMenu = formDtata => async dispatch => {
  if (localStorage.secure_token) {
    setAdminAuthToken(localStorage.secure_token)
  } 
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/menu', formDtata, config)

    dispatch({
      type: ADD_FOOD_MENU,
      payload: res.data.data
    })
    dispatch(setAlert('New food menu added successfully', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: FOOD_MENU_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}


// Update New Post
export const updateMenu = formDtata => async dispatch => {
  if (localStorage.secure_token) {
    setAdminAuthToken(localStorage.secure_token)
  } 
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/menu', formDtata, config)

    dispatch({
      type: UPDATE_FOOD_MENU,
      payload: res.data.data
    })
    dispatch(setAlert('Food menu updated successfully', 'success'))
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: FOOD_MENU_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}
