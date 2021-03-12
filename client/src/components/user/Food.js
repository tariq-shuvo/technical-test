import React, {useState, useEffect} from 'react'
import {addItem} from '../../actions/cart'

const Food = ({foodInfo}) => {
    
    let [cartExist, setCartExist] = useState(false)

    const checkFoodItemExsistInCart = (itemID) => {
        let cartItemsData = JSON.parse(localStorage.getItem("cart")===null?'[]':localStorage.getItem("cart"))
        let cartItemSearchResult = cartItemsData.filter(itemInfo => itemInfo.id === itemID)
        if(cartItemSearchResult.length > 0){
            setCartExist(true)
        }
    }

    useEffect(()=>{
        checkFoodItemExsistInCart(foodInfo._id)
    }, [])
    return (
        <div className="posts">
                    <div className="post bg-white p-1 my-1">
                    <div>
                        <a href="/!#">
                        <img
                            className="square-img"
                            src="https://via.placeholder.com/150"
                            alt=""
                        />
                        <h4>{foodInfo.name}</h4>
                        </a>
                    </div>
                    <div>
                        <p className="my-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                        possimus corporis sunt necessitatibus! Minus nesciunt soluta
                        suscipit nobis.
                        </p>
                        <h2 className="price-text">{foodInfo.price} tk</h2>
                        <p className="post-date">
                            Posted on {foodInfo.update}
                        </p>

                        {cartExist=== true ? (
                            <span      
                            className="text text-success text-bold"
                            >
                            <i className="fas fa-check"></i> Already added to cart
                            </span>
                        ): (
                            <button type="button" onClick={()=> {
                                setCartExist(true)
                                addItem({
                                    id: foodInfo._id,
                                    name: foodInfo.name,
                                    price: foodInfo.price,
                                })
                            }} className="btn btn-primary">
                            <i className="fas fa-shopping-basket"></i>
                            </button>
                        )}
                        
                        
                    </div>
                    </div>
                </div> 
    )
}

export default Food
