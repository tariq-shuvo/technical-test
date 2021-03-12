import React, {Fragment, useState, useEffect} from 'react'
import Navbar from '../layout/AdminNavbar';
import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import { getOrder } from '../../actions/order';
import Alert from '../layout/Alert';

const Order = ({order: {orders, loading}, getOrder}) => {
    let initialState = {
        id:'',
        status: false
    }

    let showHideInitialState = {
        viewOrderVisible: false,
        updateFormVisible: false
    }

    let viewInitialState = null
    

    const [showHideForms, setShowHideForms] = useState(showHideInitialState)
    const [formData, setFormData] = useState(initialState)
    const [viewData, setViewData] = useState(viewInitialState)
    
    const {addFormVisible, updateFormVisible} = showHideForms
    const {name, price, status} = formData

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        getOrder()
    }, [getOrder])

    const addMenuInfo = (e) => {
        e.preventDefault();
        // addMenu(formData)
    }

    const updateMenuInfo = (e) => {
        e.preventDefault();
        // updateMenu(formData)
    }

    return (
        <Fragment>
            <Navbar />
            <section className="container">
                <h1>Admin Food Orders</h1>
                <hr />
                <br/>
                <Alert />
                {viewData!==null ? (
                    <table className="admin-table" width="100%" align="center" className="admin-table" border="1">
                    <thead>
                        <tr>
                            <th>User Info</th>
                            <th>Ordered Food</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ul>
                                    <li><b>Name: {viewData.user.name}</b></li>
                                    <li><b>Phone: {viewData.user.phone}</b></li>
                                    <li><b>Email: {viewData.user.email}</b></li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    {viewData.dishes.map((disheInfo, index)=>(
                                        <li key={index}>{index+1}. Food Item: {disheInfo.orderDish.name}, Price: {disheInfo.orderDish.price}, Quantity: {disheInfo.quantity}, Subtotal: {disheInfo.orderDish.price * disheInfo.quantity}</li>
                                    ))}
                                    
                                    <li><b>Total Bill: </b>{viewData.total} tk</li>
                                    <li><b>Order Status: </b>{viewData.status==true?'success' : 'failed'}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>  
                ):''}
                  
                {updateFormVisible==true ? (
                <form className="form" id="updateMenuForm" onSubmit={(e)=>updateMenuInfo(e)}>      
                    <div className="form-group">
                        <select name="status" value={status} onChange={(e)=>onChange(e)}>
                            <option value="true">Success</option>
                            <option value="false">Failed</option>
                        </select>
                    </div>

                    <input type="submit" className="btn btn-primary" value="Update Order Status" />
                </form>  
                ): ''}
                 
                <br/>
                
                {loading ? (
            <Spinner />
            ) : (
                <Fragment>
                    <table width="100%" align="center" className="admin-table" border="1">
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Total Amount</th>
                        <th>Order Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody align="center">
                    {orders.data.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.user.name}</td>
                                <td>{order.user.phone}</td>
                                <td>{order.user.email}</td>
                                <td>{order.total} tk</td>
                                <td>{order.status===true?'success': 'failed'}</td>
                                <td><button onClick={()=> {setViewData(order);setShowHideForms({
                viewOrderVisible: true,
                updateFormVisible: false
            })}} className="btn btn-primary mtb-1"><i className="fas fa-eye"></i></button>
            {/* <button onClick={()=> {setFormData({
                ...formData,
                status: order.status
            }); setShowHideForms({
                viewOrderVisible: false,
                updateFormVisible: true
            })}} className="btn btn-primary mtb-1"><i className="fas fa-edit"></i></button> */}
            </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>    
                </Fragment>
            )}  
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

export default connect(
    mapStateToProps,
    {getOrder}
)(Order)
