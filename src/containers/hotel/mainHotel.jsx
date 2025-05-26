import React from 'react'
import { AndroidOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useState } from 'react';
import Hotel from "./hotel"
import AddHotel from "./addHotel"
const MainHotel = () => {
    const  [CurrentKey,setCurrentKey] = useState("get_flight")
    const tabs = [
        {
            key: 'get_flight',
            label: (
              <>
                <AndroidOutlined /> Hotel Details
              </>
            ),
            children: <Hotel />,
        },
        {
            key: 'add_flight',
            label: (
              <>
                <AppstoreAddOutlined /> Add Hotel
              </>
            ),
            children: <AddHotel />,
        },
    ]
    const handlingChangesTabs = (activeKey)=>{
        setCurrentKey(activeKey)
        }

    
    return (
      <Tabs
      defaultActiveKey={CurrentKey}
      items={tabs}
      type='line'
      size='large'
      onChange={handlingChangesTabs}
    />
    )
}

export default MainHotel