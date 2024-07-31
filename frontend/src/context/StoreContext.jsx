import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})

    const addToCart = (itemID) => {
        if (!cartItems[itemID]) {
            setCartItems((prev) => ({ ...prev, [itemID]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }))
        }
    }

    const removeToCart = (itemID) => {
        setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }))
    }

    const sumTotalCart = Object.keys(cartItems).reduce((sum, itemId) => {
        return sum + cartItems[itemId];
    }, 0);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        sumTotalCart
    }

    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
