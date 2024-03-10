import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/Assets/all_product';

//in this we are creating context and storing in ShopContext 
export const ShopContext = createContext(null);

//in this we created one function inside this function we provide parameter as a props
//then inside this i created one variable and store the data we want to add.
//then retunr the ShopContext with the value of contextValue and pass props.children

const getDefaultCart = () =>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{
    const[cartItems, setCartItems] = useState(getDefaultCart());
   

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product, cartItems, addToCart, removeFromCart};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;