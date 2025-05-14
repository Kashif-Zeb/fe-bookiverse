import React from 'react'
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
const Resturant = () => {
  const tabs = [
    {
      key: 'get_flight',
      label: `Tab 1`,
      children: `Tab 1`,
      icon: <AndroidOutlined />,
    },
    {
      key: "add_flight",
      label: `Tab 2`,
      children: `Tab 2`,
      icon: <AppleOutlined />,
    },
  ]
  
  return (
    <Tabs
    defaultActiveKey="get_flight"
    items={tabs}
    type='line'
    size='large'
  />
  )
}

export default Resturant