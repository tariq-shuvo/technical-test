import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layout/Navbar';
import {connect} from 'react-redux'

const Home = ({isAuthenticated}) => {
    return (
        <Fragment>
            <Navbar />
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                    <h1 className="x-large">Chefonline</h1>
                    <p className="lead">
                        We are always at your service 24/7. Order your foods form here.
                    </p>
                    {isAuthenticated === false ? (
                        <div className="buttons">
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                            <Link to="/login" className="btn btn-light">Login</Link>
                        </div>
                    ): ''}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user_auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    null
)(Home)
