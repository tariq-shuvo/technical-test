import {
  GET_FOOD_MENU,
  ADD_FOOD_MENU,
  UPDATE_FOOD_MENU,
  FOOD_MENU_ERROR
} from '../actions/types'

const initialState = {
  foods: [],
  loading: true,
  error: {}
}

const foodMenu = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case GET_FOOD_MENU:
      return {
        ...state,
        foods: payload,
        loading: false
      }
    case ADD_FOOD_MENU:
      return {
        ...state,
        foods: {count: state.foods.count + 1, data:[payload, ...state.foods.data]},
        loading: false
      }
    case UPDATE_FOOD_MENU:
      let allData = []
      state.foods.data.map(food =>
        food._id === payload._id ? allData.push(payload) : allData.push(food)
      )
      return {
        ...state,
        foods: {...state.foods, data: allData},
        loading: false
      }
    case FOOD_MENU_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      } 
    default:
      return state
  }
}

export default foodMenu;
