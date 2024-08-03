import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {

    const { token, setToken } = useContext(StoreContext)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    return (
        <div className='navbar'>
            <img className='logo' src={assets.logo} alt="" />
            {!token
                ? <button onClick={() => setShowLogin(true)}>sign in</button>
                : <div className='navbar-profile'>
                    <p><strong>Admin</strong></p>
                    <ul className="nav-profile-dropdown">
                        <li onClick={logout}>
                            <img src={assets.logout_icon} alt="" />
                            <p>Logout</p>
                        </li>
                    </ul></div>
            }
        </div>
    )
}

export default Navbar
