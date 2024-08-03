import React, { useContext } from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([])
    const { token } = useContext(StoreContext)
    useEffect(() => {
        // If no token, show an error or redirect
        if (!token) {
            toast.error('Please log in to view orders.');
            return;
        }

        // Fetch orders if token exists
        const fetchAllOrders = async () => {
            try {
                const response = await axios.get(`${url}/api/order/list`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include token in header
                    }
                });
                if (response.data.success) {
                    setOrders(response.data.data);
                } else {
                    toast.error('Failed to fetch orders.');
                }
            } catch (error) {
                toast.error('An error occurred while fetching orders.');
            }
        };

        fetchAllOrders();
    }, [token, url]); // Re-run effect if token or url changes

    const statusHander = async (event, orderId) => {
        const response = await axios.post(url + '/api/order/status', {
            orderId,
            status: event.target.value
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in header
            }
        })
        if (response.data.success) {
            await fetchAllOrders()
        }
    }
    if (!token) {
        return <p>Please log in to view orders.</p>;
    }
    // useEffect(() => {
    //     fetchAllOrders()
    // }, [])
    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => {
                    return (
                        <div key={index} className="order-item">
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <p className="order-items-food">
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        } else {
                                            return item.name + " x " + item.quantity + ' , '
                                        }
                                    })}
                                </p>
                                <p className='order-item-name'>
                                    {order.address.firstName + ' ' + order.address.lastName}
                                </p>
                                <div className='order-item-address'>
                                    {order.address.street + ', '}
                                    {order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}
                                </div>
                                <p className='order-item-phone'>{order.address.phone}</p>
                            </div>
                            <p>Item: {order.items.length}</p>
                            <p>Price: {order.amount} $</p>
                            <select onChange={(event) => statusHander(event, order._id)} value={order.status} >
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders
