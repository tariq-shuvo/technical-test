import React, {useState, Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {setAlert} from '../../../actions/alert'
import {connect} from 'react-redux'
import Alert from '../../layout/Alert'
import Navbar from '../../layout/Navbar';
import PropTypes from 'prop-types';

import {register} from '../../../actions/auth'

const Register = ({setAlert, register, isAuthenticated}) => {
    const initialState = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: ''
    }

    const [formData, setFormData] = useState(initialState)

    const { name, email, phone, password, confirm_password } = formData

    const onChange = (e) => {
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
       }) 
    }

    const saveFormData = async e => {
        e.preventDefault();
        if(password !== confirm_password){
            setAlert("password not matched", "danger")
        }else{
          register({name, email, phone, password, confirm_password})
        }
    }
  
    if (isAuthenticated) {
      return <Redirect to='/food-menu' />
    }

    return (
      <Fragment>
            <Navbar />
            <section className="container">
              <Alert />
              <h1 className="large text-primary">Sign Up</h1>
              <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
              <form className="form" onSubmit={(e)=>saveFormData(e)}>
                <div className="form-group">
                  <input type="text" placeholder="Name" name="name" value={name} onChange={(e)=>onChange(e)} required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e)=>onChange(e)} required/>
                  <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                  >
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Phone" name="phone" value={phone} onChange={(e)=>onChange(e)} required />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={(e)=>onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    minLength="6"
                    value={confirm_password}
                    onChange={(e)=>onChange(e)}
                    required
                  />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
              </form>
              <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </section>
    </Fragment>
    )
}

Register.propType = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.user_auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  {setAlert, register}
)(Register)
