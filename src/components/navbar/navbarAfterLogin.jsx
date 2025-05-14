import { HomeOutlined ,LogoutOutlined,DesktopOutlined,CarOutlined,CameraOutlined,ShopOutlined} from '@ant-design/icons';
import { Menu , Layout} from 'antd';
import { Outlet,useNavigate ,NavLink} from 'react-router-dom';
import React from 'react';
import { FaPlane } from "react-icons/fa";

const NavbarAfterLogin = ()=>{
  const { Header, Content, Footer, Sider } = Layout;

  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  }; // 👈 Extract Sider and Content from Layout

    const navigate = useNavigate()
    const menu_Items = [
        {
            label: 'Dashboard',
            key: '/Dashboard',
            icon: <DesktopOutlined />,
        },
        {
            label: 'Flight',
            key: '/Flight',
            icon: <FaPlane />,
        },
        {
            label: 'Hotel',
            key: '/Hotel',
            icon: <HomeOutlined />,
          },
          {
            label: 'Resturants',
            key: '/Resturants',
            icon: <ShopOutlined />,
        },
        {
            label: 'Cars',
            key: '/Cars',
            icon: <CarOutlined />,
        },
        {
            label: 'Tour Places',
            key: '/Tourplaces',
            icon: <CameraOutlined />,
        },
        {
          label: 'Signout',
          key: '/signout',
          icon: <LogoutOutlined />,
          danger:true
      },
    ]

    function clickMenu(e){
      const key = e?.key;

      if (typeof key === 'string') {
          if (key === '/signout') {
              sessionStorage.removeItem('access_token');
              sessionStorage.removeItem('refresh_token');
              sessionStorage.removeItem('user_details');
              // navigate('/login');
              window.location.href = "/login"
          } else {
              navigate(key);
          }
      } else {
          console.log("Invalid click event performed");
      }
    }

      // const theme = {
      //   components: {
      //     Menu: {
      //       // horizontalLineHeight:'70px',
      //       // horizontalLineHeight:"24px"
      //       lineHeight:"45",
      //       lineWidth:"45"
      //     },
      //   },
      // }
      
    return(
        

    //         <Menu items={menu_Items} onClick={(e)=>{clickMenu(e)}} mode='inline' defaultActiveFirst='/Dashboard'/>
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" items={menu_Items} onClick={(e)=>{clickMenu(e)}} mode='inline' defaultActiveFirst='/Dashboard' />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "white" }}>
        <NavLink style={{ color: "black", paddingLeft: "70px", fontSize:"30px" }} to='/Dashboard' >BookiVerse</NavLink>
          </Header> 
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    )

}



export default NavbarAfterLogin