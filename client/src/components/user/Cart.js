import React, {useState, useEffect, Fragment} from 'react'
import { getItems } from '../../actions/cart'
import CartItem from './CartItem'
import Navbar from '../layout/Navbar';
import Alert from '../layout/Alert'
import {connect} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {placeOrder} from '../../actions/order'


let subTotalPrice = () => {
    let total = 0
    let allCartDataInfo = getItems()==null?[]:getItems()
    allCartDataInfo.map(cartItem=>{
        total += (cartItem.price * cartItem.quantity)
    })

    return total
}


const Cart = ({isAuthenticated, placeOrder}) => {
    const history = useHistory();
    
    let initialState = {
        cartData: getItems()==null?[]:getItems()
    }
    let [cartItems, setCartItems] = useState(initialState)
    let [subTotalAmount, setSubTotalAmount] = useState(subTotalPrice())

    

    let updateCartSate = () => {
        setCartItems({
            cartData: getItems()
        })
        history.go(0)
    }

    let updateSubTotal = () => {
        setSubTotalAmount(subTotalPrice())
    }

    

    const placeUserOrder = async (cartData) => {
        if(cartData.length>0){
            let orderedDishes = []
            let cartArrayLoop = cartData.map(cartDataInfo=>{
                orderedDishes.push({
                    orderDish: cartDataInfo.id,
                    quantity: cartDataInfo.quantity 
                }) 
            })

            await Promise.all(cartArrayLoop)
            placeOrder({
                dishes: orderedDishes
            })

            setCartItems({
                cartData: []
            })
        }else{
            alert('please add some foods in cart from menu')
            history.push('/food-menu')
        }
    }

    return (
        <Fragment>
            <Navbar />
            <section className="container">
                <Alert />
                <div className="cart-container">
                    <table border="1">
                            <thead>
                                <tr>
                                    <th className="first">Item</th>
                                    <th className="third">Item Title</th>
                                    <th className="second">Qty</th>
                                    <th className="fourth">Item Total</th>
                                    <th className="fifth">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.cartData.length>0?
                                    cartItems.cartData.map((cartInfo, index)=>(
                                        <CartItem updateCartSate={()=>updateCartSate()} updateSubTotal={()=>updateSubTotal()} cartInfo={cartInfo} key={index}/>
                                    ))
                                :(<tr><td colSpan="5" align="center"><span className="mt-2 mb-2">No item found in cart</span></td></tr>)}
                                
                                
                                <tr className="totalprice">
                                    <td colSpan="2">&nbsp;</td>
                                    <td className="light">Total:</td>
                                    <td><span className="thick">{subTotalAmount} tk</span></td>
                                    <td>&nbsp;</td>
                                </tr>
                                
                                <tr className="checkoutrow">
                                    <td colSpan="5" className="checkout">
                                        {isAuthenticated !== true ? (
                                            <Link className="btn btn-primary mt-2 mb-2" to="/login">Login To Place Order</Link>
                                        ):(
                                            <button onClick={()=>placeUserOrder(cartItems.cartData)} className="btn btn-primary mt-2 mb-2">Order Now</button>
                                        )}
                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>  
                    </div>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user_auth.isAuthenticated
})

export default connect(
    mapStateToProps, {placeOrder}
)(Cart)
