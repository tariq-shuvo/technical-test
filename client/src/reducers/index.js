import {combineReducers} from 'redux';
import alert from './alert'
import user_auth from './auth'
import admin_auth from './adminAuth'
import food_menu from './foodMenu'
import order from './order'

export default combineReducers({
    alert,
    user_auth,
    admin_auth,
    food_menu,
    order
});