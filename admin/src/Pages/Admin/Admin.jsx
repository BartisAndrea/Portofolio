import React from 'react'
import './Admin.css'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import AddProject from '../../Components/AddProject/AddProject';
import ListProjects from '../../Components/ListProjects/ListProjects';
import ContactList from '../../Components/ContactList/ContactList';

// Admin component that contains the sidebar and routes for admin pages
const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproject' element={<AddProject/>}/>
            <Route path='/listproject' element={<ListProjects/>}/>
            <Route path='/contactlist' element={<ContactList/>}/> 


        </Routes>
    </div>
  )
}

export default Admin