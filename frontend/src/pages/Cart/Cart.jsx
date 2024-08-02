import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const { cartItems, food_list, addToCart, removeToCart, getTotalCartAmount, url } = useContext(StoreContext)
    const navigate = useNavigate()
    console.log('food_list', food_list)

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <>
                                <div className="cart-items-item cart-items-title" key={index}>
                                    <img src={url + '/images/' + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{item.price * cartItems[item._id]}</p>
                                    <div className='cross'>
                                        <img onClick={() => removeToCart(item._id)} src={assets.remove_icon_red} alt="" />
                                        <p>{cartItems[item._id]}</p>
                                        <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"> <p>Subtotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details"> <b>Total</b>
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
