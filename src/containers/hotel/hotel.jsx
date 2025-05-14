import React from 'react'
import { Table,ConfigProvider, Space,Input,Button,Form ,Row,Col,InputNumber} from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { useState ,useEffect,useMemo} from 'react'
import AlertCustom from "../../components/alert/alert"
import { createStyles } from 'antd-style';
import { NavLink } from 'react-router-dom'
import CustomSpin from "../../components/spin/spin"
import { sendingapiCallHotel } from '../hotel/hotelSlice'

const Hotel = () => {
  const {data ,error,loading} = useSelector((state)=>state.hotel.hotels_data)
  const [form] = Form.useForm();
    const [paginationed, setPagination] = useState({
      current: 1,
      pageSize: 10, // Default page size
      total: 0
    });
    const [HotelName , setHotelName] = useState()
    const [HotelRoom , setHotelRoom] = useState()
    const [MinPrice , setMinPrice] = useState()
    const [MaxPrice , setMaxPrice] = useState()
    const [SetOrdering , setSetOrdering] = useState()
    // table css
    const useStyle = createStyles(({ css, token }) => {
      const { antCls } = token;
      return {
        customTable: css`
          ${antCls}-table {
            ${antCls}-table-container {
              ${antCls}-table-body,
              ${antCls}-table-content {
                scrollbar-width: thin;
                scrollbar-color: #eaeaea transparent;
                scrollbar-gutter: stable;
              }
            }
          }
        `,
      };
    });
    const dispatch = useDispatch()
    const[alert,setAlert] = useState({
      type:null,
      message:"",
      visible:false
    }
  )
  //alert message set
    useEffect(()=>{
      if (error){
        setAlert({
          type:"error",
          message:error,
          visible:true
        })
      }
    },[error])
    //alert visible for second
    useEffect(() => {
        if (!alert.visible) return;
        const timer = setTimeout(
          () => setAlert((a) => ({ ...a, visible: false })),
          3000
        );
        return () => clearTimeout(timer);
      }, [alert.visible]);
      // send api call 
    useEffect(()=>{
      const payload = {
        "page":paginationed.current,
        "per_page":paginationed.pageSize
      }
      dispatch(sendingapiCallHotel(payload))
      
    },[dispatch,paginationed])
  
    // table columns
    const columns = useMemo(() => [
      // { title: 'flight_id', dataIndex: 'flight_id', key: 'id' },
      { title: 'Hotel name', dataIndex: 'hotel_name', key: 'hotel_name',fixed:"left" },
      {title:"Hotel rooms",dataIndex:"hotel_rooms",key:"hotel_rooms"},
      {title:"Hotel price",dataIndex:"hotel_price",key:"hotel_price"},
      {
        title: 'Action 1',
        fixed: 'right',
        width: 90,
        render: () => <NavLink to={"/kak"}>Buy</NavLink>,
      },
    ],[]);
    // theme of table component in configprovider
    const theme = {
      components:{
        Table:{
          bodySortBg:'black',
          headerBg:'rgb(192, 192, 192)'
        }
      }
    }
    // handle the page change functionality
    const handlePageChange = (page, pageSize) => {
      setPagination(prev => ({
        ...prev,
        current: page,
        pageSize: pageSize,
        total:data.count
      }));
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smooth scrolling
      });
    };
    // handle per page  functionality
  
    const handlePageSizeChange = (current, size) => {
      setPagination({
        current: 1, // Reset to first page when changing page size
        pageSize: size,
        total:data.count
      });
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smooth scrolling
      });
    };
      // handle the submit button function
  
    const handleSubmit = ()=>{
      const payload = {
        "hotel_name":HotelName,
        "hotel_rooms":HotelRoom,
        "min_price":MinPrice,
        "max_price":MaxPrice,
        "ordering":SetOrdering,
        "page":paginationed.current,
        "per_page":paginationed.pageSize
      }
      dispatch(sendingapiCallHotel(payload))
    }
    // handle the reset button function
    const reset = () => {
      const allEmpty =
      !HotelName &&
      !HotelRoom &&
      !MinPrice &&
      !MaxPrice &&
      !SetOrdering;
  
    if (!allEmpty) {
      const payload = {
        "page":paginationed.current,
        "per_page":paginationed.pageSize
      }
      dispatch(sendingapiCallHotel(payload));
    }
      form.resetFields(); // reset form fields
      setHotelName('');
      setHotelRoom('');
      setMinPrice('');
      setMaxPrice('');
      setSetOrdering('');
    }
    if (loading) return <CustomSpin/>
    return (
  
      <>
      <AlertCustom 
      type={alert.type}
      message={alert.message}
      visible={alert.visible}/>
      <ConfigProvider theme={theme}>
      <Space direction={'vertical'} size={'small'}>
      {/* form is started*/}
      <Form layout="vertical" name="search_hotel_form" onFinish={handleSubmit} form={form}>
      <div style={{display:"flex"}}>
      <Row gutter={[16, 16]}>
      <Col span={6}>
        <Form.Item name="hotelname" label="Hotel Name">
          <Input  allowClear  onChange={(e)=>{setHotelName(e.target.value)}} placeholder='Hotel Name'/>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="hotelroom"label="Hotel Rooms">
          <Input  allowClear onChange={(e)=>{setHotelRoom(e.target.value)}} placeholder='Hotel Rooms'/>
        </Form.Item>
      </Col>
      
      <Col span={6}>
        <Form.Item name="minprice"label="Min Price">
          <InputNumber min={1}  allowClear style={{ width: 240 }} onChange={(value)=>{setMinPrice(value)}} placeholder='Enter Min Value'/>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="maxprice "label="Max Price">
          <InputNumber  min={2} allowClear  style={{ width: 240 }} onChange={(value)=>{setMaxPrice(value)}} placeholder='Enter Max Value'/>
        </Form.Item>
      </Col> 
    </Row>
    </div>
    <Row justify="end" gutter={16}>
        <Col>
          <Form.Item>
            <Button htmlType="reset" onClick={reset}>Clear Filters</Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType='submit'>Search</Button>
          </Form.Item>
        </Col>
      </Row> 
      </Form>
      {/* Table is started*/}
      <Table
      bordered={true}
      className={useStyle.customTable}
      columns={columns}
      dataSource={data.results}
      scroll={{ x: 'max-content' }}
      rowKey="hotel_id"
      pagination={{
        current: paginationed.current,
        pageSize: paginationed.pageSize,
        total: paginationed.total,
        showTitle:true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showSizeChanger: true,
        onChange: handlePageChange,
        onShowSizeChange: handlePageSizeChange,
        showQuickJumper:true
      }}
      />
      </Space>
      </ConfigProvider>
      </>
    )
  }
  
export default Hotel