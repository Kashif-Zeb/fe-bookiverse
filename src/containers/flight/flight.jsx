import React from 'react'
import { Table,ConfigProvider, Space,Input,Button,Form ,Row,Col,DatePicker,InputNumber,Select} from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { useState ,useEffect,useMemo} from 'react'
import { sendingapiCallFlight } from './flightSlice'
import AlertCustom from "../../components/alert/alert"
import { createStyles } from 'antd-style';
import { NavLink } from 'react-router-dom'
import CustomSpin from "../../components/spin/spin"
const Flight = () => {
  const [form] = Form.useForm();
  const [paginationed, setPagination] = useState({
    current: 1,
    pageSize: 10, // Default page size
  });
  const [FlightName , setFlightName] = useState()
  const [PlaneName , setPlaneName] = useState()
  const [FlightOrigin , setFlightOrigin] = useState()
  const [FlightDeparture , setFlightDeparture] = useState()
  const [FlightDateFrom , setFlightDateFrom] = useState()
  const [FlightDateTo , setFlightDateTo] = useState()
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
  const {data ,error,loading} = useSelector((state)=>state.flight.flights_data)
  const dataAfterDateFix = data.map(element => ({
    ...element,
    flight_date: element.flight_date.replace("T", " ").replace("Z", "")
  }));
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
    dispatch(sendingapiCallFlight())
  },[dispatch])

  // table columns
  const columns = useMemo(() => [
    // { title: 'flight_id', dataIndex: 'flight_id', key: 'id' },
    { title: 'Flight name', dataIndex: 'flight_name', key: 'flight_name',fixed:"left" },
    { title: 'Plane name', dataIndex: 'plane_name', key: 'plane_name' },
    {title:"Flight origin",dataIndex:"flight_origin",key:"flight_origin"},
    {title:"Flight departure",dataIndex:"flight_departure",key:"flight_departure"},
    {title:"Flight date",dataIndex:"flight_date",key:"flight_date"},
    {title:"Flight price",dataIndex:"flight_price",key:"flight_price"},
    {title:"Company",dataIndex:"company",key:"company"},
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
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smooth scrolling
    });
  };
    // handle the submit button function

  const handleSubmit = ()=>{
    const payload = {
      "flight_name":FlightName,
      "plane_name":PlaneName,
      "flight_date_from":FlightDateFrom,
      "flight_date_to":FlightDateTo,
      "flight_departure":FlightDeparture,
      "flight_origin":FlightOrigin,
      "min_price":MinPrice,
      "max_price":MaxPrice,
      "ordering":SetOrdering
    }
    dispatch(sendingapiCallFlight(payload))
  }
  // handle the reset button function
  const reset = () => {
    const allEmpty =
    !FlightName &&
    !PlaneName &&
    !FlightDateFrom &&
    !FlightDateTo &&
    !FlightOrigin &&
    !FlightDeparture &&
    !MinPrice &&
    !MaxPrice &&
    !SetOrdering;

  if (!allEmpty) {
    dispatch(sendingapiCallFlight());
  }
    form.resetFields(); // reset form fields
    setFlightDateFrom('');
    setFlightDateTo('');
    setFlightName('');
    setPlaneName('');
    setFlightOrigin('');
    setFlightDeparture('');
    setMinPrice('');
    setMaxPrice('');
    setSetOrdering('');
  }

    // options for the Select of order by

  const optionsForSelect = [
    {
      value:'flight_origin',
      label:'Flight Origin ASC',
    },
    {
      value:'flight_date',
      label:'Flight Date ASC',
    },
    {
      value:'flight_price',
      label:'Flight Price ASC',
    },
    {
      value:'-flight_origin',
      label:'Flight Origin DESC',
    },
    {
      value:'-flight_date',
      label:'Flight Date DESC',
    },
    {
      value:'-flight_price',
      label:'Flight Price DESC',
    }
  ]
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
    <Form layout="vertical" name="search_flight_form" onFinish={handleSubmit} form={form}>
    <div style={{display:"flex"}}>
    <Row gutter={[16, 16]}>
    <Col span={6}>
      <Form.Item name="flightname" label="Flight Name">
        <Input  allowClear  onChange={(e)=>{setFlightName(e.target.value)}} placeholder='Flight Name'/>
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="planename"label="Plane Name">
        <Input  allowClear onChange={(e)=>{setPlaneName(e.target.value)}} placeholder='Plane Name'/>
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="flightorigin"label="Flight Origin">
        <Input  allowClear onChange={(e)=>{setFlightOrigin(e.target.value)}} placeholder='Flight Origin'/>
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="flightdeparture"label="Flight Departure">
        <Input  allowClear onChange={(e)=>{setFlightDeparture(e.target.value)}}placeholder='Enter Flight Departure'/>
      </Form.Item>
    </Col>

    <Col span={6}>
      <Form.Item name="flightdate"label="Flight Date">
        <DatePicker.RangePicker placeholder={['Flight Date From',"Flight Date To"]} onChange={(dates, dateStrings) => {
          setFlightDateFrom(dateStrings[0])
          setFlightDateTo(dateStrings[1])
  }}/>
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="minprice"label="Min Price">
        <InputNumber min={1}  allowClear style={{ width: 270 }} onChange={(value)=>{setMinPrice(value)}} placeholder='Enter Min Value'/>
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item name="maxprice "label="Max Price">
        <InputNumber  min={2} allowClear  style={{ width: 270 }} onChange={(value)=>{setMaxPrice(value)}} placeholder='Enter Max Value'/>
      </Form.Item>
    </Col> 
    <Col span={6}>
      <Form.Item name="settableorderby "label="Set Table Order By">
      <Select
          size={'Default'}
          onChange={(value)=>{setSetOrdering(value)}}
          style={{ width: 200 }}
          options={optionsForSelect}
          allowClear
          placeholder={"Select Orderby"}
        />
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
    dataSource={dataAfterDateFix}
    scroll={{ x: 'max-content' }}
    rowKey="flight_id"
    pagination={{
      current: paginationed.current,
      pageSize: paginationed.pageSize,
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

export default Flight