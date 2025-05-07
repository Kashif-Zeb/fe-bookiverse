import React from 'react'
import NavbarAfterLogin from "../../components/navbar/navbarAfterLogin"

const HeaderLayoutLoggedin = ({children}) => {
  return (
    <> 
    <NavbarAfterLogin/>
    {children}
    </>
  )
}

export default HeaderLayoutLoggedin