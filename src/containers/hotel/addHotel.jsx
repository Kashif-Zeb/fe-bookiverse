import React from 'react'
import { Form ,Input,InputNumber,Button} from 'antd'
import { useState,useEffect } from 'react'
import AlertCustom from "../../components/alert/alert"
import { useSelector,useDispatch } from 'react-redux'
import { apicallErrorAddHotel, sendingApiCallAddHotel } from './hotelSlice'

const AddHotel = () => {
  const {data ,error,loading} = useSelector((state)=>state.hotel.hotel_msg)
  const dispatch = useDispatch()
  const [hotelName,setHotelName] = useState()
  const [hotelRooms,setHotelRooms] = useState()
  const [hotelPrice,setHotelPrice] = useState()
  const [submitted, setSubmitted] = useState(false);
  const[alert,setAlert] = useState({
        type:null,
        message:"",
        visible:false
      }
    )
  
  useEffect(()=>{
    if (!submitted) return;  
    if (loading) return;
    if (error){
      setAlert({
        type:"error",
        message:error,
        visible:true
      })
    }
    else{
      setAlert({
      type:'success',
      message:data['msg'],
      visible:true
    })
    }
      },[loading,error,data,submitted])
  useEffect(() => {
          if (!alert.visible) return;
          const timer = setTimeout(
            () => setAlert((a) => ({ ...a, visible: false })),
            3000
          );
          return () => clearTimeout(timer); 
        }, [alert.visible]);
  const handleSubmit = ()=>{
    const payload = {
      'hotel_name':hotelName,
      'hotel_rooms':hotelRooms,
      'hotel_price':hotelPrice
    }
    setSubmitted(true);
    dispatch(sendingApiCallAddHotel(payload))
  }

  const validateMessages = {
    required: '${label} is required!',

  };
  console.log(data)
  return (
    <>
    <AlertCustom 
      type={alert.type}
      message={alert.message}
      visible={alert.visible}/>
    <Form layout='vertical' name='addHotel' onFinish={handleSubmit} validateMessages={validateMessages}>
    <Form.Item name={'hotelname'} label='Hotel Name' rules={[{ required: true }]}>
      <Input allowClear onChange={(e)=>{setHotelName(e.target.value)}} placeholder='Enter Hotel Name'/>
    </Form.Item>
    <Form.Item name={'hotelrome'} label='Hotel Rooms' rules={[{ required: true }]}>
      <Input allowClear onChange={(e)=>{setHotelRooms(e.target.value)}} placeholder='Enter Hotel Rooms'/>
    </Form.Item>
    <Form.Item name={'hotelprice'} label='Hotel Price' rules={[{ required: false }]}>
    <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} onChange={(value)=>{setHotelPrice(value)}} placeholder='Enter Hotel Price'/>    
    </Form.Item>
    <Form.Item>
      <Button color='primary' type='primary' htmlType='submit' size='large' loading={loading}>Add Hotel Details</Button>
    </Form.Item>
    </Form>
    
    </>
  )
}

export default AddHotel