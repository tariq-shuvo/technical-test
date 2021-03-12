var cartItems = JSON.parse(localStorage.getItem("cart"));

if(cartItems===null){
    cartItems = []
}

export const addItem = (cartItem) => {
    cartItem.quantity = 1
    cartItems = localStorage.getItem("cart")===null?[]:JSON.parse(localStorage.getItem("cart"))
    cartItems.push(cartItem)
    localStorage.setItem("cart", JSON.stringify(cartItems))
}

export const updateItem = (updateID, updatedQuantity) => {
    let cartItemsData = JSON.parse(localStorage.getItem("cart"))
    cartItemsData.map((cartItem, index) => {
        if(cartItem.id === updateID){
            cartItemsData[index].quantity = Number(updatedQuantity)
        }
    })
    
    localStorage.setItem("cart", JSON.stringify(cartItemsData))
}

export const deleteSingleItem = (itemID) => {
    let cartItemsData = JSON.parse(localStorage.getItem("cart"))
    let cartItemAfterDelete = cartItemsData.filter(itemInfo=> itemInfo.id !== itemID)
    localStorage.setItem("cart", JSON.stringify(cartItemAfterDelete))
}

export const deleteAllItem = () => {
    localStorage.removeItem("cart");
}

export const getItems = () => {
    return JSON.parse(localStorage.getItem("cart"))
}