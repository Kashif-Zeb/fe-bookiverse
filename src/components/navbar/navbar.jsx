import React from 'react'
import { Button, ConfigProvider, Flex, Grid, Menu, Space } from "antd";
import { HomeOutlined, BookOutlined , ContactsOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate , NavLink,useLocation} from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';
const Navbar = () => {
  const location = useLocation()
   const items_in_menu = [
    {
      label: 'Home',
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: 'About',
      key: '/about',
      icon: <BookOutlined  />,
    },
    {
      label: 'Contact',
      key: '/contact',
      icon: <ContactsOutlined />,
    },
   ]
   const navigate = useNavigate();
   function onchange_fun(e){
    if (typeof e?.key === 'string') {
      navigate(e.key); // ✅ only navigate if it's a proper event object
    } else {
      console.error('Invalid menu click event:', e);
    }
   }

   function login_button(e){
    navigate("/login")
   }
   function register_button(e){
    navigate("/register")
   }
  return ( 
    <>
  <div style={{display: "flex", alignItems: "center" }}>
    <Space direction="horizontal" size="large">
    <NavLink style={{ color: "black", paddingLeft: "70px", fontSize:"30px" }} to={'/'}>BookiVerse</NavLink>
    <Menu items={items_in_menu} mode='horizontal' onClick={(e)=>{onchange_fun(e)}} defaultSelectedKeys="/" selectedKeys={[location.pathname]} style={{}}></Menu>
    <div style={{paddingLeft:"500px"}}>
    <Space direction="horizontal" size="large">
      <Button type='primary' icon={<LoginOutlined/>} onClick={(e)=>{login_button(e)}}>Login</Button>
      <Button icon={<svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15 14c-2.67 0-8 1.34-8 4v2h12v-2c0-2.66-5.33-4-8-4zM7 10c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zm10-1V7h-2V5h2V3h2v2h2v2h-2v2h-2z" />
        </svg> 
        } onClick={(e)=>register_button(e)}>Register</Button>
      </Space>
    </div>
    </Space>
  </div>
  </>
  )
}

export default Navbar