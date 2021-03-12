import React, {Fragment, useEffect} from 'react';
import './App.css';
import Home from './components/user/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Login from './components/user/auth/Login';
import Register from './components/user/auth/Register';
import Menu from './components/user/Menu';
import Cart from './components/user/Cart';

import AdminLogin from './components/admin/auth/Login';
import AdminFoodMenu from './components/admin/Menu';
import AdminFoodOrder from './components/admin/Order';

// Redux Initialization
import {Provider} from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/auth'
import {loadUserAdmin} from './actions/adminAuth'
import AdminPrivateRoute from './components/routing/AdminPrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () =>{
  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadUserAdmin())
  }, []) 

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Switch>
          <Route path="/admin/login" component={AdminLogin} />
          <AdminPrivateRoute exact path="/admin/food-menu" component={AdminFoodMenu} />
          <AdminPrivateRoute exact path="/admin/food-order" component={AdminFoodOrder} />

          <Route exact path="/" component={Home} />
          <Route path="/food-menu" component={Menu} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Fragment> 
    </Router>
  </Provider>
  )  
}  

export default App;
