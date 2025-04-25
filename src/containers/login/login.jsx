import {React,useState,useEffect} from 'react'
import { Form ,Input, Button, Space} from 'antd'
import { type } from '@testing-library/user-event/dist/type'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [email,setEmail]  = useState()
  const [password,setPassword]  = useState()

  const dispatch = useDispatch()


  const validateMessages = {
    required:'${label} is required',
    types:{
      email:'${label} is not a valid email!'
    }
  }

  const handleSubmit = ()=> {
    const payload = {
      email,
      password
    }
    console.log(payload)
    // dispatch()
  }

  return (
    <Space direction='vertical'>
    <Form onFinish={handleSubmit} validateMessages={validateMessages} name='login_form'>
      <Form.Item name={["user","email"]} label="Email" rules={[{required:true, type:"email"}]}>
          <Input placeholder='Enter the email' onChange={(e)=>{setEmail(e.target.value)}}/>
      </Form.Item>
      <Form.Item name={["user","password"]} label="Password" rules={[{required:true}]}>
          <Input.Password placeholder='Enter the password' onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>Login</Button>
      </Form.Item>
    </Form>
    </Space>
  )
}

export default Login