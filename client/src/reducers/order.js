import {
    PLACE_ORDER,
    GET_ORDER,
    PLACE_ORDER_ERROR
  } from '../actions/types'
  
  const initialState = {
    orders: [],
    loading: true,
    error: {},
    yourOrder: null
  }
  
  const orderDetails = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
      case PLACE_ORDER:
        return {
          ...state,
          yourOrder: payload,
          loading: false
        }
      case GET_ORDER:
        return {
          ...state,
          orders: payload,
          loading: false
        }  
      default:
        return state
    }
  }
  
  export default orderDetails;
  