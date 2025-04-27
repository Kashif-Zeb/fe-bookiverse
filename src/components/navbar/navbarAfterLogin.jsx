import { HomeOutlined, BookOutlined , ContactsOutlined, LoginOutlined } from '@ant-design/icons';
import { Menu , Layout, Sider } from 'antd';
import { useNavigate } from 'react-router-dom';



const NavbarAfterLogin = ()=>{
    const { Sider, Content } = Layout;  // 👈 Extract Sider and Content from Layout

    const navigate = useNavigate()
    const menu_Items = [
        {
            label: 'Dashboard',
            key: '/Dashboard',
            icon: <HomeOutlined />,
        },
        {
            label: 'Flight',
            key: '/Flight',
            icon: <HomeOutlined />,
        },
        {
            label: 'Hotel',
            key: '/Hotel',
            icon: <HomeOutlined />,
        },
        {
            label: 'Resturants',
            key: '/Resturants',
            icon: <HomeOutlined />,
        },
        {
            label: 'Cars',
            key: '/Cars',
            icon: <HomeOutlined />,
        },
        {
            label: 'Tour Places',
            key: '/Tourlaces',
            icon: <HomeOutlined />,
        },
    ]

    function clickMenu(e){
        if (typeof e?.key==='string'){
            navigate(e.key)
        }
        else{
            console.log("invalid click event perform")
        }
    }

    return(
        <Layout>
        <Sider>

            <Menu items={menu_Items} onClick={(e)=>{clickMenu(e)}} mode='inline' defaultActiveFirst='/Dashboard'/>
      </Sider>
      </Layout>
    )

}



export default NavbarAfterLogin