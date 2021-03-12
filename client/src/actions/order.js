import axios from 'axios'
import {setAlert} from './alert'
import { deleteAllItem } from '../actions/cart'
import {
  PLACE_ORDER,
  GET_ORDER,
  PLACE_ORDER_ERROR
} from './types'

import setAdminAuthToken from '../utils/setAdminAuthToken'
import setAuthToken from '../utils/setAuthToken'

// Add New Post
export const placeOrder = formDtata => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }  
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/order', formDtata, config)

    dispatch({
      type: PLACE_ORDER,
      payload: res.data
    })
    dispatch(setAlert('your order placed successfully', 'success'))
    deleteAllItem()
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PLACE_ORDER_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}


// GET Posts
export const getOrder = () => async dispatch => {
  if (localStorage.secure_token) {
    setAuthToken(localStorage.secure_token)
  }  
  try {
    const res = await axios.get('/api/order/list')

    dispatch({
      type: GET_ORDER,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

// Update New Post
// export const updateOrder = formDtata => async dispatch => {
//   if (localStorage.secure_token) {
//     setAdminAuthToken(localStorage.secure_token)
//   } 
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }

//     const res = await axios.put('/api/menu', formDtata, config)

//     dispatch({
//       type: UPDATE_FOOD_MENU,
//       payload: res.data.data
//     })
//     dispatch(setAlert('Food menu updated successfully', 'success'))
//   } catch (error) {
//     const errors = error.response.data.errors

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//     }

//     dispatch({
//       type: FOOD_MENU_ERROR,
//       payload: {msg: error.response.statusText, status: error.response.status}
//     })
//   }
// }



