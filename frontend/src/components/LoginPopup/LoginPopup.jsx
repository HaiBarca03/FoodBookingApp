import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    const [currState, setCarrState] = useState('Login')
    // const [currState, setCarrState] = useState('Sign Up')
    const { url, setToken } = useContext(StoreContext)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        console.log('URL:', newUrl); // Add this line to check the URL
        if (currState === 'Login') {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }
        console.log('URL:', newUrl); // Add this line to check the URL

        const response = await axios.post(newUrl, data);
        // console.log('response:', response)

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message);
        }
    }


    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'Login'
                        ?
                        <></>
                        :
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    }
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === 'Login' ?
                    <p>Create a new account? <span onClick={() => setCarrState('Sign Up')}>Click here</span></p>
                    :
                    <p>Already have an account? <span onClick={() => setCarrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
