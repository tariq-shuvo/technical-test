import React, {useState} from 'react'
import { updateItem, deleteSingleItem } from '../../actions/cart'

const CartItem = ({cartInfo, updateCartSate, updateSubTotal}) => {
    const [quantity, setQuantity] = useState(cartInfo.quantity)

    let onChange = (e) => {
        e.preventDefault();
        updateItem(e.target.dataset.id, e.target.value)
        setQuantity(e.target.value)
        updateSubTotal()
    }

    let onDeleteItem = (e) => {
        e.preventDefault();
        deleteSingleItem(cartInfo.id)
        updateCartSate()
    }

    return (
        <tr className="productitm">
            <td><img src="https://via.placeholder.com/150" className="thumb" alt=""/></td>
            <td>{cartInfo.name}</td>
            <td><input type="number" data-id={cartInfo.id} value={quantity} onChange={(e)=>onChange(e)} min="1" max="99" className="qtyinput"/></td>
            <td>{cartInfo.price*quantity} tk</td>
            <td><i onClick={(e)=>onDeleteItem(e)} className="fas fa-trash-alt price-text"></i></td>
        </tr>
    )
}

export default CartItem
