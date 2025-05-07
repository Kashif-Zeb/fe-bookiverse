import React from 'react'
import Navbar from '../../components/navbar/navbar'
import { Outlet } from 'react-router-dom'

const HeaderLayout = () => {
  return (
     
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
  

}


export default HeaderLayout