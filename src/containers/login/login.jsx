import {React,useState,useEffect} from 'react'
import { Form ,Input, Button,Typography,Divider,Checkbox} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { sendingapiCallLogin } from './loginSlice'
import   AlertCustom from "../../components/alert/alert"
import {GoogleOutlined} from '@ant-design/icons'

const Login = () => {
  const { Title, Text, Link } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log("i am here lala")
      // navigate("/Dashboard")
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Side - Form */}
      <div style={{ flex: 1, padding: "40px 40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ maxWidth: 400, width: "100%" }}>
          <img src="/logo.svg" alt="Logo" style={{ marginBottom: 40 }} />
          <Title level={2}>Welcome back</Title>
          <Text type="secondary">Please enter your details</Text>
          <Form onFinish={handleSubmit} validateMessages={validateMessages} name='login_form' style={{ marginTop: 24 }}>
            <Form.Item name={["user","email"]} label="Email" rules={[{required:true, type:"email"}]}>
                <Input placeholder='Enter the email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Item>
            <Form.Item name={["user","password"]} label="Password" rules={[{required:true}]}>
                <Input.Password placeholder='Enter the password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <Checkbox>Remember for 30 days</Checkbox>
              <Link href="#">Forgot password</Link>
            </div>
            <Form.Item>
              <Button type='primary' htmlType='submit' loading={loading}>Login</Button>
            </Form.Item>
          <Divider>or</Divider>

            <Button icon={<GoogleOutlined />} block size="large">
              Sign in with Google
            </Button>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Text>Don’t have an account? </Text>
              <Link href="/register">Sign up</Link>
            </div>
          </Form>
        </div>
      </div>
   {/* Right Side - Illustration */}
   <div style={{ flex: 1, backgroundColor: "#E9D8FD", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src="/images/loginpic.avif" alt="Illustration" style={{ width: "100%", 
        height: "100%", 
        objectFit: "cover"  }} />
      </div>
    </div>

    </>
  )
}

export default Login