import React, {Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

import {logout} from '../../actions/adminAuth'

const AdminNavbar = ({auth: {loading, isAuthenticated}, logout}) => {
  
  const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem("cart"))==null?0:JSON.parse(localStorage.getItem("cart")).length)
  useEffect(()=>{
    setInterval(()=>{
      setCartCount(JSON.parse(localStorage.getItem("cart"))==null?0:JSON.parse(localStorage.getItem("cart")).length)
    }, 1000)
  }, [])
    const authLinks = (
      <ul>
        <li><Link to="/admin/food-menu">Menu</Link></li>
        <li><Link to="/admin/food-order">Order</Link></li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
    )

  const guestLinks = (
      <ul>
        <li><Link to="/admin/login">Login</Link></li>
      </ul>
    )
    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-mug-hot"></i> chefonline</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
    )
}

const mapStateToProps = state => ({
  auth: state.admin_auth
})

export default connect(
  mapStateToProps,
  {logout}
)(AdminNavbar)
