import React from 'react'
import { Button, Carousel, Image, Space } from 'antd'
import { useRef } from 'react'
const Home = () => {
  const ref = useRef()
  
  return (
    <>
      <div style={{display: "block", minHeight: "100vh"}}>
      <Space direction="vertical" size={'large'}>
      <Carousel autoplay style={{width:"100%",maxWidth:'100%',height:"100%",margin: "0 auto"}} draggable="true" ref={ref} pauseOnHover="true" pauseOnDotsHover='true' effect="fade">
      {["flight", "hotels", "travel", "kabir-resturant-peshawer"].map((name) => (
        <div key={name}>
          <Image
            src={`/images/${name}.jpg`}
            alt={name}
            style={{
              width: '100%',
              maxWidth: '100%',
              height: '100%',
              objectFit: "cover", // or "fill", "contain", "cover"
              display: "inline-block",
              margin: "0 auto",
            }}
          />
        </div>
      ))}
      </Carousel>
      </Space>
      </div>
      
      <div style={{display:'flex',paddingTop:'20px'}}>
      <Space direction='horizontal' size={1230}>
        <Button onClick={()=>{ref.current.prev()}} color="default" variant="solid" size='large' style={{marginLeft:'2px'}}>Back</Button>
        <Button onClick={()=>{ref.current.next()}} color="default"  variant="solid" size='large'>Next</Button>
      </Space>
      </div>
    </>
  )
}

export default Home