import React from 'react'
import { Button, Carousel, Image, Space } from 'antd'
import { useRef } from 'react'
const Home = () => {
  const ref = useRef()
  return (
    <div style={{}}>
      <Space direction="vertical">
      <Carousel autoplay style={{width:"1400px",height:"400px",margin: "0 auto"}} draggable="true" ref={ref} pauseOnHover="true" pauseOnDotsHover='true' effect="fade">
      {["flight", "hotels", "travel", "kabir-resturant-peshawer"].map((name) => (
        <div key={name}>
          <img
            src={`/images/${name}.jpg`}
            alt={name}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover", // or "fill", "contain", "cover"
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      ))}
        {/* <div style={{backgroundColor:"blue"}}>Welcome to the Carousel</div>
        <div style={{backgroundColor:"green"}}>hello</div>
        <div style={{backgroundColor:"red"}}>bye</div>
        <div style={{backgroundColor:"pink"}}>momina</div> */}
      </Carousel>
      <Button onClick={()=>{ref.current.prev()}} color="default" variant="solid">Previous</Button>
      </Space>
      <Button onClick={()=>{ref.current.next()}} color="default"  variant="solid">Next</Button>
    </div>
  )
}

export default Home