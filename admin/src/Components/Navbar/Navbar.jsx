import React from 'react'
import './Navbar.css'
import navlogo from "../../assets/graphic-designer.png"
import navProfile from '../../assets/new-user.png'

// Define the Navbar component
const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={navlogo} alt="" className="nav-logo" />
            <img src={navProfile} className='nav-profile' alt="" />
        </div>
    )
}

export default Navbar