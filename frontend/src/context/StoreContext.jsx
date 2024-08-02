import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const url = 'http://localhost:3000'
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemID) => {
        if (!cartItems[itemID]) {
            setCartItems((prev) => ({ ...prev, [itemID]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }))
        }

        if (token) {
            await axios.post(url + '/api/cart/add', { itemID }, { headers: { token } })
        }
        console.log(itemID)
        // console.log(headers)
    }

    const removeToCart = async (itemID) => {
        setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }))

        if (token) {
            await axios.post(url + '/api/cart/remove', { itemID }, { headers: { token } })
        }
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

    const fetchFfoodList = async () => {
        const response = await axios.get(url + '/api/food/list')
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        if (token) {
            const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } })
            setCartItems(response.data.cartData)
            console.log('cartdata', response.data.cartData)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
        async function loadData() {
            await fetchFfoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))
            }
        }
        loadData()
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        sumTotalCart,
        url,
        token,
        setToken
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
