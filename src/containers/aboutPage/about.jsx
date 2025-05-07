import React from 'react'
import { Image ,Row,Col,Typography} from 'antd'
const About = () => {
  return (
    <>
    <Row>
      <Col span={12}>
        <Image src='/images/flight2.jpg'/>
      </Col>
        <Col span={12}>
          <div style={{display:'flex',alignContent:'center', justifyContent:'center'}}>
            <Typography.Text strong='true' mark='true'>
              <h3 >About US</h3>
            </Typography.Text>
          </div>
          <div style={{display:'flex',alignContent:'center', justifyContent:'center'}}>
            <Typography.Text  mark='true'>
            hello world come and fuck yourself
            </Typography.Text>
          </div>
          
        </Col>
    </Row>
    </>
  )
}

export default About