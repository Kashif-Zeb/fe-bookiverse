import {React, useState, useEffect} from 'react'
import { Form, Input, Button , Switch, Alert} from 'antd'
import { useDispatch, useSelector } from "react-redux";
import registerUser from "./saga"
import { useNavigate } from 'react-router-dom';
import { sendingapiCall } from './registerSlice';


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.register.registeration_data
  );
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [isagent, setisagent] = useState(false);
  const [alert, setAlert] = useState({
    type: null,      // 'success' | 'error'
    message: '',
    visible: false,
  });
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    if (!submitted) return;          // ignore before first submit
    if (loading) return;             // wait until the API finishes

    // now loading===false && submitted===true
    console.log(error)
    if (error) {
      setAlert({
        type: 'error',
        message: `Registration failed: ${String(error).slice(0,20)}`,
        visible: true,
      });
    } else {
      setAlert({
        type: 'success',
        message: `${data["message"]}! You can now login.`,
        visible: true,
      });
    }

    setSubmitted(false); // reset for next round
  }, [loading, error, submitted,data]);

  useEffect(() => {
    if (!alert.visible) return;
    const timer = setTimeout(
      () => setAlert((a) => ({ ...a, visible: false })),
      3000
    );
    return () => clearTimeout(timer);
  }, [alert.visible]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },

  };
  
  const handleSubmit = () => {
    const role = isagent ? "agent" : "user";
    const payload = {
      username,
      email,
      hash_password:password,
      role,
    };
     // clear any old alert
    setAlert({ type: null, message: '', visible: false });
     // mark that we’ve just submitted
    setSubmitted(true);
    dispatch(sendingapiCall(payload));
  };
  return (
    <>
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
      {alert.visible && (
        <Alert
          style={{ marginBottom: 16 }}
          type={alert.type}
          message={alert.message}
          showIcon
          // closable
          // onClose={() => setAlert((a) => ({ ...a, visible: false }))}
        />
      )}
      </div>

    <Form
    {...layout}
    name="registrer_form"
    onFinish={handleSubmit}
    style={{ maxWidth: 600 }}
    validateMessages={validateMessages}
    >
    <Form.Item name={['user', 'username']} label="User Name" rules={[{ required: true }]}>
      <Input placeholder='Enter the User Name' onChange={(e)=>{setusername(e.target.value)}}/>
    </Form.Item>
    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' , required:true}]}>
      <Input placeholder='Enter the Email' onChange={(e)=>{setemail(e.target.value)}}/>
    </Form.Item>
    <Form.Item name={['user', 'password']} label="Password" rules={[{ required:true}]}>
    <Input.Password placeholder="input password" onChange={(e)=>{setpassword(e.target.value)}}/>
    </Form.Item>
    <Form.Item name={['user', 'isagent']} label="Role">
      <Switch checkedChildren="Agent" unCheckedChildren="User" onChange={(e)=>{setisagent(prev => !prev);}}/>
    </Form.Item>
    <Form.Item label={null}>
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Form.Item>
  </Form>
  </>
  )
}

export default Register