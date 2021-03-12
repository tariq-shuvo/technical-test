import React, {Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

import {logout} from '../../actions/auth'

const Navbar = ({auth: {loading, isAuthenticated}, logout}) => {
  
  const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem("cart"))==null?0:JSON.parse(localStorage.getItem("cart")).length)
  useEffect(()=>{
    setInterval(()=>{
      setCartCount(JSON.parse(localStorage.getItem("cart"))==null?0:JSON.parse(localStorage.getItem("cart")).length)
    }, 1000)
  }, [])
    const authLinks = (
      <ul>
        <li><Link to="/food-menu">Menu</Link></li>
        <li><Link to="/cart"><i className="fas fa-shopping-bag"></i> <sup className="cart-count">{cartCount}</sup></Link></li>
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
        <li><Link to="/food-menu">Menu</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/cart"><i className="fas fa-shopping-bag"></i> <sup className="cart-count">{cartCount}</sup></Link></li>
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
  auth: state.user_auth
})

export default connect(
  mapStateToProps,
  {logout}
)(Navbar)
