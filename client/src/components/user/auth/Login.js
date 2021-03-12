import React, {useState, Fragment} from 'react'
import { Link, Redirect } from 'react-router-dom'
import Navbar from '../../layout/Navbar';
import Alert from '../../layout/Alert'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {login} from '../../../actions/auth'

const Login = ({login, isAuthenticated}) => {
    const initialState = {
        emai: '',
        password:''
    }

    const [formData, setFormData] = useState(initialState)
    
    const {email, password} = formData

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const loginWithData = async e => {
        e.preventDefault();
        login(email, password)
    }

    if (isAuthenticated) {
        return <Redirect to='/food-menu' />
    }

    return (
        <Fragment>
            <Navbar />
            <section className="container">
                <Alert />
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={(e)=>loginWithData(e)}>
                    <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e)=>onChange(e)}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e)=>onChange(e)}
                        required
                    />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.user_auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    {login}
)(Login)
