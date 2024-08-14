import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_project_icon from '../../assets/Product_Cart.svg'
import list_project_icon from '../../assets/Product_list_icon.svg'
import contact_icon from '../../assets/Product_list_icon.svg'; // Adaugă un nou icon
// Sidebar component definition
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to={'/addproject'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={add_project_icon} alt="" />
                    <p>Adaugă Proiect</p>
                </div>
            </Link>
            <Link to={'/listproject'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={list_project_icon} alt="" />
                    <p>Lista Proiectelor</p>
                </div>
            </Link>
            <Link to={'/contactlist'} style={{ textDecoration: "none" }}> {/* Nouă rută */}
                <div className="sidebar-item">
                    <img src={contact_icon} alt="" />
                    <p>Lista Contactelor</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar