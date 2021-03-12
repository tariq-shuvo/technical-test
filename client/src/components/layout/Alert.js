import React from 'react'
import {connect} from 'react-redux'

const Alert = ({alerts}) => alerts !==null && alerts.length > 0 && alerts.map(alert=>(
    <div className={`alert alert-${alert.alertType}`} key={alert.id}>
    {alert.msg}
    </div>
))
        

const mapSateToProps = (state)=> ({
    alerts: state.alert
})

export default connect(mapSateToProps)(Alert)
