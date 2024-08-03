import React, { useContext, useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const { token } = useContext(StoreContext)

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('Response Data:', response.data);

            if (response.data.success) {
                setList(response.data.data || []); // Ensure list is always an array
            } else {
                toast.error('Error getting food list!');
            }
        } catch (error) {
            toast.error('An error occurred while fetching the food list.');
            console.error('Fetch list error:', error);
        }
    };

    const removeFood = async (foodID) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodID });
            if (response.data.success) {
                await fetchList(); // Refresh the food list
            } else {
                toast.error('Error removing food item!');
            }
        } catch (error) {
            toast.error('An error occurred while removing the food item.');
            console.error('Remove food error:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchList();
        }
    }, [token]);

    if (!token) {
        return <p>You need to be logged in to add food items.</p>;
    }

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {Array.isArray(list) && list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <img src={`${url}/images/` + item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
