import React from 'react'
import Navbar from '../../components/navbar/navbar'
import { Outlet } from 'react-router-dom';
import NavbarAfterLogin from '../../components/navbar/navbarAfterLogin'
const HeaderLayout = () => {
  const userInfo = localStorage.getItem("user_details")
  if (userInfo){
    return(
    <>
    <NavbarAfterLogin/>
    <Outlet/>
    </>
    )
  }
  return (
     
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
  

}

export default HeaderLayout