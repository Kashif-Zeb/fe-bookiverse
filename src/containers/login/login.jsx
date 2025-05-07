import {React,useState,useEffect} from 'react'
import { Form ,Input, Button, Space} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { sendingapiCallLogin } from './loginSlice'
import   AlertCustom from "../../components/alert/alert"


const Login = () => {
  const [email,setEmail]  = useState()
  const [password,setPassword]  = useState()
  const [alert,setAlert] = useState(
    {
      type:null,
      message:"",
      visible : false
    }
  )
  const [submited ,setSubmited] = useState(false)

  const {loading  , error} = useSelector((state)=>state.login.login_data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!submited) return
    if (loading) return

    if (error){
      setAlert({
      type:'error',
      message:`${error}`,
      visible:true
    })
    }
    else{
      setAlert({
        type:'success',
        message: 'you logged in successfully',
        visible:true
      })
      // navigate('/Dashboard')
      window.location.href = '/Dashboard';
    }
    setSubmited(false)
  },[loading,error,submited,navigate])

  useEffect(()=>{
    if (!alert.visible) return
    const timer = setTimeout(
      ()=>setAlert((a)=>({...a,visible:false})),
      3000
    );
    return () =>clearTimeout(timer)
  },[alert.visible])

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
    setAlert({
      type:null, 
      message:'',
      visible:false
    })
    setSubmited(true)
    dispatch(sendingapiCallLogin(payload))
  }

  return (
    <>

    <AlertCustom 
    type={alert.type}
    message={alert.message}
    visible={alert.visible}/>

    <Space direction='vertical'>
    <Form onFinish={handleSubmit} validateMessages={validateMessages} name='login_form' style={{width:"300px"}}>
      <Form.Item name={["user","email"]} label="Email" rules={[{required:true, type:"email"}]}>
          <Input placeholder='Enter the email' onChange={(e)=>{setEmail(e.target.value)}}/>
      </Form.Item>
      <Form.Item name={["user","password"]} label="Password" rules={[{required:true}]}>
          <Input.Password placeholder='Enter the password' onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>Login</Button>
      </Form.Item>
    </Form>
    </Space>

    </>
  )
}

export default Login